import {
  Card,
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
            className="bg-slate-50/50 rounded-lg border border-slate-200/50"
            aria-labelledby={`comentario-${props.id}-autor`}
        >
            <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage 
                            src={props.usuario.avatar || "/default-avatar.png"} 
                            alt={`Avatar de ${props.usuario.nome}`} 
                        />
                        <AvatarFallback className="text-sm">
                            {props.usuario.nome.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <CardTitle 
                        id={`comentario-${props.id}-autor`}
                        className="text-base font-semibold text-slate-800"
                    >
                        {props.usuario.nome}
                    </CardTitle>
                </div>
            </CardHeader>
            
            <CardContent className="pt-0 pb-3">
                <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                    {props.comentario}
                </p>
            </CardContent>
            
            <CardFooter className="pt-0">
                <time 
                    dateTime={props.data_comentario}
                    className="text-xs text-slate-500"
                    title={`Comentário feito em ${dataFormatada}`}
                >
                    {dataFormatada}
                </time>
            </CardFooter>
        </article>
    )
}