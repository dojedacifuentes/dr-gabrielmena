'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft, Phone, Mail, Calendar, FileText,
  Activity, CheckSquare, Edit, Clock, User,
  Pill, AlertTriangle, MessageSquare
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { MoodChart } from '@/components/dashboard/mood-chart'
import {
  mockPatients, mockAppointments, mockClinicalNotes,
  mockTasks, mockMoodTrends, mockMoodEntries
} from '@/lib/mock-data'
import {
  formatDate, formatTime, getStatusColor, getStatusLabel,
  getCategoryLabel, getMoodLabel, getMoodColor, getAge
} from '@/lib/utils'

export default function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const patient = mockPatients.find(p => p.id === id)

  if (!patient) notFound()

  const age = patient.birth_date ? getAge(patient.birth_date) : patient.age
  const initials = patient.full_name.split(' ').map(n => n[0]).slice(0, 2).join('')
  const patientAppointments = mockAppointments.filter(a => a.patient_id === id)
  const patientNotes = mockClinicalNotes.filter(n => n.patient_id === id)
  const patientTasks = mockTasks.filter(t => t.patient_id === id)
  const patientMoods = id === '1' ? mockMoodEntries : []
  const lastMood = patientMoods[patientMoods.length - 1]

  return (
    <div className="space-y-6 page-transition">
      {/* Back + header */}
      <div>
        <Link href="/pacientes" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          Volver a pacientes
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          <Avatar className="h-16 w-16 shrink-0">
            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-100">{patient.full_name}</h1>
                <p className="text-cyan-400 text-sm mt-0.5">{patient.diagnosis}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={`${getStatusColor(patient.status)}`}>
                  {getStatusLabel(patient.status)}
                </Badge>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <Edit className="w-3.5 h-3.5" />
                  Editar
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
              {[
                { icon: User, text: `${age} años · RUT ${patient.rut}` },
                { icon: Mail, text: patient.email || 'Sin correo' },
                { icon: Phone, text: patient.phone || 'Sin teléfono' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-1.5 text-sm text-slate-400">
                  <item.icon className="w-3.5 h-3.5 text-slate-600" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Sesiones totales', value: patientAppointments.length, icon: Calendar, color: 'text-cyan-400' },
          { label: 'Notas clínicas', value: patientNotes.length, icon: FileText, color: 'text-violet-400' },
          { label: 'Tareas asignadas', value: patientTasks.length, icon: CheckSquare, color: 'text-emerald-400' },
          { label: 'Ánimo actual', value: lastMood ? `${lastMood.mood}/10` : '—', icon: Activity, color: 'text-amber-400' },
        ].map((stat) => (
          <div key={stat.label} className="p-4 rounded-xl border border-slate-700/50 bg-slate-900/60">
            <stat.icon className={`w-4 h-4 ${stat.color} mb-2`} />
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="resumen">
        <TabsList>
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="notas">Notas clínicas</TabsTrigger>
          <TabsTrigger value="seguimiento">Seguimiento</TabsTrigger>
          <TabsTrigger value="tareas">Tareas</TabsTrigger>
          <TabsTrigger value="citas">Citas</TabsTrigger>
        </TabsList>

        {/* RESUMEN */}
        <TabsContent value="resumen">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-5">
              {/* Clinical info */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Información clínica</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { icon: FileText, label: 'Diagnóstico', value: patient.diagnosis },
                    { icon: Pill, label: 'Medicación actual', value: patient.medications },
                    { icon: AlertTriangle, label: 'Alergias', value: patient.allergies || 'Sin alergias conocidas' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-3">
                      <item.icon className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                        <p className="text-sm text-slate-200">{item.value}</p>
                      </div>
                    </div>
                  ))}
                  {patient.notes && (
                    <div className="flex gap-3">
                      <MessageSquare className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Notas generales</p>
                        <p className="text-sm text-slate-300 leading-relaxed">{patient.notes}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Last mood chart */}
              {id === '1' && (
                <MoodChart
                  data={mockMoodTrends}
                  title="Evolución emocional reciente"
                  description="Últimos 7 días registrados"
                  compact
                />
              )}
            </div>

            {/* Sidebar info */}
            <div className="space-y-5">
              {/* Last session */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Última consulta</CardTitle>
                </CardHeader>
                <CardContent>
                  {patientAppointments.filter(a => a.status === 'completada')[0] ? (
                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        {formatDate(patientAppointments.filter(a => a.status === 'completada')[0].date)}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(patientAppointments.filter(a => a.status === 'completada')[0].time)}
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500">Sin consultas completadas</p>
                  )}
                </CardContent>
              </Card>

              {/* Next session */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Próxima consulta</CardTitle>
                </CardHeader>
                <CardContent>
                  {patientAppointments.filter(a => a.status === 'programada' || a.status === 'confirmada')[0] ? (
                    <div>
                      <p className="text-sm font-medium text-slate-200">
                        {formatDate(patientAppointments.filter(a => a.status !== 'completada' && a.status !== 'cancelada')[0].date)}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTime(patientAppointments.filter(a => a.status !== 'completada' && a.status !== 'cancelada')[0].time)}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-slate-500 mb-3">Sin consultas programadas</p>
                      <Button size="sm" className="w-full gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        Agendar
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Contacto de emergencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-300">{patient.emergency_contact || 'No registrado'}</p>
                  {patient.emergency_phone && (
                    <p className="text-xs text-slate-500 mt-1">{patient.emergency_phone}</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* NOTAS */}
        <TabsContent value="notas">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button size="sm" className="gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                Nueva nota SOAP
              </Button>
            </div>

            {patientNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FileText className="w-12 h-12 text-slate-700 mb-3" />
                <p className="text-slate-400">Sin notas clínicas aún</p>
              </div>
            ) : (
              patientNotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{formatDate(note.date)}</CardTitle>
                        <div className="flex gap-2">
                          {note.tags?.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {[
                          { label: 'S — Subjetivo', value: note.subjective },
                          { label: 'O — Objetivo', value: note.objective },
                          { label: 'A — Evaluación', value: note.assessment },
                          { label: 'P — Plan', value: note.plan },
                        ].map((section) => (
                          <div key={section.label}>
                            <p className="text-xs font-semibold text-cyan-400 mb-1.5 uppercase tracking-wide">{section.label}</p>
                            <p className="text-sm text-slate-300 leading-relaxed">{section.value}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </TabsContent>

        {/* SEGUIMIENTO */}
        <TabsContent value="seguimiento">
          <div className="space-y-5">
            {id === '1' ? (
              <>
                <MoodChart data={mockMoodTrends} title="Evolución emocional — 7 días" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {patientMoods.slice(-3).reverse().map((entry) => (
                    <Card key={entry.id}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-xs text-slate-400">{formatDate(entry.date)}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2.5">
                        {[
                          { label: 'Ánimo', value: entry.mood },
                          { label: 'Ansiedad', value: entry.anxiety },
                          { label: 'Estrés', value: entry.stress },
                          { label: 'Sueño', value: entry.sleep_quality },
                          { label: 'Energía', value: entry.energy },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">{item.label}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                                  style={{ width: `${item.value * 10}%` }}
                                />
                              </div>
                              <span className={`text-xs font-medium ${getMoodColor(item.value)}`}>
                                {item.value}
                              </span>
                            </div>
                          </div>
                        ))}
                        {entry.notes && (
                          <p className="text-xs text-slate-500 italic border-t border-slate-800/60 pt-2">&ldquo;{entry.notes}&rdquo;</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Activity className="w-12 h-12 text-slate-700 mb-3" />
                <p className="text-slate-400 mb-1">Sin registros emocionales</p>
                <p className="text-sm text-slate-600">El paciente aún no ha completado registros de seguimiento</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* TAREAS */}
        <TabsContent value="tareas">
          <div className="space-y-3">
            <div className="flex justify-end">
              <Button size="sm" className="gap-1.5">
                <CheckSquare className="w-3.5 h-3.5" />
                Asignar tarea
              </Button>
            </div>

            {patientTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckSquare className="w-12 h-12 text-slate-700 mb-3" />
                <p className="text-slate-400">Sin tareas asignadas</p>
              </div>
            ) : (
              patientTasks.map((task) => (
                <Card key={task.id} className={task.completed ? 'opacity-70' : ''}>
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center ${task.completed ? 'border-emerald-400 bg-emerald-400/20' : 'border-slate-600'}`}>
                      {task.completed && <div className="w-2 h-2 rounded-full bg-emerald-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className={`text-sm font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                          {task.title}
                        </p>
                        <Badge variant="secondary" className="text-[10px]">{getCategoryLabel(task.category)}</Badge>
                        <Badge variant="secondary" className="text-[10px]">{task.frequency === 'diaria' ? 'Diaria' : task.frequency === 'semanal' ? 'Semanal' : 'Una vez'}</Badge>
                      </div>
                      {task.description && (
                        <p className="text-xs text-slate-400 leading-relaxed">{task.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        {/* CITAS */}
        <TabsContent value="citas">
          <div className="space-y-3">
            {patientAppointments.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Calendar className="w-12 h-12 text-slate-700 mb-3" />
                <p className="text-slate-400">Sin citas registradas</p>
              </div>
            ) : (
              patientAppointments.map((appt) => (
                <div key={appt.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-700/40 bg-slate-900/60">
                  <div className="w-12 h-12 rounded-xl border border-slate-700/50 bg-slate-800/60 flex flex-col items-center justify-center shrink-0">
                    <p className="text-xs font-bold text-slate-200">{appt.date.split('-')[2]}</p>
                    <p className="text-[10px] text-slate-500 uppercase">
                      {new Date(appt.date + 'T00:00:00').toLocaleDateString('es-CL', { month: 'short' })}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-200 capitalize">{getStatusLabel(appt.type)}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {formatTime(appt.time)} · {appt.duration} min
                    </p>
                  </div>
                  <Badge className={`${getStatusColor(appt.status)} text-[10px]`}>
                    {getStatusLabel(appt.status)}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
