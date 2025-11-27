import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Trophy } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] sm:min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-background via-accent/20 to-primary/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-medium">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                {"#1 Plataforma do Tocantins"}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-balance leading-tight">
                Conquiste sua
                <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
                  {" aprovação "}
                </span>
                em concursos públicos
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl">
                A plataforma mais completa do Tocantins para sua preparação. Milhares de questões, simulados realistas e
                acompanhamento personalizado para garantir seu sucesso.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href={"/login"}>
                <Button size="lg" className="w-full sm:w-auto text-sm sm:text-base font-semibold group">
                  Começar agora
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={"/questoes"}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-sm sm:text-base font-semibold bg-transparent"
                >
                  Ver demonstração
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">50k+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Questões</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">15k+</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Aprovados</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">98%</div>
                <div className="text-xs sm:text-sm text-muted-foreground">Satisfação</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative mt-8 lg:mt-0">
            <div className="relative bg-card border border-border/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold">Simulado em Andamento</div>
                    <div className="text-xs sm:text-sm text-muted-foreground">Direito Administrativo</div>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Progresso</span>
                    <span className="text-primary font-medium">75%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div className="bg-gradient-to-r from-primary to-purple-600 h-2 rounded-full w-3/4"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-3 sm:pt-4">
                  <div className="text-center p-2 sm:p-3 bg-accent/50 rounded-lg">
                    <div className="text-base sm:text-lg font-bold text-primary">24/30</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Acertos</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-accent/50 rounded-lg">
                    <div className="text-base sm:text-lg font-bold text-primary">80%</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground">Performance</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-600/20 to-primary/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
