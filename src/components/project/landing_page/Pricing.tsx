import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star } from "lucide-react"

const plans = [
  {
    name: "Básico",
    price: "R$ 29",
    period: "/mês",
    description: "Ideal para quem está começando",
    features: ["Acesso a 10.000 questões", "3 simulados por mês", "Relatórios básicos", "Suporte por email"],
    popular: false,
  },
  {
    name: "Premium",
    price: "R$ 59",
    period: "/mês",
    description: "Nosso plano mais popular",
    features: [
      "Acesso a todas as 50.000+ questões",
      "Simulados ilimitados",
      "Relatórios avançados com IA",
      "Suporte prioritário",
      "Cronômetro inteligente",
      "Comunidade exclusiva",
    ],
    popular: true,
  },
  {
    name: "Anual",
    price: "R$ 490",
    period: "/ano",
    description: "Melhor custo-benefício",
    originalPrice: "R$ 708",
    features: [
      "Tudo do plano Premium",
      "2 meses grátis",
      "Certificados de conclusão",
      "Mentoria mensal",
      "Acesso antecipado a novidades",
      "Garantia de 30 dias",
    ],
    popular: false,
  },
]

export function PricingSection() {
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
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : "border-border/50"} hover:shadow-lg transition-all duration-300`}
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
                  {plan.originalPrice && (
                    <div className="text-sm text-muted-foreground">
                      <span className="line-through">{plan.originalPrice}</span>
                      <span className="ml-2 text-green-600 dark:text-green-400 font-semibold">Economize 31%</span>
                    </div>
                  )}
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
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">Todos os planos incluem garantia de 7 dias. Cancele quando quiser.</p>
        </div>
      </div>
    </section>
  )
}
