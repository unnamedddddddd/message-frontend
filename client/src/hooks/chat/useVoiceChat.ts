import { useCallback, useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import { WebSocketChat } from "@/modules";

const useVoiceChat = () => {
  const [isInCall, setIsInCall] = useState(false);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peersRef = useRef<Record<string, SimplePeer.Instance>>({});
  const socketRef = useRef<WebSocketChat | null>(null);
  const [participants, setParticipants] = useState<string[]>([]);

  const leaveVoiceChat = () => {    
    socketRef.current?.disconnect();
    Object.values(peersRef.current).forEach(peer => peer.destroy());
    localStreamRef.current?.getTracks().forEach(track => track.stop());
    setParticipants([]);
    setIsInCall(false);
  }

  const joinVoiceChat = useCallback(async () => {
    try {
      leaveVoiceChat();

      socketRef.current = new WebSocketChat()
      await socketRef.current?.connect()

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      localStreamRef.current = stream;
      socketRef.current.joinVoiceChat();
      console.log(localStreamRef.current?.active);
      console.log(Object.keys(peersRef.current).length);
      
      console.log("Микрофон включен");
      setIsInCall(true); 
      navigator.mediaDevices.enumerateDevices()
        .then(devices => console.log(devices.filter(d => d.kind === 'audioinput')))
      

    } catch (error) {
      console.error(error);
    }   
  }, [])

  const createPeerConnection = useCallback((targetSocketId: string, initiator: boolean) => {
    if (targetSocketId === socketRef.current?.socketId) {
      return null;
    }
    if (peersRef?.current[targetSocketId]) {
      console.log(`Уже есть соединение с ${targetSocketId}`);
      return peersRef.current[targetSocketId];
    } 
    
    const localStream = localStreamRef.current; 
    if (!localStream) {
      console.error("Нет микрофона");
      return null;
    }

    console.log(`Создаю соединение с ${targetSocketId}`);
    const peer = new SimplePeer({
      initiator,
      stream: localStream,
      config: {
        iceServers: [
          {urls: 'stun:stun.l.google.com:19302'}
        ]
      }
    });

    peer.on('signal', (signal) => {
      socketRef.current?.sendVoiceSignalGroup(signal, targetSocketId);
    });

    peer.on('stream', (remoteStream) => {
      console.log(`Получил аудио от ${targetSocketId}`);

      const audio = document.createElement('audio');
      audio.id = `audio-${targetSocketId}`;
      audio.srcObject = remoteStream;
      audio.autoplay = true;
      audio.style.display = 'none';
      audio.play();
      document.body.appendChild(audio);

      setParticipants(prev => {
        if (!prev.includes(targetSocketId)) {
          return [...prev, targetSocketId];
        }
        return prev;
      })
    });

    peer.on('close', () => {
      console.log(`Соединение с ${targetSocketId} закрыто`);
      const audio = document.getElementById(`audio-${targetSocketId}`);
      
      if (audio) audio.remove();

      setParticipants(prev => prev.filter(id => id !== targetSocketId));
      delete peersRef.current[targetSocketId];
    })

    peersRef.current[targetSocketId] = peer;

    return peer;
  }, [])

  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.getParticipants()
      .then((participants) => {
        console.log("👥 Участники чата:", participants);
        participants.forEach(participants => {
          createPeerConnection(participants.socketId, true);
        })
      }).catch(error => {
        console.error(error);
      });
     
    socketRef.current?.onUserJoinedVoice(({userId}) => {
      console.log(`Новый участник вошел: ${userId}`);
      if (localStreamRef.current && userId !== socketRef.current?.socketId) {
        createPeerConnection(userId, true);
      }
    });

    socketRef.current?.onUserLeftVoice(({userId}) => {
      console.log(`Участник вышел: ${userId}`);
      if (peersRef.current[userId]) {
        peersRef.current[userId].destroy();
        delete peersRef.current[userId];

        setParticipants(prev => prev.filter(id => id !== userId));

        const audio = document.getElementById(`audio-${userId}`);
        if (audio) audio.remove();
      }
    });

    socketRef.current.getVoiceSignal(({ from, signal }) => {
      console.log(`Получил сигнал от ${from}`);
       console.log("📢 ПОЛУЧЕН СИГНАЛ:", signal.type, "от", from);
      if (peersRef.current[from]) {
        peersRef.current[from].signal(signal);
      } else if (localStreamRef.current) {
        const peer = createPeerConnection(from, false);
        peer?.signal(signal);
      }
    });

   return () => {
    if (!isInCall) return;

    socketRef.current?.disconnect();
    
    Object.values(peersRef.current).forEach(peer => {
      try {
        peer.destroy();
      } catch (error) {
        console.error(error);
      }
    });
    
    Object.keys(peersRef.current).forEach(socketId => {
      const audio = document.getElementById(`audio-${socketId}`);
      if (audio) {
        try {
          audio.remove();
        } catch (err) {
          console.warn("Ошибка при удалении аудио элемента:", err);
        }
      }
    });
    
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => {
        try {
          track.stop();
        } catch (err) {
          console.warn("Ошибка при остановке трека:", err);
        }
      });
      localStreamRef.current = null;
    }

    peersRef.current = {};
    socketRef.current = null;
    
    setParticipants([]);
  };


  }, [createPeerConnection, isInCall]);


   return {
    participants,
    isInCall,
    joinVoiceChat,
    leaveVoiceChat,
    setIsInCall,
  };
}

export default useVoiceChat; 