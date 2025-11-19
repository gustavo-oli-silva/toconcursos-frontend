"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ChevronRight, CreditCard, QrCode, FileText, Calendar, DollarSign, ExternalLink } from "lucide-react"
import HistoricoAssinaturas from "@/types/usuario/perfil/HistoricoAssinaturas"
import PlanoAssinaturaDetalhado from "@/types/usuario/perfil/PlanoAssinaturaDetalhado"

interface ProfileSubscriptionsProps {
  subscriptions: HistoricoAssinaturas
}

export function ProfileSubscriptions({ subscriptions }: ProfileSubscriptionsProps) {
  const planoAtual = subscriptions?.plano_atual
  const historico = subscriptions?.historico_assinaturas || []
  const [showHistoryModal, setShowHistoryModal] = useState(false)

  const historicoLimitado = historico.slice(0, 3)
  const temMaisItens = historico.length > 3

  const formatarData = (data: string) => {
    const date = new Date(data)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getMetodoPagamentoIcon = (metodo: string) => {
    switch (metodo) {
      case "pix":
        return <QrCode className="w-4 h-4 text-blue-600" />
      case "boleto":
        return <FileText className="w-4 h-4 text-green-600" />
      case "cartao":
        return <CreditCard className="w-4 h-4 text-purple-600" />
      default:
        return <CreditCard className="w-4 h-4 text-gray-600" />
    }
  }

  const getMetodoPagamentoLabel = (metodo: string) => {
    switch (metodo) {
      case "pix":
        return "PIX"
      case "boleto":
        return "Boleto"
      case "cartao":
        return "Cartão"
      default:
        return metodo
    }
  }

  const renderItemHistorico = (item: PlanoAssinaturaDetalhado, index: number) => {
    const key = `${item.plano.id}-${item.data_assinatura}-${index}`
    
    return (
      <div
        key={key}
        className="flex items-start justify-between p-3 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
      >
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            {getMetodoPagamentoIcon(item.metodo_pagamento)}
            <span className="text-sm font-semibold text-foreground">{item.plano.nome}</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-muted-foreground ml-6">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatarData(item.data_assinatura)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium text-primary">{getMetodoPagamentoLabel(item.metodo_pagamento)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 ml-4">
          <div className="text-right">
            <div className="flex items-center gap-1 text-sm font-bold text-foreground">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span>R$ {item.plano.valor.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Card className="border-l-4 border-l-primary p-6 bg-card shadow-lg">
        <h3 className="text-lg font-bold text-foreground mb-4">Planos e Assinaturas</h3>

        <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20 mb-4">
          <p className="text-sm font-semibold text-foreground mb-2">{planoAtual?.nome || "Sem plano"}</p>
          {planoAtual && (
            <p className="text-xs text-muted-foreground mb-3">
              Valor: <span className="font-semibold text-primary">R$ {planoAtual.valor.toFixed(2)}/mês</span>
            </p>
          )}
          {!planoAtual && (
            <p className="text-xs text-muted-foreground mb-3">
              Você ainda não possui um plano ativo
            </p>
          )}

          <Button variant="ghost" className="w-full text-primary hover:bg-primary/10 justify-between p-0 h-auto">
            <span className="text-sm font-medium">Detalhes da assinatura</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {historico.length > 0 && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Histórico de Assinaturas</p>
              {temMaisItens && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHistoryModal(true)}
                  className="text-xs h-auto p-1 text-primary hover:text-primary/80"
                >
                  Ver todos ({historico.length})
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Button>
              )}
            </div>
            <div className="space-y-2">
              {historicoLimitado.map((item, index) => renderItemHistorico(item, index))}
            </div>
          </div>
        )}
      </Card>

      {/* Modal com histórico completo */}
      <Dialog open={showHistoryModal} onOpenChange={setShowHistoryModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Histórico Completo de Assinaturas</DialogTitle>
            <DialogDescription>
              Todas as suas assinaturas anteriores ({historico.length} {historico.length === 1 ? 'assinatura' : 'assinaturas'})
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {historico.map((item, index) => renderItemHistorico(item, index))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
