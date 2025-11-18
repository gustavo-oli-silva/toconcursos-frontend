import { Card, CardContent } from "../ui/card"
import { Label } from "../ui/label"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { IQuestao } from "@/types/questao/IQuestao"
import { useState } from "react";
import ListaComentarios from "./comentario/ListaComentarios";
import FormComentario from "./comentario/FormComentario";
import { MessageCircle, Save } from "lucide-react"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { Separator } from "../ui/separator"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

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

    const handleSalvar = () => {
        // Implementar lógica de salvar questão
        toast.success("Questão salva com sucesso!");
    };

    function handleSubmit(respostaSelecionada: string | null): void {
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

        if (alternativaSelecionada.is_correta) {
            toast.success("Resposta correta! 🎉");
        } else {
            toast.error("Resposta incorreta.");
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
                        <Button
                            onClick={handleSalvar}
                            variant="default"
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Salvar
                        </Button>
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
                        <p className="text-base text-slate-800 leading-relaxed">
                            {questao.enunciado}
                        </p>
                    </div>

                    {/* Alternativas */}
                    <fieldset className="mb-6">
                        <legend className="sr-only">
                            Alternativas para a questão {questao.id}
                        </legend>
                        <RadioGroup
                            className="space-y-3"
                            value={respostaSelecionada}
                            onValueChange={(value) => {
                                setRespostaSelecionada(value);
                                handleAlternativaChange(value);
                            }}
                        >
                            {questao.alternativas.map((alternativa, index) => {
                                const letra = String.fromCharCode(65 + index); // A, B, C, D
                                return (
                                    <div key={alternativa.id} className="flex items-start gap-3">
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-slate-300 mt-0.5 flex-shrink-0">
                                            <span className="text-xs font-semibold text-slate-700">{letra}</span>
                                        </div>
                                        <RadioGroupItem
                                            value={String(alternativa.id)}
                                            id={`alternativa-${questao.id}-${alternativa.id}`}
                                            disabled={questao.ja_respondeu}
                                            className="mt-0.5 border-slate-400 text-blue-600"
                                        />
                                        <Label
                                            htmlFor={`alternativa-${questao.id}-${alternativa.id}`}
                                            className={
                                                questao.ja_respondeu && alternativa.is_correta
                                                    ? "text-green-600 font-medium cursor-pointer flex-1 text-sm"
                                                    : "text-sm text-slate-700 cursor-pointer flex-1 leading-relaxed"
                                            }
                                        >
                                            {alternativa.descricao}
                                        </Label>
                                    </div>
                                );
                            })}
                        </RadioGroup>
                    </fieldset>

                    {/* Botão Responder */}
                    <div className="flex justify-start">
                        <Button
                            onClick={() => handleSubmit(respostaSelecionada)}
                            disabled={questao.ja_respondeu || !respostaSelecionada}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            Responder
                        </Button>
                    </div>
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