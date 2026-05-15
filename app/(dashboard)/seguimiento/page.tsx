'use client'

import { motion } from 'framer-motion'
import { Activity, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { MoodChart } from '@/components/dashboard/mood-chart'
import { mockPatients, mockMoodTrends, mockMoodEntries, emotionalSummary } from '@/lib/mock-data'
import { getMoodLabel, getMoodColor } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const metrics = [
  { key: 'mood', label: 'Estado de ánimo', color: '#06b6d4' },
  { key: 'anxiety', label: 'Ansiedad', color: '#f59e0b' },
  { key: 'stress', label: 'Nivel de estrés', color: '#ef4444' },
  { key: 'sleep', label: 'Calidad del sueño', color: '#8b5cf6' },
  { key: 'energy', label: 'Nivel de energía', color: '#10b981' },
]

export default function SeguimientoPage() {
  const lastEntry = mockMoodEntries[mockMoodEntries.length - 1]
  const firstEntry = mockMoodEntries[0]

  const trends = {
    mood: { last: lastEntry?.mood, first: firstEntry?.mood },
    anxiety: { last: lastEntry?.anxiety, first: firstEntry?.anxiety },
    stress: { last: lastEntry?.stress, first: firstEntry?.stress },
    sleep: { last: lastEntry?.sleep_quality, first: firstEntry?.sleep_quality },
    energy: { last: lastEntry?.energy, first: firstEntry?.energy },
  }

  return (
    <div className="space-y-6 page-transition">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Seguimiento emocional</h2>
        <p className="text-sm text-slate-400 mt-0.5">Monitoreo del estado emocional de los pacientes activos</p>
      </div>

      {/* Overview metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {emotionalSummary.map((item, i) => (
          <motion.div
            key={item.metric}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="p-4 rounded-xl border border-slate-700/50 bg-slate-900/60"
          >
            <p className="text-xs text-slate-500 mb-2">{item.metric}</p>
            <p className="text-2xl font-bold text-slate-100">{item.average}<span className="text-sm text-slate-500 font-normal">/10</span></p>
            <div className={`flex items-center gap-1 mt-1 text-xs ${item.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {item.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {item.change > 0 ? '+' : ''}{item.change} esta semana
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="tendencia">
        <TabsList>
          <TabsTrigger value="tendencia">Tendencia semanal</TabsTrigger>
          <TabsTrigger value="pacientes">Por paciente</TabsTrigger>
          <TabsTrigger value="registros">Registros recientes</TabsTrigger>
        </TabsList>

        <TabsContent value="tendencia" className="space-y-5">
          <MoodChart
            data={mockMoodTrends}
            title="Evolución emocional — Últimos 7 días"
            description="Promedio de todos los pacientes con registros activos"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {metrics.map((metric, i) => {
              const trend = trends[metric.key as keyof typeof trends]
              const delta = trend ? trend.last - trend.first : 0

              return (
                <motion.div
                  key={metric.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="p-4 rounded-xl border border-slate-700/50 bg-slate-900/60"
                >
                  <div className="flex items-center gap-1.5 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: metric.color }} />
                    <p className="text-xs text-slate-400">{metric.label}</p>
                  </div>
                  <p className="text-xl font-bold text-slate-100" style={{ color: metric.color }}>
                    {trend?.last || '—'}<span className="text-xs text-slate-500 font-normal">/10</span>
                  </p>
                  <Progress
                    value={(trend?.last || 0) * 10}
                    className="mt-2 h-1"
                  />
                  {trend && (
                    <p className={`text-xs mt-2 ${delta >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {delta >= 0 ? '+' : ''}{delta} vs inicio
                    </p>
                  )}
                </motion.div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="pacientes">
          <div className="space-y-3">
            {mockPatients.filter(p => p.status === 'activo').map((patient, i) => {
              const hasData = patient.id === '1'
              const lastMood = hasData ? mockMoodEntries[mockMoodEntries.length - 1] : null

              return (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="p-5 rounded-xl border border-slate-700/40 bg-slate-900/60"
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback className="text-xs">
                        {patient.full_name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="text-sm font-medium text-slate-200">{patient.full_name}</p>
                          <p className="text-xs text-slate-500">{patient.diagnosis}</p>
                        </div>
                        {hasData ? (
                          <div className={`text-sm font-bold ${getMoodColor(lastMood!.mood)}`}>
                            {lastMood!.mood}/10 · {getMoodLabel(lastMood!.mood)}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-600">Sin registros</p>
                        )}
                      </div>

                      {hasData && lastMood && (
                        <div className="grid grid-cols-5 gap-2">
                          {[
                            { label: 'Ánimo', value: lastMood.mood },
                            { label: 'Ansiedad', value: lastMood.anxiety },
                            { label: 'Estrés', value: lastMood.stress },
                            { label: 'Sueño', value: lastMood.sleep_quality },
                            { label: 'Energía', value: lastMood.energy },
                          ].map((m) => (
                            <div key={m.label} className="text-center">
                              <p className="text-xs text-slate-500 mb-1">{m.label}</p>
                              <p className={`text-sm font-bold ${getMoodColor(m.value)}`}>{m.value}</p>
                              <Progress value={m.value * 10} className="h-1 mt-1" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="registros">
          <div className="space-y-3">
            {mockMoodEntries.slice().reverse().map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl border border-slate-700/40 bg-slate-900/60"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-200">Valentina Rodríguez</p>
                    <p className="text-xs text-slate-500 mt-0.5">{entry.date}</p>
                  </div>
                  <div className={`text-sm font-bold shrink-0 ${getMoodColor(entry.mood)}`}>
                    Ánimo {entry.mood}/10
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-3">
                  {[
                    { label: 'Ánimo', v: entry.mood },
                    { label: 'Ansiedad', v: entry.anxiety },
                    { label: 'Estrés', v: entry.stress },
                    { label: 'Sueño', v: entry.sleep_quality },
                    { label: 'Energía', v: entry.energy },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 w-16 shrink-0">{m.label}</span>
                      <Progress value={m.v * 10} className="flex-1 h-1.5" />
                      <span className={`text-xs font-medium ${getMoodColor(m.v)} shrink-0`}>{m.v}</span>
                    </div>
                  ))}
                </div>

                {entry.notes && (
                  <p className="text-xs text-slate-400 mt-3 italic border-t border-slate-800/60 pt-3">
                    &ldquo;{entry.notes}&rdquo;
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
