import { AuthenticationContext } from '@/app/context/AuthContext';
import axios from 'axios';
import { deleteCookie } from 'cookies-next';
import { useContext } from 'react';

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);
  const signIn = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/signin',
        {
          email,
          password,
        }
      );
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };
  const signUp = async (
    {
      email,
      password,
      firstName,
      lastName,
      city,
      phone,
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
    },
    handleClose: () => void
  ) => {
    setAuthState({
      data: null,
      error: null,
      loading: true,
    });
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/signup',
        {
          email,
          password,
          firstName,
          lastName,
          city,
          phone,
        }
      );
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose();
    } catch (error: any) {
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  const signOut = () => {
    deleteCookie('jwt');
    setAuthState({
      data: null,
      loading: false,
      error: null,
    });
  };

  return {
    signIn,
    signUp,
    signOut,
  };
};

export default useAuth;
