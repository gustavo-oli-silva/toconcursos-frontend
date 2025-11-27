import { Card, CardContent } from "../ui/card"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { IQuestao } from "@/types/questao/IQuestao"
// Tipo ResolucaoQuestaoPayload definido localmente
interface ResolucaoQuestaoPayload {
    questao_id: number;
    is_certa: boolean;
}
import { useState, type ReactNode } from "react";
import ListaComentarios from "./comentario/ListaComentarios";
import FormComentario from "./comentario/FormComentario";
import { MessageCircle, Save, CheckCircle2, XCircle, Loader2, Scissors, Sparkles } from "lucide-react"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { Separator } from "../ui/separator"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { QuestaoService } from "@/lib/services/questao/QuestaoService"
import { IGeminiResposta } from "@/types/questao/IGeminiResposta"
import { MarkdownRenderer } from "./MarkdownRenderer"

interface QuestaoProps {
    questao: IQuestao;
    onAlternativaSelect?: (alternativaId: number) => void;
    mostrarComentarios?: boolean;
}

export function Questao({
    questao,
    onAlternativaSelect,
    mostrarComentarios = true
}: QuestaoProps) {
    const [comentarios, setComentarios] = useState(questao.comentarios || []);
    const [respostaSelecionada, setRespostaSelecionada] = useState<string | null>(null);
    const [questaoNumero] = useState(1);
    const [questaoRespondida, setQuestaoRespondida] = useState(questao.ja_respondeu || false);
    const [respostaCorreta, setRespostaCorreta] = useState<boolean | null>(null);
    const [alternativaEscolhidaId, setAlternativaEscolhidaId] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [alternativasEliminadas, setAlternativasEliminadas] = useState<Set<number>>(new Set());
    const [geminiResposta, setGeminiResposta] = useState<IGeminiResposta | null>(null);
    const [isLoadingGemini, setIsLoadingGemini] = useState(false);
    const [explicacaoAberta, setExplicacaoAberta] = useState<string | undefined>(undefined);
    
    const handleComentarioAdicionado = (novoComentario: any) => {
        setComentarios(prev => {
            const novaLista = [...prev, novoComentario];
            return novaLista;
        });
    };

    const handleAlternativaChange = (value: string) => {
        const alternativaId = parseInt(value);
        onAlternativaSelect?.(alternativaId);
    };

    const toggleEliminarAlternativa = (alternativaId: number, e: React.MouseEvent) => {
        e.stopPropagation(); // Previne que o radio seja selecionado ao clicar na tesoura
        setAlternativasEliminadas(prev => {
            const novasEliminadas = new Set(prev);
            if (novasEliminadas.has(alternativaId)) {
                novasEliminadas.delete(alternativaId);
            } else {
                novasEliminadas.add(alternativaId);
            }
            return novasEliminadas;
        });
    };

    const handleSalvar = () => {
        // Implementar lógica de salvar questão
        toast.success("Questão salva com sucesso!");
    };

    async function handleSubmit(respostaSelecionada: string | null): Promise<void> {
        if (!respostaSelecionada) {
            toast.error("Selecione uma alternativa!");
            return;
        }

        const alternativaSelecionada = questao.alternativas.find(
            (alt) => alt.id === parseInt(respostaSelecionada)
        );

        if (!alternativaSelecionada) {
            toast.error("Erro: alternativa não encontrada.");
            return;
        }

        setIsSubmitting(true);
        const alternativaId = parseInt(respostaSelecionada);
        const isCorreta = alternativaSelecionada.is_correta;

        try {
            const payload: ResolucaoQuestaoPayload = {
                questao_id: questao.id,
                is_certa: isCorreta
            };

            await QuestaoService.responderQuestao(payload);
            
            // Atualizar estados para feedback visual
            setQuestaoRespondida(true);
            setRespostaCorreta(isCorreta);
            setAlternativaEscolhidaId(alternativaId);

            // Feedback toast
            if (isCorreta) {
                toast.success("Parabéns! Resposta correta! 🎉");
            } else {
                toast.error("Resposta incorreta. Continue estudando!");
            }
        } catch (error) {
            console.error("Erro ao responder questão:", error);
            toast.error("Erro ao enviar resposta. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleBuscarExplicacaoIA(): Promise<void> {
        setIsLoadingGemini(true);
        try {
            const resposta = await QuestaoService.getGeminiResposta(questao.id);
            setGeminiResposta(resposta);
            setExplicacaoAberta("explicacao-ia");
        } catch (error) {
            console.error("Erro ao buscar explicação da IA:", error);
            toast.error("Erro ao buscar explicação da IA. Tente novamente.");
        } finally {
            setIsLoadingGemini(false);
        }
    }

    // Gerar ID da questão (ex: Q123456)
    const questaoId = `Q${String(questao.id).padStart(6, '0')}`;
    
    // Gerar contexto da prova (ex: PM-TO - 2024 - Soldado)
    const contextoProva = questao.instituicao?.label || questao.orgao?.label || 'Prova';
    const anoProva = new Date().getFullYear(); // Pode vir da questão se disponível


    return (
        <article className="w-full bg-white rounded-lg shadow-md border border-slate-200">
            <Card className="border-0 shadow-none">
                {/* Header com número, ID, contexto e botão Salvar */}
                <div className="px-6 py-4 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                                                       {/* ID da questão */}
                            <span className="text-sm font-medium text-slate-700">{questaoId}</span>
                            {/* Contexto da prova */}
                            <span className="text-sm text-slate-600">{contextoProva} - {anoProva}</span>
                        </div>
                        {/* Botão Salvar */}
                    </div>
                </div>

                <CardContent className="p-6">
                    {/* Seção de Metadados */}
                    <div className="mb-6 pb-4 border-b border-slate-200">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                            <span>Ano: {anoProva}</span>
                            <Separator orientation="vertical" className="h-4" />
                            <span>Banca: {questao.banca?.label || 'N/A'}</span>
                            <Separator orientation="vertical" className="h-4" />
                            <span>Disciplina: {questao.disciplina?.label || 'N/A'}</span>
                            <Separator orientation="vertical" className="h-4" />
                            <span className="truncate max-w-md">
                                Prova: {questao.instituicao?.label || questao.orgao?.label || 'N/A'}
                            </span>
                        </div>
                    </div>

                    {/* Texto da Questão */}
                    <div className="mb-6">
                        <div className="text-base text-slate-800 leading-relaxed space-y-2">
                            {questao.enunciado_linhas && questao.enunciado_linhas.length > 0 ? (
                                (() => {
                                    const isRomanItem = (line: string) =>
                                        /^\s*(I{1,3})\s*[\.\)]/.test(line);

                                    const nodes: ReactNode[] = [];
                                    let currentListItems: string[] = [];

                                    const flushList = () => {
                                        if (currentListItems.length > 0) {
                                            nodes.push(
                                                <ul
                                                    key={`ul-${nodes.length}`}
                                                    className="list-disc list-inside space-y-1 ml-4"
                                                >
                                                    {currentListItems.map((item, idx) => (
                                                        <li key={idx}>{item}</li>
                                                    ))}
                                                </ul>
                                            );
                                            currentListItems = [];
                                        }
                                    };

                                    questao.enunciado_linhas!.forEach((rawLine, idx) => {
                                        const line = rawLine.trim();
                                        if (!line) return;

                                        if (isRomanItem(line)) {
                                            currentListItems.push(line);
                                        } else {
                                            flushList();
                                            nodes.push(
                                                <p key={`p-${idx}`} className="mb-1">
                                                    {line}
                                                </p>
                                            );
                                        }
                                    });

                                    flushList();

                                    return nodes;
                                })()
                            ) : (
                                <p>{questao.enunciado}</p>
                            )}
                        </div>
                    </div>

                    {/* Feedback Banner */}
                    {questaoRespondida && respostaCorreta !== null && (
                        <div className={`mb-6 p-4 rounded-lg border-2 ${
                            respostaCorreta 
                                ? 'bg-green-50 border-green-200' 
                                : 'bg-red-50 border-red-200'
                        }`}>
                            <div className="flex items-center gap-3">
                                {respostaCorreta ? (
                                    <>
                                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-semibold text-green-800">
                                                Resposta Correta! 🎉
                                            </p>
                                            <p className="text-xs text-green-700 mt-0.5">
                                                Parabéns! Você acertou esta questão.
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-sm font-semibold text-red-800">
                                                Resposta Incorreta
                                            </p>
                                            <p className="text-xs text-red-700 mt-0.5">
                                                Continue estudando! A resposta correta está destacada abaixo.
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Alternativas */}
                    <fieldset className="mb-6">
                        <legend className="sr-only">
                            Alternativas para a questão {questao.id}
                        </legend>
                        <RadioGroup
                            className="space-y-3"
                            value={respostaSelecionada}
                            onValueChange={(value) => {
                                if (!questaoRespondida) {
                                    setRespostaSelecionada(value);
                                    handleAlternativaChange(value);
                                }
                            }}
                            disabled={questaoRespondida}
                        >
                            {questao.alternativas.map((alternativa, index) => {
                                const letra = String.fromCharCode(65 + index); // A, B, C, D
                                const foiEscolhida = alternativaEscolhidaId === alternativa.id;
                                const eCorreta = alternativa.is_correta;
                                const mostrarFeedback = questaoRespondida;
                                const estaEliminada = alternativasEliminadas.has(alternativa.id);

                                // Determinar classes baseado no estado
                                let containerClasses = "flex items-start gap-3 p-3 rounded-lg transition-all group relative";
                                let letraClasses = "flex items-center justify-center w-6 h-6 rounded-full border-2 mt-0.5 flex-shrink-0";
                                let labelClasses = "text-sm cursor-pointer flex-1 leading-relaxed";

                                if (mostrarFeedback) {
                                    if (eCorreta) {
                                        // Alternativa correta sempre em verde
                                        containerClasses += " bg-green-50 border border-green-200";
                                        letraClasses += " border-green-500 bg-green-100";
                                        labelClasses += " text-green-700 font-medium";
                                    } else if (foiEscolhida && !eCorreta) {
                                        // Alternativa escolhida mas errada em vermelho
                                        containerClasses += " bg-red-50 border border-red-200";
                                        letraClasses += " border-red-500 bg-red-100";
                                        labelClasses += " text-red-700 font-medium";
                                    } else {
                                        // Alternativas não escolhidas
                                        containerClasses += " opacity-60";
                                        letraClasses += " border-slate-300";
                                        labelClasses += " text-slate-500";
                                    }
                                } else {
                                    // Estado normal (não respondida)
                                    containerClasses += " hover:bg-slate-50";
                                    letraClasses += " border-slate-300";
                                    labelClasses += " text-slate-700";
                                }

                                // Aplicar efeitos de eliminação
                                if (estaEliminada) {
                                    labelClasses += " line-through opacity-50";
                                    containerClasses += " opacity-50";
                                }

                                return (
                                    <div key={alternativa.id} className={containerClasses}>
                                        <div className="flex items-center gap-2">
                                            {/* Ícone de tesoura - aparece apenas no hover e quando não está respondida */}
                                            {!questaoRespondida && (
                                                <button
                                                    type="button"
                                                    onClick={(e) => toggleEliminarAlternativa(alternativa.id, e)}
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 p-1 hover:bg-slate-100 rounded-md"
                                                    aria-label={estaEliminada ? "Restaurar alternativa" : "Eliminar alternativa"}
                                                >
                                                    <Scissors 
                                                        className={`w-4 h-4 transition-colors ${
                                                            estaEliminada 
                                                                ? 'text-orange-500' 
                                                                : 'text-slate-400 hover:text-slate-600'
                                                        }`} 
                                                    />
                                                </button>
                                            )}
                                            
                                            <div className={letraClasses}>
                                                <span className={`text-xs font-semibold ${
                                                    mostrarFeedback && eCorreta ? 'text-green-700' :
                                                    mostrarFeedback && foiEscolhida && !eCorreta ? 'text-red-700' :
                                                    'text-slate-700'
                                                }`}>
                                                    {letra}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <RadioGroupItem
                                            value={String(alternativa.id)}
                                            id={`alternativa-${questao.id}-${alternativa.id}`}
                                            disabled={questaoRespondida || estaEliminada}
                                            className={`mt-0.5 ${
                                                mostrarFeedback && eCorreta
                                                    ? 'border-green-500 text-green-600'
                                                    : mostrarFeedback && foiEscolhida && !eCorreta
                                                    ? 'border-red-500 text-red-600'
                                                    : 'border-slate-400 text-blue-600'
                                            } ${estaEliminada ? 'opacity-50' : ''}`}
                                        />
                                        <Label
                                            htmlFor={`alternativa-${questao.id}-${alternativa.id}`}
                                            className={labelClasses}
                                        >
                                            {alternativa.descricao}
                                        </Label>
                                        
                                        

                                        {mostrarFeedback && eCorreta && (
                                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        )}
                                        {mostrarFeedback && foiEscolhida && !eCorreta && (
                                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        )}
                                    </div>
                                );
                            })}
                        </RadioGroup>
                    </fieldset>

                    {/* Botões de Ação */}
                    <div className="flex justify-start gap-3">
                        {!questaoRespondida && (
                            <Button
                                onClick={() => handleSubmit(respostaSelecionada)}
                                disabled={!respostaSelecionada || isSubmitting}
                                className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    'Responder'
                                )}
                            </Button>
                        )}
                        
                        {/* Botão Explicação da IA - Só habilitado após responder e antes de gerar */}
                        <Button
                            onClick={handleBuscarExplicacaoIA}
                            disabled={!questaoRespondida || isLoadingGemini || !!geminiResposta}
                            variant="outline"
                            className="border-purple-300 text-purple-700 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            title={
                                !questaoRespondida 
                                    ? "Responda a questão primeiro para ver a explicação da IA" 
                                    : geminiResposta 
                                    ? "Explicação já gerada. Use o acordeon abaixo para visualizar" 
                                    : ""
                            }
                        >
                            {isLoadingGemini ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Gerando...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-4 h-4 mr-2" />
                                    Explicação da IA
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Seção de Explicação da IA - Acordeon */}
                    {geminiResposta && (
                        <div className="mt-6 border-t border-slate-200">
                            <Accordion 
                                type="single" 
                                collapsible 
                                className="w-full"
                                value={explicacaoAberta}
                                onValueChange={setExplicacaoAberta}
                            >
                                <AccordionItem value="explicacao-ia" className="border-none">
                                    <AccordionTrigger className="px-0 py-4 hover:no-underline hover:bg-transparent transition-colors">
                                        <div className="flex items-center gap-2 text-sm text-purple-700">
                                            <Sparkles className="w-4 h-4" />
                                            <span className="font-medium">Explicação da IA</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-0 pb-4 pt-0">
                                        <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200">
                                            <MarkdownRenderer content={geminiResposta.resposta} />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Seção de Comentários - Acordeon */}
            {mostrarComentarios && (
                <div className="border-t border-slate-200">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="comentarios" className="border-none">
                            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-2 text-sm text-slate-700">
                                    <MessageCircle className="w-4 h-4" />
                                    <span className="font-medium">Comentários ({comentarios.length})</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6 pt-0">
                                <div className="space-y-4">
                                    <ListaComentarios comentarios={comentarios} />
                                    <Separator />
                                    <FormComentario
                                        questaoId={questao.id}
                                        onComentarioAdicionado={handleComentarioAdicionado}
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            )}
        </article>
    )
}