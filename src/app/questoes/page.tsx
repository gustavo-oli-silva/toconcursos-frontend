"use client"  
import { Questao } from "@/components/project/Questao"
import { IQuestao } from "@/types/questao/IQuestao"
import { Button } from "@/components/ui/button"
import { QuestaoService } from "@/lib/services/questao/QuestaoService"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import React from "react"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <main className="max-w-7xl mx-auto space-y-10">
          <header className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/50 shadow-2xl shadow-blue-500/10 p-8 lg:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
            <div className="relative flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
                  Minhas Questões
                </h1>
                <p className="mt-2 text-slate-600 text-lg font-medium">Organize e pratique suas questões favoritas</p>
              </div>
              <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                <span className="relative z-10">Fechar Filtros</span>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>
          </header>

          <section>
            <FilterForm onFilter={handleFilter} onClear={handleClearFilter} />
          </section>

          

          <section className="relative overflow-hidden bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-3xl shadow-xl shadow-slate-500/10 p-8 md:p-10 min-h-96">
            {/* <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-slate-50/30"></div>
            <div className="relative flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg"></div>
                </div>
              </div>
            </div> */}
            {questoes.map((questao) => (
              <React.Fragment key={questao.id}>
                <Questao questao={questao}  />
                <Separator className="my-10" />
              </React.Fragment>
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}
