import { Comentario } from "@/types/questao/Comentario";
import ComentarioCard from "./ComentarioCard";
import { IQuestao } from "@/types/questao/IQuestao";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

interface ListaComentariosProps {
    questao: IQuestao; 
    comentarios: Comentario[];
}

export default function ListaComentarios({ questao, comentarios }: ListaComentariosProps) {
    return (
        <Card className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-xl shadow-sm">
            <CardHeader className="p-6">
                <CardTitle 
                    id="comentarios-titulo" 
                    className="text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2"
                >
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    Comentários ({comentarios.length})
                </CardTitle>
            </CardHeader>
            <CardContent className="px-6 pb-6">
                {comentarios.length === 0 ? (
                    <div className="text-center py-8">
                        <MessageCircle className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">Ainda não há comentários para esta questão.</p>
                    </div>
                ) : (
                    <div className="space-y-4" role="list" aria-label="Lista de comentários">
                        {comentarios.map((comentario, index) => (
                            <div key={comentario.id} role="listitem">
                                <ComentarioCard {...comentario} />
                                {index < comentarios.length - 1 && (
                                    <hr className="mt-4 border-slate-200" />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}