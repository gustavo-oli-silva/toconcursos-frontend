export default interface EstatisticasUsuario {
    total_questoes_resolvidas: number;
    total_acertos: number;
    total_erros: number;
    percentual_acerto: number;
    total_cronogramas: number;
    dias_consecutivos_estudo: number; 
    ultima_atividade: string | null;
}