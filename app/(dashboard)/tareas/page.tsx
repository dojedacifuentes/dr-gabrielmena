'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckSquare, Plus, Filter, Wind, Moon, Pencil, Activity, BookOpen, Dumbbell, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { mockTasks, mockPatients } from '@/lib/mock-data'
import { getCategoryLabel } from '@/lib/utils'

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  respiracion: Wind,
  sueno: Moon,
  reflexion: Pencil,
  habitos: Activity,
  diario: BookOpen,
  ejercicio: Dumbbell,
  otro: MoreHorizontal,
}

const categoryColors: Record<string, string> = {
  respiracion: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  sueno: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  reflexion: 'text-violet-400 bg-violet-500/10 border-violet-500/20',
  habitos: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  diario: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  ejercicio: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  otro: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
}

export default function TareasPage() {
  const [filter, setFilter] = useState('todas')

  const filtered = mockTasks.filter(t => {
    if (filter === 'pendientes') return !t.completed
    if (filter === 'completadas') return t.completed
    return true
  })

  const getPatient = (id: string) => mockPatients.find(p => p.id === id)

  const completedCount = mockTasks.filter(t => t.completed).length
  const total = mockTasks.length
  const completionRate = total > 0 ? Math.round((completedCount / total) * 100) : 0

  return (
    <div className="space-y-6 page-transition">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Tareas terapéuticas</h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {completedCount} de {total} completadas · {completionRate}% adherencia
          </p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" />
          Asignar tarea
        </Button>
      </div>

      {/* Progress overview */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total asignadas', value: total, color: 'text-slate-200' },
          { label: 'Completadas', value: completedCount, color: 'text-emerald-400' },
          { label: 'Adherencia', value: `${completionRate}%`, color: 'text-cyan-400' },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border border-slate-700/50 bg-slate-900/60 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-44">
            <Filter className="w-3.5 h-3.5 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las tareas</SelectItem>
            <SelectItem value="pendientes">Pendientes</SelectItem>
            <SelectItem value="completadas">Completadas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tasks */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <CheckSquare className="w-14 h-14 text-slate-700 mb-4" />
          <p className="text-slate-400">Sin tareas con este filtro</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((task, i) => {
            const patient = getPatient(task.patient_id)
            const IconComp = categoryIcons[task.category] || MoreHorizontal
            const colorClass = categoryColors[task.category] || categoryColors.otro

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className={task.completed ? 'opacity-60' : ''}>
                  <CardContent className="p-4 flex items-start gap-4">
                    {/* Status dot */}
                    <div className={`w-5 h-5 rounded-full border-2 shrink-0 mt-1 flex items-center justify-center transition-all ${
                      task.completed ? 'border-emerald-400 bg-emerald-400/20' : 'border-slate-600 hover:border-cyan-500/60'
                    }`}>
                      {task.completed && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
                    </div>

                    {/* Category icon */}
                    <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 ${colorClass}`}>
                      <IconComp className="w-4 h-4" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className={`text-sm font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                          {task.title}
                        </p>
                        <Badge variant="secondary" className="text-[10px]">{getCategoryLabel(task.category)}</Badge>
                        <Badge variant="secondary" className="text-[10px]">
                          {task.frequency === 'diaria' ? 'Diaria' : task.frequency === 'semanal' ? 'Semanal' : 'Única vez'}
                        </Badge>
                      </div>
                      {task.description && (
                        <p className="text-xs text-slate-400 leading-relaxed mb-2">{task.description}</p>
                      )}
                      <p className="text-xs text-slate-600">
                        Paciente: {patient?.full_name}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
