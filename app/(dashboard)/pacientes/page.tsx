'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, UserPlus, Filter, ChevronRight, Users } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockPatients } from '@/lib/mock-data'
import { getStatusColor, getStatusLabel } from '@/lib/utils'

export default function PacientesPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('todos')

  const filtered = mockPatients.filter((p) => {
    const matchSearch = p.full_name.toLowerCase().includes(search.toLowerCase()) ||
      p.diagnosis?.toLowerCase().includes(search.toLowerCase()) ||
      p.email?.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'todos' || p.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div className="space-y-6 page-transition">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Pacientes</h2>
          <p className="text-sm text-slate-400 mt-0.5">{filtered.length} de {mockPatients.length} pacientes</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <UserPlus className="w-4 h-4" />
          Nuevo paciente
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <Input
            placeholder="Buscar por nombre, diagnóstico o correo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-44">
            <Filter className="w-3.5 h-3.5 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="activo">Activos</SelectItem>
            <SelectItem value="inactivo">Inactivos</SelectItem>
            <SelectItem value="alta">Alta médica</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Activos', count: mockPatients.filter(p => p.status === 'activo').length, color: 'text-emerald-400' },
          { label: 'Inactivos', count: mockPatients.filter(p => p.status === 'inactivo').length, color: 'text-slate-400' },
          { label: 'Alta', count: mockPatients.filter(p => p.status === 'alta').length, color: 'text-blue-400' },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border border-slate-700/50 bg-slate-900/60 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Patient list */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Users className="w-14 h-14 text-slate-700 mb-4" />
          <p className="text-slate-400 font-medium mb-1">No se encontraron pacientes</p>
          <p className="text-sm text-slate-600">Intenta con otros términos de búsqueda</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((patient, i) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={`/pacientes/${patient.id}`}
                className="flex items-center gap-4 p-4 rounded-xl border border-slate-700/40 bg-slate-900/60 hover:bg-slate-800/60 hover:border-slate-600/50 transition-all group"
              >
                <Avatar className="h-11 w-11 shrink-0">
                  <AvatarFallback>
                    {patient.full_name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-medium text-slate-200 group-hover:text-cyan-400 transition-colors truncate">
                      {patient.full_name}
                    </p>
                    <Badge className={`text-[10px] shrink-0 ${getStatusColor(patient.status)}`}>
                      {getStatusLabel(patient.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 truncate">{patient.diagnosis}</p>
                </div>

                <div className="hidden md:flex flex-col items-end gap-1 shrink-0">
                  <p className="text-xs text-slate-400">{patient.email}</p>
                  <p className="text-xs text-slate-600">{patient.age} años · RUT {patient.rut}</p>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
