"use client"

import { AppHeader } from "@/components/project/AppHeader"
import { Dropdown } from "@/components/project/Dropdown"
import { Questao } from "@/components/project/Questao"
import { IQuestao } from "@/types/questao/IQuestao"
import { Button } from "@/components/ui/button"
import { QuestaoService } from "@/lib/services/questao/QuestaoService"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"
import React from "react"
const opcoesDisciplina: Option[] = [
  { id: 2, label: "Matemática" },
  { id: 3, label: "Português" },
  { id: 4, label: "História" },
]

const opcoesBanca: Option[] = [
  { id: 1, label: "FGV (Fundação Getulio Vargas)" },
  { id: 2, label: "Cebraspe (Cespe)" },
  { id: 3, label: "FCC (Fundação Carlos Chagas)" },
  { id: 4, label: "Cesgranrio" },
  { id: 5, label: "Vunesp" },
]

const opcoesOrgaos: Option[] = [
  { id: 1, label: "Receita Federal" },
  { id: 2, label: "Polícia Federal (PF)" },
  { id: 3, label: "Polícia Rodoviária Federal (PRF)" },
  { id: 4, label: "INSS" },
  { id: 5, label: "Tribunais Regionais Federais (TRFs)" },
  { id: 6, label: "Tribunais Regionais do Trabalho (TRTs)" },
  { id: 7, label: "Banco Central (BACEN)" },
]

const opcoesInstituicao: Option[] = [
  { id: 1, label: "ENEM (Exame Nacional do Ensino Médio)" },
  { id: 2, label: "FUVEST (USP)" },
  { id: 3, label: "UNICAMP" },
  { id: 4, label: "VUNESP (UNESP)" },
  { id: 5, label: "UERJ" },
  { id: 6, label: "ITA (Instituto Tecnológico de Aeronáutica)" },
  { id: 7, label: "IME (Instituto Militar de Engenharia)" },
]

const opcoesDificuldade: Option[] = [
  { id: 1, label: "Fácil" },
  { id: 2, label: "Médio" },
  { id: 3, label: "Dificil" },
]

export default function QuestoesScreen() {
  const [disciplina, setDisciplina] = useState<Option | null>(opcoesDisciplina[0])
  const [banca, setBanca] = useState<Option | null>(opcoesBanca[0])
  const [orgao, setOrgao] = useState<Option | null>(opcoesOrgaos[0])
  const [instituicao, setInstituicao] = useState<Option | null>(opcoesInstituicao[0])
  const [dificuldade, setDificuldade] = useState<Option | null>(opcoesDificuldade[0])
  const [questoes, setQuestoes] = useState<IQuestao[]>([])

  const loadQuestoes = async () => {
    try {
      const questoesDoBackend = await QuestaoService.buscarQuestaos();
      setQuestoes(questoesDoBackend.data || []);
    } catch (error) {
      console.error("Erro ao carregar questoes:", error);
    }
  };
  useEffect(() => {
    loadQuestoes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <AppHeader />
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

          <section className="relative overflow-hidden bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-500/10 p-8 md:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-blue-50/30"></div>
            <div className="relative space-y-8">
              <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4">
                <Button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5">
                  <span className="relative z-10">Todas</span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
                <Button className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5">
                  <span className="relative z-10">Resolvidas</span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
                <Button className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5">
                  <span className="relative z-10">Não Resolvidas</span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
                <Button className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5">
                  <span className="relative z-10">Acertei</span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
                <Button className="group relative overflow-hidden bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5">
                  <span className="relative z-10">Errei</span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
                <Dropdown
                  label="Selecione a Disciplina"
                  options={opcoesDisciplina}
                  selectedOption={disciplina}
                  onOptionSelect={setDisciplina}
                  placeholder="Selecione a Disciplina"
                />

                <Dropdown
                  label="Selecione a Banca"
                  options={opcoesBanca}
                  selectedOption={banca}
                  onOptionSelect={setBanca}
                  placeholder="Selecione a Banca"
                />

                <Dropdown
                  label="Selecione o Orgão"
                  options={opcoesOrgaos}
                  selectedOption={orgao}
                  onOptionSelect={setOrgao}
                  placeholder="Selecione o Orgão"
                />

                <Dropdown
                  label="Selecione a Instituição"
                  options={opcoesInstituicao}
                  selectedOption={instituicao}
                  onOptionSelect={setInstituicao}
                  placeholder="Selecione a Instituição"
                />

                <Dropdown
                  label="Selecione a Dificuldade"
                  options={opcoesDificuldade}
                  selectedOption={dificuldade}
                  onOptionSelect={setDificuldade}
                  placeholder="Selecione a Dificuldade"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button className="group relative overflow-hidden bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
                  <span className="relative z-10">Limpar Filtros</span>
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>
            </div>
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
                <Questao questao={questao} />
                <Separator className="my-10" />
              </React.Fragment>
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}
