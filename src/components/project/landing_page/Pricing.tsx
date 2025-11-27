'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { PlanoService } from "@/lib/services/plano/PlanoService"
import type { Plano } from "@/types/plano/Plano"

interface PricingPlan {
  id: number
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular: boolean
}

export function PricingSection() {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const carregarPlanos = async () => {
      try {
        const planosDoBackend = await PlanoService.buscarTodosPlanos(0, 10)

        if (!planosDoBackend) {
          setPlans([])
          return
        }

        // Ordena por valor para garantir que o plano do meio seja o "popular"
        const ordenados = [...planosDoBackend].sort((a, b) => a.valor - b.valor)

        const middleIndex = ordenados.length > 0 ? Math.floor(ordenados.length / 2) : -1

        const planosAdaptados: PricingPlan[] = ordenados.map((plano: Plano, index) => ({
          id: plano.id,
          name: plano.nome,
          price: plano.valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          }),
          period: "/mês",
          description: plano.descricao,
          features: Array.isArray(plano.beneficios) ? plano.beneficios : [plano.beneficios],
          popular: index === middleIndex,
        }))

        setPlans(planosAdaptados)
      } catch (error) {
        console.error("Erro ao carregar planos para o pricing:", error)
        setPlans([])
      } finally {
        setIsLoading(false)
      }
    }

    void carregarPlanos()
  }, [])

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-balance">
            Escolha o plano ideal
            <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              {" para você"}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Investir na sua aprovação nunca foi tão acessível. Escolha o plano que melhor se adapta ao seu perfil de
            estudos.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {isLoading && plans.length === 0 ? (
            <>
              {[1, 2, 3].map((skeleton) => (
                <Card key={skeleton} className="border-border/50 animate-pulse">
                  <CardHeader className="text-center pb-8">
                    <div className="h-6 bg-muted rounded w-1/2 mx-auto mb-4" />
                    <div className="space-y-2">
                      <div className="h-8 bg-muted rounded w-2/3 mx-auto" />
                      <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-5/6" />
                      <div className="h-4 bg-muted rounded w-4/6" />
                    </div>
                    <div className="h-10 bg-muted rounded w-full" />
                  </CardContent>
                </Card>
              ))}
            </>
          ) : plans.length === 0 ? (
            <div className="col-span-3 text-center text-muted-foreground">
              Nenhum plano disponível no momento.
            </div>
          ) : (
            plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative ${
                  plan.popular ? "border-primary shadow-lg scale-105" : "border-border/50"
                } hover:shadow-lg transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Mais Popular
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-black text-primary">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.popular ? "Começar agora" : "Escolher plano"}
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">Todos os planos incluem garantia de 7 dias. Cancele quando quiser.</p>
        </div>
      </div>
    </section>
  )
}
