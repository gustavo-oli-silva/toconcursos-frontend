"use client"

import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Dropdown } from "@/components/project/Dropdown"
import { Cronograma, EDiaDaSemana } from "@/types/cronograma"

import { useState } from "react"

export default function NewCronogramaScreen() {
  const { register, handleSubmit, control } = useForm<Cronograma>({
    defaultValues: {
      nome: "",
      descricao: "",
      estudosDiarios: [
        {
          horaInicio: "10:30",
          horaFim: "11:30",
          diaDaSemana: "segunda" as EDiaDaSemana,
          disciplina: { value: 0, label: "" },
        },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "estudosDiarios",
  })

  const [selectedDays, setSelectedDays] = useState<(EDiaDaSemana | null)[]>([null])
  const [selectedDisciplinas, setSelectedDisciplinas] = useState<(Option | null)[]>([null])

  const onSubmit: SubmitHandler<Cronograma> = (data) => console.log(data)

  const opcoesDisciplina: Option[] = [
    { value: 2, label: "Matemática" },
    { value: 3, label: "Português" },
    { value: 4, label: "História" },
  ]

  const opcoesDiaDaSemana: Option[] = [
    { value: 1, label: "Domingo" },
    { value: 2, label: "Segunda-feira" },
    { value: 3, label: "Terça-feira" },
    { value: 4, label: "Quarta-feira" },
    { value: 5, label: "Quinta-feira" },
    { value: 6, label: "Sexta-feira" },
    { value: 7, label: "Sábado" },
  ]

  const adicionarEstudoDiario = () => {
    append({
      horaInicio: "10:30",
      horaFim: "11:30",
      diaDaSemana: "segunda" as EDiaDaSemana,
      disciplina: { value: 0, label: "" },
    })
    setSelectedDays([...selectedDays, null])
    setSelectedDisciplinas([...selectedDisciplinas, null])
  }

  const removerEstudoDiario = (index: number) => {
    remove(index)
    const newSelectedDays = [...selectedDays]
    const newSelectedDisciplinas = [...selectedDisciplinas]
    newSelectedDays.splice(index, 1)
    newSelectedDisciplinas.splice(index, 1)
    setSelectedDays(newSelectedDays)
    setSelectedDisciplinas(newSelectedDisciplinas)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Novo Cronograma</h1>
        <p className="text-gray-600">
          Preencha as informações abaixo para criar um novo cronograma com múltiplos segmentos de estudo.
        </p>
      </header>
      <main>
        <form className="bg-white p-6 rounded-lg shadow-sm border space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label>Nome do cronograma</Label>
            <Input type="text" id="nome-cronograma" placeholder="Digite o nome do cronograma" {...register("nome")} />
          </div>
          <div className="space-y-2">
            <Label>Descrição do cronograma</Label>
            <Input
              type="text"
              id="descricao-cronograma"
              placeholder="Digite a descrição do cronograma"
              {...register("descricao")}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Estudos Diários</h3>
              <Button type="button" onClick={adicionarEstudoDiario} variant="outline" size="sm">
                + Adicionar Estudo
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="p-4 border rounded-lg space-y-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-700">Estudo {index + 1}</h4>
                  {fields.length > 1 && (
                    <Button type="button" onClick={() => removerEstudoDiario(index)} variant="destructive" size="sm">
                      Remover
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`hora-inicio-${index}`}>Hora de Início</Label>
                    <Input
                      type="time"
                      id={`hora-inicio-${index}`}
                      {...register(`estudosDiarios.${index}.horaInicio`)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`hora-fim-${index}`}>Hora de Fim</Label>
                    <Input type="time" id={`hora-fim-${index}`} {...register(`estudosDiarios.${index}.horaFim`)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Dropdown
                            label="Selecione o dia da semana"
                            placeholder="Selecione o dia da semana"
                            options={opcoesDiaDaSemana}

                            onOptionSelect={(option: Option | null) => {
                                const newSelectedDays = [...selectedDays]
                                newSelectedDays[index] =
                                    (option?.label.toLowerCase().replace("-feira", "").replace("ç", "c") as EDiaDaSemana) || null
                                setSelectedDays(newSelectedDays)
                            }} selectedOption={null} />
                </div>

                <div className="space-y-2">
                  <Dropdown
                    label="Selecione a Disciplina"
                    placeholder="Selecione a Disciplina"
                    options={opcoesDisciplina}
                    selectedOption={selectedDisciplinas[index]}
                    onOptionSelect={(option: Option | null) => {
                      const newSelectedDisciplinas = [...selectedDisciplinas]
                      newSelectedDisciplinas[index] = option
                      setSelectedDisciplinas(newSelectedDisciplinas)
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <Button type="submit" className="w-full">
            Criar Cronograma
          </Button>
        </form>
      </main>
    </div>
  )
}
