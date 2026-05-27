import { createUser } from '@/api/user';
import { useState, useCallback, useEffect, type FormEvent } from 'react';
import { useNotification } from '../chat/useNotification';
import { useNavigate } from 'react-router-dom';

const useCreateUser = () => {
  const [createLogin, setCreateLogin] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [repeatcreatePassword, setRepeatCreatePassword] = useState('');
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleCreateUserForm = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!createLogin || !createPassword || !repeatcreatePassword) {
      addNotification('warning', 'Поле обязательное');
      return;
    }

    if (createPassword !== repeatcreatePassword) {
      addNotification('warning', 'Пароли не совпадают');
      return;
    }

    sessionStorage.setItem('createLogin', createLogin);
    sessionStorage.setItem('createPassword', createPassword);

    navigate('/verifyEmail');
  }, [createLogin, createPassword, repeatcreatePassword, addNotification, navigate]);

  const handleCreateUser = useCallback(async () => {
    const verifiedEmail = sessionStorage.getItem('verifiedEmail');
    const savedLogin = sessionStorage.getItem('createLogin');
    const savedPassword = sessionStorage.getItem('createPassword');

    sessionStorage.removeItem('verifiedEmail');
    sessionStorage.removeItem('createLogin');
    sessionStorage.removeItem('createPassword');

    if (verifiedEmail && savedLogin && savedPassword) {
      const data = await createUser(savedLogin, savedPassword, verifiedEmail);
      if (!data.success) {
        addNotification('error', data.message);
        return;
      }
    
      addNotification('success', 'Пользователь создан успешно');
      navigate('/login');
    }
  }, [addNotification, navigate])

  useEffect(() => {
    handleCreateUser();
  }, [handleCreateUser]);

  return {
    createLogin,
    createPassword,
    repeatcreatePassword,
    setCreateLogin,
    setCreatePassword,
    setRepeatCreatePassword,
    handleCreateUserForm,
  };
};

export default useCreateUser;