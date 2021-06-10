import React, { createContext, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router'
import api from '../services/api';
import Cookies from 'js-cookie';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const router = useRouter();
  const [data, setData] = useState<AuthState>(() => {
    const token = Cookies.get('@dragsters_admin:token');
    const user = Cookies.get('@dragsters_admin:user');

    if (token && user) {
      router.push('/menu');

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });


  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    })

    console.log(response)

    const { token, user } = response.data;

    Cookies.set('@dragsters_admin:token', token);
    Cookies.set('@dragsters_admin:user', JSON.stringify(user));

    setData({ token, user });

    router.push('/menu');

  }, []);

  const signOut = useCallback(() => {
    Cookies.remove('@dragsters_admin:token');
    Cookies.remove('@dragsters_admin:user');

    setData({} as AuthState);

    router.push('/login');
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, token: data.token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth }
