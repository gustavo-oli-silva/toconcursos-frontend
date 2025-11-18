import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function PlanosPage() {
    const plans = [
        {
            name: "TO Basic",
            description: "Descrição do plano",
            price: "30,90",
            features: [
                "Comentários de alunos",
                "Comentários de professores",
                "Crie seus próprios simulados",
                "Acesse as questões",
                "Estatísticas de desempenho",
            ],
        },
        {
            name: "TO Premium",
            description: "Descrição do plano",
            price: "50,90",
            features: [
                "Comentários de alunos",
                "Comentários de professores",
                "Crie seus próprios simulados",
                "Acesse as questões",
                "Estatísticas de desempenho",
                "Análise de desempenho",
                "Acesso a mapas mentais",
                "Simulados feitos pela comunidade",
            ],
        },
        {
            name: "TO Professional",
            description: "Descrição do plano",
            price: "80,90",
            features: [
                "Comentários de alunos",
                "Comentários de professores",
                "Crie seus próprios simulados",
                "Acesse as questões",
                "Estatísticas de desempenho",
                "Análise de desempenho",
                "Acesso a mapas mentais",
                "Simulados feitos pela comunidade",
                "Acesso à mesa de cobranças",
                "Simulados e provas passadas",
            ],
        },
    ]

    return (
        <div>
            <div className="bg-[#f5f5f7] px-6 py-8">
                <div className="mx-auto max-w-[1200px]">
                    <div className="mb-8 border-l-[3px] border-l-indigo-600 pl-3">
                        <h1 className="text-[15px] font-semibold text-gray-900">Planos</h1>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className="flex flex-col rounded-lg border-l-[4px] border-l-indigo-600 bg-white p-6 shadow-sm"
                            >
                                <div className="mb-4">
                                    <h2 className="text-[18px] font-semibold text-gray-900">{plan.name}</h2>
                                    <p className="text-[13px] text-gray-500">{plan.description}</p>
                                </div>

                                <div className="mb-6">
                                    <div className="flex items-baseline gap-0.5">
                                        <span className="text-[14px] font-medium text-gray-900">R$</span>
                                        <span className="text-[32px] font-bold text-gray-900">{plan.price}</span>
                                        <span className="text-[13px] text-gray-500">/ mês</span>
                                    </div>
                                </div>

                                <ul className="mb-8 flex-grow space-y-2.5">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start gap-2.5">
                                            <Check className="mt-[2px] h-[14px] w-[14px] flex-shrink-0 text-gray-600" strokeWidth={2.5} />
                                            <span className="text-[13px] leading-relaxed text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button className="w-full rounded-md bg-indigo-600 py-5 text-[14px] font-medium text-white hover:bg-indigo-700">
                                    Escolher plano
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
