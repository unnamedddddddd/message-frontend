import { useCallback, useEffect, useRef, useState } from "react";
import SimplePeer, { type SignalData } from "simple-peer";
import useWebSocket from "./useWebSocket";

const useVoiceChat = () => {
  const {
    joinVoiceSocket,
    leaveVoiceSocket,
    getVoiceParticipants,
    sendVoiceSignal,
    onVoiceSignal,
    onUserJoinedVoiceSocket,
    onUserLeftVoiceSocket,
    offVoiceEvents,
    getSocketId,
  } = useWebSocket();

  const [isInCall, setIsInCall] = useState(false);
  const [participants, setParticipants] = useState<string[]>([]);
  const localStreamRef = useRef<MediaStream | null>(null);
  const peersRef = useRef<Record<string, SimplePeer.Instance>>({});

  const callbacksRef = useRef({
    sendVoiceSignal,
    onVoiceSignal,
    onUserJoinedVoiceSocket,
    onUserLeftVoiceSocket,
    offVoiceEvents,
    leaveVoiceSocket,
  });

  useEffect(() => {
    callbacksRef.current = {
      sendVoiceSignal,
      onVoiceSignal,
      onUserJoinedVoiceSocket,
      onUserLeftVoiceSocket,
      offVoiceEvents,
      leaveVoiceSocket,
    };
  });

  const cleanupPeer = useCallback((socketId: string) => {
    const peer = peersRef.current[socketId];
    if (peer) {
      peer.destroy();
      delete peersRef.current[socketId];
    }
    const audio = document.getElementById(`audio-${socketId}`);
    if (audio) audio.remove();
    setParticipants(prev => prev.filter(id => id !== socketId));
  }, []);

  const leaveVoiceChat = useCallback(() => {
    Object.keys(peersRef.current).forEach(cleanupPeer);
    localStreamRef.current?.getTracks().forEach(track => track.stop());
    localStreamRef.current = null;
    callbacksRef.current.leaveVoiceSocket();
    setParticipants([]);
    setIsInCall(false);
  }, [cleanupPeer]);

  const createPeerConnection = useCallback(
    (targetSocketId: string, initiator: boolean): SimplePeer.Instance | null => {
      const mySocketId = getSocketId();

      if (targetSocketId === mySocketId) return null;
      if (peersRef.current[targetSocketId]) return peersRef.current[targetSocketId];

      const localStream = localStreamRef.current;
      if (!localStream) return null;

      const peer = new SimplePeer({
        initiator,
        trickle: true,
        stream: localStream,
        config: {
          iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        },
      });

      peer.on("signal", signal => {
        callbacksRef.current.sendVoiceSignal(signal, targetSocketId);
      });

      peer.on("stream", remoteStream => {
        const existingAudio = document.getElementById(`audio-${targetSocketId}`);
        if (existingAudio) return;

        const audio = document.createElement("audio");
        audio.id = `audio-${targetSocketId}`;
        audio.srcObject = remoteStream;
        audio.autoplay = true;
        document.body.appendChild(audio);

        setParticipants(prev => {
          if (prev.includes(targetSocketId)) return prev;
          return [...prev, targetSocketId];
        });
      });

      peer.on("close", () => cleanupPeer(targetSocketId));
      peer.on("error", () => cleanupPeer(targetSocketId));

      peersRef.current[targetSocketId] = peer;
      return peer;
    },
    [getSocketId, cleanupPeer]
  );

  const joinVoiceChat = useCallback(async () => {
    try {
      leaveVoiceChat();

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStreamRef.current = stream;
      joinVoiceSocket();

      callbacksRef.current.onVoiceSignal(({ from, signal }: { from: string; signal: SignalData }) => {
        const existingPeer = peersRef.current[from];
        if (existingPeer) {
          existingPeer.signal(signal);
          return;
        }
        const newPeer = createPeerConnection(from, false);
        if (newPeer) {
          newPeer.signal(signal);
        }
      });

      const participants = await getVoiceParticipants();

      participants?.forEach(p => {
        if (p.socketId !== getSocketId()) {
          createPeerConnection(p.socketId, true);
        }
      });

      setIsInCall(true);
    } catch (error) {
      console.error('[VoiceChat] joinVoiceChat error:', error);
    }
  }, [joinVoiceSocket, getVoiceParticipants, getSocketId, createPeerConnection, leaveVoiceChat]);

  useEffect(() => {
    const handleUserJoined = ({ userId }: { userId: string }) => {
      if (userId !== getSocketId()) {
        createPeerConnection(userId, true);
      }
    };

    const handleUserLeft = ({ userId }: { userId: string }) => {
      cleanupPeer(userId);
    };

    const handleVoiceSignal = ({ from, signal }: { from: string; signal: SignalData }) => {
      const existingPeer = peersRef.current[from];
      if (existingPeer) {
        existingPeer.signal(signal);
        return;
      }
      const newPeer = createPeerConnection(from, false);
      if (newPeer) {
        newPeer.signal(signal);
      }
    };

    callbacksRef.current.onUserJoinedVoiceSocket(handleUserJoined);
    callbacksRef.current.onUserLeftVoiceSocket(handleUserLeft);
    callbacksRef.current.onVoiceSignal(handleVoiceSignal);

    return () => {
      callbacksRef.current.offVoiceEvents();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    participants,
    isInCall,
    joinVoiceChat,
    leaveVoiceChat,
  };
};

export default useVoiceChat;