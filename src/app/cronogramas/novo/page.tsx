"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X, Calendar, Clock, BookOpen, Save, AlertCircle } from "lucide-react"
import React from "react"
import { AppHeader } from "@/components/project/AppHeader"
import { CronogramaService } from "@/lib/services/cronograma/CronogramaService"
import { DisciplinaService } from "@/lib/services/disciplina/DisciplinaService"
import type { EstudoDiario } from "@/types/cronograma/EstudoDiario"
import { NovoEstudoDialog } from "@/components/project/dialogs/NovoEstudoDiarioDialog"
import { Alert, AlertDescription } from "@/components/ui/alert"

enum EDiaDaSemana {
  DOMINGO = "domingo",
  SEGUNDA = "segunda",
  TERCA = "terca",
  QUARTA = "quarta",
  QUINTA = "quinta",
  SEXTA = "sexta",
  SABADO = "sabado",
}

const DIAS_SEMANA = [
  { key: EDiaDaSemana.DOMINGO, label: "DOM" },
  { key: EDiaDaSemana.SEGUNDA, label: "SEG" },
  { key: EDiaDaSemana.TERCA, label: "TER" },
  { key: EDiaDaSemana.QUARTA, label: "QUA" },
  { key: EDiaDaSemana.QUINTA, label: "QUI" },
  { key: EDiaDaSemana.SEXTA, label: "SEX" },
  { key: EDiaDaSemana.SABADO, label: "SÁB" },
]

// Horários de 1 em 1 hora para melhor granularidade
const HORARIOS = Array.from({ length: 24 }, (_, i) => {
  return `${i.toString().padStart(2, "0")}:00`
})

interface Option {
  id: number
  label: string
}

