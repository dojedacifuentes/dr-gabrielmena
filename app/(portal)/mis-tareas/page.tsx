'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckSquare, Wind, Moon, Pencil, Activity, BookOpen, Dumbbell, MoreHorizontal } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { mockTasks } from '@/lib/mock-data'
import { getCategoryLabel } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

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

export default function MisTareasPage() {
  const [tasks, setTasks] = useState(mockTasks.filter(t => t.patient_id === '1'))
  const { toast } = useToast()

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const newCompleted = !t.completed
        if (newCompleted) {
          toast({ title: '¡Tarea completada!', description: 'Excelente, sigue así.' })
        }
        return { ...t, completed: newCompleted }
      }
      return t
    }))
  }

  const completed = tasks.filter(t => t.completed).length
  const total = tasks.length
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="space-y-6 page-transition">
      <div>
        <h1 className="text-2xl font-bold text-slate-100">Mis tareas</h1>
        <p className="text-slate-400 mt-1 text-sm">Actividades y ejercicios asignados por el Dr. Mena para este período.</p>
      </div>

      {/* Progress */}
      <div className="p-5 rounded-xl border border-slate-700/50 bg-slate-900/60">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-slate-200">Progreso general</p>
          <p className="text-sm font-bold text-cyan-400">{completed}/{total} completadas</p>
        </div>
        <Progress value={pct} className="h-2" />
        <p className="text-xs text-slate-500 mt-2">{pct}% de adherencia esta semana</p>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map((task, i) => {
          const IconComp = categoryIcons[task.category] || MoreHorizontal
          const colorClass = categoryColors[task.category] || categoryColors.otro

          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card className={task.completed ? 'opacity-70' : ''}>
                <CardContent className="p-4 flex items-start gap-4">
                  {/* Toggle */}
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                      task.completed
                        ? 'border-emerald-400 bg-emerald-400/20'
                        : 'border-slate-600 hover:border-cyan-500/60 hover:bg-cyan-500/5'
                    }`}
                  >
                    {task.completed && <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />}
                  </button>

                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${colorClass}`}>
                    <IconComp className="w-4.5 h-4.5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <p className={`text-sm font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                        {task.title}
                      </p>
                      <Badge variant="secondary" className="text-[10px]">{getCategoryLabel(task.category)}</Badge>
                      <Badge variant="secondary" className="text-[10px]">
                        {task.frequency === 'diaria' ? 'Diaria' : task.frequency === 'semanal' ? 'Semanal' : 'Única vez'}
                      </Badge>
                    </div>
                    {task.description && (
                      <p className="text-xs text-slate-400 leading-relaxed">{task.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <CheckSquare className="w-14 h-14 text-slate-700 mb-4" />
          <p className="text-slate-400">Sin tareas asignadas aún</p>
          <p className="text-sm text-slate-600 mt-1">Las tareas serán asignadas por el Dr. Mena en tu próxima sesión</p>
        </div>
      )}
    </div>
  )
}
