import axios from 'axios';
import Cookies from "js-cookie";

interface ApiResponse<T> {
  data: T;
  status: string;
  message: string;
  http_code: number;
}

export const CronogramaService = {
  async salvarCronograma(cronograma: any): Promise<any> {
    try {
      const token = Cookies.get('auth_token');
      const response = await axios.post<ApiResponse<any>>(
        `${process.env.NEXT_PUBLIC_API_URL}/cronogramas/`,
        cronograma,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : undefined
          }
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Erro ao salvar cronograma no serviço:", error);
      throw error;
    }
  },

  async buscarCronogramas(): Promise<any[]> {
    try {
      const token = Cookies.get('auth_token');
      const response = await axios.get<ApiResponse<any[]>>(
        `${process.env.NEXT_PUBLIC_API_URL}/cronogramas`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : undefined
          }
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Erro ao buscar cronogramas no serviço:", error);
      throw error;
    }
  },

  async buscarCronogramaPorID(id: string): Promise<any> {
    try {
      const token = Cookies.get('auth_token');
      const response = await axios.get<ApiResponse<any>>(
        `${process.env.NEXT_PUBLIC_API_URL}/cronogramas/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : undefined
          }
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Erro ao buscar cronograma por ID no serviço:", error);
      throw error;
    }
  },

  async atualizarCronograma(id: number, cronograma: any): Promise<any> {
    try {
      const token = Cookies.get('auth_token');
      const response = await axios.put<ApiResponse<any>>(
        `${process.env.NEXT_PUBLIC_API_URL}/cronogramas/${id}`,
        cronograma,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : undefined
          }
        }
      );
      return response.data.data;
    } catch (error) {
      console.error("Erro ao atualizar cronograma no serviço:", error);
      throw error;
    }
  },

  async deletarCronograma(id: number): Promise<void> {
    try {
      const token = Cookies.get('auth_token');
      await axios.delete<ApiResponse<void>>(
        `${process.env.NEXT_PUBLIC_API_URL}/cronogramas/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : undefined
          }
        }
      );
    } catch (error) {
      console.error("Erro ao deletar cronograma no serviço:", error);
      throw error;
    }
  },
};
