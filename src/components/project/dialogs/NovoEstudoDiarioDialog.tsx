"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { EstudoDiario } from "@/types/cronograma/EstudoDiario"
import { EDiaDaSemana } from "@/types/cronograma/DiaDaSemana"

interface Option {
  id: number
  label: string
}

interface EstudoDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  novoEstudo: Partial<EstudoDiario>
  setNovoEstudo: (estudo: Partial<EstudoDiario>) => void
  disciplinas: Option[]
  handleAddEstudo: () => void
  diasSemana: { key: EDiaDaSemana; label: string }[]
}

export function NovoEstudoDialog({
  isOpen,
  onOpenChange,
  novoEstudo,
  setNovoEstudo,
  disciplinas,
  handleAddEstudo,
  diasSemana
}: EstudoDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="group fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl 
          bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
          border-0 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
          size="icon"
        >
          <Plus className="h-6 w-6 text-white" />
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-3xl shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            Adicionar Período de Estudo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Dia da semana */}
          <div>
            <Label htmlFor="dia" className="text-slate-700 font-medium">Dia da Semana</Label>
            <Select
              value={novoEstudo.dia_da_semana}
              onValueChange={(value) => setNovoEstudo({ ...novoEstudo, dia_da_semana: value as EDiaDaSemana })}
            >
              <SelectTrigger className="mt-2 bg-white/80 border-slate-200/60 rounded-xl">
                <SelectValue placeholder="Selecione o dia" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-xl">
                {diasSemana.map((dia) => (
                  <SelectItem key={dia.key} value={dia.key}>
                    {dia.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Hora início e fim */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="horaInicio" className="text-slate-700 font-medium">Hora Início</Label>
              <Input
                id="horaInicio"
                type="time"
                value={novoEstudo.hora_inicio || ""}
                onChange={(e) => setNovoEstudo({ ...novoEstudo, hora_inicio: e.target.value })}
                className="mt-2 bg-white/80 border-slate-200/60 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="horaFim" className="text-slate-700 font-medium">Hora Fim</Label>
              <Input
                id="horaFim"
                type="time"
                value={novoEstudo.hora_fim || ""}
                onChange={(e) => setNovoEstudo({ ...novoEstudo, hora_fim: e.target.value })}
                className="mt-2 bg-white/80 border-slate-200/60 rounded-xl"
              />
            </div>
          </div>

          {/* Disciplina */}
          <div>
            <Label htmlFor="disciplina" className="text-slate-700 font-medium">Disciplina</Label>
            <Select
              value={novoEstudo.disciplina?.id?.toString()}
              onValueChange={(value) => {
                const disciplina = disciplinas.find((d) => d.id === Number(value));
                setNovoEstudo({ ...novoEstudo, disciplina });
              }}
            >
              <SelectTrigger className="mt-2 bg-white/80 border-slate-200/60 rounded-xl">
                <SelectValue placeholder="Selecione a disciplina" />
              </SelectTrigger>
              <SelectContent className="bg-white/95 backdrop-blur-md border border-slate-200/60 rounded-xl">
                {disciplinas.map((disciplina) => (
                  <SelectItem key={disciplina.id} value={disciplina.id.toString()}>
                    {disciplina.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Botão de salvar */}
          <Button
            onClick={handleAddEstudo}
            className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 
            hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-2xl 
            shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 w-full"
          >
            <span className="relative z-10">Adicionar Estudo</span>
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
