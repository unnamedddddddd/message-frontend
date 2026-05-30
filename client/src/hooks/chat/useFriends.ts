import type { FriendProps } from "@/types"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import useWebSocket from "./useWebSocket";
import { getFriends } from "@/api/chat/get";
import mapFriends from "@/utils/map/mapFriends";

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
          online: !!friendsOnline.find(f => f.friend_id === friend.friendId)?.online
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

export default useFriends;