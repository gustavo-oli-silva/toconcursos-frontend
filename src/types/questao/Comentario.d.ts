import { Usuario } from "@/types/usuario/Usuario";
export interface Comentario {
    id: string;
    usuario: Usuario;
    comentario: string;
    data_comentario: string;
}