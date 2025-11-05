"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Usuario } from "@/types/usuario/Usuario"
import { Calendar1, Target, Edit3 } from "lucide-react"
import { useState, useRef } from "react"
import { DialogGenerico } from "../dialogs/DialogGenerico"
import ChangeGoalForm, { ChangeGoalFormRef } from "../forms/ChangeGoalForm"
import { toast } from "sonner"



interface ProfileHeaderProps {
  usuario: Usuario
  onProfileUpdate?: () => void
}

export function ProfileHeader({ usuario, onProfileUpdate }: ProfileHeaderProps) {
  const [isOpening, setIsOpening] = useState(false);
  const formRef = useRef<ChangeGoalFormRef>(null);
  const initials = usuario?.nome
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  function extractSince(createdAt: string): string {
    const date = new Date(createdAt);
    return date.getFullYear().toString();
  }

  return (
    <Card className="border-l-4 border-l-primary p-6 bg-card">

      {/* Profile Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Avatar className="h-24 w-24 flex-shrink-0 border-2 border-border">
          <AvatarImage src={usuario?.avatar || undefined} alt={usuario?.nome} />
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-lg font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground mb-4">{usuario?.nome}</h3>
          <div className="mb-4">
            <p className="text-xs text-muted-foreground font-medium">Email</p>
            <p className="text-sm font-medium text-foreground">{usuario?.email}</p>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div 
            className="bg-background rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group relative" 
            onClick={() => setIsOpening(true)}
          >
            <div className="flex items-start gap-3 w-full">
              <Target className="text-2xl text-primary" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">Objetivo</p>
                <p className="text-sm font-bold text-foreground">{usuario?.objetivo?.nome || "Não definido"}</p>
              </div>  
              <Edit3 className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3" />
            </div>
          </div>
          <div className="bg-background rounded-lg p-4 flex items-center justify-center">
            <div className="flex items-start gap-3">
              <Calendar1 className="text-2xl text-primary" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">Membro desde</p>
                <p className="text-sm font-bold text-foreground">{extractSince(usuario?.data_criacao)}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Stats Cards */}

    <DialogGenerico 
      isOpen={isOpening} 
      onOpenChange={setIsOpening} 
      title="Alterar Objetivo"
      confirmLabel="Salvar"
      cancelLabel="Cancelar"
      onConfirm={() => {
        formRef.current?.submitForm();
      }}
      onCancel={() => setIsOpening(false)}
      confirmDisabled={formRef.current?.isSubmitting}
    >
      <ChangeGoalForm 
        ref={formRef}
        onSuccess={() => {
          setIsOpening(false)
          toast.success("Objetivo atualizado com sucesso!")
          onProfileUpdate?.()
        }} 
      />
    </DialogGenerico>
    </Card>

  )
}
