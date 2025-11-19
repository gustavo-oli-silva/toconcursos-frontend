import PlanoAssinaturaDetalhado from "./PlanoAssinaturaDetalhado";
import PlanoSimplificado from "@/types/planos/PlanoSimplificado";

export default interface HistoricoAssinaturas {
    plano_atual: PlanoSimplificado | null;
    historico_assinaturas: PlanoAssinaturaDetalhado[];
}