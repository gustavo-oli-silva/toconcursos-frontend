import { Usuario } from "@/types/usuario/Usuario";
export interface Comentario {
    id: number;
    usuario: Usuario;
    comentario: string;
    data_comentario: string;
}