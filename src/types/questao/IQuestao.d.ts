import { Option } from "../Option";
import { Comentario } from "./Comentario";
import { Alternativa } from "./Alternativa";

export interface IQuestao{
    id: number;
    enunciado: string;
    enunciado_linhas?: string[] | null;
    dificuldade: string;
    disciplina: Option
    orgao: Option
    instituicao: Option
    banca: Option
    alternativas: Alternativa[]
    comentarios: Comentario[]
    ja_respondeu: boolean
}