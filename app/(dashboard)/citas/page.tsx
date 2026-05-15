'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Clock, ChevronLeft, ChevronRight, Plus, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockAppointments } from '@/lib/mock-data'
import { formatDate, formatTime, getStatusColor, getStatusLabel } from '@/lib/utils'

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie']

export default function CitasPage() {
  const [statusFilter, setStatusFilter] = useState('todos')
  const [view, setView] = useState<'lista' | 'semana'>('lista')

  const filtered = mockAppointments.filter(a =>
    statusFilter === 'todos' || a.status === statusFilter
  ).sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))

  const groupedByDate = filtered.reduce<Record<string, typeof filtered>>((acc, appt) => {
    if (!acc[appt.date]) acc[appt.date] = []
    acc[appt.date].push(appt)
    return acc
  }, {})

  return (
    <div className="space-y-6 page-transition">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Agenda de citas</h2>
          <p className="text-sm text-slate-400 mt-0.5">{filtered.length} consultas</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" />
          Nueva cita
        </Button>
      </div>

      {/* Filters + view toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <Filter className="w-3.5 h-3.5 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="programada">Programadas</SelectItem>
              <SelectItem value="confirmada">Confirmadas</SelectItem>
              <SelectItem value="completada">Completadas</SelectItem>
              <SelectItem value="cancelada">Canceladas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg border border-slate-700/50 bg-slate-800/40">
          {(['lista', 'semana'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                view === v ? 'bg-slate-700/80 text-cyan-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {v === 'lista' ? 'Lista' : 'Semana'}
            </button>
          ))}
        </div>
      </div>

      {/* Week summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Confirmadas', count: mockAppointments.filter(a => a.status === 'confirmada').length, color: 'text-cyan-400' },
          { label: 'Programadas', count: mockAppointments.filter(a => a.status === 'programada').length, color: 'text-yellow-400' },
          { label: 'Completadas', count: mockAppointments.filter(a => a.status === 'completada').length, color: 'text-emerald-400' },
          { label: 'Canceladas', count: mockAppointments.filter(a => a.status === 'cancelada').length, color: 'text-red-400' },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border border-slate-700/50 bg-slate-900/60 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Appointment list */}
      {Object.entries(groupedByDate).map(([date, appointments]) => (
        <div key={date}>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-semibold text-slate-300">{formatDate(date)}</h3>
            </div>
            <div className="flex-1 h-px bg-slate-800/60" />
            <span className="text-xs text-slate-500">{appointments.length} cita{appointments.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="space-y-2">
            {appointments.map((appt, i) => (
              <motion.div
                key={appt.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={`/pacientes/${appt.patient_id}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-700/40 bg-slate-900/60 hover:bg-slate-800/60 hover:border-slate-600/50 transition-all group"
                >
                  {/* Time */}
                  <div className="w-16 shrink-0 text-center">
                    <p className="text-sm font-bold text-slate-200">{formatTime(appt.time)}</p>
                    <p className="text-[10px] text-slate-600">{appt.duration} min</p>
                  </div>

                  <div className="w-px h-8 bg-slate-800/80 shrink-0" />

                  {/* Patient */}
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarFallback className="text-xs">
                      {appt.patient?.full_name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200 group-hover:text-cyan-400 transition-colors truncate">
                      {appt.patient?.full_name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {appt.patient?.diagnosis}
                    </p>
                  </div>

                  {/* Type + Status */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="secondary" className="text-[10px] hidden sm:flex">
                      {getStatusLabel(appt.type)}
                    </Badge>
                    <Badge className={`text-[10px] ${getStatusColor(appt.status)}`}>
                      {getStatusLabel(appt.status)}
                    </Badge>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Calendar className="w-14 h-14 text-slate-700 mb-4" />
          <p className="text-slate-400 font-medium">Sin citas con este filtro</p>
        </div>
      )}
    </div>
  )
}
