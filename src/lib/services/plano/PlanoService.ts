import { PagamentoRequest } from '@/types/plano/Pagamento';
import { ApiFetch } from '../ApiFetch'; // Ajuste o caminho conforme necessário
import Cookies from 'js-cookie';

export const PlanoService = {
  buscarPlanoPorId: async (planoId: number) => {
    return await ApiFetch.get(`planos/${planoId}`);
  },

  buscarTodosPlanos: async (skip: number = 0, limit: number = 10) => {
    return await ApiFetch.get(`planos?skip=${skip}&limit=${limit}`);
  },

  assinarPlano: async (pagamento: PagamentoRequest) => {
    const token = Cookies.get('auth_token');
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    return await ApiFetch.post('planos/assinar', pagamento, headers);
  },
};