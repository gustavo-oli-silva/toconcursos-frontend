"use client";

import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AppHeader } from "@/components/project/AppHeader"
import { Footer } from "@/components/project/landing_page/Footer"
import { useState, useEffect } from "react"
import { PlanoService } from "@/lib/services/plano/PlanoService"
import { useRouter } from "next/navigation"
import { Plano } from "@/types/plano/Plano";

export default function PlanosPage() {
  const router = useRouter()
  const [planos, setPlanos] = useState<Plano[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadingPlanoId, setLoadingPlanoId] = useState<number | null>(null)

  useEffect(() => {
    carregarPlanos()
  }, [])

  const carregarPlanos = async () => {
    try {
      setLoading(true)
      const response = await PlanoService.buscarTodosPlanos(0, 100)
      
      if (response.status === 'success') {
        // Processar beneficios de string JSON para array
        const planosProcessados = response.data.map((plano: Plano) => ({
          ...plano,
          beneficios: typeof plano.beneficios === 'string' 
            ? JSON.parse(plano.beneficios) 
            : plano.beneficios
        }))
        setPlanos(planosProcessados)
      } else {
        setError('Erro ao carregar planos')
      }
    } catch (err) {
      setError('Erro ao carregar planos')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleEscolherPlano = (plano: Plano) => {
    setLoadingPlanoId(plano.id)
    
    try {
      // Redireciona para a página de pagamento com o ID do plano como query parameter
      router.push(`/planos/pagamento?planoId=${plano.id}`)
    } catch (err) {
      console.error('Erro ao processar plano:', err)
      alert('Erro ao processar plano. Tente novamente.')
      setLoadingPlanoId(null)
    }
  }

  if (loading) {
    return (
      <div>
        <AppHeader />
        <div className="bg-[#f5f5f7] px-6 py-8">
          <div className="mx-auto max-w-[1200px] flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <AppHeader />
        <div className="bg-[#f5f5f7] px-6 py-8">
          <div className="mx-auto max-w-[1200px]">
            <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-center">
              <p className="text-red-800 text-sm">{error}</p>
              <Button 
                onClick={carregarPlanos}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700"
              >
                Tentar novamente
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <AppHeader />
      <div className="bg-[#f5f5f7] px-6 py-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-8 border-l-[3px] border-l-indigo-600 pl-3">
            <h1 className="text-[15px] font-semibold text-gray-900">Planos</h1>
          </div>

          {planos.length === 0 ? (
            <div className="rounded-lg bg-white p-8 text-center shadow-sm">
              <p className="text-gray-600 text-sm">Nenhum plano disponível no momento.</p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {planos.map((plano) => (
                <div
                  key={plano.id}
                  className="flex flex-col rounded-lg border-l-[4px] border-l-indigo-600 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4">
                    <h2 className="text-[18px] font-semibold text-gray-900">{plano.nome}</h2>
                    <p className="text-[13px] text-gray-500">{plano.descricao}</p>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-[14px] font-medium text-gray-900">R$</span>
                      <span className="text-[32px] font-bold text-gray-900">
                        {plano.valor}
                      </span>
                      <span className="text-[13px] text-gray-500">/ mês</span>
                    </div>
                  </div>

                  <ul className="mb-8 flex-grow space-y-2.5">
                    {plano.beneficios && Array.isArray(plano.beneficios) && plano.beneficios.length > 0 ? (
                      plano.beneficios.map((beneficio, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <Check className="mt-[2px] h-[14px] w-[14px] flex-shrink-0 text-gray-600" strokeWidth={2.5} />
                          <span className="text-[13px] leading-relaxed text-gray-700">{beneficio}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-[13px] text-gray-500 italic">Sem benefícios listados</li>
                    )}
                  </ul>

                  <Button 
                    onClick={() => handleEscolherPlano(plano)}
                    disabled={loadingPlanoId === plano.id}
                    className="w-full rounded-md bg-indigo-600 py-5 text-[14px] font-medium text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingPlanoId === plano.id ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processando...
                      </span>
                    ) : (
                      'Escolher plano'
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}