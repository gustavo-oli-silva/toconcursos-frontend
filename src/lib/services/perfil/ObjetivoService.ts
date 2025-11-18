import { Objetivo } from '@/types/usuario/perfil/Objetivo';
import axios from 'axios'; 

interface ApiResponse<T> {
  data: T;
  status: string;
  message: string;
  http_code: number;
}

export const ObjetivoService = {
  async getObjetivos(): Promise<Objetivo[]> {
    const response = await axios.get<ApiResponse<Objetivo[]>>(
      `${process.env.NEXT_PUBLIC_API_URL}/objetivos`
    );
    return response.data.data;
  }
};  