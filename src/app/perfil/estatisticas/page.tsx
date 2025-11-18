'use client';

import { PerfilService } from "@/lib/services/perfil/PerfilService";
import { Graficos } from "@/types/graficos/Graficos";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Activity, Target, BookOpen, Building2, FileText } from "lucide-react";

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
        color: "hsl(217, 91%, 60%)", // Azul vibrante
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

    // Dados para evolução do percentual de acerto
    const evolucaoAcertoData = estatisticas?.evolucao_percentual_acerto?.map(item => ({
      data: new Date(item.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      percentual_acerto: Number(item.percentual_acerto.toFixed(2)),
    })) || [];

    // Dados para percentual de acerto por disciplina
    const acertoPorDisciplinaData = estatisticas?.percentual_acerto_por_disciplina?.map(item => ({
      nome: item.disciplina_nome,
      percentual: Number(item.percentual_acerto.toFixed(2)),
      total_questoes: item.total_questoes,
      acertos: item.total_acertos,
      erros: item.total_erros,
    })) || [];

    // Dados para distribuição de questões por disciplina
    const distribuicaoDisciplinaData = estatisticas?.distribuicao_questoes_por_disciplina?.map(item => ({
      nome: item.disciplina_nome,
      quantidade: item.quantidade_questoes,
      percentual: Number(item.percentual_total.toFixed(2)),
    })) || [];

    // Dados para percentual de acerto por órgão
    const acertoPorOrgaoData = estatisticas?.percentual_acerto_por_orgao?.map(item => ({
      nome: item.orgao_nome,
      percentual: Number(item.percentual_acerto.toFixed(2)),
      total_questoes: item.total_questoes,
      acertos: item.total_acertos,
      erros: item.total_erros,
    })) || [];

    // Dados para percentual de acerto por banca
    const acertoPorBancaData = estatisticas?.percentual_acerto_por_banca?.map(item => ({
      nome: item.banca_nome,
      percentual: Number(item.percentual_acerto.toFixed(2)),
      total_questoes: item.total_questoes,
      acertos: item.total_acertos,
      erros: item.total_erros,
    })) || [];

    // Configurações dos gráficos
    const evolucaoAcertoConfig: ChartConfig = {
      percentual_acerto: {
        label: "Percentual de Acerto (%)",
        color: "hsl(262, 83%, 58%)", // Roxo vibrante
      },
    };

    const acertoPorDisciplinaConfig: ChartConfig = {
      percentual: {
        label: "Percentual de Acerto (%)",
        color: "hsl(280, 70%, 50%)", // Roxo/indigo
      },
    };

    const distribuicaoDisciplinaConfig: ChartConfig = {
      quantidade: {
        label: "Questões",
        color: "hsl(300, 60%, 50%)", // Magenta
      },
    };

    const acertoPorOrgaoConfig: ChartConfig = {
      percentual: {
        label: "Percentual de Acerto (%)",
        color: "hsl(25, 95%, 53%)", // Laranja vibrante
      },
    };

    const acertoPorBancaConfig: ChartConfig = {
      percentual: {
        label: "Percentual de Acerto (%)",
        color: "hsl(180, 70%, 45%)", // Ciano/teal
      },
    };

    // Cores vibrantes para o gráfico de pizza
    const COLORS = [
      "hsl(217, 91%, 60%)",  // Azul vibrante
      "hsl(262, 83%, 58%)",  // Roxo vibrante
      "hsl(280, 70%, 50%)",  // Roxo/indigo
      "hsl(300, 60%, 50%)",  // Magenta
      "hsl(25, 95%, 53%)",   // Laranja vibrante
      "hsl(180, 70%, 45%)",  // Ciano/teal
      "hsl(142, 76%, 36%)",  // Verde
      "hsl(0, 84%, 60%)",    // Vermelho
      "hsl(200, 90%, 50%)",  // Azul claro
      "hsl(320, 75%, 55%)",  // Rosa vibrante
      "hsl(40, 100%, 50%)",  // Amarelo vibrante
      "hsl(160, 80%, 40%)",  // Verde água
    ];


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
                      tick={{ fill: "hsl(215, 16%, 47%)" }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      allowDecimals={false}
                      tick={{ fill: "hsl(215, 16%, 47%)" }}
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
                      tick={{ fill: "hsl(215, 16%, 47%)" }}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      allowDecimals={false}
                      tick={{ fill: "hsl(215, 16%, 47%)" }}
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

          {/* Seção de Evolução e Distribuição */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Gráfico de Evolução do Percentual de Acerto */}
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Evolução do Percentual de Acerto
              </CardTitle>
              <CardDescription>
                Acompanhe sua evolução no percentual de acertos ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={evolucaoAcertoConfig}>
                <LineChart
                  accessibilityLayer
                  data={evolucaoAcertoData}
                  margin={{
                    top: 20,
                    left: 12,
                    right: 12,
                    bottom: 12,
                  }}
                >
                  <XAxis
                    dataKey="data"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: "hsl(215, 16%, 47%)" }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fill: "hsl(215, 16%, 47%)" }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Line
                    type="monotone"
                    dataKey="percentual_acerto"
                    stroke="var(--color-percentual_acerto)"
                    strokeWidth={3}
                    dot={{ fill: "var(--color-percentual_acerto)", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
            </Card>

            {/* Gráfico de Distribuição de Questões por Disciplina */}
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-purple-600" />
                Distribuição de Questões por Disciplina
              </CardTitle>
              <CardDescription>
                Visualize a distribuição percentual de questões por disciplina
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={distribuicaoDisciplinaConfig}>
                <PieChart>
                  <Pie
                    data={distribuicaoDisciplinaData}
                    dataKey="quantidade"
                    nameKey="nome"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ nome }) => `${nome}`}
                    labelLine={false}
                  >
                    {distribuicaoDisciplinaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value: number, name: string, props: any) => [
                      `${value} questões (${props.payload.percentual}%)`,
                      props.payload.nome
                    ]}
                  />
                </PieChart>
              </ChartContainer>
            </CardContent>
            </Card>
          </section>

          {/* Seção de Percentuais de Acerto */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Gráfico de Percentual de Acerto por Disciplina */}
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-indigo-600" />
                Percentual de Acerto por Disciplina
              </CardTitle>
              <CardDescription>
                Compare seu desempenho em cada disciplina
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={acertoPorDisciplinaConfig}>
                <BarChart
                  accessibilityLayer
                  data={acertoPorDisciplinaData}
                  layout="vertical"
                  margin={{
                    top: 20,
                    left: 80,
                    right: 12,
                    bottom: 12,
                  }}
                >
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fill: "hsl(215, 16%, 47%)" }}
                  />
                  <YAxis
                    dataKey="nome"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={70}
                    tick={{ fill: "hsl(215, 16%, 47%)" }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                    formatter={(value: number, name: string, props: any) => [
                      `${value}%`,
                      `Total: ${props.payload.total_questoes} questões (${props.payload.acertos} acertos, ${props.payload.erros} erros)`
                    ]}
                  />
                  <Bar
                    dataKey="percentual"
                    fill="var(--color-percentual)"
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            </Card>

            {/* Gráfico de Percentual de Acerto por Órgão */}
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-orange-600" />
                Percentual de Acerto por Órgão
              </CardTitle>
              <CardDescription>
                Analise seu desempenho por órgão examinador
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={acertoPorOrgaoConfig}>
                <BarChart
                  accessibilityLayer
                  data={acertoPorOrgaoData}
                  layout="vertical"
                  margin={{
                    top: 20,
                    left: 100,
                    right: 12,
                    bottom: 12,
                  }}
                >
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fill: "hsl(215, 16%, 47%)" }}
                  />
                  <YAxis
                    dataKey="nome"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={90}
                    tick={{ fill: "hsl(215, 16%, 47%)" }}
                  />
                 <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent className="z-50" />
                  }
                  formatter={(value: number, name: string, props: any) => [
                    `${value}%`,
                    `Total: ${props.payload.total_questoes} questões (${props.payload.acertos} acertos, ${props.payload.erros} erros)`
                  ]}
                />
                  <Bar
                    dataKey="percentual"
                    fill="var(--color-percentual)"
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            </Card>

            {/* Gráfico de Percentual de Acerto por Banca */}
            <Card className="bg-white/80 backdrop-blur-md border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-teal-600" />
                Percentual de Acerto por Banca
              </CardTitle>
              <CardDescription>
                Veja seu desempenho por banca examinadora
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={acertoPorBancaConfig}>
                <BarChart
                  accessibilityLayer
                  data={acertoPorBancaData}
                  layout="vertical"
                  margin={{
                    top: 20,
                    left: 100,
                    right: 12,
                    bottom: 12,
                  }}
                >
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `${value}%`}
                    tick={{ fill: "hsl(215, 16%, 47%)" }}
                  />
                  <YAxis
                    dataKey="nome"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={90}
                    tick={{ fill: "hsl(215, 16%, 47%)" }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                    formatter={(value: number, name: string, props: any) => [
                      `${value}%`,
                      `Total: ${props.payload.total_questoes} questões (${props.payload.acertos} acertos, ${props.payload.erros} erros)`
                    ]}
                  />
                  <Bar
                    dataKey="percentual"
                    fill="var(--color-percentual)"
                    radius={[0, 8, 8, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
            </Card>
          </section>

          {/* Mensagem se não houver dados */}
          {!estatisticas || (questoesPorDiaData.length === 0 && certoErradoData.length === 0 && evolucaoAcertoData.length === 0 && acertoPorDisciplinaData.length === 0 && distribuicaoDisciplinaData.length === 0 && acertoPorOrgaoData.length === 0 && acertoPorBancaData.length === 0) && (
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