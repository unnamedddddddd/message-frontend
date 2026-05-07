import { createUser } from '@/api/user';
import { useState } from 'react';

interface User {
  userLogin: string;
  userPassword: string;
}

interface CreateUserResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const useCreateUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const create = async (user: User): Promise<CreateUserResponse> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await createUser(user.userLogin, user.userPassword);

      if (response.success) {
        setSuccess(true);
        return { success: true };
      } else {
        const errorMessage = response.message || 'Failed to create user';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    create,
    loading,
    error,
    success
  };
};