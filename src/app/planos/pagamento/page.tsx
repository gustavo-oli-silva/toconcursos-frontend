"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Check, CreditCard, Lock, Loader2, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/project/landing_page/Footer"
import { PlanoService } from "@/lib/services/plano/PlanoService"
import { useRouter, useSearchParams } from "next/navigation"
import { PagamentoRequest } from "@/types/plano/Pagamento"

interface PlanoData {
  id: number
  nome: string
  descricao: string
  valor: number
  beneficios: string | string[]
}

export default function PagamentoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Estado do plano
  const [plano, setPlano] = useState<PlanoData | null>(null)
  const [loadingPlano, setLoadingPlano] = useState(true)
  
  // Estados do formulário
  const [activeTab, setActiveTab] = useState("cartao")
  const [cardNumber, setCardNumber] = useState("")
  const [validity, setValidity] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")
  const [cpf, setCpf] = useState("")
  const [saveCard, setSaveCard] = useState(false)
  const [coupon, setCoupon] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    carregarPlano()
  }, [])

  const carregarPlano = async () => {
    try {
      setLoadingPlano(true)
      const planoId = searchParams.get('planoId')
      
      if (!planoId) {
        alert('ID do plano não encontrado')
        router.push('/planos')
        return
      }

      const response = await PlanoService.buscarPlanoPorId(Number(planoId))
      
      if (response.status === 'success') {
        // Processar beneficios se vier como string JSON
        const planoData = {
          ...response.data,
          beneficios: typeof response.data.beneficios === 'string' 
            ? JSON.parse(response.data.beneficios) 
            : response.data.beneficios
        }
        setPlano(planoData)
      } else {
        alert('Erro ao carregar plano')
        router.push('/planos')
      }
    } catch (err) {
      console.error('Erro ao carregar plano:', err)
      alert('Erro ao carregar plano')
      router.push('/planos')
    } finally {
      setLoadingPlano(false)
    }
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "")
    const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || cleaned
    return formatted.substring(0, 19)
  }

  const formatValidity = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    if (cleaned.length >= 2) {
      return cleaned.substring(0, 2) + "/" + cleaned.substring(2, 4)
    }
    return cleaned
  }

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, "")
    const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    return formatted.substring(0, 14)
  }

  const validarFormulario = (): boolean => {
    if (!acceptTerms) {
      alert('Você precisa aceitar os termos e condições')
      return false
    }

    if (activeTab === 'cartao') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
        alert('Número do cartão inválido')
        return false
      }
      if (!validity || validity.length !== 5) {
        alert('Validade inválida')
        return false
      }
      if (!cvv || cvv.length < 3) {
        alert('CVV inválido')
        return false
      }
      if (!cardName) {
        alert('Nome do titular é obrigatório')
        return false
      }
      if (!cpf || cpf.replace(/\D/g, '').length !== 11) {
        alert('CPF inválido')
        return false
      }
    }

    return true
  }

  const handleFinalizarCompra = async () => {
    if (!plano) return
    
    if (!validarFormulario()) return

    setIsProcessing(true)

    try {
      const pagamentoData: any = {
        id_plano: plano.id,
        tipo: activeTab === 'pix' ? 'pix' : 'cartao',
        valor: plano.valor,
      }

      // Sempre adiciona objeto cartao, mesmo vazio para PIX
      if (activeTab === 'cartao') {
        pagamentoData.cartao = {
          numero: cardNumber.replace(/\s/g, ''),
          validade: validity,
          nome_titular: cardName,
          codigo_seguranca: cvv,
        }
      } else {
        // Para PIX, envia objeto cartao vazio ou com valores padrão
        pagamentoData.cartao = {
          numero: "",
          validade: "",
          nome_titular: "",
          codigo_seguranca: "",
        }
      }

      console.log('Dados enviados para API:', pagamentoData)

      const response = await PlanoService.assinarPlano(pagamentoData)

      if (response.status === 'success') {
        alert('Plano assinado com sucesso!')
        router.push('/') // ou outra página de sucesso
      } else {
        alert(response.message || 'Erro ao processar pagamento')
      }
    } catch (err: any) {
      console.error('Erro ao processar pagamento:', err)
      alert(err.response?.data?.message || 'Erro ao processar pagamento. Tente novamente.')
    } finally {
      setIsProcessing(false)
    }
  }

  const getBeneficiosArray = (): string[] => {
    if (!plano?.beneficios) return []
    return Array.isArray(plano.beneficios) ? plano.beneficios : []
  }

  if (loadingPlano) {
    return (
      <div>
        <div className="bg-[#f5f5f7] min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
        </div>
        <Footer />
      </div>
    )
  }

  if (!plano) {
    return null
  }

  const beneficiosArray = getBeneficiosArray()

  return (
    <div>
      <div className="bg-[#f5f5f7]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Botão Voltar */}
          <Button
            variant="ghost"
            onClick={() => router.push('/planos')}
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para planos
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Payment Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-0 shadow-sm">
                <div className="p-6">
                  <h1 className="text-xl font-semibold text-gray-900 mb-6">Finalizar Pedido</h1>

                  {/* Payment Method Tabs */}
                  <div className="flex gap-4 mb-6 border-b border-gray-200">
                    <button
                      onClick={() => setActiveTab("pix")}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === "pix"
                          ? "border-[#2E3192] text-[#2E3192]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                      </svg>
                      Pix
                    </button>
                    <button
                      onClick={() => setActiveTab("cartao")}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === "cartao"
                          ? "border-[#2E3192] text-[#2E3192]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                      </svg>
                      Cartão
                    </button>
                  </div>

                  {/* PIX Message */}
                  {activeTab === "pix" && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        Após finalizar a compra, você receberá o código PIX para realizar o pagamento.
                      </p>
                    </div>
                  )}

                  {/* Card Form */}
                  {activeTab === "cartao" && (
                    <div className="space-y-5">
                      <div>
                        <Label htmlFor="cardNumber" className="text-sm font-medium text-gray-700 mb-2 block">
                          Número do cartão <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <CreditCard className="w-5 h-5" />
                          </div>
                          <Input
                            id="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            className="bg-white border-2 border-gray-200 pl-11 pr-16 h-14 text-base font-medium tracking-wider focus:border-[#2E3192] focus:ring-2 focus:ring-[#2E3192]/20 transition-all rounded-lg shadow-sm hover:border-gray-300"
                          />
                          {cardNumber.startsWith("4") && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <div className="bg-[#1A1F71] text-white text-xs font-bold px-2.5 py-1 rounded">VISA</div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="validity" className="text-sm font-medium text-gray-700 mb-2 block">
                            Validade <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="validity"
                            placeholder="MM/AA"
                            value={validity}
                            onChange={(e) => setValidity(formatValidity(e.target.value))}
                            maxLength={5}
                            className="bg-white border-2 border-gray-200 h-14 text-base font-medium tracking-wider focus:border-[#2E3192] focus:ring-2 focus:ring-[#2E3192]/20 transition-all rounded-lg shadow-sm hover:border-gray-300"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-sm font-medium text-gray-700 mb-2 block">
                            CVV <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative">
                            <Input
                              id="cvv"
                              placeholder="000"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                              maxLength={4}
                              type="password"
                              className="bg-white border-2 border-gray-200 h-14 text-base font-medium tracking-wider focus:border-[#2E3192] focus:ring-2 focus:ring-[#2E3192]/20 transition-all rounded-lg shadow-sm hover:border-gray-300"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                              <Lock className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="cardName" className="text-sm font-medium text-gray-700 mb-2 block">
                          Nome no cartão <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="cardName"
                          placeholder="Nome completo"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value.toUpperCase())}
                          className="bg-white border-2 border-gray-200 h-14 text-base font-medium tracking-wider focus:border-[#2E3192] focus:ring-2 focus:ring-[#2E3192]/20 transition-all rounded-lg shadow-sm hover:border-gray-300"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cpf" className="text-sm font-medium text-gray-700 mb-2 block">
                          CPF do titular <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="cpf"
                          placeholder="000.000.000-00"
                          value={cpf}
                          onChange={(e) => setCpf(formatCPF(e.target.value))}
                          className="bg-white border-2 border-gray-200 h-14 text-base font-medium tracking-wider focus:border-[#2E3192] focus:ring-2 focus:ring-[#2E3192]/20 transition-all rounded-lg shadow-sm hover:border-gray-300"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <Checkbox
                          id="saveCard"
                          checked={saveCard}
                          onCheckedChange={(checked) => setSaveCard(checked as boolean)}
                          className="data-[state=checked]:bg-[#2E3192] data-[state=checked]:border-[#2E3192]"
                        />
                        <Label htmlFor="saveCard" className="text-sm text-gray-700 cursor-pointer">
                          Salvar cartão
                        </Label>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="bg-white border-0 shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumo do Pedido</h2>

                  {/* Plan Details */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <span>Tipo de Plano</span>
                      <span>Valor</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">{plano.nome}</span>
                      <span className="text-sm font-semibold text-gray-900">
                        R${plano.valor.toFixed(2)} /mês
                      </span>
                    </div>
                  </div>

                  {/* Benefits */}
                  {beneficiosArray.length > 0 && (
                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <p className="text-xs text-gray-500 mb-3">Benefícios</p>
                      <div className="space-y-2">
                        {beneficiosArray.map((beneficio, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-gray-700">{beneficio}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Coupon */}
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Cupom de Desconto"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                      />
                      <Button className="bg-[#2E3192] hover:bg-[#252880] text-white px-6">
                        Aplicar
                      </Button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="border-t border-gray-200 pt-4 mb-2">
                    <div className="flex justify-between text-sm text-gray-500 mb-3">
                      <span>Subtotal</span>
                      <span>R${plano.valor.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-base font-bold text-gray-900">
                      R${plano.valor.toFixed(2)}
                    </span>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start gap-2 mb-4">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                      className="mt-0.5"
                    />
                    <Label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer leading-relaxed">
                      Declaro que li e aceito os{" "}
                      <a href="#" className="text-[#2E3192] underline">
                        Termos e condições de uso
                      </a>
                    </Label>
                  </div>

                  {/* Checkout Button */}
                  <Button
                    onClick={handleFinalizarCompra}
                    disabled={isProcessing}
                    className="w-full bg-[#2E3192] hover:bg-[#252880] text-white font-medium py-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processando...
                      </span>
                    ) : (
                      'Finalizar Compra'
                    )}
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}