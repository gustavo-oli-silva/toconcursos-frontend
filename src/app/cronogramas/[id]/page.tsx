"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { CronogramaService } from "@/lib/services/cronograma/CronogramaService";
import { CalendarioSemanal } from "@/components/project/cronograma/CalendarioSemanal";
import { Cronograma } from "@/types/cronograma/Cronograma";
import {
  calculateCronogramaStatistics,
  getDisciplinasUnicas,
  DIAS_SEMANA,
  HORARIOS
} from "@/components/project/cronograma/utils";

interface CronogramaPageProps {
  params: Promise<{ id: string }>;
}

export default function CronogramaDetailPage({ params }: CronogramaPageProps) {
  const [cronograma, setCronograma] = useState<Cronograma | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadCronograma = async () => {
      try {
        setLoading(true);
        const { id } = await params;
        const res = await CronogramaService.buscarCronogramaPorID(id);

        if (!res) {
          setError("Cronograma não encontrado");
          return;
        }

        setCronograma(res);
      } catch (error) {
        console.error("Erro ao carregar cronograma:", error);
        setError("Erro ao carregar cronograma");
      } finally {
        setLoading(false);
      }
    };

    loadCronograma();
  }, [params]);

  // Estados de loading e erro
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Carregando cronograma...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !cronograma) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="flex items-center justify-center min-h-[50vh]">
          <Card className="p-8 text-center max-w-md mx-auto">
            <div className="text-red-500 mb-4">
              <Calendar className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Cronograma não encontrado</h3>
            <p className="text-slate-500 mb-4">{error || "O cronograma que você está procurando não existe."}</p>
            <Button onClick={() => router.push("/cronogramas")} className="bg-blue-600 hover:bg-blue-700">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar aos cronogramas
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Usar utilitários para calcular estatísticas
  const stats = calculateCronogramaStatistics(cronograma.estudos_diarios || []);
  const disciplinas = getDisciplinasUnicas(cronograma.estudos_diarios || []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <main className="max-w-7xl mx-auto space-y-6">
          {/* Header Simples */}
          <header className="flex items-center justify-between bg-white/90 backdrop-blur-md border border-slate-200/50 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/cronogramas")}
                className="text-slate-600 hover:text-slate-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div className="border-l border-slate-300 h-6"></div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">{cronograma.nome}</h1>
                <p className="text-sm text-slate-600">{cronograma.descricao}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-600">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">
                  {stats.totalHoras}h {stats.totalMinutos}m
                </div>
                <div>Total Semanal</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-indigo-600">{stats.totalSessoes}</div>
                <div>Sessões</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">{stats.disciplinasUnicas}</div>
                <div>Disciplinas</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-600">{stats.mediaDiaria}h</div>
                <div>Média Diária</div>
              </div>
            </div>
          </header>

          {/* Calendário Semanal */}
          <CalendarioSemanal
            estudosDiarios={cronograma.estudos_diarios || []}
            DIAS_SEMANA={DIAS_SEMANA}
            HORARIOS={HORARIOS}
            modo="detalhes"
          />
        </main>
      </div>
    </div>
  );
}