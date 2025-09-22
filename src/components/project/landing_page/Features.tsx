import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Target, BarChart3, Users, Clock, Award } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Banco de Questões Completo",
    description: "Mais de 50.000 questões organizadas por matéria, banca e nível de dificuldade, sempre atualizadas.",
  },
  {
    icon: Target,
    title: "Simulados Realistas",
    description: "Simulados que reproduzem fielmente as condições reais das provas dos principais concursos.",
  },
  {
    icon: BarChart3,
    title: "Relatórios Detalhados",
    description: "Acompanhe seu desempenho com gráficos e estatísticas que mostram seus pontos fortes e fracos.",
  },
  {
    icon: Users,
    title: "Comunidade Ativa",
    description: "Conecte-se com outros concurseiros, tire dúvidas e compartilhe experiências de estudo.",
  },
  {
    icon: Clock,
    title: "Cronômetro Inteligente",
    description: "Treine o tempo de resolução com cronômetro que simula as condições reais da prova.",
  },
  {
    icon: Award,
    title: "Certificados de Conclusão",
    description: "Receba certificados ao completar cursos e simulados para comprovar seu progresso.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-balance">
            Tudo que você precisa para
            <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              {" ser aprovado"}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto">
            Nossa plataforma oferece as ferramentas mais avançadas para otimizar seus estudos e maximizar suas chances
            de aprovação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-balance">{feature.title}</h3>
                  <p className="text-muted-foreground text-pretty">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
