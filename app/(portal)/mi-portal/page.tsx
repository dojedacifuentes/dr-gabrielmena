'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Activity, Calendar, CheckSquare, ChevronRight, Heart, Smile, Moon, Zap } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { MoodChart } from '@/components/dashboard/mood-chart'
import { mockMoodTrends, mockMoodEntries, mockTasks, mockAppointments } from '@/lib/mock-data'
import { formatDate, formatTime, getStatusColor, getStatusLabel, getMoodColor, getMoodLabel } from '@/lib/utils'

const stagger = { visible: { transition: { staggerChildren: 0.07 } } }
const fadeUp = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0 } }

export default function MiPortalPage() {
  const lastMood = mockMoodEntries[mockMoodEntries.length - 1]
  const pendingTasks = mockTasks.filter(t => !t.completed)
  const nextAppointment = mockAppointments.find(a =>
    (a.status === 'programada' || a.status === 'confirmada') && a.date >= '2025-05-15'
  )
  const completedTasks = mockTasks.filter(t => t.completed).length
  const totalTasks = mockTasks.length

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
      {/* Welcome */}
      <motion.div variants={fadeUp}>
        <h1 className="text-2xl font-bold text-slate-100">Hola, Valentina</h1>
        <p className="text-slate-400 mt-1 text-sm">Bienvenida a tu espacio de seguimiento personal.</p>
      </motion.div>

      {/* Quick mood + stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: 'Estado de ánimo', value: lastMood ? `${lastMood.mood}/10` : '—',
            sub: lastMood ? getMoodLabel(lastMood.mood) : 'Sin registro',
            icon: Smile, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20'
          },
          {
            label: 'Calidad de sueño', value: lastMood ? `${lastMood.sleep_quality}/10` : '—',
            sub: 'Último registro', icon: Moon, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20'
          },
          {
            label: 'Nivel de energía', value: lastMood ? `${lastMood.energy}/10` : '—',
            sub: 'Último registro', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20'
          },
          {
            label: 'Tareas', value: `${completedTasks}/${totalTasks}`,
            sub: 'completadas', icon: CheckSquare, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20'
          },
        ].map((stat, i) => (
          <div key={stat.label} className={`p-4 rounded-xl border ${stat.bg} bg-gradient-to-br from-slate-900/80 to-transparent`}>
            <div className={`w-8 h-8 rounded-lg ${stat.bg} border flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon className="w-4 h-4" />
            </div>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
            <p className="text-[10px] text-slate-600">{stat.sub}</p>
          </div>
        ))}
      </motion.div>

      {/* Mood chart */}
      <motion.div variants={fadeUp}>
        <MoodChart
          data={mockMoodTrends}
          title="Mi evolución emocional"
          description="Últimos 7 días registrados"
          compact
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Next appointment */}
        <motion.div variants={fadeUp}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Próxima consulta</CardTitle>
                <Link href="/mis-citas" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                  Ver todas <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {nextAppointment ? (
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl border border-cyan-500/20 bg-cyan-500/10 flex flex-col items-center justify-center shrink-0">
                    <p className="text-lg font-bold text-cyan-400">
                      {nextAppointment.date.split('-')[2]}
                    </p>
                    <p className="text-[10px] text-cyan-600 uppercase">
                      {new Date(nextAppointment.date + 'T00:00:00').toLocaleDateString('es-CL', { month: 'short' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-200">Dr. Gabriel Mena</p>
                    <p className="text-xs text-slate-400 mt-0.5">{formatTime(nextAppointment.time)} · {nextAppointment.duration} min</p>
                    <Badge className={`mt-2 text-[10px] ${getStatusColor(nextAppointment.status)}`}>
                      {getStatusLabel(nextAppointment.status)}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Calendar className="w-10 h-10 text-slate-700 mx-auto mb-2" />
                  <p className="text-sm text-slate-500 mb-3">Sin consultas próximas</p>
                  <Link href="/contacto">
                    <Button size="sm">Solicitar hora</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Pending tasks */}
        <motion.div variants={fadeUp}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Tareas pendientes</CardTitle>
                <Link href="/mis-tareas" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                  Ver todas <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingTasks.length === 0 ? (
                <div className="text-center py-4">
                  <CheckSquare className="w-10 h-10 text-emerald-700 mx-auto mb-2" />
                  <p className="text-sm text-emerald-400">¡Todas las tareas completadas!</p>
                </div>
              ) : (
                pendingTasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-slate-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-slate-200">{task.title}</p>
                      <p className="text-xs text-slate-500">{task.frequency === 'diaria' ? 'Tarea diaria' : 'Tarea semanal'}</p>
                    </div>
                  </div>
                ))
              )}
              {pendingTasks.length > 3 && (
                <p className="text-xs text-slate-500 pt-1">+ {pendingTasks.length - 3} tareas más</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Log mood CTA */}
      <motion.div variants={fadeUp}>
        <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900/60 to-blue-600/10 p-6 flex items-center justify-between gap-6">
          <div>
            <p className="font-semibold text-slate-100 mb-1">¿Cómo te sientes hoy?</p>
            <p className="text-sm text-slate-400">Registra tu estado emocional para ayudar al Dr. Mena a hacer un mejor seguimiento.</p>
          </div>
          <Link href="/mi-estado" className="shrink-0">
            <Button className="gap-2">
              <Heart className="w-4 h-4" />
              Registrar ahora
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}
