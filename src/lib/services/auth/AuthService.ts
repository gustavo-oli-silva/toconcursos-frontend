import { Comentario } from "@/types/questao/Comentario";
import { Login } from "@/types/usuario/Login";
import axios from 'axios'; 
import { profile } from "console";
import Cookies from "js-cookie"

interface RegisterUserPayload {
  nome: string;
  cpf: string;
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

  async login(login: Login): Promise<string> {
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
      let token = respostaAxios.data.data.access_token;
      
      return token;
    } catch (error) {
      console.error("Erro ao fazer login no serviço:", error);
      throw error;
    }
  },


  async logout(): Promise<void> {
    try {
      Cookies.remove('auth_token'); 
    } catch (error) {
      console.error("Erro ao fazer logout no serviço:", error);
      throw error;
    }
},

  async profile(): Promise<any> {
    try {
      const token = Cookies.get('auth_token');
      if (!token) {
        throw new Error("Usuário não autenticado");
      }

      const respostaAxios = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      return respostaAxios.data.data;
    } catch (error) {
      console.error("Erro ao buscar perfil do usuário:", error);
      throw error;
    }
  }
};