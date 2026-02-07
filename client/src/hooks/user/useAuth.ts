import { LogOut } from "@/api/chat";
import { getUserProfile } from "@/api/user";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [userLogin, setUserLogin] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const checkAuth = useCallback( async () => {
    try {
      const userId: string | null = localStorage.getItem('user_id');
      if (!userId) {
        console.error('userId не найден в localStorage');
        navigate('/login');
        return;
      }

      const data = await getUserProfile(Number(userId));
      
      if (!data.success) {
        console.log('Пользователь не авторизован:', data.message);
        navigate('/login');
        return;
      }

      setUserLogin(data.userLogin);
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
    isLoading,
    setUserLogin,
    logOut,
  }
}

export default useAuth;