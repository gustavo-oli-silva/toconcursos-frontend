"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import HistoricoAssinaturas from "@/types/usuario/perfil/HistoricoAssinaturas"


interface ProfileSubscriptionsProps {
  subscriptions: HistoricoAssinaturas
}

export function ProfileSubscriptions({ subscriptions }: ProfileSubscriptionsProps) {
  const planoAtual = subscriptions?.plano_atual

  return (
    <Card className="border-l-4 border-l-primary p-6 bg-card">
      <h3 className="text-lg font-bold text-foreground mb-4">Planos e Assinaturas</h3>

      <div className="bg-background rounded-lg p-4 border border-border mb-4">
        <p className="text-sm font-medium text-foreground mb-3">{planoAtual?.nome || "Sem plano"}</p>
        <p className="text-xs text-muted-foreground mb-4">
          {planoAtual?.descricao || "Você ainda não possui um plano ativo"}
        </p>

        <Button variant="ghost" className="w-full text-primary hover:bg-primary/10 justify-between p-0 h-auto">
          <span className="text-sm font-medium">Detalhes da assinatura</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {subscriptions?.historico_assinaturas.length > 1 && (
        <div className="pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground font-medium mb-3">Histórico</p>
          <div className="space-y-2">
            {subscriptions?.historico_assinaturas.map((plano) => (
              <div key={plano.id} className="flex items-center justify-between text-xs">
                <span className="text-foreground font-medium">{plano.nome}</span>
                {plano.preco > 0 && <span className="text-muted-foreground">R$ {plano.preco.toFixed(2)}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
