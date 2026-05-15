'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Brain, Heart, Activity, Shield, Moon, Users,
  Clock, Video, MapPin, CheckCircle, ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const services = [
  {
    icon: Brain,
    title: 'Evaluación y tratamiento de salud mental',
    desc: 'Diagnóstico y manejo clínico de trastornos del ánimo (depresión, distimia), ansiedad (TAG, pánico, fobia social), estrés postraumático y otras condiciones.',
    includes: [
      'Evaluación diagnóstica completa',
      'Plan de tratamiento individualizado',
      'Farmacoterapia cuando es necesario',
      'Seguimiento evolutivo',
    ],
    color: 'from-violet-500/15 to-purple-600/10',
    border: 'border-violet-500/20',
    iconBg: 'bg-violet-500/10 text-violet-400',
  },
  {
    icon: Heart,
    title: 'Medicina integrativa',
    desc: 'Abordaje que integra medicina convencional con herramientas complementarias: nutrición, sueño, actividad física, manejo del estrés y conexión mente-cuerpo.',
    includes: [
      'Análisis del estilo de vida',
      'Plan integral de bienestar',
      'Herramientas de autocuidado',
      'Psicoeducación personalizada',
    ],
    color: 'from-rose-500/15 to-pink-600/10',
    border: 'border-rose-500/20',
    iconBg: 'bg-rose-500/10 text-rose-400',
  },
  {
    icon: Moon,
    title: 'Trastornos del sueño',
    desc: 'Evaluación y tratamiento del insomnio crónico, hipersomnia, alteraciones del ritmo circadiano y su relación con la salud mental y el estado de ánimo.',
    includes: [
      'Evaluación del patrón de sueño',
      'Higiene del sueño personalizada',
      'TCC-Insomnio (TCC-I)',
      'Tratamiento farmacológico si aplica',
    ],
    color: 'from-indigo-500/15 to-blue-600/10',
    border: 'border-indigo-500/20',
    iconBg: 'bg-indigo-500/10 text-indigo-400',
  },
  {
    icon: Activity,
    title: 'Manejo del estrés y burnout',
    desc: 'Intervención en síndromes de agotamiento profesional (burnout), estrés crónico, y condiciones relacionadas con el mundo laboral y académico.',
    includes: [
      'Evaluación del nivel de estrés',
      'Estrategias de regulación emocional',
      'Técnicas de mindfulness y relajación',
      'Plan de recuperación del equilibrio',
    ],
    color: 'from-amber-500/15 to-orange-600/10',
    border: 'border-amber-500/20',
    iconBg: 'bg-amber-500/10 text-amber-400',
  },
  {
    icon: Shield,
    title: 'Contención en crisis',
    desc: 'Atención oportuna en situaciones de descompensación emocional, crisis agudas de ansiedad, episodios depresivos intensos o ideación perturbadora.',
    includes: [
      'Disponibilidad en horarios acordados',
      'Evaluación rápida de riesgo',
      'Intervención y estabilización',
      'Derivación si es necesario',
    ],
    color: 'from-red-500/15 to-rose-600/10',
    border: 'border-red-500/20',
    iconBg: 'bg-red-500/10 text-red-400',
  },
  {
    icon: Users,
    title: 'Orientación y psicoeducación',
    desc: 'Espacio de orientación para comprender mejor los procesos emocionales, aprender sobre la propia salud mental y desarrollar recursos personales de afrontamiento.',
    includes: [
      'Comprensión de diagnósticos',
      'Educación sobre tratamientos',
      'Recursos para familiares',
      'Apoyo en la toma de decisiones',
    ],
    color: 'from-emerald-500/15 to-teal-600/10',
    border: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/10 text-emerald-400',
  },
]

const formats = [
  {
    icon: MapPin,
    title: 'Presencial',
    desc: 'Consultas en clínica privada en Santiago, en un ambiente diseñado para la calma y la concentración.',
  },
  {
    icon: Video,
    title: 'Teleconsulta',
    desc: 'Consultas por videollamada con la misma calidad de atención, desde la comodidad de tu hogar.',
  },
  {
    icon: Clock,
    title: 'Horarios flexibles',
    desc: 'Disponibilidad en horarios diurnos y vespertinos, incluyendo algunos sábados según agenda.',
  },
]

export default function ServiciosPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Servicios</p>
          <h1 className="text-5xl font-bold text-slate-100 mb-6 leading-tight">
            Atención clínica integral y personalizada
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Cada persona es única. Los servicios que ofrezco están diseñados para adaptarse a la situación
            específica de cada paciente, con rigor clínico y calidez humana.
          </p>
        </motion.div>

        {/* Services */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`p-7 rounded-2xl border ${service.border} bg-gradient-to-br ${service.color}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${service.iconBg}`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-semibold text-slate-100 mb-3">{service.title}</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-5">{service.desc}</p>
              <div className="space-y-2">
                {service.includes.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Formats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold text-slate-100 mb-8 text-center">Formatos de consulta</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {formats.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl border border-slate-700/50 bg-slate-900/60 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-4 text-cyan-400">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-slate-100 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-blue-600/10 p-12 text-center"
        >
          <h2 className="text-3xl font-bold text-slate-100 mb-4">¿Tienes dudas sobre cuál servicio necesitas?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Contáctame directamente. En muchos casos, una breve conversación inicial ayuda a definir el mejor punto de partida.
          </p>
          <Link href="/contacto">
            <Button size="lg" className="gap-2">
              Hablar con el Dr. Mena
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
