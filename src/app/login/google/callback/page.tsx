"use client"

import { useEffect, useState, Suspense, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { AuthService } from '@/lib/services/auth/AuthService'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'
import Cookies from 'js-cookie'
import { Loader2 } from 'lucide-react'

function CallbackContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { refreshUser } = useAuth()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const hasProcessed = useRef(false) // Previne processamento duplicado

  useEffect(() => {
    // Previne que o código seja processado mais de uma vez
    if (hasProcessed.current) {
      return
    }

    const processCallback = async () => {
      try {
        // Marca como processado imediatamente para evitar chamadas duplicadas
        hasProcessed.current = true

        // Lê o código da query string
        const code = searchParams.get('code')
        const error = searchParams.get('error')

        // Verifica se houve erro no OAuth
        if (error) {
          setStatus('error')
          setErrorMessage('Erro ao autorizar com Google. Tente novamente.')
          toast.error('Erro ao autorizar com Google')
          setTimeout(() => {
            router.push('/login')
          }, 3000)
          return
        }

        // Verifica se o código existe
        if (!code) {
          setStatus('error')
          setErrorMessage('Código de autorização não encontrado.')
          toast.error('Código de autorização não encontrado')
          setTimeout(() => {
            router.push('/login')
          }, 3000)
          return
        }

        // Chama o backend para trocar o código por token
        const token = await AuthService.loginGoogleCallback(code)

        // Salva o token no cookie
        Cookies.set('auth_token', token, {
          expires: 7,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        })

        // Atualiza o contexto de autenticação
        await refreshUser()

        setStatus('success')
        toast.success('Login com Google realizado com sucesso!')
        
        // Redireciona para a página de questões após um breve delay
        setTimeout(() => {
          router.push('/questoes')
        }, 1000)

      } catch (error: any) {
        console.error('Erro ao processar callback do Google:', error)
        
        // Se o erro for "invalid_grant" mas já temos um token salvo, ignora o erro
        const errorDetail = error?.response?.data?.detail || ''
        const hasToken = Cookies.get('auth_token')
        
        if (errorDetail.includes('invalid_grant') && hasToken) {
          // Token já foi salvo com sucesso, apenas atualiza o contexto e redireciona
          console.log('Token já processado, ignorando erro invalid_grant')
          try {
            await refreshUser()
            setStatus('success')
            toast.success('Login com Google realizado com sucesso!')
            setTimeout(() => {
              router.push('/questoes')
            }, 1000)
          } catch (refreshError) {
            // Se refreshUser falhar, trata como erro normal
            setStatus('error')
            setErrorMessage('Erro ao atualizar dados do usuário.')
            toast.error('Erro ao fazer login com Google. Tente novamente.')
            setTimeout(() => {
              router.push('/login')
            }, 3000)
          }
          return
        }
        
        setStatus('error')
        const message = errorDetail || 
                       error?.message || 
                       'Erro ao processar autenticação com Google'
        setErrorMessage(message)
        toast.error('Erro ao fazer login com Google. Tente novamente.')
        
        // Redireciona para login após 3 segundos
        setTimeout(() => {
          router.push('/login')
        }, 3000)
      }
    }

    processCallback()
  }, [searchParams, router, refreshUser])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="w-full max-w-md p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center space-y-6">
          {status === 'loading' && (
            <>
              <div className="flex justify-center">
                <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Processando autenticação...
                </h2>
                <p className="text-gray-600">
                  Aguarde enquanto finalizamos seu login com Google.
                </p>
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Login realizado com sucesso!
                </h2>
                <p className="text-gray-600">
                  Redirecionando você para a página inicial...
                </p>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Erro ao fazer login
                </h2>
                <p className="text-gray-600">
                  {errorMessage || 'Ocorreu um erro ao processar sua autenticação.'}
                </p>
                <p className="text-sm text-gray-500">
                  Você será redirecionado para a página de login em instantes...
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  )
}

