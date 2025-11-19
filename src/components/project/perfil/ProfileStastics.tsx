"use client"

import { Card } from "@/components/ui/card"
import EstatisticasUsuario from "@/types/usuario/perfil/Estatisticas"
import { useRouter } from "next/navigation"
import { 
  ArrowRight, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Target, 
  Calendar, 
  Flame 
} from "lucide-react"

interface ProfileStatsProps {
  stats: EstatisticasUsuario
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const router = useRouter()
  
  const statsCards = [
    {
      label: "Total de questões",
      value: stats?.total_questoes_resolvidas || 0,
      icon: FileText,
      color: "text-blue-600",
      iconBg: "bg-blue-100",
      bgGradient: "from-blue-50 to-blue-100/50",
      borderColor: "border-blue-200/50",
      hoverColor: "hover:from-blue-100 hover:to-blue-200/50"
    },
    {
      label: "Total de acertos",
      value: stats?.total_acertos || 0,
      icon: CheckCircle2,
      color: "text-green-600",
      iconBg: "bg-green-100",
      bgGradient: "from-green-50 to-emerald-100/50",
      borderColor: "border-green-200/50",
      hoverColor: "hover:from-green-100 hover:to-emerald-200/50"
    },
    {
      label: "Total de erros",
      value: stats?.total_erros || 0,
      icon: XCircle,
      color: "text-red-600",
      iconBg: "bg-red-100",
      bgGradient: "from-red-50 to-rose-100/50",
      borderColor: "border-red-200/50",
      hoverColor: "hover:from-red-100 hover:to-rose-200/50"
    },
    {
      label: "Taxa de acerto",
      value: `${stats?.percentual_acerto || 0}%`,
      icon: Target,
      color: "text-indigo-600",
      iconBg: "bg-indigo-100",
      bgGradient: "from-indigo-50 to-purple-100/50",
      borderColor: "border-indigo-200/50",
      hoverColor: "hover:from-indigo-100 hover:to-purple-200/50"
    },
    {
      label: "Cronogramas",
      value: stats?.total_cronogramas || 0,
      icon: Calendar,
      color: "text-violet-600",
      iconBg: "bg-violet-100",
      bgGradient: "from-violet-50 to-purple-100/50",
      borderColor: "border-violet-200/50",
      hoverColor: "hover:from-violet-100 hover:to-purple-200/50",
      clickable: true,
      onClick: () => router.push("/cronogramas")
    },
    {
      label: "Dias de estudo",
      value: stats?.dias_consecutivos_estudo || 0,
      icon: Flame,
      color: "text-orange-600",
      iconBg: "bg-orange-100",
      bgGradient: "from-orange-50 to-amber-100/50",
      borderColor: "border-orange-200/50",
      hoverColor: "hover:from-orange-100 hover:to-amber-200/50"
    }
  ]

  return (
    <Card className="border-l-4 border-l-primary p-6 bg-card shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Suas estatísticas</h3>
        <button
          onClick={() => {router.push("perfil/estatisticas")}}
          className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors rounded-lg hover:bg-primary/10 border border-transparent hover:border-primary/20"
        >
          <span>Ver análise detalhada</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon
          const isClickable = stat.clickable
          
          return (
            <div
              key={index}
              onClick={isClickable ? stat.onClick : undefined}
              className={`
                relative overflow-hidden rounded-xl p-5 
                bg-gradient-to-br ${stat.bgGradient}
                border ${stat.borderColor}
                transition-all duration-300
                ${isClickable ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1' : 'hover:shadow-md'}
                ${stat.hoverColor}
                group
              `}
            >
              {/* Efeito de brilho sutil no hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className={`
                    p-2 rounded-lg 
                    bg-white/60 backdrop-blur-sm
                    ${stat.iconBg}
                    shadow-sm
                  `}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  {isClickable && (
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                  )}
                </div>
                
                <div>
                  <p className="text-xs text-slate-600 font-medium mb-1">
                    {stat.label}
                  </p>
                  <p className={`text-3xl font-bold ${stat.color} leading-tight`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
