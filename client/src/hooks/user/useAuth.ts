import { LogOut } from "@/api/chat";
import { getUserProfile } from "@/api/user";
import uploadUserAvatar from "@/api/user/uploadAvatar";
import type { ProfileResponse } from "@/types";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [userLogin, setUserLogin] = useState<string>('');
  const [userAvatar, setUserAvatar] = useState<string>('')
  const [isVerified, setisVerified] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>('');
  const navigate = useNavigate();

  const checkAuth = useCallback( async () => {
    try {
      const userId: string | null = localStorage.getItem('user_id');
      if (!userId) {
        console.error('userId не найден в localStorage');
        navigate('/login');
        return;
      }

      const data: ProfileResponse = await getUserProfile(Number(userId));
      if (!data.success) {
        console.log('Пользователь не авторизован:', data.message);
        navigate('/login');
        return;
      }

      setUserLogin(data.user_login);      
      setUserAvatar(data.user_avatar);
      setUserEmail(data.user_email);
      setisVerified(data.is_verified);
      
    } catch (error) {
      console.error('Ошибка проверки авторизации:', error);
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const changeUserAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Файл слишком большой (макс 5МБ)');
      return;
    }
    try {
      const currentUserId = localStorage.getItem('user_id');
      if (!currentUserId) {
        alert('Id пользователя не найден');
        return;
      }
      const data = await uploadUserAvatar(file, Number(currentUserId));
      if (data.success) {
        // 2. Обновляем состояние аватара в UI (путь из БД)
        setUserAvatar(data.avatar); 
        console.log("Аватар успешно обновлен:", data.avatar);
      }
    } catch (error) {
      console.error("Ошибка загрузки аватара:", error);
    }
  }

  const logOut = async () => {
    const data = await LogOut();

    if (!data.success) {
      console.log('Пользователь не авторизован:', data.message);
      return;
    }
    localStorage.clear();
    navigate('/login')
  }


  return {
    userLogin,
    userAvatar,
    userEmail,
    isVerified,
    isLoading,
    setUserLogin,
    setUserAvatar,
    setisVerified,
    changeUserAvatar,
    logOut,
  }
}

export default useAuth;