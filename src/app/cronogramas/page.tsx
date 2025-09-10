"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, Clock, BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/project/AppHeader";
import { Cronograma } from "@/types/cronograma/Cronograma";
import { CronogramaService } from "@/lib/services/cronograma/CronogramaService";

export default function CronogramasPage() {
  const [cronogramas, setCronogramas] = useState<Cronograma[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadCronogramas = async () => {
      try {
        const cronogramasDoBackend = await CronogramaService.buscarCronogramas();
        setCronogramas(cronogramasDoBackend.data || []);
      } catch (error) {
        console.error("Erro ao carregar cronogramas:", error);
      }
    };

    loadCronogramas();
  }, []);

  const getTotalHorasSemanais = (cronograma: Cronograma) => {
    // Verifica se estudosDiarios existe e é um array
    if (!cronograma.estudos_diarios || !Array.isArray(cronograma.estudos_diarios)) {
      return 0;
    }

    return cronograma.estudos_diarios.reduce((total, estudo) => {
      const [inicioHora, inicioMin] = estudo.hora_inicio.split(":").map(Number);
      const [fimHora, fimMin] = estudo.hora_fim.split(":").map(Number);
      const duracaoMinutos = fimHora * 60 + fimMin - (inicioHora * 60 + inicioMin);
      return total + duracaoMinutos / 60;
    }, 0);
  };

  const getDisciplinasUnicas = (cronograma: Cronograma) => {
    // Mesma verificação aqui
    if (!cronograma.estudos_diarios || !Array.isArray(cronograma.estudos_diarios)) {
      return [];
    }

    const disciplinas = new Set(cronograma.estudos_diarios.map((e) => e.disciplina.label));
    return Array.from(disciplinas);
  };

  const handleCronogramaClick = (cronogramaId: number) => {
    router.push(`/cronogramas/${cronogramaId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <AppHeader />
      <div className="px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <main className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <header className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/50 shadow-2xl shadow-blue-500/10 p-8 lg:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
            <div className="relative flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
                  Cronogramas
                </h1>
                <p className="mt-2 text-slate-600 text-lg font-medium">
                  Gerencie os seus estudos de forma inteligente.
                </p>
              </div>
              <Button
                onClick={() => router.push("/cronogramas/novo")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-2xl font-medium shadow-lg shadow-blue-500/25 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
              >
                <Plus className="h-5 w-5 mr-2" />
                Criar novo cronograma
              </Button>
            </div>
          </header>

          {/* Lista de Cronogramas */}
          <section className="space-y-6">
            {cronogramas.length === 0 ? (
              <Card className="p-12 text-center bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-3xl shadow-xl">
                <div className="flex flex-col items-center gap-4">
                  <Calendar className="h-16 w-16 text-slate-400" />
                  <div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Nenhum cronograma encontrado</h3>
                    <p className="text-slate-500 mb-6">
                      Crie seu primeiro cronograma de estudos para começar a organizar sua rotina.
                    </p>
                    <Button
                      onClick={() => router.push("/cronogramas/novo")}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Criar cronograma
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cronogramas.map((cronograma) => (
                  <Card
                    key={cronograma.id}
                    className="cursor-pointer transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-2xl overflow-hidden"
                    onClick={() => handleCronogramaClick(cronograma.id)}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">
                            {cronograma.nome}
                          </CardTitle>
                          <CardDescription className="text-slate-600 line-clamp-2">
                            {cronograma.descricao}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Estatísticas */}
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{getTotalHorasSemanais(cronograma).toFixed(1)}h/semana</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{cronograma.estudos_diarios?.length} sessões</span>
                        </div>
                      </div>

                      {/* Disciplinas */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-slate-700">Disciplinas:</p>
                        <div className="flex flex-wrap gap-2">
                          {getDisciplinasUnicas(cronograma)
                            .slice(0, 3)
                            .map((disciplina, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                              >
                                {disciplina}
                              </Badge>
                            ))}
                          {getDisciplinasUnicas(cronograma).length > 3 && (
                            <Badge variant="outline" className="text-slate-600">
                              +{getDisciplinasUnicas(cronograma).length - 3} mais
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Data de criação */}
                      <div className="pt-2 border-t border-slate-200/50">
                        <p className="text-xs text-slate-500">
                          Criado em {new Date(cronograma.data_criacao).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}