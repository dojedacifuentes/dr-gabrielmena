'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, UserPlus, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

const schema = z.object({
  nombre: z.string().min(2, 'Ingresa tu nombre completo'),
  email: z.string().email('Ingresa un correo válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

type FormData = z.infer<typeof schema>

export default function RegistroPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.nombre, role: 'patient' },
      },
    })

    if (error) {
      toast({
        title: 'Error al crear la cuenta',
        description: error.message,
        variant: 'destructive',
      })
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-5" />
        <h2 className="text-2xl font-bold text-slate-100 mb-3">¡Cuenta creada!</h2>
        <p className="text-slate-400 mb-6">
          Revisa tu correo electrónico para confirmar tu cuenta. Una vez confirmada,
          podrás iniciar sesión en tu portal.
        </p>
        <Link href="/login">
          <Button className="w-full">Ir a iniciar sesión</Button>
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Crear cuenta</h1>
        <p className="text-slate-400">
          Regístrate para acceder a tu portal de paciente y seguimiento emocional.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label htmlFor="nombre" className="mb-2 block">Nombre completo</Label>
          <Input
            id="nombre"
            placeholder="Tu nombre completo"
            autoComplete="name"
            {...register('nombre')}
          />
          {errors.nombre && <p className="mt-1.5 text-xs text-red-400">{errors.nombre.message}</p>}
        </div>

        <div>
          <Label htmlFor="email" className="mb-2 block">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            placeholder="tu@correo.com"
            autoComplete="email"
            {...register('email')}
          />
          {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <Label htmlFor="password" className="mb-2 block">Contraseña</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
              className="pr-10"
              {...register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password.message}</p>}
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="mb-2 block">Confirmar contraseña</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Repite tu contraseña"
            autoComplete="new-password"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-400">{errors.confirmPassword.message}</p>}
        </div>

        <p className="text-xs text-slate-500">
          Al crear tu cuenta aceptas nuestra{' '}
          <Link href="/privacidad" className="text-cyan-400 hover:text-cyan-300">política de privacidad</Link>.
          Tus datos están protegidos y serán tratados con estricta confidencialidad.
        </p>

        <Button
          type="submit"
          className="w-full gap-2"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creando cuenta...
            </>
          ) : (
            <>
              <UserPlus className="w-4 h-4" />
              Crear cuenta
            </>
          )}
        </Button>
      </form>

      <p className="mt-8 text-sm text-slate-500 text-center">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
          Iniciar sesión
        </Link>
      </p>
    </motion.div>
  )
}
