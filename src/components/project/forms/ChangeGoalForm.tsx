"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ObjetivoService } from "@/lib/services/perfil/ObjetivoService";
import { PerfilService } from "@/lib/services/perfil/PerfilService";
import { Objetivo } from "@/types/usuario/perfil/Objetivo";

import { zodResolver } from "@hookform/resolvers/zod";
import { Target, Compass, Trophy, BookOpen, Zap, Heart } from "lucide-react";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface ChangeGoalFormProps {
    onSuccess: () => void;
}

export interface ChangeGoalFormRef {
    submitForm: () => void;
    isSubmitting: boolean;
}

const ChangeGoalForm = forwardRef<ChangeGoalFormRef, ChangeGoalFormProps>(({ onSuccess }, ref) => {
    const [objetivos, setObjetivos] = useState<Objetivo[]>([]);
    const [loading, setLoading] = useState(true);

    const loadObjetivos = async () => {
        try {
            setLoading(true);
            const data = await ObjetivoService.getObjetivos();
            setObjetivos(data);
        } catch (error) {
            console.error("Erro ao carregar objetivos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadObjetivos();
    }, []);

    // Agrupa objetivos por área
    const objetivosPorArea = objetivos.reduce((acc, objetivo) => {
        if (!acc[objetivo.area]) {
            acc[objetivo.area] = [];
        }
        acc[objetivo.area].push(objetivo);
        return acc;
    }, {} as Record<string, Objetivo[]>);

    const formSchema = z.object({
        objetivoId: z.string().min(1, "Escolha seu destino, concurseiro! 🎯"),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            objetivoId: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await PerfilService.updatePerfil({ id_objetivo: parseInt(values.objetivoId) });
            onSuccess();
        } catch (error) {
            console.error("Erro ao atualizar objetivo:", error);
        }
    }

    // Exposição da função de submit via ref
    useImperativeHandle(ref, () => ({
        submitForm: () => {
            form.handleSubmit(onSubmit)();
        },
        isSubmitting: form.formState.isSubmitting
    }));

    return (
        <div className="space-y-6">
            {/* Header motivacional */}
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-l-4 border-l-blue-500">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <Compass className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                            E aí, concurseiro! 👋
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            <span className="font-medium text-blue-700">"Para quem não sabe para onde vai, qualquer caminho serve."</span>
                            <br />
                            Mas você não é qualquer um! Vamos definir seu objetivo e traçar a rota rumo à aprovação? 🚀
                        </p>
                    </div>
                </div>
            </Card>

            {/* Badges motivacionais */}
            <div className="flex flex-wrap gap-2 justify-center">
                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
                    <Trophy className="h-3 w-3 mr-1" />
                    Foco no objetivo
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Estudo direcionado
                </Badge>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                    <Zap className="h-3 w-3 mr-1" />
                    Resultado garantido
                </Badge>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Card className="p-6 border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
                        <FormField
                            control={form.control}
                            name="objetivoId"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel className="text-base font-semibold text-gray-800 flex items-center gap-2">
                                        <Target className="h-5 w-5 text-blue-600" />
                                        Qual é o seu sonho de aprovação?
                                    </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                                        <FormControl>
                                            <SelectTrigger className="h-12 border-2 hover:border-blue-400 focus:border-blue-500 transition-colors">
                                                <SelectValue placeholder="Selecione seu objetivo..." />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="max-h-[300px] w-full">
                                            {loading ? (
                                                <SelectItem value="loading" disabled>
                                                    <div className="flex items-center gap-2">
                                                        <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                                                        Carregando seus objetivos...
                                                    </div>
                                                </SelectItem>
                                            ) : (
                                                Object.entries(objetivosPorArea).map(([area, objetivosArea]) => (
                                                    <SelectGroup key={area}>
                                                        <SelectLabel className="text-blue-700 font-semibold py-2">
                                                             {area}
                                                        </SelectLabel>
                                                        {objetivosArea.map((objetivo) => (
                                                            <SelectItem 
                                                                key={objetivo.id} 
                                                                value={objetivo.id.toString()}
                                                                className="hover:bg-blue-50 focus:bg-blue-50 py-3"
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    {objetivo.nome}
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectGroup>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage className="text-red-600 font-medium" />
                                </FormItem>
                            )}
                        />
                    </Card>

                </form>
            </Form>

            
        </div>
    );
});

ChangeGoalForm.displayName = "ChangeGoalForm";

export default ChangeGoalForm;