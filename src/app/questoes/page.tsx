"use client"  
import { Questao } from "@/components/project/Questao"
import { IQuestao } from "@/types/questao/IQuestao"
import { QuestaoService } from "@/lib/services/questao/QuestaoService"
import { useEffect, useState } from "react"
import FilterForm from "@/components/project/forms/FilterForm"

export default function QuestoesScreen() {
  const [questoes, setQuestoes] = useState<IQuestao[]>([])

  const loadQuestoes = async () => {
    try {
      const questoesDoBackend = await QuestaoService.buscarQuestaos();
      setQuestoes(questoesDoBackend.data || []);
    } catch (error) {
      console.error("Erro ao carregar questoes:", error);
    }
  };

  const handleFilter = (questoesFiltradas: IQuestao[]) => {
    setQuestoes(questoesFiltradas);
  };

  const handleClearFilter = async () => {
    await loadQuestoes();
  };

  useEffect(() => {
    loadQuestoes();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="px-4 py-6 md:px-6 md:py-8 lg:px-8">
        <main className="max-w-6xl mx-auto space-y-6">
          {/* Header simplificado */}
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
              Minhas Questões
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Organize e pratique suas questões favoritas
            </p>
          </header>

          {/* Filtros */}
          <section>
            <FilterForm onFilter={handleFilter} onClear={handleClearFilter} />
          </section>

          {/* Lista de Questões */}
          <section className="space-y-6">
            {questoes.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
                <p className="text-slate-500">Nenhuma questão encontrada.</p>
              </div>
            ) : (
              questoes.map((questao, index) => (
                <Questao 
                  key={questao.id} 
                  questao={questao}
                />
              ))
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
