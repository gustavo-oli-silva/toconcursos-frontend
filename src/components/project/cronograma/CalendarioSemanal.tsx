"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import React from "react";
import { EDiaDaSemana } from "@/types/cronograma/EDiaDaSemana";
import { EstudoDiario } from "@/types/cronograma/EstudoDiario";
import { getEstudosForDay, calculateBlockHeight, calculateCronogramaStatistics, calculateBlockPosition } from "./utils";

interface CalendarioSemanalProps {
  estudosDiarios: EstudoDiario[];
  openDialog?: (dia?: EDiaDaSemana, horario?: string) => void; 
  handleRemoveEstudo?: (index: number) => void;
  DIAS_SEMANA: { key: EDiaDaSemana; label: string }[];
  HORARIOS: string[];
  modo?: "criar" | "detalhes";
}

export function CalendarioSemanal({
  estudosDiarios,
  openDialog,
  handleRemoveEstudo,
  DIAS_SEMANA,
  HORARIOS,
  modo = "detalhes",
}: CalendarioSemanalProps) {
  return (
    <section className="relative overflow-hidden bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-3xl shadow-xl shadow-slate-500/10 p-8 md:p-10">
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-slate-50/30"></div>
      <div className="relative">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Calendário Semanal</h2>
          {modo === "criar" && (
            <p className="text-slate-600">Clique em qualquer horário para adicionar um estudo</p>
          )}
        </div>

        <div className="grid grid-cols-8 gap-1 bg-white/50 border border-slate-200/40 rounded-2xl overflow-hidden">
          {/* Cabeçalho */}
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

          {/* Corpo */}
          {HORARIOS.map((horario) => (
            <React.Fragment key={`horario-${horario}`}>
              {/* Coluna de horários */}
              <div className="bg-slate-50 p-2 text-sm text-slate-600 text-center border-r border-slate-200/60 font-medium">
                {horario}
              </div>

              {DIAS_SEMANA.map((dia) => {
                const estudosNoDia = getEstudosForDay(estudosDiarios, dia.key);
                return (
                  <div
                    key={`${dia.key}-${horario}`}
                    className={`relative bg-white/80 border-r border-b border-slate-200/40 min-h-[60px] ${
                      modo === "criar" ? "cursor-pointer hover:bg-blue-50/60" : ""
                    } transition-all duration-200 group`}
                    onClick={() => openDialog && openDialog(dia.key, horario)}
                  >
                    {modo === "criar" && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-blue-100/30 rounded-sm flex items-center justify-center">
                        <Plus className="h-4 w-4 text-blue-600" />
                      </div>
                    )}

                    {/* Blocos de estudo */}
                    {estudosNoDia.map((estudo, index) => {
                      const blockHeight = calculateBlockHeight(estudo.hora_inicio, estudo.hora_fim);
                      const blockPosition = calculateBlockPosition(estudo.hora_inicio);
                      const currentTimePosition = calculateBlockPosition(horario);

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
                              {modo === "criar" && handleRemoveEstudo && (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-4 w-4 p-0 opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-white/20 text-white"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveEstudo(estudosDiarios.indexOf(estudo));
                                  }}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </Card>
                        );
                      }
                      return null;
                    })}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
