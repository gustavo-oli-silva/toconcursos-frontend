import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
            className="bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200"
            aria-labelledby={`comentario-${props.id}-autor`}
        >
            <CardHeader className="pb-2 px-4 pt-4">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                        <Avatar className="h-10 w-10 border-2 border-slate-100">
                            <AvatarImage 
                                src={props.usuario.avatar || "/default-avatar.png"} 
                                alt={`Avatar de ${props.usuario.nome}`} 
                            />
                            <AvatarFallback className="text-sm font-medium bg-slate-100 text-slate-600">
                                {props.usuario.nome.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                        <CardTitle 
                            id={`comentario-${props.id}-autor`}
                            className="text-sm font-semibold text-slate-800 truncate"
                        >
                            {props.usuario.nome}
                        </CardTitle>
                        <time 
                            dateTime={props.data_comentario}
                            className="text-xs text-slate-500 block mt-1"
                            title={`Comentário feito em ${dataFormatada}`}
                        >
                            {dataFormatada}
                        </time>
                    </div>
                </div>
            </CardHeader>
            
            <CardContent className="pt-0 pb-4 px-4">
                <div className="ml-[52px]">
                    <p className="text-sm text-slate-700 leading-relaxed break-words">
                        {props.comentario}
                    </p>
                </div>
            </CardContent>

        </article>
    )
}