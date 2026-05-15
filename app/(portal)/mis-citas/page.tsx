'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { mockAppointments } from '@/lib/mock-data'
import { formatDate, formatTime, getStatusColor, getStatusLabel } from '@/lib/utils'

const patientAppointments = mockAppointments
  .filter(a => a.patient_id === '1')
  .sort((a, b) => b.date.localeCompare(a.date))

export default function MisCitasPage() {
  const upcoming = patientAppointments.filter(a => a.date >= '2025-05-15' && a.status !== 'completada')
  const past = patientAppointments.filter(a => a.date < '2025-05-15' || a.status === 'completada')

  return (
    <div className="space-y-6 page-transition">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Mis citas</h1>
        <p className="text-slate-400 mt-1 text-sm">Consultas programadas y pasadas con el Dr. Gabriel Mena</p>
      </div>

      {/* CTA */}
      <div className="flex items-center justify-between p-5 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
        <div>
          <p className="font-medium text-slate-200">¿Necesitas agendar una hora?</p>
          <p className="text-sm text-slate-400 mt-0.5">Solicita tu próxima consulta directamente</p>
        </div>
        <Link href="/contacto">
          <Button size="sm" className="gap-1.5 shrink-0">
            Solicitar hora
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-300 mb-3">Próximas consultas</h2>
          <div className="space-y-3">
            {upcoming.map((appt, i) => (
              <motion.div
                key={appt.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-cyan-500/20 bg-cyan-500/5"
              >
                <div className="w-14 h-14 rounded-xl border border-cyan-500/30 bg-cyan-500/10 flex flex-col items-center justify-center shrink-0">
                  <p className="text-lg font-bold text-cyan-400">{appt.date.split('-')[2]}</p>
                  <p className="text-[10px] text-cyan-600 uppercase">
                    {new Date(appt.date + 'T00:00:00').toLocaleDateString('es-CL', { month: 'short' })}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-200">Dr. Gabriel Ignacio Mena</p>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3" />
                    {formatTime(appt.time)} · {appt.duration} minutos
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 capitalize">{getStatusLabel(appt.type)}</p>
                </div>
                <Badge className={`${getStatusColor(appt.status)} text-[10px] shrink-0`}>
                  {getStatusLabel(appt.status)}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Past */}
      {past.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-slate-300 mb-3">Historial de consultas</h2>
          <div className="space-y-2">
            {past.map((appt, i) => (
              <motion.div
                key={appt.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-700/40 bg-slate-900/40 opacity-80"
              >
                <div className="w-12 h-12 rounded-xl border border-slate-700/50 bg-slate-800/60 flex flex-col items-center justify-center shrink-0">
                  <p className="text-sm font-bold text-slate-400">{appt.date.split('-')[2]}</p>
                  <p className="text-[10px] text-slate-600 uppercase">
                    {new Date(appt.date + 'T00:00:00').toLocaleDateString('es-CL', { month: 'short' })}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-300">Dr. Gabriel Ignacio Mena</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3" />
                    {formatTime(appt.time)} · {appt.duration} min
                  </p>
                </div>
                <Badge className={`${getStatusColor(appt.status)} text-[10px] shrink-0`}>
                  {getStatusLabel(appt.status)}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {patientAppointments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Calendar className="w-14 h-14 text-slate-700 mb-4" />
          <p className="text-slate-400">Sin citas registradas aún</p>
        </div>
      )}
    </div>
  )
}
