import { getFriends } from "@/api/chat";
import type { FriendProps } from "@/types"
import mapFriends from "@/utils/mapFriends";
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const useFriends = () => {
  const [friends, setFriends] = useState<FriendProps[]>([]);
  const navigate = useNavigate();

  const loadFriends = useCallback(async () => {
    try {
      const res = await getFriends();
      if (res.success) { 
        setFriends(mapFriends(res.friends));
        
      }
    } catch (error) {
      console.error('Ошибка проверки авторизации:', error);
      navigate('/login');
    }
  }, [navigate]);

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