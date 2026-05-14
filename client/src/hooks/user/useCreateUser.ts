import { createUser } from '@/api/user';
import { useState } from 'react';
import { useNotification } from '../chat/useNotification';

const useCreateUser = () => {
  const [createLogin, setCreateLogin] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [repeatcreatePassword, setRepeatCreatePassword] = useState('');
  const { addNotification } = useNotification()

  const handleCreateUserForm = async () => {
    try {

      if (!createLogin || !createPassword || !repeatcreatePassword) {
        addNotification('warning', 'Поле обязательное');
        return;
      }

      if (createPassword !== repeatcreatePassword) {
        addNotification('warning', 'Пароли не совпадают');
        return;
      }

      const data = await createUser(createLogin, createPassword);
      if (!data.success) {
        addNotification('error', data.message);
        return;
      }
      addNotification('success', 'Пользователь создан успешно');
      return true;
    } catch (error) {
      console.error(error);
    }
  };

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