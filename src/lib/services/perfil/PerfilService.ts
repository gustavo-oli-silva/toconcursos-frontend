import { PerfilUsuario } from '@/types/usuario/perfil/Perfil';
import axios from 'axios'; 
import Cookies from "js-cookie"

export const PerfilService = {
  async getPerfil(): Promise<PerfilUsuario> {
    const token = Cookies.get("auth_token");
    const response = await axios.get<PerfilUsuario>(
      `${process.env.NEXT_PUBLIC_API_URL}/perfil/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
};