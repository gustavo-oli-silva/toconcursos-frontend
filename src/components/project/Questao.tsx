import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Badge } from "../ui/badge"
import { IQuestao } from "@/types/questao/IQuestao"
import { useState } from "react";
import ListaComentarios from "./comentario/ListaComentarios";
import FormComentario from "./comentario/FormComentario";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MessageCircle } from "lucide-react"

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
    const [comentarios, setComentarios] = useState(questao.comentarios || []);

    const handleComentarioAdicionado = (novoComentario: any) => {
   
        setComentarios(prev => {
            const novaLista = [...prev, novoComentario];
            // Adicione este log para ver a lista completa antes de renderizar
            return novaLista;
        });
    };

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
           {mostrarComentarios && (
                <section className="mt-8" aria-labelledby="comentarios-titulo">
                    <Card className="bg-white/90 backdrop-blur-sm border border-slate-200/60 shadow-lg rounded-xl overflow-hidden">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="comentarios" className="border-none">
                                <AccordionTrigger className="w-full bg-gradient-to-r from-slate-50 to-blue-50/30 px-6 py-4 text-left hover:bg-gradient-to-r hover:from-slate-100 hover:to-blue-50/50 transition-all duration-200 border-b border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-full">
                                            <MessageCircle className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-800">
                                                Comentários ({comentarios.length})
                                            </h3>
                                            <p className="text-xs text-slate-500">
                                                Participe da discussão sobre esta questão
                                            </p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="p-6 bg-white">
                                    <div className="space-y-6">
                                        <ListaComentarios comentarios={comentarios} />
                                        <div className="border-t pt-4">
                                            <FormComentario 
                                                questaoId={questao.id}
                                                onComentarioAdicionado={handleComentarioAdicionado}
                                            />
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </Card>
                </section>
            )}
        </article>
    )
}