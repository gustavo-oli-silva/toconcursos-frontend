import { Comentario } from "@/types/questao/Comentario";
import axios from 'axios'; 
import Cookies from "js-cookie"

interface RegisterUserPayload {
  nome: string;
  cpf: string;
  email: string;
  senha: string;
}

interface LoginPayload {
  email: string;
  senha: string;
}

export const AuthService = {
  async signUp(userData: RegisterUserPayload): Promise<void> {
    try {
      const respostaAxios = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/usuarios/`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      return respostaAxios.data.data;

    } catch (error) {
      console.error("Erro ao criar usuário no serviço:", error);
      throw error;
    }
  },

  async login(login: LoginPayload): Promise<any> {
    try {
      const respostaAxios = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        login,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      let token = respostaAxios.data.data;
        Cookies.set('auth_token', token, { 
        expires: 7, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict'
      });
    } catch (error) {
      console.error("Erro ao fazer login no serviço:", error);
      throw error;
    }
  }
};