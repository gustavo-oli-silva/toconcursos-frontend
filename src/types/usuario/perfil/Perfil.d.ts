import { Usuario } from "../Usuario";
import EstatisticasUsuario from "./Estatisticas";
import HistoricoAssinaturas from "./HistoricoAssinaturas";

export interface PerfilUsuario{
    informacoes_basicas: Usuario;
    estatisticas: EstatisticasUsuario;
    assinaturas: HistoricoAssinaturas;
}