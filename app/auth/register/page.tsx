'use client'

import { useState } from 'react'
// TODO: Reintegrar signIn cuando NextAuth esté listo
// import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Mail, Github, CheckCircle2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterInput) => {
    try {
      setIsLoading(true)
      setError('')

      // Registrar usuario
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Error al registrar usuario')
        return
      }

      setSuccess(true)

      // TODO: Auto-login después de registro exitoso
      // const signInResult = await signIn('credentials', {
      //   email: data.email,
      //   password: data.password,
      //   redirect: false,
      // })

      // if (signInResult?.ok) {
      //   router.push('/feed')
      //   router.refresh()
      // }

      // Temporal: redirigir a login
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    } catch (error) {
      setError('Ocurrió un error al registrarse')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOAuthSignIn = async (provider: 'google' | 'github') => {
    setError('OAuth temporalmente deshabilitado - en desarrollo')
    // TODO: Reintegrar cuando NextAuth esté listo
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">¡Registro Exitoso!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Tu cuenta ha sido creada. Redirigiendo...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">J</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            JourNews
          </span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Crear Cuenta</CardTitle>
            <CardDescription>
              Únete a la revolución de la confianza en las noticias
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                type="text"
                label="Nombre completo"
                placeholder="Juan Pérez"
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                type="email"
                label="Email"
                placeholder="tu@email.com"
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                type="password"
                label="Contraseña"
                placeholder="Mínimo 8 caracteres"
                helperText="Debe contener mayúsculas, minúsculas y números"
                error={errors.password?.message}
                {...register('password')}
              />

              <Input
                type="password"
                label="Confirmar contraseña"
                placeholder="Repite tu contraseña"
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isLoading}
              >
                Crear Cuenta
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">
                  O regístrate con
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthSignIn('google')}
                disabled={isLoading}
              >
                <Mail className="h-4 w-4" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOAuthSignIn('github')}
                disabled={isLoading}
              >
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-2">
            <p className="text-sm text-center text-gray-600 dark:text-gray-400">
              ¿Ya tienes una cuenta?{' '}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium"
              >
                Inicia sesión
              </Link>
            </p>
          </CardFooter>
        </Card>

        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          Al registrarte, aceptas nuestros{' '}
          <Link href="/terms" className="underline">
            Términos de Servicio
          </Link>{' '}
          y{' '}
          <Link href="/privacy" className="underline">
            Política de Privacidad
          </Link>
        </p>
      </div>
    </div>
  )
}
