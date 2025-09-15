export interface EstudoDiario {
  id?: number;
  hora_inicio: string;
  hora_fim: string;
  dia_da_semana: string;
  disciplina: {
    id: number;
    label: string;
  };
}