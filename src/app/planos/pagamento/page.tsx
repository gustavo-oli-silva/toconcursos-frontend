"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Check, CreditCard, Lock, Loader2, ArrowLeft, Copy, QrCode, FileText, CheckCircle2 } from "lucide-react"
import { Footer } from "@/components/project/landing_page/Footer"
import { PlanoService } from "@/lib/services/plano/PlanoService"
import { useRouter, useSearchParams } from "next/navigation"
import { PagamentoRequest } from "@/types/plano/Pagamento"
import { ToastService } from "@/lib/services/toast/ToastService"

interface PlanoData {
  id: number
  nome: string
  descricao: string
  valor: number
  beneficios: string | string[]
}

interface PagamentoResponse {
  id: number
  id_plano: number
  tipo: 'pix' | 'cartao' | 'boleto'
  valor: number
  data_pagamento: string
  chave_pix?: string
  codigo_barras?: string
  cartao?: any
}

export default function PagamentoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Estado do plano
  const [plano, setPlano] = useState<PlanoData | null>(null)
  const [loadingPlano, setLoadingPlano] = useState(true)
  
  // Estados do formulário
  const [activeTab, setActiveTab] = useState<"pix" | "cartao" | "boleto">("pix")
  const [cardNumber, setCardNumber] = useState("")
  const [validity, setValidity] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")
  const [cpf, setCpf] = useState("")
  const [saveCard, setSaveCard] = useState(false)
  const [coupon, setCoupon] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  
  // Estados do modal de pagamento
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [pagamentoInfo, setPagamentoInfo] = useState<PagamentoResponse | null>(null)

  useEffect(() => {
    const planoId = searchParams.get('planoId')
    
    if (planoId) {
      carregarPlano(Number(planoId))
    } else {
      setLoadingPlano(false)
      ToastService.error('ID do plano não encontrado')
      router.push('/planos')
    }
  }, [searchParams, router])

  const carregarPlano = async (planoId: number) => {
    try {
      setLoadingPlano(true)
      const data = await PlanoService.buscarPlanoPorId(planoId)
      if (data) {
        setPlano(data)
      } else {
        ToastService.error('Plano não encontrado')
        router.push('/planos')
      }
    } catch (err) {
      console.error('Erro ao carregar plano:', err)
      ToastService.error('Erro ao carregar plano. Tente novamente.')
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

  const formatCodigoBarras = (codigo: string) => {
    // Formata código de barras em grupos de 5 dígitos
    return codigo.match(/.{1,5}/g)?.join(" ") || codigo
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      ToastService.success(`${type} copiado para a área de transferência!`)
    } catch (err) {
      ToastService.error('Erro ao copiar. Tente novamente.')
    }
  }

  const validarFormulario = (): boolean => {
    if (!acceptTerms) {
      ToastService.error('Você precisa aceitar os termos e condições')
      return false
    }

    if (activeTab === 'cartao') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
        ToastService.error('Número do cartão inválido')
        return false
      }
      if (!validity || validity.length !== 5) {
        ToastService.error('Validade inválida')
        return false
      }
      if (!cvv || cvv.length < 3) {
        ToastService.error('CVV inválido')
        return false
      }
      if (!cardName) {
        ToastService.error('Nome do titular é obrigatório')
        return false
      }
      if (!cpf || cpf.replace(/\D/g, '').length !== 11) {
        ToastService.error('CPF inválido')
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
      const pagamentoData: PagamentoRequest = {
        id_plano: plano.id,
        tipo: activeTab,
        valor: plano.valor,
      }

      // Apenas adiciona cartão se for pagamento com cartão
      if (activeTab === 'cartao') {
        pagamentoData.cartao = {
          numero: cardNumber.replace(/\s/g, ''),
          validade: validity,
          nome_titular: cardName,
          codigo_seguranca: cvv,
        }
      }

      const response = await PlanoService.assinarPlano(pagamentoData)

      if (response.status === 'success' && response.data) {
        // Salva informações do pagamento para exibir no modal
        setPagamentoInfo(response.data as PagamentoResponse)
        
        if (activeTab === 'cartao') {
          // Pagamento com cartão é processado automaticamente
          ToastService.success('Pagamento processado com sucesso!', 'Seu plano foi ativado.')
          setTimeout(() => {
            router.push('/perfil')
          }, 2000)
        } else {
          // Para PIX e Boleto, mostra modal com informações
          setShowPaymentModal(true)
        }
      } else {
        ToastService.error(response.message || 'Erro ao processar pagamento')
      }
    } catch (err: any) {
      console.error('Erro ao processar pagamento:', err)
      const errorMessage = err.response?.data?.message || 'Erro ao processar pagamento. Tente novamente.'
      ToastService.error(errorMessage)
    } finally {
      setIsProcessing(false)
    }
  }

  const getBeneficiosArray = (): string[] => {
    if (!plano?.beneficios) return []
    if (typeof plano.beneficios === 'string') {
      try {
        return JSON.parse(plano.beneficios)
      } catch {
        return []
      }
    }
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
                      <QrCode className="w-4 h-4" />
                      Pix
                    </button>
                    <button
                      onClick={() => setActiveTab("boleto")}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === "boleto"
                          ? "border-[#2E3192] text-[#2E3192]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      Boleto
                    </button>
                    <button
                      onClick={() => setActiveTab("cartao")}
                      className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === "cartao"
                          ? "border-[#2E3192] text-[#2E3192]"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      Cartão
                    </button>
                  </div>

                  {/* Payment Method Info */}
                  {activeTab === "pix" && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <QrCode className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900 mb-1">Pagamento via PIX</p>
                          <p className="text-xs text-blue-700">
                            O pagamento será processado automaticamente. Após a confirmação, você receberá a chave PIX para realizar o pagamento.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "boleto" && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <FileText className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-900 mb-1">Pagamento via Boleto</p>
                          <p className="text-xs text-green-700">
                            O pagamento será processado automaticamente. Após a confirmação, você receberá o código de barras para realizar o pagamento.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "cartao" && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <CreditCard className="w-5 h-5 text-purple-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-purple-900 mb-1">Pagamento via Cartão</p>
                          <p className="text-xs text-purple-700">
                            O pagamento será processado automaticamente e seu plano será ativado imediatamente após a confirmação.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Form */}
                  {activeTab === "cartao" && (
                    <div className="space-y-6">
                      {/* Card Preview */}
                      <div className="relative">
                        <div className="relative h-48 rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-[1.02]">
                          {/* Card Background Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-br from-[#2E3192] via-[#1A1F71] to-[#0F1150]"></div>
                          
                          {/* Card Pattern Overlay */}
                          <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
                          </div>

                          {/* Card Content */}
                          <div className="relative h-full p-6 flex flex-col justify-between text-white">
                            {/* Card Header */}
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-10 h-10 bg-white/20 rounded-lg backdrop-blur-sm flex items-center justify-center">
                                  <CreditCard className="w-6 h-6" />
                                </div>
                              </div>
                              {cardNumber.startsWith("4") && (
                                <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                                  <span className="text-xs font-bold">VISA</span>
                                </div>
                              )}
                            </div>

                            {/* Card Number */}
                            <div className="space-y-1">
                              <p className="text-xs text-white/70 font-medium tracking-wider">Número do Cartão</p>
                              <p className="text-xl font-bold tracking-widest font-mono">
                                {cardNumber || "0000 0000 0000 0000"}
                              </p>
                            </div>

                            {/* Card Footer */}
                            <div className="flex items-end justify-between">
                              <div className="space-y-1">
                                <p className="text-xs text-white/70 font-medium">Nome do Titular</p>
                                <p className="text-sm font-semibold uppercase">
                                  {cardName || "NOME COMPLETO"}
                                </p>
                              </div>
                              <div className="text-right space-y-1">
                                <p className="text-xs text-white/70 font-medium">Validade</p>
                                <p className="text-sm font-semibold font-mono">
                                  {validity || "MM/AA"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="space-y-5">
                        {/* Card Number */}
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber" className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                            Número do cartão
                            <span className="text-red-500">*</span>
                          </Label>
                          <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2E3192] transition-colors">
                              <CreditCard className="w-5 h-5" />
                            </div>
                            <Input
                              id="cardNumber"
                              placeholder="0000 0000 0000 0000"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                              className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 pl-12 pr-4 h-14 text-base font-semibold tracking-wider focus:border-[#2E3192] focus:ring-4 focus:ring-[#2E3192]/10 transition-all rounded-xl shadow-sm hover:border-gray-300 hover:shadow-md"
                              maxLength={19}
                            />
                          </div>
                        </div>

                        {/* Validity and CVV */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="validity" className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                              Validade
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative group">
                              <Input
                                id="validity"
                                placeholder="MM/AA"
                                value={validity}
                                onChange={(e) => setValidity(formatValidity(e.target.value))}
                                maxLength={5}
                                className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 h-14 text-base font-semibold tracking-wider focus:border-[#2E3192] focus:ring-4 focus:ring-[#2E3192]/10 transition-all rounded-xl shadow-sm hover:border-gray-300 hover:shadow-md"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv" className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                              CVV
                              <span className="text-red-500">*</span>
                            </Label>
                            <div className="relative group">
                              <Input
                                id="cvv"
                                placeholder="000"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                                maxLength={4}
                                type="password"
                                className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 h-14 text-base font-semibold tracking-wider focus:border-[#2E3192] focus:ring-4 focus:ring-[#2E3192]/10 transition-all rounded-xl shadow-sm hover:border-gray-300 hover:shadow-md pr-12"
                              />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#2E3192] transition-colors">
                                <Lock className="w-4 h-4" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Cardholder Name */}
                        <div className="space-y-2">
                          <Label htmlFor="cardName" className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                            Nome no cartão
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="cardName"
                            placeholder="Nome completo como está no cartão"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value.toUpperCase())}
                            className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 h-14 text-base font-medium focus:border-[#2E3192] focus:ring-4 focus:ring-[#2E3192]/10 transition-all rounded-xl shadow-sm hover:border-gray-300 hover:shadow-md uppercase"
                          />
                        </div>

                        {/* CPF */}
                        <div className="space-y-2">
                          <Label htmlFor="cpf" className="text-sm font-semibold text-gray-800 flex items-center gap-1">
                            CPF do titular
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="cpf"
                            placeholder="000.000.000-00"
                            value={cpf}
                            onChange={(e) => setCpf(formatCPF(e.target.value))}
                            className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 h-14 text-base font-semibold tracking-wider focus:border-[#2E3192] focus:ring-4 focus:ring-[#2E3192]/10 transition-all rounded-xl shadow-sm hover:border-gray-300 hover:shadow-md"
                          />
                        </div>
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

      {/* Modal de Informações de Pagamento (PIX/Boleto) */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {pagamentoInfo?.tipo === 'pix' ? (
                <>
                  <QrCode className="w-6 h-6 text-blue-600" />
                  <span>Pagamento via PIX</span>
                </>
              ) : (
                <>
                  <FileText className="w-6 h-6 text-green-600" />
                  <span>Pagamento via Boleto</span>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {pagamentoInfo?.tipo === 'pix' 
                ? 'Copie a chave PIX e realize o pagamento no seu aplicativo bancário.'
                : 'Copie o código de barras e realize o pagamento no seu banco ou aplicativo.'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {pagamentoInfo?.tipo === 'pix' && pagamentoInfo.chave_pix && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Chave PIX</Label>
                <div className="flex gap-2">
                  <Input
                    value={pagamentoInfo.chave_pix}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(pagamentoInfo.chave_pix!, 'Chave PIX')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            {pagamentoInfo?.tipo === 'boleto' && pagamentoInfo.codigo_barras && (
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">Código de Barras</Label>
                <div className="flex gap-2">
                  <Input
                    value={formatCodigoBarras(pagamentoInfo.codigo_barras)}
                    readOnly
                    className="font-mono text-xs"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(pagamentoInfo.codigo_barras!, 'Código de barras')}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900 mb-1">Pagamento processado!</p>
                  <p className="text-xs text-green-700">
                    Seu plano será ativado automaticamente após a confirmação do pagamento.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowPaymentModal(false)}
                className="flex-1"
              >
                Fechar
              </Button>
              <Button
                onClick={() => {
                  setShowPaymentModal(false)
                  router.push('/perfil')
                }}
                className="flex-1 bg-[#2E3192] hover:bg-[#252880]"
              >
                Ir para Perfil
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
