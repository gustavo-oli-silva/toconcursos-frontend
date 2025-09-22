import { Comentario } from "@/types/questao/Comentario";
import axios from 'axios'; 


interface CreateComentarioPayload {
  comentario: string;
  id_questao: number;
}

export const ComentarioService = {
  async criarComentario(comentario: CreateComentarioPayload, usuarioToken: string): Promise<Comentario> {
    usuarioToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJzdHJpbmciLCJleHAiOjE3NTgxMTgxNjl9.txN6g9sjJit5yGrhcQshCxsAkSNWRsElLtMGZkPgRzE'
    try {
      const respostaAxios = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/comentarios/`,
        comentario,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${usuarioToken}`
          }
        }
      );

      return respostaAxios.data.data;

    } catch (error) {
      console.error("Erro ao criar comentário no serviço:", error);
      throw error;
    }
  }
};