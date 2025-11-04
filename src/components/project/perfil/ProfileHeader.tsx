"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Usuario } from "@/types/usuario/Usuario"



interface ProfileHeaderProps {
  usuario: Usuario
}

export function ProfileHeader({ usuario }: ProfileHeaderProps) {
  const initials = usuario?.nome
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="border-l-4 border-l-primary p-6 bg-card">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-foreground">Suas informações</h2>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <span>✏️</span> Editar informações
        </Button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row gap-6 mb-8">
        <Avatar className="h-24 w-24 flex-shrink-0 border-2 border-border">
          <AvatarImage src={usuario?.avatar || undefined} alt={usuario?.nome} />
          <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-lg font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground mb-4">{usuario?.nome}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground font-medium">Email</p>
              <p className="text-sm font-medium text-foreground">{usuario?.email}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Telefone</p>
              <p className="text-sm font-medium text-foreground">(63) 99999-9999</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Cidade e Estado</p>
              <p className="text-sm font-medium text-foreground">Palmas - TO</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🎯</div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground font-medium">Objetivo</p>
              <p className="text-sm font-bold text-foreground">Polícia Federal</p>
            </div>
          </div>
        </div>
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-start gap-3">
            <div className="text-2xl">📅</div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground font-medium">Membro desde</p>
              <p className="text-sm font-bold text-foreground">2023</p>
            </div>
          </div>
        </div>
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🔥</div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground font-medium">Sequência de</p>
              <p className="text-sm font-bold text-foreground">7 dias</p>
            </div>
          </div>
        </div>
        <div className="bg-background rounded-lg p-4 border border-border">
          <div className="flex items-start gap-3">
            <div className="text-2xl">📊</div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground font-medium">Questões</p>
              <p className="text-sm font-bold text-foreground">321</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
