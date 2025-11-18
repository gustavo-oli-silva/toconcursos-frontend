"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Calendar, Clock, BookOpen, Save, AlertCircle } from "lucide-react"
import { CronogramaService } from "@/lib/services/cronograma/CronogramaService"
import { DisciplinaService } from "@/lib/services/disciplina/DisciplinaService"
import type { EstudoDiario } from "@/types/cronograma/EstudoDiario"
import { NovoEstudoDialog } from "@/components/project/dialogs/NovoEstudoDiarioDialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarioSemanal } from "@/components/project/cronograma/CalendarioSemanal"
import { EDiaDaSemana } from "@/types/cronograma/EDiaDaSemana"
import { 
  calculateCronogramaStatistics,
  DIAS_SEMANA,
  HORARIOS,
  getNextHour,
} from "@/components/project/cronograma/utils"
import { useRouter } from "next/dist/client/components/navigation"
import { ToastService } from "@/lib/services/toast/ToastService"


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

  const router = useRouter();
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
      hora_fim: hora ? getNextHour(hora) : "", 
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
      router.push("/cronogramas")
      ToastService.success("Cronograma salvo com sucesso!")
    } catch (error) {
      console.error("Erro ao salvar o cronograma:", error)
      setErrors(["Erro ao salvar cronograma. Tente novamente."])
      ToastService.error("Erro ao salvar cronograma. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // Usar utilitário para calcular estatísticas
  const stats = calculateCronogramaStatistics(estudosDiarios)

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
                  Novo Cronograma
                </h1>
                <p className="mt-2 text-slate-600 text-lg font-medium">Crie um cronograma semanal personalizado</p>
              </div>
              <div className="flex items-center gap-4">
                <Calendar className="h-12 w-12 text-blue-500" />
              </div>
            </div>
          </header>

          <section className="grid gap-8 lg:grid-cols-12">
            {/* Cronograma Info - Ocupa mais espaço */}
            <div className="lg:col-span-8 space-y-6">
              {/* Card Principal com Design Melhorado */}
              <Card className="relative overflow-hidden bg-white/80 backdrop-blur-xl border-0 shadow-2xl shadow-blue-500/10">
                {/* Gradiente de fundo sutil */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/80 to-indigo-50/50"></div>
                
                <div className="relative p-8">
                  {/* Header do Card */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-800">Informações do Cronograma</h2>
                        <p className="text-sm text-slate-600">Preencha os dados básicos do seu cronograma</p>
                      </div>
                    </div>
                    
                    {/* Badge de Status */}
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {estudosDiarios.length} {estudosDiarios.length === 1 ? 'estudo' : 'estudos'} adicionado{estudosDiarios.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Formulário */}
                  <div className="space-y-6">
                    {/* Nome do Cronograma - Layout melhorado */}
                    <div className="space-y-3">
                      <Label htmlFor="nome" className="text-base font-semibold text-slate-700 flex items-center gap-2">
                        Nome do Cronograma
                        <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="nome"
                        placeholder="Ex: Cronograma ENEM 2024 - Preparação Intensiva"
                        value={cronogramaNome}
                        onChange={(e) => setCronogramaNome(e.target.value)}
                        className="h-10 p-2 w-full bg-white/90 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-md text-base shadow-sm transition-all duration-200"
                      />
                    </div>

                    {/* Descrição - Layout melhorado */}
                    <div className="space-y-3">
                      <Label htmlFor="descricao" className="text-base font-semibold text-slate-700 flex items-center gap-2">
                        Descrição
                        <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="descricao"
                        placeholder="Descreva o objetivo deste cronograma, disciplinas principais e metas de estudo..."
                        value={cronogramaDescricao}
                        onChange={(e) => setCronogramaDescricao(e.target.value)}
                        className="min-h-[100px] bg-white/90 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl text-base shadow-sm transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Alertas de Erro com Design Melhorado */}
              {errors.length > 0 && (
                <Alert className="border-0 bg-red-50/80 backdrop-blur-sm rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-red-100 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-red-800 mb-2">Corrija os seguintes erros:</h4>
                      <AlertDescription className="text-red-700">
                        <ul className="space-y-1">
                          {errors.map((error, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span>{error}</span>
                            </li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              )}
            </div>

            {/* Painel Lateral - Design Completamente Reformulado */}
            <div className="lg:col-span-4 space-y-6">

              {/* Card de Ações */}
              <Card className="bg-white/90 backdrop-blur-sm border-0">
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Ações Rápidas</h3>
                  
                  {/* Botão Adicionar Estudo */}
                  <Button
                    onClick={() => openDialog()}
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Adicionar Estudo
                  </Button>

                  {/* Botão Salvar */}
                  <Button
                    onClick={handleSalvarCronograma}
                    disabled={isLoading || estudosDiarios.length === 0}
                    className="w-full h-12 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 disabled:from-slate-300 disabled:to-slate-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-sm"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Salvando Cronograma...
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5 mr-2" />
                        Salvar Cronograma
                      </>
                    )}
                  </Button>

                  {/* Dica */}
                  {estudosDiarios.length === 0 && (
                    <div className="p-4 text-sm text-slate-700 bg-yellow-50 rounded-xl border border-yellow-200">
                      <strong>Dica:</strong> Adicione estudos diários para visualizar seu cronograma semanal.
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </section>

      
          <CalendarioSemanal
            estudosDiarios={estudosDiarios}
            openDialog={openDialog}
            handleRemoveEstudo={handleRemoveEstudo}
            DIAS_SEMANA={DIAS_SEMANA}
            HORARIOS={HORARIOS}
            modo="criar"
          />
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
