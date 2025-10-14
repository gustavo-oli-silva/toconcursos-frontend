import { AppHeader } from "@/components/project/AppHeader"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function PagamentoPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <AppHeader />

            <div className="flex flex-col lg:flex-row container mx-auto gap-6 py-8 px-4">
                <div className="flex flex-col w-full lg:w-2/3 gap-6">
                    <Card className="relative overflow-hidden bg-white/90 backdrop-blur-md border border-slate-200/50 shadow-2xl shadow-blue-500/10 rounded-3xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5"></div>
                        <CardHeader className="relative pb-6">
                            <CardTitle className="text-center text-2xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight tracking-tight">
                                Itens do carrinho
                            </CardTitle>
                        </CardHeader>
                        <div className="relative pb-6">
                            <Card className="mx-4 lg:mx-auto w-[calc(100%-2rem)] lg:w-3/4 text-center border-2 border-slate-200/60 rounded-2xl shadow-lg bg-white/80 backdrop-blur-md relative">
                                <button className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/60 text-red-600 hover:from-red-100 hover:to-rose-100 hover:border-red-300 hover:text-red-700 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 cursor-pointer group">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 group-hover:scale-110 transition-transform"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <CardHeader className="pb-3">
                                    <span className="text-xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                                        Plano Premium
                                    </span>
                                </CardHeader>
                                <CardDescription className="px-6 pb-2">
                                    <p className="text-base leading-relaxed text-slate-600">
                                        Acesso ilimitado a todos os recursos do TOconcursos.
                                    </p>
                                </CardDescription>
                                <CardFooter className="flex justify-center text-3xl font-bold text-emerald-600 dark:text-emerald-500 pt-4 pb-6">
                                    R$40,00
                                </CardFooter>
                            </Card>
                        </div>
                    </Card>

                    <Card className="relative overflow-hidden bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-500/10 p-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-blue-50/30"></div>
                        <CardHeader className="relative px-0 pt-0 pb-6">
                            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent tracking-tight">
                                Forma de Pagamento
                            </CardTitle>
                        </CardHeader>
                        <div className="relative flex flex-col sm:flex-row gap-4 pt-2">
                            <Card className="group relative overflow-hidden text-center w-full sm:w-1/3 border-2 border-slate-200/60 hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer rounded-2xl bg-white/90 backdrop-blur-sm transform hover:scale-105 hover:-translate-y-1">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <CardHeader className="relative pb-4 pt-6">
                                    <span className="font-semibold text-base text-slate-700 group-hover:text-blue-700 transition-colors">
                                        Cartão de Crédito
                                    </span>
                                </CardHeader>
                                <CardDescription className="relative flex justify-center pb-6">
                                    <Image
                                        src="/pagamentos/cartao.png"
                                        alt="Ícone de cartão de crédito"
                                        width={100}
                                        height={100}
                                        className="group-hover:scale-110 transition-transform duration-300"
                                    />
                                </CardDescription>
                            </Card>

                            <Card className="group relative overflow-hidden text-center w-full sm:w-1/3 border-2 border-slate-200/60 hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer rounded-2xl bg-white/90 backdrop-blur-sm transform hover:scale-105 hover:-translate-y-1">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <CardHeader className="relative pb-4 pt-6">
                                    <span className="font-semibold text-base text-slate-700 group-hover:text-blue-700 transition-colors">
                                        Cartão de Débito
                                    </span>
                                </CardHeader>
                                <CardDescription className="relative flex justify-center pb-6">
                                    <Image
                                        src="/pagamentos/cartao.png"
                                        alt="Ícone de cartão de débito"
                                        width={100}
                                        height={150}
                                        className="group-hover:scale-110 transition-transform duration-300"
                                    />
                                </CardDescription>
                            </Card>

                            <Card className="group relative overflow-hidden text-center w-full sm:w-1/3 border-2 border-slate-200/60 hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer rounded-2xl bg-white/90 backdrop-blur-sm transform hover:scale-105 hover:-translate-y-1">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <CardHeader className="relative pb-4 pt-6">
                                    <span className="font-semibold text-base text-slate-700 group-hover:text-blue-700 transition-colors">
                                        PIX
                                    </span>
                                </CardHeader>
                                <CardDescription className="relative flex justify-center pb-6">
                                    <Image
                                        src="/pagamentos/pix.webp"
                                        alt="QR Code para pagamento com PIX"
                                        width={100}
                                        height={100}
                                        className="group-hover:scale-110 transition-transform duration-300"
                                    />
                                </CardDescription>
                            </Card>
                        </div>
                    </Card>
                </div>

                <div className="w-full lg:w-1/3">
                    <Card className="relative overflow-hidden bg-white/90 backdrop-blur-md border-2 border-slate-200/60 rounded-3xl shadow-2xl shadow-blue-500/10 sticky top-8">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/20"></div>
                        <CardHeader className="relative pb-4">
                            <h2 className="text-center text-xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent tracking-tight">
                                Resumo do Pedido
                            </h2>
                        </CardHeader>
                        <CardDescription className="relative text-center px-6 pb-6">
                            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl py-4 px-6 mt-2 border border-slate-200/50 shadow-sm">
                                <span className="text-lg font-semibold text-slate-700">
                                    Total: <span className="text-2xl text-emerald-600 dark:text-emerald-500 font-bold">R$40,00</span>
                                </span>
                            </div>
                        </CardDescription>
                    </Card>
                </div>
            </div>
        </div>
    )
}
