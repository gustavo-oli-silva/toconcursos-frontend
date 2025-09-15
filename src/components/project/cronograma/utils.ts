import { EDiaDaSemana } from "@/types/cronograma/EDiaDaSemana";
import { EstudoDiario } from "@/types/cronograma/EstudoDiario";

/**
 * Calcula a altura do bloco de estudo em pixels baseado na duração
 */
export const calculateBlockHeight = (horaInicio: string, horaFim: string): number => {
  const [inicioHora, inicioMin] = horaInicio.split(":").map(Number);
  const [fimHora, fimMin] = horaFim.split(":").map(Number);
  const inicioMinutos = inicioHora * 60 + inicioMin;
  const fimMinutos = fimHora * 60 + fimMin;
  const duracaoMinutos = fimMinutos - inicioMinutos;
  return Math.max(duracaoMinutos, 30);
};

/**
 * Calcula a posição do bloco de estudo em pixels baseado no horário
 */
export const calculateBlockPosition = (horaInicio: string): number => {
  const [hora, min] = horaInicio.split(":").map(Number);
  const minutosDoDia = hora * 60 + min;
  return minutosDoDia;
};

/**
 * Filtra estudos por dia da semana
 */
export const getEstudosForDay = (estudos: EstudoDiario[], dia: EDiaDaSemana): EstudoDiario[] => {
  return estudos.filter((estudo) => estudo.dia_da_semana === dia);
};

/**
 * Calcula estatísticas do cronograma
 */
export const calculateCronogramaStatistics = (estudos: EstudoDiario[]) => {
  const totalMinutos = estudos.reduce((acc, estudo) => {
    const [inicioHora, inicioMin] = estudo.hora_inicio.split(":").map(Number);
    const [fimHora, fimMin] = estudo.hora_fim.split(":").map(Number);
    const inicioMinutosDia = inicioHora * 60 + inicioMin;
    const fimMinutosDia = fimHora * 60 + fimMin;
    const duracaoMinutos = fimMinutosDia - inicioMinutosDia;
    return acc + duracaoMinutos;
  }, 0);

  const disciplinasUnicas = new Set(estudos.map((e) => e.disciplina.id)).size;

  return {
    totalHoras: Math.floor(totalMinutos / 60),
    totalMinutos: totalMinutos % 60,
    totalSessoes: estudos.length,
    disciplinasUnicas,
    mediaDiaria: ((totalMinutos / 60) / 7).toFixed(1),
  };
};

/**
 * Obtém disciplinas únicas do cronograma
 */
export const getDisciplinasUnicas = (estudos: EstudoDiario[]): string[] => {
  const disciplinas = new Set(estudos.map((e) => e.disciplina.label));
  return Array.from(disciplinas);
};

/**
 * Constantes utilizadas nos cronogramas
 */
export const DIAS_SEMANA = [
  { key: EDiaDaSemana.DOMINGO, label: "DOM" },
  { key: EDiaDaSemana.SEGUNDA, label: "SEG" },
  { key: EDiaDaSemana.TERCA, label: "TER" },
  { key: EDiaDaSemana.QUARTA, label: "QUA" },
  { key: EDiaDaSemana.QUINTA, label: "QUI" },
  { key: EDiaDaSemana.SEXTA, label: "SEX" },
  { key: EDiaDaSemana.SABADO, label: "SÁB" },
];

export const HORARIOS = Array.from({ length: 24 }, (_, i) => {
  return `${i.toString().padStart(2, "0")}:00`;
});

/**
 * Gera próximo horário com base no horário atual (adiciona 1 hora)
 */
export const getNextHour = (hora: string): string => {
  if (!hora) return "";
  const [horaAtual, minutos] = hora.split(":");
  const proximaHora = (parseInt(horaAtual) + 1) % 24;
  return `${proximaHora.toString().padStart(2, "0")}:${minutos}`;
};

/**
 * Valida se um horário é válido (formato HH:MM)
 */
export const isValidTimeFormat = (time: string): boolean => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

/**
 * Verifica se há conflito de horário entre estudos
 */
export const hasTimeConflict = (
  estudos: EstudoDiario[], 
  novoEstudo: { dia_da_semana: EDiaDaSemana; hora_inicio: string; hora_fim: string },
  excludeIndex?: number
): boolean => {
  const estudosNoDia = estudos
    .filter((estudo, index) => 
      estudo.dia_da_semana === novoEstudo.dia_da_semana && 
      (excludeIndex === undefined || index !== excludeIndex)
    );

  const [novoInicio] = novoEstudo.hora_inicio.split(":").map(Number);
  const [novoFim] = novoEstudo.hora_fim.split(":").map(Number);

  return estudosNoDia.some(estudo => {
    const [estudoInicio] = estudo.hora_inicio.split(":").map(Number);
    const [estudoFim] = estudo.hora_fim.split(":").map(Number);

    return (
      (novoInicio >= estudoInicio && novoInicio < estudoFim) ||
      (novoFim > estudoInicio && novoFim <= estudoFim) ||
      (novoInicio <= estudoInicio && novoFim >= estudoFim)
    );
  });
};