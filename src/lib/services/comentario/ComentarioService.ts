import { Comentario } from "@/types/questao/Comentario";
import axios from 'axios'; 
import Cookies from "js-cookie"

interface CreateComentarioPayload {
  comentario: string;
  id_questao: number;
}

export const ComentarioService = {
  async criarComentario(comentario: CreateComentarioPayload): Promise<Comentario> {
    try {
      const respostaAxios = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/comentarios/`,
        comentario,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Cookies.get('auth_token')}`
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