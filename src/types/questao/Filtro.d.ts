import { Option} from "../Option"

export interface Filtro {
    disciplinas: Option[];
    bancas: Option[];
    orgaos: Option[];
    instituicoes: Option[];
    palavraChave: string;
}