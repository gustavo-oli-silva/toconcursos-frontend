import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export function Questao() {
    return (
        <div className="w-full max-w-4xl mx-auto p-2 sm:p-4 bg-gradient-to-br from-purple-100 via-white to-indigo-100 rounded-3xl shadow-lg">
            <Card className="bg-white/50 backdrop-blur-md border border-white/70 rounded-2xl shadow-md">
                <CardHeader className="p-6 md:p-8 text-center">
                    <CardTitle className="text-xl md:text-2xl font-bold text-purple-800 [text-shadow:_0_1px_2px_rgb(255_255_255_/_80%)]">
                        (FGV - 2023) Qual das seguintes opções representa uma característica fundamental da programação orientada a objetos?
                    </CardTitle>
                    <CardDescription className="text-base md:text-lg text-purple-700/90 pt-4">
                        Analise as alternativas abaixo e selecione aquela que descreve corretamente um dos pilares da POO.
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-6 md:px-8 pb-6 md:pb-8">
                    <RadioGroup defaultValue="2" className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 rounded-xl border border-purple-200 bg-white/70 hover:bg-purple-50/70 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer">
                            <RadioGroupItem value="1" id="option-1" className="border-purple-400 text-purple-600" />
                            <Label htmlFor="option-1" className="text-md font-medium text-purple-900 flex-1 cursor-pointer">
                                A programação procedural, que executa tarefas em uma sequência estrita de passos.
                            </Label>
                        </div>

                        <div className="flex items-center space-x-4 p-4 rounded-xl border border-purple-200 bg-white/70 hover:bg-purple-50/70 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer">
                            <RadioGroupItem value="2" id="option-2" className="border-purple-400 text-purple-600" />
                            <Label htmlFor="option-2" className="text-md font-medium text-purple-900 flex-1 cursor-pointer">
                                O encapsulamento, que agrupa dados e os métodos que operam nesses dados em uma única unidade ou objeto.
                            </Label>
                        </div>

                        <div className="flex items-center space-x-4 p-4 rounded-xl border border-purple-200 bg-white/70 hover:bg-purple-50/70 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer">
                            <RadioGroupItem value="3" id="option-3" className="border-purple-400 text-purple-600" />
                            <Label htmlFor="option-3" className="text-md font-medium text-purple-900 flex-1 cursor-pointer">
                                A utilização de variáveis globais para compartilhar estado entre todas as funções do programa.
                            </Label>
                        </div>

                        <div className="flex items-center space-x-4 p-4 rounded-xl border border-purple-200 bg-white/70 hover:bg-purple-50/70 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer">
                            <RadioGroupItem value="4" id="option-4" className="border-purple-400 text-purple-600" />
                            <Label htmlFor="option-4" className="text-md font-medium text-purple-900 flex-1 cursor-pointer">
                                A compilação Just-In-Time (JIT) como requisito principal para a execução do código.
                            </Label>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>
        </div>
    );
}