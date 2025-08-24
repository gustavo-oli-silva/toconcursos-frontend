"use client"

import { AppHeader } from "@/components/project/AppHeader";
import { Dropdown } from "@/components/project/Dropdown";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const opcoesDisciplina: Option[] = [
    { value: 1, label: 'Disciplina' },
    { value: 2, label: 'Matemática' },
    { value: 3, label: 'Português' },
    { value: 4, label: 'História' }
];

const opcoesBanca: Option[] = [
    { value: 0, label: 'Banca' },
    { value: 1, label: 'FGV (Fundação Getulio Vargas)' },
    { value: 2, label: 'Cebraspe (Cespe)' },
    { value: 3, label: 'FCC (Fundação Carlos Chagas)' },
    { value: 4, label: 'Cesgranrio' },
    { value: 5, label: 'Vunesp' }
];

const opcoesOrgaos: Option[] = [
    { value: 0, label: 'Órgão' },
    { value: 1, label: 'Receita Federal' },
    { value: 2, label: 'Polícia Federal (PF)' },
    { value: 3, label: 'Polícia Rodoviária Federal (PRF)' },
    { value: 4, label: 'INSS' },
    { value: 5, label: 'Tribunais Regionais Federais (TRFs)' },
    { value: 6, label: 'Tribunais Regionais do Trabalho (TRTs)' },
    { value: 7, label: 'Banco Central (BACEN)' }
];

const opcoesInstituicao: Option[] = [
    { value: 0, label: 'Instituição' },
    { value: 1, label: 'ENEM (Exame Nacional do Ensino Médio)' },
    { value: 2, label: 'FUVEST (USP)' },
    { value: 3, label: 'UNICAMP' },
    { value: 4, label: 'VUNESP (UNESP)' },
    { value: 5, label: 'UERJ' },
    { value: 6, label: 'ITA (Instituto Tecnológico de Aeronáutica)' },
    { value: 7, label: 'IME (Instituto Militar de Engenharia)' }
];

const opcoesDificuldade: Option[] = [
    { value: 0, label: 'Dificuldade' },
    { value: 1, label: 'Fácil' },
    { value: 2, label: 'Médio' },
    { value: 3, label: 'Dificil' }
]

export default function QuestoesScreen() {
    const [disciplina, setDisciplina] = useState(opcoesDisciplina[0])
    const [banca, setBanca] = useState(opcoesBanca[0])
    const [orgao, setOrgao] = useState(opcoesOrgaos[0])
    const [instituicao, setInstituicao] = useState(opcoesInstituicao[0])
    const [dificuldade, setDificuldade] = useState(opcoesDificuldade[0])

    return (
        <div>
            <AppHeader/>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6 lg:p-8">
                <main className="max-w-7xl mx-auto space-y-8">
                    <header className="flex flex-col items-center gap-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl p-6 lg:flex-row lg:justify-between lg:px-12">
                        <h1 className="scroll-m-20 text-4xl lg:text-5xl font-bold text-black">
                            Minhas Questões
                        </h1>
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            Fechar Filtros
                        </Button>
                    </header>

                    <section className="bg-white/70 backdrop-blur-sm border-2 border-white/40 rounded-3xl shadow-2xl p-6 md:p-8 space-y-6">
                        <div className="flex flex-row flex-wrap justify-center items-center gap-3 md:gap-4">
                            <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                Todas
                            </Button>
                            <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                Resolvidas
                            </Button>
                            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                Não Resolvidas
                            </Button>
                            <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                Acertei
                            </Button>
                            <Button className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-medium px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                Errei
                            </Button>
                        </div>

                        <div className="container mx-auto px-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
                                <Dropdown
                                    label="Selecione a Disciplina"
                                    options={opcoesDisciplina}
                                    selectedOption={disciplina}
                                    onOptionSelect={setDisciplina}
                                />

                                <Dropdown
                                    label="Selecione a Banca"
                                    options={opcoesBanca}
                                    selectedOption={banca}
                                    onOptionSelect={setBanca}
                                />

                                <Dropdown
                                    label="Selecione o Orgão"
                                    options={opcoesOrgaos}
                                    selectedOption={orgao}
                                    onOptionSelect={setOrgao}
                                />

                                <Dropdown
                                    label="Selecione a Instituição"
                                    options={opcoesInstituicao}
                                    selectedOption={instituicao}
                                    onOptionSelect={setInstituicao}
                                />

                                <Dropdown
                                    label="Selecione a Dificuldade"
                                    options={opcoesDificuldade}
                                    selectedOption={dificuldade}
                                    onOptionSelect={setDificuldade}
                                />
                            </div>
                        </div>

                        <div className="container mx-auto px-4 flex justify-end">
                            <Button className="bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                Limpar
                            </Button>
                        </div>
                    </section>

                    <section className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-3xl shadow-xl p-6 md:p-8 min-h-96">
                        <div className="flex items-center justify-center h-full text-gray-500 text-lg font-medium">
                            Questões aparecerão aqui
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}