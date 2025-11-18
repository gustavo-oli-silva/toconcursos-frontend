import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRef } from "react";
import { ComentarioService } from "@/lib/services/comentario/ComentarioService";

interface FormComentarioProps {
    questaoId: number;
    onComentarioAdicionado: (comentario: any) => void;
}

export default function FormComentario({ questaoId, onComentarioAdicionado }: FormComentarioProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleEnviarComentario = async () => {
        if (!textareaRef.current?.value.trim()) {
            toast.error("Digite um comentário antes de enviar.");
            return;
        }

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
        <div className="space-y-3">
            <Textarea
                ref={textareaRef}
                placeholder="Escreva um comentário..."
                className="min-h-[100px] resize-none bg-white border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
            <div className="flex justify-end">
                <Button 
                    onClick={handleEnviarComentario}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    size="sm"
                >
                    Enviar Comentário
                </Button>
            </div>
        </div>
    );
}