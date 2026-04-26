import { getFriends } from "@/api/chat";
import type { FriendProps } from "@/types"
import mapFriends from "@/utils/mapFriends";
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import useWebSocket from "./useWebSocket";

export const useFriends = () => {
  const [friends, setFriends] = useState<FriendProps[]>([]);
  const { friendsOnline } = useWebSocket();
  const navigate = useNavigate();
        
  const loadFriends = useCallback(async () => {
    try {
      const res = await getFriends();
      if (res.success) { 
        const mappedFriends = mapFriends(res.friends);
        
        const friendsWithStatus = mappedFriends.map(friend => ({
          ...friend,
          online: friendsOnline.find(f => f.friend_id === friend.friendId)?.online || 'offline'
        }));
        setFriends(friendsWithStatus);
      }
    } catch (error) {
      console.error('Ошибка проверки авторизации:', error);
      navigate('/login');
    }
  }, [navigate, friendsOnline]);

  useEffect(() => {
    const fetchData = async () => {
      await loadFriends();
    };
    
    fetchData();
  }, [loadFriends]);

  return {
    friends,
    setFriends,
    loadFriends
  }
}