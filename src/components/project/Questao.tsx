import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

export function Questao() {
    return (
        <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-2xl shadow-xl border border-slate-200/50">
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl shadow-sm">
                <CardHeader className="p-6 md:p-8 text-center space-y-4">
                    <CardTitle className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                        (FGV - 2023) Qual das seguintes opções representa uma característica fundamental da programação orientada a
                        objetos?
                    </CardTitle>
                    <CardDescription className="text-base md:text-lg text-slate-600 leading-relaxed">
                        Analise as alternativas abaixo e selecione aquela que descreve corretamente um dos pilares da POO.
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-6 md:px-8 pb-6 md:pb-8">
                    <RadioGroup defaultValue="2" className="space-y-3">
                        <div className="flex items-center space-x-4 p-4 rounded-lg border border-slate-200 bg-white hover:bg-purple-50/70 hover:border-slate-300 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer group">
                            <RadioGroupItem
                                value="1"
                                id="option-1"
                                className="border-slate-400 text-blue-600 group-hover:border-blue-500"
                            />
                            <Label
                                htmlFor="option-1"
                                className="text-sm md:text-base font-medium text-slate-700 flex-1 cursor-pointer leading-relaxed"
                            >
                                A programação procedural, que executa tarefas em uma sequência estrita de passos.
                            </Label>
                        </div>

                        <div className="flex items-center space-x-4 p-4 rounded-lg border border-slate-200 bg-white hover:bg-purple-50/70 hover:border-slate-300 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer group">
                            <RadioGroupItem
                                value="2"
                                id="option-2"
                                className="border-slate-400 text-blue-600 group-hover:border-blue-500"
                            />
                            <Label
                                htmlFor="option-2"
                                className="text-sm md:text-base font-medium text-slate-700 flex-1 cursor-pointer leading-relaxed"
                            >
                                O encapsulamento, que agrupa dados e os métodos que operam nesses dados em uma única unidade ou objeto.
                            </Label>
                        </div>

                        <div className="flex items-center space-x-4 p-4 rounded-lg border border-slate-200 bg-white hover:bg-purple-50/70 hover:border-slate-300 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer group">
                            <RadioGroupItem
                                value="3"
                                id="option-3"
                                className="border-slate-400 text-blue-600 group-hover:border-blue-500"
                            />
                            <Label
                                htmlFor="option-3"
                                className="text-sm md:text-base font-medium text-slate-700 flex-1 cursor-pointer leading-relaxed"
                            >
                                A utilização de variáveis globais para compartilhar estado entre todas as funções do programa.
                            </Label>
                        </div>

                        <div className="flex items-center space-x-4 p-4 rounded-lg border border-slate-200 bg-white hover:bg-purple-50/70 hover:border-slate-300 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer group">
                            <RadioGroupItem
                                value="4"
                                id="option-4"
                                className="border-slate-400 text-blue-600 group-hover:border-blue-500"
                            />
                            <Label
                                htmlFor="option-4"
                                className="text-sm md:text-base font-medium text-slate-700 flex-1 cursor-pointer leading-relaxed"
                            >
                                A compilação Just-In-Time (JIT) como requisito principal para a execução do código.
                            </Label>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>
        </div>
    )
}
