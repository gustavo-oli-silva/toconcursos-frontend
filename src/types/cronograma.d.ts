

export enum EDiaDaSemana {
    DOMINGO = "domingo",
    SEGUNDA = "segunda",
    TERCA = "terca",
    QUARTA = "quarta",
    QUINTA = "quinta",
    SEXTA = "sexta",
    SABADO = "sabado"
}

export interface Cronograma {
    nome: string;
    descricao: string;
    estudosDiarios: EstudoDiario[];
}

export interface EstudoDiario {
    horaInicio: string;
    horaFim: string;
    diaDaSemana: EDiaDaSemana;
    disciplina: Option;
}