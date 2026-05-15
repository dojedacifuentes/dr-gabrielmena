'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Users, Calendar, TrendingUp, Activity, Clock,
  ChevronRight, Heart, CheckCircle, AlertCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { StatsCard } from '@/components/dashboard/stats-card'
import { MoodChart } from '@/components/dashboard/mood-chart'
import {
  mockAppointments, mockPatients, mockMoodTrends,
  mockDashboardStats, weeklyAppointments, emotionalSummary
} from '@/lib/mock-data'
import { formatDate, formatTime, getStatusColor, getStatusLabel } from '@/lib/utils'

const todayStr = '2025-05-15'
const todayAppointments = mockAppointments.filter(a => a.date === todayStr)
const upcomingAppointments = mockAppointments.filter(a => a.date >= todayStr && a.status !== 'completada').slice(0, 5)

const stagger = {
  visible: { transition: { staggerChildren: 0.06 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}

export default function DashboardPage() {
  const stats = mockDashboardStats

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="space-y-6 page-transition"
    >
      {/* Greeting */}
      <motion.div variants={fadeUp} className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 mb-1">
            Buenos días, Dr. Mena
          </h2>
          <p className="text-slate-400 text-sm">
            Hoy es {formatDate(todayStr)} · Tienes {todayAppointments.length} consultas agendadas para hoy
          </p>
        </div>
        <Link href="/citas">
          <Button size="sm" className="gap-1.5 hidden sm:flex">
            <Calendar className="w-3.5 h-3.5" />
            Ver agenda completa
          </Button>
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Pacientes activos"
          value={stats.activePatients}
          subtitle={`de ${stats.totalPatients} total`}
          icon={Users}
          trend={8}
          trendLabel="vs mes anterior"
          color="cyan"
          delay={0}
        />
        <StatsCard
          title="Consultas hoy"
          value={stats.appointmentsToday}
          subtitle="sesiones programadas"
          icon={Calendar}
          color="violet"
          delay={0.05}
        />
        <StatsCard
          title="Ánimo promedio"
          value={`${stats.averageMood}/10`}
          subtitle="últimos 7 días"
          icon={Activity}
          trend={5}
          color="emerald"
          delay={0.1}
        />
        <StatsCard
          title="Esta semana"
          value={stats.appointmentsThisWeek}
          subtitle="consultas en la semana"
          icon={TrendingUp}
          color="amber"
          delay={0.15}
        />
      </motion.div>

      {/* Main content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Mood chart */}
        <motion.div variants={fadeUp} className="xl:col-span-2">
          <MoodChart
            data={mockMoodTrends}
            title="Tendencia emocional — Pacientes activos"
            description="Promedio semanal de indicadores emocionales"
          />
        </motion.div>

        {/* Emotional summary */}
        <motion.div variants={fadeUp}>
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Resumen emocional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {emotionalSummary.map((item) => (
                <div key={item.metric}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-400">{item.metric}</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-slate-200">{item.average}/10</span>
                      <span className={`text-xs ${item.change > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {item.change > 0 ? '+' : ''}{item.change}
                      </span>
                    </div>
                  </div>
                  <Progress value={item.average * 10} className="h-1.5" />
                </div>
              ))}

              <div className="pt-3 border-t border-slate-800/60">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Heart className="w-3.5 h-3.5 text-rose-400" fill="currentColor" />
                  Basado en registros de 6 pacientes activos
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's appointments */}
        <motion.div variants={fadeUp}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Consultas de hoy</CardTitle>
                <Link href="/citas" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                  Ver todas <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayAppointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Calendar className="w-10 h-10 text-slate-700 mb-3" />
                  <p className="text-sm text-slate-500">Sin consultas para hoy</p>
                </div>
              ) : (
                todayAppointments.map((appt) => (
                  <Link
                    key={appt.id}
                    href={`/pacientes/${appt.patient_id}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-700/40 bg-slate-800/30 hover:bg-slate-800/60 hover:border-slate-600/50 transition-all group"
                  >
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="text-xs">
                        {appt.patient?.full_name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-200 truncate group-hover:text-cyan-400 transition-colors">
                        {appt.patient?.full_name}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        {formatTime(appt.time)} · {appt.duration} min
                      </p>
                    </div>
                    <Badge className={`text-[10px] ${getStatusColor(appt.status)}`}>
                      {getStatusLabel(appt.status)}
                    </Badge>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Active patients */}
        <motion.div variants={fadeUp}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Pacientes activos</CardTitle>
                <Link href="/pacientes" className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                  Ver todos <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockPatients.filter(p => p.status === 'activo').slice(0, 5).map((patient) => {
                const lastMood = mockMoodTrends[mockMoodTrends.length - 1]
                const moodValue = lastMood?.mood || 0

                return (
                  <Link
                    key={patient.id}
                    href={`/pacientes/${patient.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-700/40 bg-slate-800/30 hover:bg-slate-800/60 hover:border-slate-600/50 transition-all group"
                  >
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="text-xs">
                        {patient.full_name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-200 truncate group-hover:text-cyan-400 transition-colors">
                        {patient.full_name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{patient.diagnosis}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {patient.id === '1' ? (
                        <div className="flex items-center gap-1 text-xs text-emerald-400">
                          <CheckCircle className="w-3.5 h-3.5" />
                          {moodValue}/10
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <AlertCircle className="w-3.5 h-3.5" />
                          sin datos
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Weekly chart */}
      <motion.div variants={fadeUp}>
        <MoodChart
          data={weeklyAppointments as never}
          title="Consultas de la semana"
          description="Consultas programadas vs completadas"
          type="bar"
          compact
        />
      </motion.div>
    </motion.div>
  )
}
