import { ApiFetch } from '../ApiFetch';

export const QuestaoService = {
  salvarQuestao: async (questao: any) => {
    return await ApiFetch.post('questaos/', questao);
  },

  buscarQuestaos: async () => {
    return await ApiFetch.get('questaos');
  },

  buscarQuestaoPorID: async (id: string) => {
    return await ApiFetch.get(`questaos/${id}`);
  },

  atualizarQuestao: async (id: number, questao: any) => {
    return await ApiFetch.put(`questaos/${id}`, questao);
  },

  deletarQuestao: async (id: number) => {
    return await ApiFetch.delete(`questaos/${id}`);
  },
};
