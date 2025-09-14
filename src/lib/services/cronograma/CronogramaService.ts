import { ApiFetch } from '../ApiFetch';

export const CronogramaService = {
  salvarCronograma: async (cronograma: any) => {
    return await ApiFetch.post('cronogramas/', cronograma);
  },

  buscarCronogramas: async () => {
    return await ApiFetch.get('cronogramas');
  },

  buscarCronogramaPorID: async (id: string) => {
    return await ApiFetch.get(`cronogramas/${id}`);
  },

  atualizarCronograma: async (id: number, cronograma: any) => {
    return await ApiFetch.put(`cronogramas/${id}`, cronograma);
  },

  deletarCronograma: async (id: number) => {
    return await ApiFetch.delete(`cronogramas/${id}`);
  },
};
