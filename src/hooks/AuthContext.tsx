import React, { createContext, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router'
import api from '../services/api';


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
  const [data, setData] = useState<AuthState>(() => {
    // const token = localStorage.getItem('@dragsters:token');
    // const user = localStorage.getItem('@dragsters:user');

    // if (token && user) {
    //   return { token, user: JSON.parse(user) };
    // }

    return {} as AuthState;
  });

  const router = useRouter();

  const signIn = useCallback(async ({ email, password }) => {
    console.log(email)
    const response = await api.post('sessions', {
      email,
      password,
    });


    const { token, user } = response.data;

    localStorage.setItem('@dragsters:token', token);
    localStorage.setItem('@dragsters:user', JSON.stringify(user));

    setData({ token, user });

    router.push('/menu');

  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@dragsters:token');
    localStorage.removeItem('@dragsters:user');

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
