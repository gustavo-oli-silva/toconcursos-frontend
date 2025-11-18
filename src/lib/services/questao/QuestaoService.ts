import { Filtro } from '@/types/questao/Filtro';
import { ApiFetch } from '../ApiFetch';
import axios from 'axios';
import { IQuestao } from '@/types/questao/IQuestao';

interface ApiResponse<T> {
  data: T;
  status: string;
  message: string;
  http_code: number;
}

interface FiltroPayload {
  palavra_chave?: string;
  id_disciplina?: number;
  dificuldade?: string;
  id_banca?: number;
  id_orgao?: number;
  id_instituicao?: number;
  skip?: number;
  limit?: number;
}

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

  async getFiltros(): Promise<Filtro> {
    const response = await axios.get<ApiResponse<Filtro>>(
      `${process.env.NEXT_PUBLIC_API_URL}/questaos/filtros/all`
    );
    return response.data.data;
  },

  async aplicarFiltros(filtros: FiltroPayload): Promise<IQuestao[]> {
    // Construir query params, removendo valores undefined/null
    const params = new URLSearchParams();
    
    if (filtros.id_disciplina !== undefined && filtros.id_disciplina !== null) {
      params.append('id_disciplina', filtros.id_disciplina.toString());
    }
    if (filtros.dificuldade) {
      params.append('dificuldade', filtros.dificuldade);
    }
    if (filtros.id_banca !== undefined && filtros.id_banca !== null) {
      params.append('id_banca', filtros.id_banca.toString());
    }
    if (filtros.id_orgao !== undefined && filtros.id_orgao !== null) {
      params.append('id_orgao', filtros.id_orgao.toString());
    }
    if (filtros.id_instituicao !== undefined && filtros.id_instituicao !== null) {
      params.append('id_instituicao', filtros.id_instituicao.toString());
    }
    if (filtros.palavra_chave !== undefined && filtros.palavra_chave !== null) {
      params.append('palavra_chave', filtros.palavra_chave);
    }
    if (filtros.skip !== undefined) {
      params.append('skip', filtros.skip.toString());
    }
    if (filtros.limit !== undefined) {
      params.append('limit', filtros.limit.toString());
    }

    const response = await axios.get<ApiResponse<IQuestao[]>>(
      `${process.env.NEXT_PUBLIC_API_URL}/questaos/filtros?${params.toString()}`,
    );
    return response.data.data;
  },
};
