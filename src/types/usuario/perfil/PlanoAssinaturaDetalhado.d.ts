import PlanoSimplificado from "@/types/planos/PlanoSimplificado";

export default interface PlanoAssinaturaDetalhado {
    plano: PlanoSimplificado;
    data_assinatura: string;
    metodo_pagamento: "pix" | "boleto" | "cartao";
}