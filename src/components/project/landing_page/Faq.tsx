import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Como funciona a plataforma TOconcursos?",
    answer:
      "Nossa plataforma oferece um ambiente completo de estudos com banco de questões, simulados, relatórios de desempenho e comunidade. Você pode estudar no seu ritmo, acompanhar seu progresso e se preparar de forma eficiente para concursos públicos.",
  },
  {
    question: "Posso cancelar minha assinatura a qualquer momento?",
    answer:
      "Sim! Você pode cancelar sua assinatura a qualquer momento através da sua área do usuário. Não há multas ou taxas de cancelamento, e você continuará tendo acesso até o final do período já pago.",
  },
  {
    question: "As questões são atualizadas regularmente?",
    answer:
      "Sim, nosso banco de questões é constantemente atualizado com as provas mais recentes dos principais concursos do país. Nossa equipe pedagógica trabalha diariamente para manter o conteúdo sempre atual e relevante.",
  },
  {
    question: "Existe suporte técnico disponível?",
    answer:
      "Oferecemos suporte técnico completo por email, chat e telefone. Nosso time está disponível de segunda a sexta, das 8h às 18h, para ajudar com qualquer dúvida ou problema técnico.",
  },
  {
    question: "Posso acessar a plataforma pelo celular?",
    answer:
      "Sim! Nossa plataforma é totalmente responsiva e funciona perfeitamente em smartphones, tablets e computadores. Você pode estudar onde e quando quiser, com sincronização automática do seu progresso.",
  },
  {
    question: "Há garantia de aprovação?",
    answer:
      "Embora não possamos garantir aprovação (que depende de diversos fatores), oferecemos todas as ferramentas necessárias para uma preparação de qualidade. Temos mais de 15.000 aprovados que utilizaram nossa plataforma.",
  },
  {
    question: "Como funcionam os relatórios de desempenho?",
    answer:
      "Nossos relatórios mostram estatísticas detalhadas do seu desempenho por matéria, tipo de questão e evolução temporal. Você pode identificar pontos fortes e fracos, otimizando seu tempo de estudo.",
  },
  {
    question: "Existe desconto para estudantes?",
    answer:
      "Sim! Oferecemos descontos especiais para estudantes universitários mediante comprovação. Entre em contato com nosso suporte para mais informações sobre condições especiais.",
  },
]

export function FaqSection() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-balance">
            Perguntas
            <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent">
              {" frequentes"}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Tire suas dúvidas sobre nossa plataforma e como ela pode ajudar na sua preparação para concursos públicos.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border/50 rounded-lg px-6 data-[state=open]:bg-muted/30"
            >
              <AccordionTrigger className="text-left font-semibold hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
