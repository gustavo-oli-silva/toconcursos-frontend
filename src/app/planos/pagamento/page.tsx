"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { Check, CreditCard, Lock } from "lucide-react"
import App from "next/app"
import { AppHeader } from "@/components/project/AppHeader"
import { Footer } from "@/components/project/landing_page/Footer"

export default function PagamentoPage() {
    const [activeTab, setActiveTab] = useState("cartao")
    const [cardNumber, setCardNumber] = useState("")
    const [validity, setValidity] = useState("")
    const [cvv, setCvv] = useState("")
    const [cardName, setCardName] = useState("")
    const [cpf, setCpf] = useState("")
    const [saveCard, setSaveCard] = useState(false)
    const [coupon, setCoupon] = useState("")
    const [acceptTerms, setAcceptTerms] = useState(false)

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

    return (
        <div>
            <AppHeader />
            <div className="bg-[#f5f5f7]">
                <div className="max-w-7xl mx-auto px-4 py-6">
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
                                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "pix"
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
                                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "cartao"
                                                    ? "border-[#2E3192] text-[#2E3192]"
                                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                                }`}
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                                            </svg>
                                            Cartão
                                        </button>
                                        <button
                                            onClick={() => setActiveTab("boleto")}
                                            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "boleto"
                                                    ? "border-[#2E3192] text-[#2E3192]"
                                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                                }`}
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M3 3h2v18H3V3zm4 0h2v18H7V3zm4 0h2v18h-2V3zm4 0h2v18h-2V3zm4 0h2v18h-2V3z" />
                                            </svg>
                                            Boleto
                                        </button>
                                    </div>

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
                                                        className="bg-white border-2 border-gray-200 pl-11 pr-16 h-14 text-base font-medium tracking-wider focus:border-[#2E3192] focus:ring-2 focus:ring-[#2E3192]/20 transition-all rounded-lg shadow-sm hover:border-gray-300"
                                                    />
                                                </div>
                                                <div>
                                                    <Label htmlFor="cvv" className="text-sm font-medium text-gray-700 mb-2 block">
                                                        Código de segurança (CVV) <span className="text-red-500">*</span>
                                                    </Label>
                                                    <div className="relative">
                                                        <Input
                                                            id="cvv"
                                                            placeholder="000"
                                                            value={cvv}
                                                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                                                            maxLength={4}
                                                            type="password"
                                                            className="bg-white border-2 border-gray-200 pl-11 pr-16 h-14 text-base font-medium tracking-wider focus:border-[#2E3192] focus:ring-2 focus:ring-[#2E3192]/20 transition-all rounded-lg shadow-sm hover:border-gray-300"
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
                                                    className="bg-white border-2 border-gray-200 pl-11 pr-16 h-14 text-base font-medium tracking-wider focus:border-[#2E3192] focus:ring-2 focus:ring-[#2E3192]/20 transition-all rounded-lg shadow-sm hover:border-gray-300"
                                                />
                                            </div>

                                            <div>
                                                <Label htmlFor="cpf" className="text-sm font-medium text-gray-700 mb-2 block">
                                                    CPF do titular do cartão <span className="text-red-500">*</span>
                                                </Label>
                                                <Input
                                                    id="cpf"
                                                    placeholder="000.000.000-00"
                                                    value={cpf}
                                                    onChange={(e) => setCpf(formatCPF(e.target.value))}
                                                    className="bg-white border-2 border-gray-200 pl-11 pr-16 h-14 text-base font-medium tracking-wider focus:border-[#2E3192] focus:ring-2 focus:ring-[#2E3192]/20 transition-all rounded-lg shadow-sm hover:border-gray-300"
                                                />
                                            </div>

                                            {/* Save Card Checkbox */}
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
                                            <span className="text-sm font-medium text-gray-900">70 Profissional</span>
                                            <span className="text-sm font-semibold text-gray-900">R$40,90 /mês</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4 mb-4">
                                        <p className="text-xs text-gray-500 mb-3">Benefícios</p>
                                        <div className="space-y-2">
                                            {[
                                                "CV Convênios por até 6 meses",
                                                "Convênios de 60 profissionais",
                                                "Crie sua empresa estruturada",
                                                "Acesso às questões",
                                                "Estatísticas de desempenho",
                                                "Suporte prioritário",
                                                "Acesso à lógica negrita",
                                                "Simulados ilimitados para concurseiros",
                                            ].map((benefit, index) => (
                                                <div key={index} className="flex items-start gap-2">
                                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-xs text-gray-700">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Coupon */}
                                    <div className="border-t border-gray-200 pt-4 mb-4">
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Cupom de Desconto"
                                                value={coupon}
                                                onChange={(e) => setCoupon(e.target.value)}
                                                className=""
                                            />
                                            <Button className="bg-[#2E3192] hover:bg-[#252880] text-white px-6">Aplicar</Button>
                                        </div>
                                    </div>

                                    {/* Subtotal */}
                                    <div className="border-t border-gray-200 pt-4 mb-2">
                                        <div className="flex justify-between text-sm text-gray-500 mb-3">
                                            <span>Subtotal</span>
                                            <span>R$40,90</span>
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-base font-semibold text-gray-900">Total</span>
                                        <span className="text-base font-bold text-gray-900">R$40,90</span>
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
                                    <Button className="w-full bg-[#2E3192] hover:bg-[#252880] text-white font-medium py-6">
                                        Finalizar Compra
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
