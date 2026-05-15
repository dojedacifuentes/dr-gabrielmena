'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'

const schema = z.object({
  email: z.string().email('Ingresa un correo válido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      toast({
        title: 'Error al iniciar sesión',
        description: error.message === 'Invalid login credentials'
          ? 'Correo o contraseña incorrectos.'
          : error.message,
        variant: 'destructive',
      })
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  const handleDemoDoctor = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: 'doctor@demo.cl',
      password: 'demo1234',
    })
    if (error) {
      toast({
        title: 'Demo no disponible',
        description: 'Configura las credenciales demo en Supabase para usar esta función.',
        variant: 'destructive',
      })
      return
    }
    router.push('/dashboard')
    router.refresh()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Iniciar sesión</h1>
        <p className="text-slate-400">Accede a tu panel clínico o portal de paciente.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
          <div className="flex items-center justify-between mb-2">
            <Label htmlFor="password">Contraseña</Label>
            <Link href="#" className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              autoComplete="current-password"
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

        <Button
          type="submit"
          className="w-full gap-2"
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Ingresando...
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4" />
              Iniciar sesión
            </>
          )}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-700/60" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-slate-950 px-3 text-slate-500">o accede con demo</span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            onClick={handleDemoDoctor}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-700/60 text-sm text-slate-300 hover:bg-slate-800/60 hover:text-slate-100 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
            Demo Doctor
          </button>
          <button
            onClick={async () => {
              const supabase = createClient()
              await supabase.auth.signInWithPassword({ email: 'paciente@demo.cl', password: 'demo1234' })
              router.push('/mi-portal')
              router.refresh()
            }}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-slate-700/60 text-sm text-slate-300 hover:bg-slate-800/60 hover:text-slate-100 transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            Demo Paciente
          </button>
        </div>
      </div>

      <p className="mt-8 text-sm text-slate-500 text-center">
        ¿Primera vez aquí?{' '}
        <Link href="/registro" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
          Crear cuenta
        </Link>
      </p>
    </motion.div>
  )
}
