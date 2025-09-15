import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Badge } from "../ui/badge"
import { IQuestao } from "@/types/questao/IQuestao"
import ListaComentarios from "./comentario/ListaComentarios"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface QuestaoProps {
    questao: IQuestao;
    onAlternativaSelect?: (alternativaId: number) => void;
    alternativaSelecionada?: number;
    mostrarComentarios?: boolean;
}

export function Questao({ 
    questao, 
    onAlternativaSelect, 
    alternativaSelecionada,
    mostrarComentarios = true 
}: QuestaoProps) {
    const handleAlternativaChange = (value: string) => {
        const alternativaId = parseInt(value);
        onAlternativaSelect?.(alternativaId);
    };

    return (
        <article className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 rounded-2xl shadow-xl border border-slate-200/50">
            <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl shadow-sm">
                <CardHeader className="p-6 md:p-8 space-y-4">
                    {/* Informações básicas da questão */}
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                        <Badge variant="secondary" className="text-xs">
                            {questao.banca.label}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                            {questao.orgao.label}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                            {questao.instituicao.label}
                        </Badge>
                        <Badge 
                            variant={questao.dificuldade === 'Fácil' ? 'default' : 
                                   questao.dificuldade === 'Médio' ? 'secondary' : 'destructive'}
                            className="text-xs"
                        >
                            {questao.dificuldade}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                            {questao.disciplina.label}
                        </Badge>
                    </div>

                    <CardTitle 
                        className="text-xl md:text-2xl font-bold text-slate-800 leading-tight text-center"
                        id={`questao-${questao.id}-titulo`}
                    >
                        {questao.enunciado}
                    </CardTitle>
                    
                    <CardDescription className="text-base md:text-lg text-slate-600 leading-relaxed text-center">
                        Analise as alternativas abaixo e selecione a resposta correta.
                    </CardDescription>
                </CardHeader>

                <CardContent className="px-6 md:px-8 pb-6 md:pb-8">
                    <fieldset>
                        <legend className="sr-only">
                            Alternativas para a questão {questao.id}
                        </legend>
                        
                        <RadioGroup 
                            value={alternativaSelecionada?.toString()} 
                            onValueChange={handleAlternativaChange}
                            className="space-y-3"
                            disabled={questao.ja_respondeu}
                            aria-describedby={`questao-${questao.id}-titulo`}
                        >
                            {questao.alternativas.map((alternativa, index) => (
                                <div 
                                    key={alternativa.id}
                                    className={`flex items-center space-x-4 p-4 rounded-lg border border-slate-200 bg-white hover:bg-purple-50/70 hover:border-slate-300 active:scale-[0.98] transition-all duration-150 ease-out cursor-pointer group ${
                                        questao.ja_respondeu && alternativa.is_correta 
                                            ? 'bg-green-50/70 border-green-300' 
                                            : ''
                                    } ${
                                        questao.ja_respondeu && 
                                        alternativaSelecionada === alternativa.id && 
                                        !alternativa.is_correta 
                                            ? 'bg-red-50/70 border-red-300' 
                                            : ''
                                    }`}
                                >
                                    <RadioGroupItem
                                        value={alternativa.id.toString()}
                                        id={`alternativa-${alternativa.id}`}
                                        className="border-slate-400 text-blue-600 group-hover:border-blue-500"
                                        aria-describedby={`alternativa-${alternativa.id}-descricao`}
                                    />
                                    <Label
                                        htmlFor={`alternativa-${alternativa.id}`}
                                        id={`alternativa-${alternativa.id}-descricao`}
                                        className="text-sm md:text-base font-medium text-slate-700 flex-1 cursor-pointer leading-relaxed"
                                    >
                                        <span className="font-semibold mr-2">
                                            {String.fromCharCode(65 + index)})
                                        </span>
                                        {alternativa.descricao}
                                        {questao.ja_respondeu && alternativa.is_correta && (
                                            <span className="ml-2 text-green-600 font-semibold">
                                                ✓ Resposta correta
                                            </span>
                                        )}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </fieldset>

                    {/* Feedback após responder */}
                    {questao.ja_respondeu && (
                        <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-sm text-slate-600 text-center">
                                Questão respondida. A resposta correta está destacada em verde.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Seção de Comentários */}
            {mostrarComentarios && questao.comentarios && questao.comentarios.length > 0 && (
                <section className="mt-6" aria-labelledby="comentarios-titulo">
                    <Accordion type="single" collapsible className="w-full" >
                        <AccordionItem value="comentarios">
                            <AccordionTrigger className="w-full bg-white/80 backdrop-blur-sm rounded-t-xl border border-slate-200/60 shadow-sm px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-purple-50/70 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Comentários ({questao.comentarios.length})
                            </AccordionTrigger>
                            <AccordionContent className="border border-t-0 border-slate-200/60 rounded-b-xl bg-white/80 backdrop-blur-sm shadow-sm p-4">
                                <ListaComentarios 
                                    questao={questao} 
                                    comentarios={questao.comentarios} 
                                />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </section>
            )}
        </article>
    )
}