"use client"

import { Card } from "@/components/ui/card"
import EstatisticasUsuario from "@/types/usuario/perfil/Estatisticas"
import { useRouter } from "next/navigation"
interface ProfileStatsProps {
  stats: EstatisticasUsuario
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const router = useRouter()
  return (
    <Card className="border-l-4 border-l-primary p-6 bg-card">
      <div className="mb-6 flex items-center gap-2">
        <h3 className="text-lg font-bold text-foreground">Suas estatísticas</h3>
        <p className="text-sm text-muted-foreground cursor-pointer" onClick={() => {router.push("perfil/estatisticas")}}>Ver analise detalhada</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-background rounded-lg p-4 border border-border">
          <p className="text-xs text-muted-foreground font-medium">Total de questões</p>
          <p className="text-2xl font-bold text-primary mt-1">{stats?.total_questoes_resolvidas}</p>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <p className="text-xs text-muted-foreground font-medium">Total de acertos</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{stats?.total_acertos}</p>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <p className="text-xs text-muted-foreground font-medium">Total de erros</p>
          <p className="text-2xl font-bold text-destructive mt-1">{stats?.total_erros}</p>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <p className="text-xs text-muted-foreground font-medium">Taxa de acerto</p>
          <p className="text-2xl font-bold text-primary mt-1">{stats?.percentual_acerto}%</p>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <p className="text-xs text-muted-foreground font-medium">Cronogramas</p>
          <p className="text-2xl font-bold text-primary mt-1">{stats?.total_cronogramas}</p>
        </div>

        <div className="bg-background rounded-lg p-4 border border-border">
          <p className="text-xs text-muted-foreground font-medium">Dias de estudo</p>
          <p className="text-2xl font-bold text-primary mt-1">{stats?.dias_consecutivos_estudo}</p>
        </div>
      </div>
    </Card>
  )
}
