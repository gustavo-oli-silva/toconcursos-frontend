import { Comentario } from "@/types/questao/Comentario";
import ComentarioCard from "./ComentarioCard";
import { MessageCircle } from "lucide-react";

interface ListaComentariosProps {
    comentarios: Comentario[];
}

export default function ListaComentarios({ comentarios }: ListaComentariosProps) {
    return (
        <div className="space-y-3">
            {comentarios.length === 0 ? (
                <div className="text-center py-8 bg-slate-50 rounded-lg border border-slate-200">
                    <MessageCircle className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-600">Ainda não há comentários para esta questão.</p>
                    <p className="text-xs text-slate-500 mt-1">Seja o primeiro a comentar!</p>
                </div>
            ) : (
                <div 
                    className="max-h-96 overflow-y-auto pr-2 space-y-3" 
                    role="list" 
                    aria-label="Lista de comentários"
                >
                    {comentarios.map((comentario, index) => (
                        <div key={comentario.id || `comentario-${index}-${Date.now()}`} role="listitem">
                            <ComentarioCard {...comentario} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}