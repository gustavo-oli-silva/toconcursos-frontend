"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, X } from "lucide-react"
// import { EDiaDaSemana } from "@/types/cronograma/DiaDaSemana"
import { EstudoDiario } from "@/types/cronograma/EstudoDiario"
enum EDiaDaSemana {
    DOMINGO = "domingo",
    SEGUNDA = "segunda",
    TERCA = "terca",
    QUARTA = "quarta",
    QUINTA = "quinta",
    SEXTA = "sexta",
    SABADO = "sabado"
}
interface WeeklyCalendarProps {
  estudosDiarios: EstudoDiario[]
  onAddEstudo: (estudo: EstudoDiario) => void
  onRemoveEstudo: (index: number) => void
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

const HORARIOS = Array.from({ length: 19 }, (_, i) => {
  const hora = i + 5 // Começa às 5:00
  return `${hora.toString().padStart(2, "0")}:00`
})

const DISCIPLINAS: Option[] = [
  { value: 1, label: "Matemática" },
  { value: 2, label: "Português" },
  { value: 3, label: "História" },
  { value: 4, label: "Geografia" },
  { value: 5, label: "Ciências" },
  { value: 6, label: "Física" },
  { value: 7, label: "Química" },
  { value: 8, label: "Biologia" },
  { value: 9, label: "Inglês" },
  { value: 10, label: "Filosofia" },
]

export function NewCronogramaScreen({ estudosDiarios, onAddEstudo, onRemoveEstudo }: WeeklyCalendarProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<EDiaDaSemana | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [novoEstudo, setNovoEstudo] = useState<Partial<EstudoDiario>>({})

  const calculateBlockHeight = (horaInicio: string, horaFim: string) => {
    const [inicioHora, inicioMin] = horaInicio.split(":").map(Number)
    const [fimHora, fimMin] = horaFim.split(":").map(Number)

    const inicioMinutos = inicioHora * 60 + inicioMin
    const fimMinutos = fimHora * 60 + fimMin
    const duracaoMinutos = fimMinutos - inicioMinutos

    // Cada hora = 60px, então cada minuto = 1px
    return Math.max(duracaoMinutos, 30) // Mínimo de 30px
  }

  const calculateBlockPosition = (horaInicio: string) => {
    const [hora, min] = horaInicio.split(":").map(Number)
    const minutosDoDia = (hora - 5) * 60 + min // Subtrai 5 porque começamos às 5:00
    return minutosDoDia // 1px por minuto
  }

  const getEstudosForDay = (dia: EDiaDaSemana) => {
    return estudosDiarios.filter((estudo) => estudo.diaDaSemana === dia)
  }

  const handleAddEstudo = () => {
    if (novoEstudo.horaInicio && novoEstudo.horaFim && novoEstudo.diaDaSemana && novoEstudo.disciplina) {
      onAddEstudo(novoEstudo as EstudoDiario)
      setNovoEstudo({})
      setIsDialogOpen(false)
    }
  }

  const openDialog = (dia?: EDiaDaSemana, hora?: string) => {
    setSelectedDay(dia || null)
    setSelectedTime(hora || "")
    setNovoEstudo({
      diaDaSemana: dia,
      horaInicio: hora,
      horaFim: hora ? `${String(Number.parseInt(hora.split(":")[0]) + 1).padStart(2, "0")}:${hora.split(":")[1]}` : "",
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">Cronograma Semanal</h1>
        <p className="text-muted-foreground">Organize seus estudos ao longo da semana</p>
      </div>

      <div className="grid grid-cols-8 gap-1 bg-background border border-border rounded-lg overflow-hidden">
        {/* Header com dias da semana */}
        <div className="bg-muted p-3 text-center font-medium text-muted-foreground">Horário</div>
        {DIAS_SEMANA.map((dia) => (
          <div key={dia.key} className="bg-muted p-3 text-center font-medium text-muted-foreground">
            {dia.label}
          </div>
        ))}

        {/* Grid de horários */}
        {HORARIOS.map((horario) => (
          <>
            {/* Coluna de horários */}
            <div
              key={`time-${horario}`}
              className="bg-card p-2 text-sm text-muted-foreground text-center border-r border-border"
            >
              {horario}
            </div>

            {/* Colunas dos dias */}
            {DIAS_SEMANA.map((dia) => {
              const estudosNoDia = getEstudosForDay(dia.key)

              return (
                <div
                  key={`${dia.key}-${horario}`}
                  className="relative bg-background border-r border-b border-border min-h-[60px] cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => openDialog(dia.key, horario)}
                >
                  {/* Renderizar blocos de estudo */}
                  {estudosNoDia.map((estudo, index) => {
                    const blockHeight = calculateBlockHeight(estudo.horaInicio, estudo.horaFim)
                    const blockPosition = calculateBlockPosition(estudo.horaInicio)
                    const currentTimePosition = calculateBlockPosition(horario)

                    // Só renderizar o bloco se ele começar neste horário
                    if (Math.abs(blockPosition - currentTimePosition) < 30) {
                      return (
                        <Card
                          key={index}
                          className="absolute inset-x-1 bg-primary text-primary-foreground p-2 rounded-md shadow-sm z-10 group"
                          style={{
                            height: `${blockHeight}px`,
                            top: `${blockPosition - currentTimePosition}px`,
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium truncate">{estudo.disciplina.label}</p>
                              <p className="text-xs opacity-90">
                                {estudo.horaInicio} - {estudo.horaFim}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation()
                                onRemoveEstudo(estudosDiarios.indexOf(estudo))
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
          </>
        ))}
      </div>

      {/* Botão flutuante para adicionar */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg" size="icon">
            <Plus className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Período de Estudo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="dia">Dia da Semana</Label>
              <Select
                value={novoEstudo.diaDaSemana}
                onValueChange={(value) => setNovoEstudo({ ...novoEstudo, diaDaSemana: value as EDiaDaSemana })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o dia" />
                </SelectTrigger>
                <SelectContent>
                  {DIAS_SEMANA.map((dia) => (
                    <SelectItem key={dia.key} value={dia.key}>
                      {dia.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="horaInicio">Hora Início</Label>
                <Input
                  id="horaInicio"
                  type="time"
                  value={novoEstudo.horaInicio || ""}
                  onChange={(e) => setNovoEstudo({ ...novoEstudo, horaInicio: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="horaFim">Hora Fim</Label>
                <Input
                  id="horaFim"
                  type="time"
                  value={novoEstudo.horaFim || ""}
                  onChange={(e) => setNovoEstudo({ ...novoEstudo, horaFim: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="disciplina">Disciplina</Label>
              <Select
                value={novoEstudo.disciplina?.value?.toString()}
                onValueChange={(value) => {
                  const disciplina = DISCIPLINAS.find((d) => d.value === Number(value))
                  setNovoEstudo({ ...novoEstudo, disciplina })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a disciplina" />
                </SelectTrigger>
                <SelectContent>
                  {DISCIPLINAS.map((disciplina) => (
                    <SelectItem key={disciplina.value} value={disciplina.value.toString()}>
                      {disciplina.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleAddEstudo} className="w-full">
              Adicionar Estudo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
