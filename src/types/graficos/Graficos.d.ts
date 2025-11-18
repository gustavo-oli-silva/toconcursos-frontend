import { QtdCertoErradoPorDia } from "./QtdCertoErradoPorDia";
import { QtdQuestoesPorDia } from "./QtdQuestoesPorDia";
import { PercentualAcertoPorDisciplina } from "./PercentualAcertoPorDisciplina";
import { EvolucaoPercentualAcerto } from "./EvolucaoPercentualAcerto";
import { DistribuicaoQuestoesPorDisciplina } from "./DistribuicaoQuestoesPorDisciplina";
import { PercentualAcertoPorOrgao } from "./PercentualAcertoPorOrgao";
import { PercentualAcertoPorBanca } from "./PercentualAcertoPorBanca";

export interface Graficos{
    quantidade_questoes_por_dia: QtdQuestoesPorDia[];
    quantidade_certo_errado_por_dia: QtdCertoErradoPorDia[];
    percentual_acerto_por_disciplina: PercentualAcertoPorDisciplina[];
    evolucao_percentual_acerto: EvolucaoPercentualAcerto[];
    distribuicao_questoes_por_disciplina: DistribuicaoQuestoesPorDisciplina[];
    percentual_acerto_por_orgao: PercentualAcertoPorOrgao[];
    percentual_acerto_por_banca: PercentualAcertoPorBanca[];
}