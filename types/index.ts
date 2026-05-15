export type UserRole = 'doctor' | 'patient'

export interface Profile {
  id: string
  email: string
  full_name: string
  role: UserRole
  avatar_url?: string
  phone?: string
  created_at: string
  updated_at: string
}

export interface Patient {
  id: string
  doctor_id: string
  full_name: string
  email?: string
  phone?: string
  birth_date?: string
  age?: number
  rut?: string
  address?: string
  emergency_contact?: string
  emergency_phone?: string
  diagnosis?: string
  medications?: string
  allergies?: string
  notes?: string
  status: 'activo' | 'inactivo' | 'alta'
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  doctor_id: string
  patient_id: string
  patient?: Patient
  date: string
  time: string
  duration: number
  type: 'primera_vez' | 'seguimiento' | 'urgencia' | 'teleconsulta'
  status: 'programada' | 'confirmada' | 'completada' | 'cancelada' | 'no_asistio'
  notes?: string
  created_at: string
  updated_at: string
}

export type MoodLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface MoodEntry {
  id: string
  patient_id: string
  date: string
  mood: MoodLevel
  anxiety: MoodLevel
  stress: MoodLevel
  sleep_quality: MoodLevel
  energy: MoodLevel
  notes?: string
  created_at: string
}

export interface ClinicalNote {
  id: string
  patient_id: string
  doctor_id: string
  appointment_id?: string
  date: string
  subjective: string
  objective: string
  assessment: string
  plan: string
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface PatientTask {
  id: string
  patient_id: string
  doctor_id: string
  title: string
  description?: string
  category: 'respiracion' | 'sueno' | 'reflexion' | 'habitos' | 'diario' | 'ejercicio' | 'otro'
  frequency: 'diaria' | 'semanal' | 'una_vez'
  completed: boolean
  due_date?: string
  created_at: string
  updated_at: string
}

export interface IntakeForm {
  id: string
  patient_id: string
  appointment_id?: string
  symptoms: string[]
  anxiety_level: MoodLevel
  sleep_quality: MoodLevel
  emotional_state: string
  current_concerns: string
  medications?: string
  relevant_events?: string
  submitted_at: string
}

export interface DashboardStats {
  totalPatients: number
  activePatients: number
  appointmentsToday: number
  appointmentsThisWeek: number
  averageMood: number
  newPatientsThisMonth: number
}

export interface MoodTrend {
  date: string
  mood: number
  anxiety: number
  stress: number
  sleep: number
  energy: number
}

export interface NavItem {
  label: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: number
}
