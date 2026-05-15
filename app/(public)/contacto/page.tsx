'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const schema = z.object({
  nombre: z.string().min(2, 'Por favor ingresa tu nombre'),
  email: z.string().email('Ingresa un correo válido'),
  telefono: z.string().optional(),
  motivo: z.string().min(1, 'Selecciona un motivo'),
  mensaje: z.string().min(20, 'El mensaje debe tener al menos 20 caracteres'),
})

type FormData = z.infer<typeof schema>

const contactInfo = [
  { icon: Mail, label: 'Correo electrónico', value: 'contacto@drgabrielmena.cl' },
  { icon: Phone, label: 'WhatsApp / Teléfono', value: '+56 9 XXXX XXXX' },
  { icon: MapPin, label: 'Ubicación', value: 'Santiago, Chile · Consulta privada' },
  { icon: Clock, label: 'Horarios', value: 'Lunes a Viernes 9:00 – 18:00\nSábados 9:00 – 13:00' },
]

export default function ContactoPage() {
  const [submitted, setSubmitted] = useState(false)
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1200))
    console.log('Formulario enviado:', data)
    setSubmitted(true)
  }

  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Contacto</p>
          <h1 className="text-5xl font-bold text-slate-100 mb-6 leading-tight">
            Solicitar una consulta
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Completa el formulario y me comunicaré contigo a la brevedad para confirmar tu hora.
            También puedes escribirme directamente por WhatsApp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-slate-100 mb-6">Información de contacto</h2>
            <div className="space-y-5">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-4.5 h-4.5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                    <p className="text-sm text-slate-300 whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-xl border border-slate-700/50 bg-slate-900/60">
              <p className="text-sm font-medium text-slate-200 mb-2">Tiempo de respuesta</p>
              <p className="text-sm text-slate-400">
                Respondo todos los mensajes en un plazo máximo de 24 horas hábiles.
                Para consultas urgentes, prefiere WhatsApp.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex items-center justify-center p-12 rounded-2xl border border-emerald-500/20 bg-emerald-500/5"
              >
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">¡Mensaje enviado!</h3>
                  <p className="text-slate-400">
                    Gracias por contactarme. Te responderé a la brevedad para confirmar tu hora.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => setSubmitted(false)}
                  >
                    Enviar otro mensaje
                  </Button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="nombre" className="mb-2 block">Nombre completo *</Label>
                    <Input
                      id="nombre"
                      placeholder="Tu nombre"
                      {...register('nombre')}
                    />
                    {errors.nombre && <p className="mt-1.5 text-xs text-red-400">{errors.nombre.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2 block">Correo electrónico *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@correo.com"
                      {...register('email')}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="telefono" className="mb-2 block">Teléfono (opcional)</Label>
                    <Input
                      id="telefono"
                      placeholder="+56 9 XXXX XXXX"
                      {...register('telefono')}
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block">Motivo de consulta *</Label>
                    <Select onValueChange={(v) => setValue('motivo', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un motivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ansiedad">Ansiedad o estrés</SelectItem>
                        <SelectItem value="depresion">Depresión o bajo ánimo</SelectItem>
                        <SelectItem value="sueno">Problemas de sueño</SelectItem>
                        <SelectItem value="burnout">Burnout laboral</SelectItem>
                        <SelectItem value="seguimiento">Seguimiento o control</SelectItem>
                        <SelectItem value="primera_vez">Primera consulta general</SelectItem>
                        <SelectItem value="otro">Otro motivo</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.motivo && <p className="mt-1.5 text-xs text-red-400">{errors.motivo.message}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="mensaje" className="mb-2 block">Cuéntame brevemente *</Label>
                  <Textarea
                    id="mensaje"
                    rows={5}
                    placeholder="Describe brevemente lo que te motivó a contactarme y cualquier información relevante que quieras compartir..."
                    {...register('mensaje')}
                  />
                  {errors.mensaje && <p className="mt-1.5 text-xs text-red-400">{errors.mensaje.message}</p>}
                </div>

                <p className="text-xs text-slate-500">
                  Al enviar este formulario, aceptas que tus datos serán tratados de forma confidencial
                  y utilizados únicamente para responder a tu solicitud de consulta.
                </p>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar solicitud de consulta
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
