"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import { User, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function AppHeader() {
    const { user, loading, logout } = useAuth()
    const router = useRouter()
    const getUserInitials = (nome: string) => {
        return nome
            .split(" ")
            .map((word) => word.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2)
    }

    if (loading) {
        return (
            <header className="p-4 border-b">
                <div className="container mx-auto">
                    <p className="text-muted-foreground">Carregando...</p>
                </div>
            </header>
        )
    }

    return (
        <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-200/60 shadow-lg backdrop-blur-sm">
            <nav className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3 md:py-5">
                    <Link href="/">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent tracking-tight cursor-pointer">
                            TOconcursos
                        </h1>
                    </Link>

                    <ul className="hidden md:flex items-center gap-1 lg:gap-2">
                        <li>
                            <Link
                                href="/"
                                className="relative px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-700 rounded-lg hover:bg-indigo-50/80 transition-all duration-200 cursor-pointer group"
                            >
                                Início
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
                            </Link>
                        </li>
                        <li>
                            <span className="relative px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-700 rounded-lg hover:bg-indigo-50/80 transition-all duration-200 cursor-pointer group">
                                Concursos
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
                            </span>
                        </li>
                        <li>
                            <span onClick={() => router.push("/questoes")} className="relative px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-700 rounded-lg hover:bg-indigo-50/80 transition-all duration-200 cursor-pointer group">
                                Questões
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
                            </span>
                        </li>
                        <li>
                            <span className="relative px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-700 rounded-lg hover:bg-indigo-50/80 transition-all duration-200 cursor-pointer group">
                                Simulados
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
                            </span>
                        </li>
                        <li>
                            <span className="relative px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-700 rounded-lg hover:bg-indigo-50/80 transition-all duration-200 cursor-pointer group">
                                Planos
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
                            </span>
                        </li>
                        <li>
                            <span onClick={() => router.push("/cronogramas")} className="relative px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-700 rounded-lg hover:bg-indigo-50/80 transition-all duration-200 cursor-pointer group">
                                Cronogramas
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
                            </span>
                        </li>

                        {user ? (
                            <li className="ml-4">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-indigo-50/80">
                                            <Avatar className="h-9 w-9 border-2 border-indigo-200 hover:border-indigo-300 transition-colors">
                                                <AvatarImage src={user.avatar || undefined} alt={user.nome} />
                                                <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold">
                                                    {getUserInitials(user.nome)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">{user.nome}</p>
                                                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Perfil</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={logout}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Sair</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </li>
                        ) : (
                            <li>
                                <span className="relative px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-indigo-700 rounded-lg hover:bg-indigo-50/80 transition-all duration-200 cursor-pointer group">
                                    <Link href="/login">
                                        Login
                                    </Link>
                                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
                                </span>
                            </li>

                        )}
                    </ul>

                    <div className="md:hidden">
                        <button className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    )
}
