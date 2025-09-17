import { Comentario } from "@/types/questao/Comentario";
import ComentarioCard from "./ComentarioCard";
import { IQuestao } from "@/types/questao/IQuestao";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {ComentarioService} from "@/lib/services/comentario/ComentarioService";
import { toast } from "sonner";
interface ListaComentariosProps {
    comentarios: Comentario[];
}

export default function ListaComentarios({ comentarios }: ListaComentariosProps) {

   
    return (
        <main className="space-y-4">
            {comentarios.length === 0 ? (
                <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 text-sm">Ainda não há comentários para esta questão.</p>
                    <p className="text-slate-400 text-xs mt-1">Seja o primeiro a comentar!</p>
                </div>
            ) : (
                <div 
                    className="max-h-96 overflow-y-auto pr-2 space-y-3 scrollbar-thin" 
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
        </main>
    )
}