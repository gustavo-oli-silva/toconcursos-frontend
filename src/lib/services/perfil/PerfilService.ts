import { PerfilUsuario } from '@/types/usuario/perfil/Perfil';
import axios from 'axios'; 
import Cookies from "js-cookie"

interface UpdatePerfilData {
  nome?: string; 
  avatar?: string;
  id_objetivo?: number;
}
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
  },

  async updatePerfil(data: UpdatePerfilData): Promise<void> {
    const token = Cookies.get("auth_token");
    await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/perfil/me`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
};