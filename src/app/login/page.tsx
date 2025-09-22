
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { LoginForm } from "@/components/project/auth/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-300 via-purple-600 to-teal-500 overflow-hidden">
        {/* Back Button */}
        <Link
          href="/"
          className="absolute top-6 left-6 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>

        {/* Hero Image */}
        <div className="absolute inset-0 bg-gradient-to-br to-teal-500/80">
          <Image
            src="/images/login-hero.jpg"
            alt="Pessoa sorrindo - Preparação para concursos"
            fill
            className="object-cover mix-blend-overlay"
          />
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 via-purple-900/70 to-teal-900/80 backdrop-blur-[2px]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <h1 className="text-4xl font-black mb-4 text-balance">Sua aprovação começa aqui.</h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">Preparação completa para todos os concursos.</p>
          <Button
            variant="outline"
            size="lg"
            className="w-fit bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <Link 
            href="/">
              Ver mais
            </Link>
          </Button>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Back Button */}
          <Link
            href="/"
            className="lg:hidden inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-teal-700 bg-clip-text text-transparent">
                TOconcursos
              </span>
            </div>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  )
}
