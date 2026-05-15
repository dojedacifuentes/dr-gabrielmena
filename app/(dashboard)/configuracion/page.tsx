'use client'

import { motion } from 'framer-motion'
import { User, Bell, Shield, Palette, Globe, Save } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

const sections = [
  { icon: User, label: 'Perfil' },
  { icon: Bell, label: 'Notificaciones' },
  { icon: Shield, label: 'Seguridad' },
  { icon: Palette, label: 'Apariencia' },
]

export default function ConfiguracionPage() {
  return (
    <div className="space-y-6 page-transition max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Configuración</h2>
        <p className="text-sm text-slate-400 mt-0.5">Gestiona tu cuenta y preferencias de la plataforma</p>
      </div>

      {/* Profile */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" />
              <CardTitle className="text-sm">Información del perfil</CardTitle>
            </div>
            <CardDescription>Actualiza tu información personal y profesional</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-2xl">
                GM
              </div>
              <Button variant="outline" size="sm">Cambiar imagen</Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Nombre completo</Label>
                <Input defaultValue="Dr. Gabriel Ignacio Mena Bañados" />
              </div>
              <div>
                <Label className="mb-2 block">Especialidad</Label>
                <Input defaultValue="Médico General — Salud Mental" />
              </div>
              <div>
                <Label className="mb-2 block">Correo electrónico</Label>
                <Input defaultValue="gabriel.mena@clinica.cl" type="email" />
              </div>
              <div>
                <Label className="mb-2 block">Teléfono de contacto</Label>
                <Input defaultValue="+56 9 XXXX XXXX" />
              </div>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button className="gap-2">
                <Save className="w-4 h-4" />
                Guardar cambios
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              <CardTitle className="text-sm">Notificaciones</CardTitle>
            </div>
            <CardDescription>Configura cuándo y cómo recibir notificaciones</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Nuevas solicitudes de cita', desc: 'Cuando un paciente solicite una hora', enabled: true },
              { label: 'Registros emocionales nuevos', desc: 'Cuando un paciente complete su registro diario', enabled: true },
              { label: 'Recordatorio de citas', desc: '1 hora antes de cada consulta programada', enabled: false },
              { label: 'Tareas completadas', desc: 'Cuando un paciente marque una tarea como completada', enabled: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-800/60 last:border-0">
                <div>
                  <p className="text-sm text-slate-200">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
                <div className={`w-10 h-5 rounded-full border transition-colors ${item.enabled ? 'bg-cyan-500 border-cyan-400' : 'bg-slate-700 border-slate-600'}`}>
                  <div className={`w-3.5 h-3.5 rounded-full bg-white mt-0.5 transition-all ${item.enabled ? 'ml-5.5' : 'ml-0.5'}`} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Security */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <CardTitle className="text-sm">Seguridad</CardTitle>
            </div>
            <CardDescription>Administra tu contraseña y sesiones activas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="mb-2 block">Contraseña actual</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div>
                <Label className="mb-2 block">Nueva contraseña</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
            </div>
            <Button variant="outline" size="sm">Actualizar contraseña</Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Danger zone */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="border-red-500/20">
          <CardHeader>
            <CardTitle className="text-sm text-red-400">Zona de peligro</CardTitle>
            <CardDescription>Estas acciones son irreversibles</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" size="sm">Cerrar todas las sesiones</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
