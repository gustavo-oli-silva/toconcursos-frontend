'use client';
import { ProfileHeader } from "@/components/project/perfil/ProfileHeader";
import { ProfileStats } from "@/components/project/perfil/ProfileStastics";
import { ProfileSubscriptions } from "@/components/project/perfil/ProfileSubscription";
import { PerfilService } from "@/lib/services/perfil/PerfilService";
import { PerfilUsuario } from "@/types/usuario/perfil/Perfil";
import { useEffect, useState } from "react";

export default function PerfilPage() {
    const [perfil, setPerfil] = useState<PerfilUsuario | null>(null);

    const loadPerfil = async () => {
        try {
            const perfilDoBackend = await PerfilService.getPerfil();
            setPerfil(perfilDoBackend);
        } catch (error) {
            console.error("Erro ao carregar perfil:", error);
        }
    };

    useEffect(() => {
        loadPerfil();
    }, []);

    return (
        <main className="min-h-screen bg-background">
            {/* Breadcrumb */}
            <div className="border-b border-border">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="text-sm text-muted-foreground">
                        <span>Início</span>
                        <span className="mx-2">/</span>
                        <span className="font-medium text-foreground">Perfil</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Info and Stats */}
                    <div className="lg:col-span-2 space-y-6">
                        <ProfileHeader 
                            usuario={perfil?.informacoes_basicas!} 
                            onProfileUpdate={loadPerfil}
                        />
                        <ProfileStats stats={perfil?.estatisticas!} />
                    </div>

                    {/* Right Column - Subscriptions */}
                    <div className="space-y-6">
                        <ProfileSubscriptions subscriptions={perfil?.assinaturas!} />
                    </div>
                </div>
            </div>

        </main>
    )
}

