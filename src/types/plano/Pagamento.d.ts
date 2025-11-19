import { Cartao } from './Cartao';

export interface PagamentoRequest {
  id_plano: number;
  tipo: 'pix' | 'cartao' | 'boleto';
  valor: number;
  cartao?: Cartao;
}