export interface Usuario {
    id: number;
    cpf: string;
    nome: string;
    email: string;
    avatar: string | null;
    senha: string;
    data_criacao: string;
    comentarios: Comentario[];
}
