'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Smile, Wind, Moon, Zap, Brain, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { MoodChart } from '@/components/dashboard/mood-chart'
import { mockMoodTrends, mockMoodEntries } from '@/lib/mock-data'
import { getMoodLabel, getMoodColor, formatDate } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

const schema = z.object({
  mood: z.number().min(1).max(10),
  anxiety: z.number().min(1).max(10),
  stress: z.number().min(1).max(10),
  sleep_quality: z.number().min(1).max(10),
  energy: z.number().min(1).max(10),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof schema>

function MoodSlider({
  label, name, value, onChange, icon: Icon, color
}: {
  label: string
  name: string
  value: number
  onChange: (v: number) => void
  icon: React.ComponentType<{ className?: string }>
  color: string
}) {
  return (
    <div className="p-5 rounded-xl border border-slate-700/50 bg-slate-900/60">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
            <Icon className="w-4 h-4" />
          </div>
          <Label className="text-sm font-medium text-slate-200">{label}</Label>
        </div>
        <div className="text-right">
          <span className={`text-xl font-bold ${getMoodColor(value)}`}>{value}</span>
          <span className="text-slate-500 text-sm">/10</span>
          <p className={`text-xs ${getMoodColor(value)}`}>{getMoodLabel(value)}</p>
        </div>
      </div>
      <input
        type="range"
        min={1}
        max={10}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-cyan-500"
      />
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-slate-600">1 — Muy bajo</span>
        <span className="text-[10px] text-slate-600">10 — Excelente</span>
      </div>
    </div>
  )
}

export default function MiEstadoPage() {
  const [submitted, setSubmitted] = useState(false)
  const { toast } = useToast()

  const { control, handleSubmit, watch, formState: { isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      mood: 7,
      anxiety: 4,
      stress: 5,
      sleep_quality: 7,
      energy: 6,
      notes: '',
    },
  })

  const values = watch()

  const onSubmit = async (data: FormData) => {
    await new Promise(r => setTimeout(r, 800))
    console.log('Registro guardado:', data)
    toast({ title: 'Registro guardado', description: 'Tu estado de hoy ha sido registrado correctamente.' })
    setSubmitted(true)
  }

  const sliders = [
    { name: 'mood' as const, label: 'Estado de ánimo', icon: Smile, color: 'bg-cyan-500/10 text-cyan-400' },
    { name: 'anxiety' as const, label: 'Nivel de ansiedad', icon: Brain, color: 'bg-amber-500/10 text-amber-400' },
    { name: 'stress' as const, label: 'Nivel de estrés', icon: Wind, color: 'bg-red-500/10 text-red-400' },
    { name: 'sleep_quality' as const, label: 'Calidad del sueño', icon: Moon, color: 'bg-indigo-500/10 text-indigo-400' },
    { name: 'energy' as const, label: 'Nivel de energía', icon: Zap, color: 'bg-emerald-500/10 text-emerald-400' },
  ]

  return (
    <div className="space-y-6 page-transition">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Mi estado emocional</h1>
        <p className="text-slate-400 mt-1 text-sm">
          Registra cómo te sientes hoy. Esto ayuda al Dr. Mena a hacer un seguimiento más preciso de tu evolución.
        </p>
      </div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <CheckCircle className="w-16 h-16 text-emerald-400 mb-5" />
          <h2 className="text-xl font-semibold text-slate-100 mb-2">¡Registro guardado!</h2>
          <p className="text-slate-400 mb-6">Tu estado de hoy ha sido registrado. El Dr. Mena podrá verlo en la próxima sesión.</p>
          <Button onClick={() => setSubmitted(false)} variant="outline">Registrar de nuevo</Button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <p className="text-xs text-slate-500 px-1 pb-1">Hoy, {formatDate(new Date().toISOString().split('T')[0])}</p>

              {sliders.map((slider) => (
                <Controller
                  key={slider.name}
                  name={slider.name}
                  control={control}
                  render={({ field }) => (
                    <MoodSlider
                      label={slider.label}
                      name={slider.name}
                      icon={slider.icon}
                      color={slider.color}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              ))}

              <div>
                <Label htmlFor="notes" className="mb-2 block">Notas libres (opcional)</Label>
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      id="notes"
                      placeholder="Puedes escribir cómo fue tu día, algo que te preocupó, algo positivo que notaste..."
                      rows={4}
                      {...field}
                    />
                  )}
                />
              </div>

              <Button type="submit" className="w-full gap-2" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Guardar registro de hoy
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Sidebar - history */}
          <div className="space-y-5">
            <MoodChart
              data={mockMoodTrends}
              title="Mi evolución reciente"
              compact
            />

            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Registros recientes</p>
              <div className="space-y-2">
                {mockMoodEntries.slice().reverse().slice(0, 5).map((entry) => (
                  <div key={entry.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-700/40 bg-slate-900/40">
                    <div className="w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-700/50 flex flex-col items-center justify-center shrink-0">
                      <p className="text-[10px] font-bold text-slate-200">{entry.date.split('-')[2]}</p>
                      <p className="text-[8px] text-slate-600">
                        {new Date(entry.date + 'T00:00:00').toLocaleDateString('es-CL', { month: 'short' })}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${getMoodColor(entry.mood)}`}>{entry.mood}</span>
                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                            style={{ width: `${entry.mood * 10}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">{getMoodLabel(entry.mood)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
