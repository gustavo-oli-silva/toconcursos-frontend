// app/context/AuthContext.tsx
"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario } from '@/types/usuario/Usuario';
import { AuthService } from '@/lib/services/auth/AuthService';
import { useRouter } from 'next/navigation';
import Cookies from "js-cookie"
import { Login } from '@/types/usuario/Login';



interface AuthContextType {
  user: Usuario | null;
  loading: boolean;
  logout: () => void;
  login: (credentials: Login) => Promise<void>;
  refreshUser: () => Promise<void>;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
      
        const userLogged = await AuthService.profile();
        setUser(userLogged);
      } catch (error) {
        // Se a chamada ao /me falhar, significa que não há usuário logado.
        console.log("Sessão não encontrada ou token inválido, deslogando.");
        setUser(null); 
        await AuthService.logout(); // Opcional: remover o cookie inválido
        router.push('/login');
      } finally {

        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const login = async (credentials: Login) => {
    try {
   
      const token = await AuthService.login(credentials);
      
     
      Cookies.set('auth_token', token, { 
        expires: 7, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict'
      });
      const userProfile = await AuthService.profile();
      setUser(userProfile);

    } catch (error) {
      setUser(null);
      throw error;
    }
  };
    
  const refreshUser = async () => {
    try {
      const userLogged = await AuthService.profile();
      setUser(userLogged);
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
    }
  };
    
  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    router.push('/login');
  };


  const value = { user, loading, logout, login, refreshUser};

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};