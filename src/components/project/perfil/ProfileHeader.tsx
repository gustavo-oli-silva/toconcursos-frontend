"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Usuario } from "@/types/usuario/Usuario"
import { Calendar1, Target, Edit3, Camera, Trash2 } from "lucide-react"
import { useState, useRef } from "react"
import { DialogGenerico } from "../dialogs/DialogGenerico"
import ChangeGoalForm, { ChangeGoalFormRef } from "../forms/ChangeGoalForm"
import { PerfilService } from "@/lib/services/perfil/PerfilService"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"



interface ProfileHeaderProps {
  usuario: Usuario
  onProfileUpdate?: () => void
}

export function ProfileHeader({ usuario, onProfileUpdate }: ProfileHeaderProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const formRef = useRef<ChangeGoalFormRef>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { refreshUser } = useAuth();
  const initials = usuario?.nome
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  function extractSince(createdAt: string): string {
    const date = new Date(createdAt);
    return date.getFullYear().toString();
  }

  const handleAvatarClick = () => {
    if (!isUploadingAvatar) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tipo de arquivo
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Formato de arquivo não suportado. Use PNG, JPG, JPEG ou WEBP.');
      return;
    }

    // Validar tamanho (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Arquivo muito grande. O tamanho máximo é 5MB.');
      return;
    }

    try {
      setIsUploadingAvatar(true);
      toast.loading('Fazendo upload do avatar...', { id: 'avatar-upload' });
      
      await PerfilService.uploadAvatar(file);
      
      toast.success('Avatar atualizado com sucesso!', { id: 'avatar-upload' });
      onProfileUpdate?.(); // Recarrega o perfil para mostrar a nova imagem
      await refreshUser(); // Atualiza o usuário no contexto (header)
    } catch (error) {
      console.error('Erro ao fazer upload do avatar:', error);
      toast.error('Erro ao atualizar avatar. Tente novamente.', { id: 'avatar-upload' });
    } finally {
      setIsUploadingAvatar(false);
      // Limpar o input para permitir upload do mesmo arquivo novamente se necessário
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveAvatar = async (event: React.MouseEvent) => {
    event.stopPropagation(); // Evita que o clique abra o seletor de arquivos
    
    if (!usuario?.avatar || isUploadingAvatar) return;

    try {
      setIsUploadingAvatar(true);
      toast.loading('Removendo avatar...', { id: 'avatar-remove' });
      
      await PerfilService.deleteAvatar();
      
      toast.success('Avatar removido com sucesso!', { id: 'avatar-remove' });
      onProfileUpdate?.(); // Recarrega o perfil
      await refreshUser(); // Atualiza o usuário no contexto (header)
    } catch (error) {
      console.error('Erro ao remover avatar:', error);
      toast.error('Erro ao remover avatar. Tente novamente.', { id: 'avatar-remove' });
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  return (
    <Card className="border-l-4 border-l-primary p-6 bg-card">

      {/* Profile Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Avatar com upload */}
        <div className="relative">
          <Avatar 
            className="h-24 w-24 flex-shrink-0 border-2 border-border cursor-pointer group"
            onClick={handleAvatarClick}
          >
            <AvatarImage src={usuario?.avatar || undefined} alt={usuario?.nome} />
            <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold">
              {initials}
            </AvatarFallback>
            
            {/* Overlay com ícones */}
            <div className={`
              absolute inset-0 rounded-full bg-black/40 flex items-center justify-center
              transition-opacity duration-200
              ${isUploadingAvatar ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
            `}>
              {isUploadingAvatar ? (
                <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <div className="flex items-center gap-3">
                  <Camera className="h-6 w-6 text-white" />
                  {usuario?.avatar && (
                    <button
                      onClick={handleRemoveAvatar}
                      className="p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                      title="Remover avatar"
                    >
                      <Trash2 className="h-4 w-4 text-white" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </Avatar>
          
          {/* Input file oculto */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpg,image/jpeg,image/webp"
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploadingAvatar}
          />
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground mb-4">{usuario?.nome}</h3>
          <div className="mb-4">
            <p className="text-xs text-muted-foreground font-medium">Email</p>
            <p className="text-sm font-medium text-foreground">{usuario?.email}</p>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <div 
            className="bg-background rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group relative" 
            onClick={() => setIsOpening(true)}
          >
            <div className="flex items-start gap-3 w-full">
              <Target className="text-2xl text-primary" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">Objetivo</p>
                <p className="text-sm font-bold text-foreground">{usuario?.objetivo?.nome || "Não definido"}</p>
              </div>  
              <Edit3 className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3" />
            </div>
          </div>
          <div className="bg-background rounded-lg p-4 flex items-center justify-center">
            <div className="flex items-start gap-3">
              <Calendar1 className="text-2xl text-primary" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">Membro desde</p>
                <p className="text-sm font-bold text-foreground">{extractSince(usuario?.data_criacao)}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Stats Cards */}

    <DialogGenerico 
      isOpen={isOpening} 
      onOpenChange={setIsOpening} 
      title="Alterar Objetivo"
      confirmLabel="Salvar"
      cancelLabel="Cancelar"
      onConfirm={() => {
        formRef.current?.submitForm();
      }}
      onCancel={() => setIsOpening(false)}
      confirmDisabled={formRef.current?.isSubmitting}
    >
      <ChangeGoalForm 
        ref={formRef}
        onSuccess={() => {
          setIsOpening(false)
          toast.success("Objetivo atualizado com sucesso!")
          onProfileUpdate?.()
        }} 
      />
    </DialogGenerico>
    </Card>

  )
}
