import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Comentario } from "@/types/questao/Comentario";

export default function ComentarioCard(props: Comentario) {
    const dataFormatada = new Date(props.data_comentario).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <article 
            className="bg-white rounded-lg border border-slate-200 p-4 hover:border-slate-300 transition-colors"
            aria-labelledby={`comentario-${props.id}-autor`}
        >
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                    <Avatar className="h-8 w-8 border border-slate-200">
                        <AvatarImage 
                            src={props.usuario.avatar || "/default-avatar.png"} 
                            alt={`Avatar de ${props.usuario.nome}`} 
                        />
                        <AvatarFallback className="text-xs font-medium bg-slate-100 text-slate-600">
                            {props.usuario.nome.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 
                            id={`comentario-${props.id}-autor`}
                            className="text-sm font-semibold text-slate-800"
                        >
                            {props.usuario.nome}
                        </h4>
                        <time 
                            dateTime={props.data_comentario}
                            className="text-xs text-slate-500"
                            title={`Comentário feito em ${dataFormatada}`}
                        >
                            {dataFormatada}
                        </time>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed break-words">
                        {props.comentario}
                    </p>
                </div>
            </div>
        </article>
    )
}