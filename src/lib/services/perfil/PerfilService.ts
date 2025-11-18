import { Graficos } from '@/types/graficos/Graficos';
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
  },

  async uploadAvatar(file: File): Promise<string> {
    const token = Cookies.get("auth_token");
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post<{ avatarUrl: string }>(
      `${process.env.NEXT_PUBLIC_API_URL}/perfil/me/avatar`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.avatarUrl;
  },

  async deleteAvatar(): Promise<void> {
    const token = Cookies.get("auth_token");
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/perfil/me/avatar`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async getEstatisticas(): Promise<Graficos> {
    const token = Cookies.get("auth_token");
    const response = await axios.get<Graficos>(
      `${process.env.NEXT_PUBLIC_API_URL}/perfil/me/estatisticas/graficos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
};