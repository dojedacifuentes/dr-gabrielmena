import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { format, parseISO, isValid } from 'date-fns'
import { es } from 'date-fns/locale'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string, formatStr = "d 'de' MMMM, yyyy") {
  try {
    const date = parseISO(dateStr)
    if (!isValid(date)) return dateStr
    return format(date, formatStr, { locale: es })
  } catch {
    return dateStr
  }
}

export function formatDateTime(dateStr: string) {
  try {
    const date = parseISO(dateStr)
    if (!isValid(date)) return dateStr
    return format(date, "d 'de' MMMM, yyyy 'a las' HH:mm", { locale: es })
  } catch {
    return dateStr
  }
}

export function formatShortDate(dateStr: string) {
  try {
    const date = parseISO(dateStr)
    if (!isValid(date)) return dateStr
    return format(date, 'd MMM', { locale: es })
  } catch {
    return dateStr
  }
}

export function formatTime(timeStr: string) {
  if (!timeStr) return ''
  const [h, m] = timeStr.split(':')
  return `${h}:${m}`
}

export function getAge(birthDate: string): number {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

export function getMoodLabel(value: number): string {
  if (value <= 2) return 'Muy bajo'
  if (value <= 4) return 'Bajo'
  if (value <= 6) return 'Moderado'
  if (value <= 8) return 'Bueno'
  return 'Excelente'
}

export function getMoodColor(value: number): string {
  if (value <= 2) return 'text-red-400'
  if (value <= 4) return 'text-orange-400'
  if (value <= 6) return 'text-yellow-400'
  if (value <= 8) return 'text-green-400'
  return 'text-emerald-400'
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    activo: 'Activo',
    inactivo: 'Inactivo',
    alta: 'Alta',
    programada: 'Programada',
    confirmada: 'Confirmada',
    completada: 'Completada',
    cancelada: 'Cancelada',
    no_asistio: 'No asistió',
    primera_vez: 'Primera vez',
    seguimiento: 'Seguimiento',
    urgencia: 'Urgencia',
    teleconsulta: 'Teleconsulta',
  }
  return labels[status] || status
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    activo: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    inactivo: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
    alta: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    programada: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
    confirmada: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    completada: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    cancelada: 'bg-red-500/15 text-red-400 border-red-500/30',
    no_asistio: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  }
  return colors[status] || 'bg-slate-500/15 text-slate-400 border-slate-500/30'
}

export function getCategoryLabel(cat: string): string {
  const labels: Record<string, string> = {
    respiracion: 'Respiración',
    sueno: 'Sueño',
    reflexion: 'Reflexión',
    habitos: 'Hábitos',
    diario: 'Diario',
    ejercicio: 'Ejercicio',
    otro: 'Otro',
  }
  return labels[cat] || cat
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength) + '...'
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
