import type { Participant, VoiceChatProps } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import { WebSocketChat } from "@/modules";
import { error } from "console";

const useVoiceChat = () => {
  const [voiceChats, setVoiceChats] = useState<VoiceChatProps[]>([]);
  const [isInCall, setIsInCall] = useState(false);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peersRef = useRef<Record<string, SimplePeer.Instance>>({});
  const socketRef = useRef<WebSocketChat | null>(null);
  const [participants, setParticipants] = useState<string[]>([]);

  const joinVoiceChat = useCallback(async (roomId: string, userLogin: string) => {
    try {
      socketRef.current = new WebSocketChat()
      await socketRef.current?.connect(roomId, userLogin)

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      localStreamRef.current = stream;
      console.log("Микрофон включен, уведомил сервер");
    } catch (error) {
      console.error(error);
    }   
  }, [])

  const createPeerConnection = useCallback((targetSocketId: string, initiator: boolean) => {
    if (targetSocketId === socketRef.current?.socketId) {
      console.log("Пропускаем, мы ");
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
      console.log(`Отправляю сигнал к ${targetSocketId}`);
      socketRef.current?.sendVoiceSignal(signal, targetSocketId);
    });

    peer.on('stream', (remoteStream) => {
      console.log(`Получил аудио от ${targetSocketId}`);

      const audio = document.createElement('audio');
      audio.id = `audio-${targetSocketId}`;
      audio.srcObject = remoteStream;
      audio.autoplay = true;
      audio.style.display = 'none';
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

  const leaveVoiceChat = () => {
    socketRef.current?.disconnect();
    Object.values(peersRef.current).forEach(peer => peer.destroy());
    localStreamRef.current?.getTracks().forEach(track => track.stop());
    setParticipants([]);
  }

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

      if (peersRef.current[from]) {
        peersRef.current[from].signal(signal);
      } else if (localStreamRef.current) {
        const peer = createPeerConnection(from, false);
        peer?.signal(signal);
      }
    });

    return () => {
      socketRef.current?.disconnect();
      Object.values(peersRef!.current).forEach(peer => {
        try {
          peer.destroy();
        } catch (error) {
          console.error(error);
        }
      });
      socketRef.current = null;
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
    
      participants.forEach(socketId => {
        const audio = document.getElementById(`audio-${socketId}`);
        if (audio) {
          try {
            audio.remove();
          } catch (err) {
            console.warn("Ошибка при удалении аудио элемента:", err);
          }
        }
      }); 

      setParticipants([]);
    }


  }, [createPeerConnection, participants]);


   return {
    joinVoiceChat,
    leaveVoiceChat,
    participants,
    isInCall,
    setIsInCall,
    toggleVoiceChat: (roomId: string, userLogin: string) => 
      isInCall ? leaveVoiceChat() : joinVoiceChat(roomId, userLogin)
  };
}