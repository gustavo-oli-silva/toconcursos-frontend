import { Card, CardAction, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { useRef } from "react";
import { ComentarioService } from "@/lib/services/comentario/ComentarioService";

interface FormComentarioProps {
    questaoId: number;
    onComentarioAdicionado: (comentario: any) => void;
}

// ✅ APENAS cria comentários
export default function FormComentario({ questaoId, onComentarioAdicionado }: FormComentarioProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleEnviarComentario = async () => {
        if (!textareaRef.current?.value.trim()) return;

        try {
            const comentario = {
                comentario: textareaRef.current.value,
                id_questao: questaoId,
            };

            const novoComentario = await ComentarioService.criarComentario(comentario, "token");
          
            toast.success("Comentário enviado com sucesso!");
            textareaRef.current.value = "";
            onComentarioAdicionado(novoComentario);
        } catch (error) {
            console.error("Erro ao enviar comentário:", error);
            toast.error("Erro ao enviar comentário. Tente novamente.");
        }
    };

    return (
        <Card className="bg-slate-50/50 border-slate-200">
            <CardContent className="p-4">
                <Textarea
                    ref={textareaRef}
                    placeholder="Escreva um comentário..."
                    className="min-h-[100px] resize-none border-slate-200 focus:border-blue-300 focus:ring-blue-100"
                />
            </CardContent>
            <CardAction className="flex justify-end self-end px-4 pb-4 pt-0">
                <Button 
                    onClick={handleEnviarComentario} 
                    className="relative px-6 py-2.5 font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-900 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out rounded-lg group overflow-hidden"
                    size="sm"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Enviar Comentário
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                </Button>
            </CardAction>
        </Card>
    );
}