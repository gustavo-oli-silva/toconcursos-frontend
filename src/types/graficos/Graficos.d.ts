import { QtdCertoErradoPorDia } from "./QtdCertoErradoPorDia";
import { QtdQuestoesPorDia } from "./QtdQuestoesPorDia";

export interface Graficos{
    quantidade_questoes_por_dia: QtdQuestoesPorDia[];
    quantidade_certo_errado_por_dia: QtdCertoErradoPorDia[];
}