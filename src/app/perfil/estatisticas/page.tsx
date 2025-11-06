'use client';

import { PerfilService } from "@/lib/services/perfil/PerfilService";
import { Graficos } from "@/types/graficos/Graficos";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Calendar, TrendingUp, Activity, Target } from "lucide-react";

export default function EstatisticasPage() {
    const [estatisticas, setEstatisticas] = useState<Graficos | null>(null);
    const [loading, setLoading] = useState(true);

    const loadEstatisticas = async () => {
        try {
          setLoading(true);
          const data = await PerfilService.getEstatisticas();
          setEstatisticas(data || null);
          console.log("Estatisticas carregadas:", data);
        } catch (error) {
          console.error("Erro ao carregar estatisticas:", error);
        } finally {
          setLoading(false);
        }
      };
      
      useEffect(() => {
        loadEstatisticas();
      }, []);

    const questoesPorDiaConfig: ChartConfig = {
      quantidade_questoes: {
        label: "Questões Resolvidas",
        color: "hsl(var(--chart-1))",
      },
    };

    // Configuração do gráfico de acertos e erros
    const certoErradoConfig: ChartConfig = {
      quantidade_questoes_certas: {
        label: "Acertos",
        color: "hsl(142, 76%, 36%)", // Verde
      },
      quantidade_questoes_erradas: {
        label: "Erros", 
        color: "hsl(0, 84%, 60%)", // Vermelho
      },
    };

    // Transformar dados para o formato do gráfico
    const questoesPorDiaData = estatisticas?.quantidade_questoes_por_dia?.map(item => ({
      data: new Date(item.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      quantidade_questoes: item.quantidade_questoes,
    })) || [];

    const certoErradoData = estatisticas?.quantidade_certo_errado_por_dia?.map(item => ({
      data: new Date(item.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      quantidade_questoes_certas: item.quantidade_questoes_certas,
      quantidade_questoes_erradas: item.quantidade_questoes_erradas,
    })) || [];


    if (loading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-600">Carregando estatísticas...</p>
            </div>
          </div>
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <main className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <header className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/50 shadow-2xl shadow-blue-500/10 p-8 lg:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
            <div className="relative flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
                  Estatísticas de Estudo
                </h1>
                <p className="mt-2 text-slate-600 text-lg font-medium">
                  Acompanhe seu progresso e desempenho
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Activity className="h-12 w-12 text-blue-500" />
              </div>
            </div>
          </header>

          {/* Cards de resumo vão vir do endpoint basico*/}

          {/* Gráficos */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gráfico de Questões por Dia */}
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Questões Resolvidas por Dia
                </CardTitle>
                <CardDescription>
                  Quantidade de questões que você resolveu por dia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={questoesPorDiaConfig}>
                  <BarChart
                    accessibilityLayer
                    data={questoesPorDiaData}
                    margin={{
                      top: 20,
                      left: 12,
                      right: 12,
                    }}
                  >
                    <XAxis
                      dataKey="data"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      allowDecimals={false}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar
                      dataKey="quantidade_questoes"
                      fill="var(--color-quantidade_questoes)"
                      radius={8}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Gráfico de Acertos vs Erros */}
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  Acertos vs Erros por Dia
                </CardTitle>
                <CardDescription>
                  Distribuição de questões certas e erradas por dia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={certoErradoConfig}>
                  <BarChart
                    accessibilityLayer
                    data={certoErradoData}
                    stackOffset="none"
                    margin={{
                      top: 20,
                      left: 12,
                      right: 12,
                    }}
                  >
                    <XAxis
                      dataKey="data"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      allowDecimals={false}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                    />
                    <Bar
                      dataKey="quantidade_questoes_certas"
                      stackId="questoes"
                      fill="var(--color-quantidade_questoes_certas)"
                      radius={[0, 0, 0, 0]}
                    />
                    <Bar
                      dataKey="quantidade_questoes_erradas"
                      stackId="questoes"
                      fill="var(--color-quantidade_questoes_erradas)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </section>

          {/* Mensagem se não houver dados */}
          {!estatisticas || (questoesPorDiaData.length === 0 && certoErradoData.length === 0) && (
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Activity className="h-16 w-16 text-slate-400 mb-4" />
                <h3 className="text-xl font-semibold text-slate-600 mb-2">
                  Nenhuma estatística encontrada
                </h3>
                <p className="text-slate-500 text-center max-w-md">
                  Comece a resolver questões para ver suas estatísticas e acompanhar seu progresso de estudos.
                </p>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}