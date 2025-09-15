
export interface Cronograma {
  id: number;
  nome: string;
  descricao: string;
  data_criacao: string; 
  estudos_diarios: EstudoDiario[]; 
}