export default function NewCronogramaScreen() {
  const [estudosDiarios, setEstudosDiarios] = useState<EstudoDiario[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<EDiaDaSemana | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [novoEstudo, setNovoEstudo] = useState<Partial<EstudoDiario>>({})
  const [cronogramaNome, setCronogramaNome] = useState<string>("")
  const [cronogramaDescricao, setCronogramaDescricao] = useState<string>("")
  const [disciplinas, setDisciplinas] = useState<Option[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    const loadDisciplinas = async () => {
      try {
        const disciplinasDoBackend = await DisciplinaService.buscarDisciplinas()
        setDisciplinas(disciplinasDoBackend.data)
      } catch (error) {
        console.error("Erro ao carregar disciplinas:", error)
        setErrors((prev) => [...prev, "Erro ao carregar disciplinas"])
      }
    }
    loadDisciplinas()
  }, [])

  const validateForm = () => {
    const newErrors: string[] = []

    if (!cronogramaNome.trim()) {
      newErrors.push("Nome do cronograma é obrigatório")
    }

    if (!cronogramaDescricao.trim()) {
      newErrors.push("Descrição do cronograma é obrigatória")
    }

    if (estudosDiarios.length === 0) {
      newErrors.push("Adicione pelo menos um estudo diário")
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const getStatistics = () => {
    const totalHoras = estudosDiarios.reduce((acc, estudo) => {
      const [inicioHora, inicioMin] = estudo.hora_inicio.split(":").map(Number)
      const [fimHora, fimMin] = estudo.hora_fim.split(":").map(Number)
      const inicioMinutos = inicioHora * 60 + inicioMin
      const fimMinutos = fimHora * 60 + fimMin
      const duracaoMinutos = fimMinutos - inicioMinutos
      return acc + duracaoMinutos
    }, 0)

    const disciplinasUnicas = new Set(estudosDiarios.map((e) => e.disciplina.id)).size

    return {
      totalHoras: Math.floor(totalHoras / 60),
      totalMinutos: totalHoras % 60,
      totalSessoes: estudosDiarios.length,
      disciplinasUnicas,
    }
  }

  const calculateBlockHeight = (horaInicio: string, horaFim: string) => {
    const [inicioHora, inicioMin] = horaInicio.split(":").map(Number)
    const [fimHora, fimMin] = horaFim.split(":").map(Number)
    const inicioMinutos = inicioHora * 60 + inicioMin
    const fimMinutos = fimHora * 60 + fimMin
    const duracaoMinutos = fimMinutos - inicioMinutos
    return Math.max(duracaoMinutos, 30)
  }

  const calculateBlockPosition = (horaInicio: string) => {
    const [hora, min] = horaInicio.split(":").map(Number)
    const minutosDoDia = hora * 60 + min
    return minutosDoDia
  }

  const getEstudosForDay = (dia: EDiaDaSemana) => {
    return estudosDiarios.filter((estudo) => estudo.dia_da_semana === dia)
  }

  const handleAddEstudo = () => {
    if (novoEstudo.hora_inicio && novoEstudo.hora_fim && novoEstudo.dia_da_semana && novoEstudo.disciplina) {
      setEstudosDiarios((prev) => {
        const newList = [...prev, novoEstudo as EstudoDiario]
        console.log("Estudo adicionado. Total:", newList.length, "estudos:", newList)
        return newList
      })
      setNovoEstudo({})
      setIsDialogOpen(false)
      setErrors([])
    }
  }

  const handleRemoveEstudo = (index: number) => {
    setEstudosDiarios((prev) => prev.filter((_, i) => i !== index))
  }

  const openDialog = (dia?: EDiaDaSemana, hora?: string) => {
    setSelectedDay(dia || null)
    setSelectedTime(hora || "")
    setNovoEstudo({
      dia_da_semana: dia,
      hora_inicio: hora,
      hora_fim: hora ? `${String(Number.parseInt(hora.split(":")[0]) + 1).padStart(2, "0")}:${hora.split(":")[1]}` : "",
    })
    setIsDialogOpen(true)
  }

  const handleSalvarCronograma = async () => {
    if (!validateForm()) return

    setIsLoading(true)

    const estudosFormatados = estudosDiarios.map((estudo) => ({
      hora_inicio: estudo.hora_inicio,
      hora_fim: estudo.hora_fim,
      dia_da_semana: estudo.dia_da_semana,
      id_disciplina: estudo.disciplina.id,
    }))

    const cronograma = {
      nome: cronogramaNome,
      descricao: cronogramaDescricao,
      estudos_diarios: estudosFormatados,
    }

    try {
      const data = await CronogramaService.salvarCronograma(cronograma)
      console.log("Cronograma salvo:", data)
      setCronogramaNome("")
      setCronogramaDescricao("")
      setEstudosDiarios([])
      setErrors([])
    } catch (error) {
      console.error("Erro ao salvar o cronograma:", error)
      setErrors(["Erro ao salvar cronograma. Tente novamente."])
    } finally {
      setIsLoading(false)
    }
  }

  const stats = getStatistics()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <AppHeader />
      <div className="px-4 py-8 md:px-6 md:py-12 lg:px-8">
        <main className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <header className="relative overflow-hidden rounded-3xl bg-white/90 backdrop-blur-md border border-slate-200/50 shadow-2xl shadow-blue-500/10 p-8 lg:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
            <div className="relative flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight">
                  Novo Cronograma
                </h1>
                <p className="mt-2 text-slate-600 text-lg font-medium">Crie um cronograma semanal personalizado</p>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="h-12 w-12 text-blue-500" />
              </div>
            </div>
          </header>

          <section className="grid gap-6 lg:grid-cols-3">
            {/* Cronograma Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 bg-white/70 backdrop-blur-md border border-slate-200/50 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-slate-800">Informações do Cronograma</h2>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nome" className="text-sm font-medium text-slate-700">
                        Nome do Cronograma *
                      </Label>
                      <Input
                        id="nome"
                        placeholder="Ex: Cronograma de Estudos - Semestre 2024"
                        value={cronogramaNome}
                        onChange={(e) => setCronogramaNome(e.target.value)}
                        className="bg-white/80 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="descricao" className="text-sm font-medium text-slate-700">
                        Descrição *
                      </Label>
                      <Textarea
                        id="descricao"
                        placeholder="Descreva o objetivo deste cronograma..."
                        value={cronogramaDescricao}
                        onChange={(e) => setCronogramaDescricao(e.target.value)}
                        className="bg-white/80 border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 min-h-[80px]"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {errors.length > 0 && (
                <Alert className="border-red-200 bg-red-50/80 backdrop-blur-sm">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    <ul className="list-disc list-inside space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/50 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold text-slate-800">Estatísticas</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/60 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {stats.totalHoras}h {stats.totalMinutos}m
                      </div>
                      <div className="text-xs text-slate-600">Total Semanal</div>
                    </div>
                    <div className="text-center p-3 bg-white/60 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600">{stats.totalSessoes}</div>
                      <div className="text-xs text-slate-600">Sessões</div>
                    </div>
                    <div className="text-center p-3 bg-white/60 rounded-lg col-span-2">
                      <div className="text-2xl font-bold text-purple-600">{stats.disciplinasUnicas}</div>
                      <div className="text-xs text-slate-600">Disciplinas Diferentes</div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="space-y-3">
                <Button
                  onClick={() => openDialog()}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Estudo
                </Button>

                <Button
                  onClick={handleSalvarCronograma}
                  disabled={isLoading || estudosDiarios.length === 0}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Cronograma
                    </>
                  )}
                </Button>
              </div>
            </div>
          </section>

          {/* Calendário semanal */}
          <section className="relative overflow-hidden bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-3xl shadow-xl shadow-slate-500/10 p-8 md:p-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-slate-50/30"></div>
            <div className="relative">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">Calendário Semanal</h2>
                <p className="text-slate-600">Clique em qualquer horário para adicionar um estudo</p>
              </div>

              <div className="grid grid-cols-8 gap-1 bg-white/50 border border-slate-200/40 rounded-2xl overflow-hidden">
                {/* Header com dias da semana */}
                <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-3 text-center font-medium text-slate-600">
                  Horário
                </div>
                {DIAS_SEMANA.map((dia) => (
                  <div
                    key={dia.key}
                    className="bg-gradient-to-br from-slate-100 to-slate-200 p-3 text-center font-medium text-slate-600"
                  >
                    {dia.label}
                  </div>
                ))}

                {/* Grid de horários */}
                {HORARIOS.map((horario) => {
                  return (
                    <React.Fragment key={`horario-${horario}`}>
                      {/* Coluna de horários */}
                      <div
                        key={`time-${horario}`}
                        className="bg-slate-50 p-2 text-sm text-slate-600 text-center border-r border-slate-200/60 font-medium"
                      >
                        {horario}
                      </div>
                      {/* Colunas dos dias */}
                      {DIAS_SEMANA.map((dia) => {
                        const estudosNoDia = getEstudosForDay(dia.key)
                        return (
                          <div
                            key={`${dia.key}-${horario}`}
                            className="relative bg-white/80 border-r border-b border-slate-200/40 min-h-[60px] cursor-pointer hover:bg-blue-50/60 transition-all duration-200 group"
                            onClick={() => openDialog(dia.key, horario)}
                          >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-blue-100/30 rounded-sm flex items-center justify-center">
                              <Plus className="h-4 w-4 text-blue-600" />
                            </div>

                            {/* Renderizar blocos de estudo */}
                            {estudosNoDia.map((estudo, index) => {
                              const blockHeight = calculateBlockHeight(estudo.hora_inicio, estudo.hora_fim)
                              const blockPosition = calculateBlockPosition(estudo.hora_inicio)
                              const currentTimePosition = calculateBlockPosition(horario)
                              if (Math.abs(blockPosition - currentTimePosition) < 30) {
                                return (
                                  <Card
                                    key={index}
                                    className="absolute inset-x-1 bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-2 rounded-xl shadow-lg z-10 group/card border-0 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
                                    style={{
                                      height: `${blockHeight}px`,
                                      top: `${blockPosition - currentTimePosition}px`,
                                    }}
                                  >
                                    <div className="flex justify-between items-start">
                                      <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium truncate">{estudo.disciplina.label}</p>
                                        <p className="text-xs opacity-90">
                                          {estudo.hora_inicio} - {estudo.hora_fim}
                                        </p>
                                      </div>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-4 w-4 p-0 opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-white/20 text-white"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleRemoveEstudo(estudosDiarios.indexOf(estudo))
                                        }}
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </Card>
                                )
                              }
                              return null
                            })}
                          </div>
                        )
                      })}
                    </React.Fragment>
                  )
                })}
              </div>
            </div>
          </section>
        </main>
      </div>

      <NovoEstudoDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        novoEstudo={novoEstudo}
        setNovoEstudo={setNovoEstudo}
        disciplinas={disciplinas}
        handleAddEstudo={handleAddEstudo}
        diasSemana={DIAS_SEMANA}
      />
    </div>
  )
}
