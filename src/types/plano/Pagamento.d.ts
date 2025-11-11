export interface PagamentoRequest {
  id_plano: number;
  tipo: 'pix' | 'cartao';
  valor: number;
  cartao?: CartaoDTO;
}