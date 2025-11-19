import { PagamentoRequest } from '@/types/plano/Pagamento';
import { Plano } from '@/types/plano/Plano';
import axios from 'axios';
import Cookies from 'js-cookie';

interface ApiResponse<T> {
  data: T;
  status: string;
  message: string;
  http_code: number;
}


export const PlanoService = {
  async buscarPlanoPorId(planoId: number): Promise<Plano | null> {
    try {
      const respostaAxios = await axios.get<ApiResponse<Plano>>(
        `${process.env.NEXT_PUBLIC_API_URL}/planos/${planoId}`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      return respostaAxios.data.data;
    } catch (error) {
      console.error("Erro ao buscar plano por ID no serviço:", error);
      throw error;
    }
  },

    async buscarTodosPlanos(skip: number = 0, limit: number = 10): Promise<Plano[] | null> {
      try {
      const respostaAxios = await axios.get<ApiResponse<Plano[]>>(
        `${process.env.NEXT_PUBLIC_API_URL}/planos?skip=${skip}&limit=${limit}`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      return respostaAxios.data.data;
    } catch (error) {
      console.error("Erro ao buscar todos os planos no serviço:", error);
      throw error;
    }
  },

  async assinarPlano(pagamento: PagamentoRequest): Promise<{ status: string; data?: any; message?: string }> {
    try {
      const respostaAxios = await axios.post<ApiResponse<any>>(
        `${process.env.NEXT_PUBLIC_API_URL}/planos/assinar`,
        pagamento,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('auth_token')}`
          }
        }
      );

      return respostaAxios.data;
    } catch (error) {
      console.error("Erro ao assinar plano no serviço:", error);
      throw error;
    }
  },
};