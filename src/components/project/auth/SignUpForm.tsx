"use client"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useForm } from "react-hook-form"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"
import { AuthService } from "@/lib/services/auth/AuthService"
import { useRouter } from "next/dist/client/components/navigation"
import { useAuth } from "@/hooks/useAuth"

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [backendError, setBackendError] = useState<string | null>(null)
  const router = useRouter();
  const login = useAuth().login;

  // zod validator
  const formSchema = z
    .object({
      nome: z.string().min(3, "O nome de usuário deve ter pelo menos 3 caracteres."),
      cpf: z.string().min(11, "O cpf deve ter 11 digitos"),
      email: z.string().email("Por favor, insira um e-mail válido."),
      senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
      confirmaSenha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
    })
    .refine((data) => data.senha === data.confirmaSenha, {
      message: "As senhas não coincidem!",
      path: ["confirmaSenha"],
    })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      email: "",
      senha: "",
      confirmaSenha: "",
    },
  })

  // CPF formatting function
  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    }
    return value
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setBackendError(null)

    if (!acceptTerms) {
      toast.error("Você deve aceitar os termos de uso e política de privacidade.")
      return
    }

    const { confirmaSenha, ...dadosParaApi } = values
    console.log(dadosParaApi)
    try {
      const user = dadosParaApi
      await AuthService.signUp(user)
      // toast.success("Usuário criado com sucesso!")
      await login({ email: user.email, senha: user.senha })
      toast.success("Bem vindo concurseiro!")
      router.push("/questoes")
      form.reset()
      setAcceptTerms(false)
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error)
      const anyError = error as any
      const status = anyError?.response?.status
      const message = anyError?.response?.data?.message as string | undefined

      if (status === 409 && message) {
        setBackendError(message)
        return
      }

      toast.error("Erro ao realizar cadastro. Tente novamente.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Nome Field */}
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Fulano da Silva"
                  className="h-12 border-border focus:border-primary transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CPF Field */}
        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">CPF</FormLabel>
              <FormControl>
                <Input
                  placeholder="123.456.789-00"
                  className="h-12 border-border focus:border-primary transition-colors"
                  {...field}
                  onChange={(e) => {
                    const formatted = formatCPF(e.target.value)
                    field.onChange(formatted)
                  }}
                  maxLength={14}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="hello@example.cl"
                  type="email"
                  className="h-12 border-border focus:border-primary transition-colors"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="senha"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="••••••••••••"
                    type={showPassword ? "text" : "password"}
                    className="h-12 pr-12 border-border focus:border-primary transition-colors"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password Field */}
        <FormField
          control={form.control}
          name="confirmaSenha"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">Confirmar senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="••••••••••••"
                    type={showConfirmPassword ? "text" : "password"}
                    className="h-12 pr-12 border-border focus:border-primary transition-colors"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Terms Checkbox */}
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <div className="space-y-1">
            <Label
              htmlFor="terms"
              className="text-sm leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              Li e aceito os{" "}
              <Link href="/terms" className="text-primary hover:underline font-medium">
                Termos de Uso
              </Link>{" "}
              e a{" "}
              <Link href="/privacy" className="text-primary hover:underline font-medium">
                Política de Privacidade
              </Link>
              .
            </Label>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Cadastrar
        </Button>

        {/* Backend Error Label */}
        {backendError && (
          <p className="text-sm text-red-600 text-center">
            {backendError}
          </p>
        )}

        {/* Social Signup */}
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">Ou cadastre-se com</span>
            </div>
          </div>

          <div className="flex justify-center items-center">
              <Button
                variant="outline"
                className="flex items-center justify-center gap-2 py-2 bg-transparent"
                type="button"
                onClick={() => AuthService.loginGoogle()}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-xs">Google</span>
              </Button>

            </div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Já possui uma conta?{" "}
            <Link href="/login" className="text-primary hover:underline font-medium transition-colors">
              Faça login.
            </Link>
          </p>
        </div>
      </form>
    </Form>
  )
}
