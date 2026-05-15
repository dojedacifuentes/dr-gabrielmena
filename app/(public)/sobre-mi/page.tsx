'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Heart, Award, BookOpen, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const timeline = [
  {
    year: 'Actualidad',
    title: 'Práctica Clínica Independiente',
    subtitle: 'Santiago, Chile',
    desc: 'Consulta privada especializada en salud mental, medicina integrativa y atención centrada en la persona.',
    icon: Heart,
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
  },
  {
    year: '2020',
    title: 'Formación en Psicoterapia Integrativa',
    subtitle: 'Universidad de Chile',
    desc: 'Posgrado en abordajes psicoterapéuticos de orientación integradora y medicina centrada en la persona.',
    icon: BookOpen,
    color: 'text-violet-400 bg-violet-500/10 border-violet-500/30',
  },
  {
    year: '2018',
    title: 'Especialización en Salud Mental',
    subtitle: 'Hospital Clínico Universidad de Chile',
    desc: 'Entrenamiento clínico en diagnóstico y tratamiento de trastornos del ánimo, ansiedad y psicosis.',
    icon: Award,
    color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  },
  {
    year: '2016',
    title: 'Médico Cirujano',
    subtitle: 'Universidad de Chile',
    desc: 'Título de Médico Cirujano, Pontificia Universidad Católica de Chile. Mención en salud pública.',
    icon: GraduationCap,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  },
]

const values = [
  {
    title: 'Escucha genuina',
    desc: 'Creo que la atención médica comienza por escuchar de verdad, sin prisa y sin juicios. Cada historia importa.',
  },
  {
    title: 'Medicina basada en evidencia',
    desc: 'Utilizo tratamientos respaldados científicamente, adaptados a cada persona y contexto específico.',
  },
  {
    title: 'Visión integradora',
    desc: 'La salud mental no puede separarse del cuerpo, las emociones, las relaciones y el proyecto de vida.',
  },
  {
    title: 'Continuidad del cuidado',
    desc: 'El acompañamiento no termina en la consulta. Las herramientas digitales permiten mantener el seguimiento.',
  },
]

export default function SobreMiPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-3xl mb-20"
        >
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Sobre mí</p>
          <h1 className="text-5xl font-bold text-slate-100 mb-6 leading-tight">
            Médico, clínico y<br />
            <span className="text-gradient">persona antes que todo</span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Soy Gabriel Mena, médico general con dedicación especial a la salud mental e integración
            de la medicina convencional con herramientas complementarias. Mi objetivo es acompañar
            a cada paciente en su proceso con respeto, rigor clínico y presencia real.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar - Profile */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-28">
              <div className="rounded-2xl border border-slate-700/50 bg-slate-900/60 overflow-hidden">
                {/* Avatar area */}
                <div className="h-48 bg-gradient-to-br from-cyan-500/20 via-blue-600/15 to-violet-600/10 flex items-center justify-center border-b border-slate-700/50">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                    <span className="text-white font-bold text-4xl">GM</span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="font-semibold text-slate-100 text-lg">Dr. Gabriel Ignacio Mena Bañados</p>
                  <p className="text-cyan-400 text-sm mt-1">Médico General · Salud Mental</p>
                  <div className="mt-5 space-y-2.5">
                    {[
                      { label: 'Especialidad', value: 'Salud Mental Integrativa' },
                      { label: 'Modalidad', value: 'Presencial y Teleconsulta' },
                      { label: 'Idiomas', value: 'Español' },
                      { label: 'Ubicación', value: 'Santiago, Chile' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-800/60 last:border-0">
                        <span className="text-xs text-slate-500">{item.label}</span>
                        <span className="text-xs text-slate-300 font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/contacto" className="mt-6 block">
                    <Button className="w-full gap-2">
                      Solicitar consulta
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-12"
          >
            {/* About text */}
            <div className="prose prose-slate prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Mi filosofía de trabajo</h2>
              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  A lo largo de mi formación y práctica clínica, aprendí que las personas que llegan a consulta
                  no solo buscan un diagnóstico o un fármaco. Buscan ser comprendidas. Buscan un espacio donde
                  puedan hablar con honestidad de lo que sienten, sin miedo al juicio y con la confianza de estar
                  en manos de alguien que se preocupa genuinamente por su bienestar.
                </p>
                <p>
                  Mi trabajo combina la rigurosidad de la medicina basada en evidencia con una mirada amplia
                  hacia el ser humano como un todo: su historia, sus vínculos, su cuerpo y su mundo interior.
                  Esta visión integradora me permite ofrecer tratamientos más efectivos y más humanos.
                </p>
                <p>
                  También creo profundamente en el poder de la tecnología para mejorar la atención médica.
                  La plataforma digital que ofrezco a mis pacientes no es un reemplazo del vínculo terapéutico,
                  sino una extensión de él: una forma de mantener el acompañamiento activo entre sesiones.
                </p>
              </div>
            </div>

            {/* Values */}
            <div>
              <h2 className="text-2xl font-bold text-slate-100 mb-6">Valores clínicos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {values.map((v, i) => (
                  <motion.div
                    key={v.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="p-5 rounded-xl border border-slate-700/50 bg-slate-900/40"
                  >
                    <h3 className="font-semibold text-slate-100 mb-2 text-sm">{v.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{v.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h2 className="text-2xl font-bold text-slate-100 mb-8">Formación y trayectoria</h2>
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex gap-5"
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${item.color}`}>
                        <item.icon className="w-4.5 h-4.5" />
                      </div>
                      {i < timeline.length - 1 && (
                        <div className="w-px h-full bg-slate-800/80 mt-2" />
                      )}
                    </div>
                    <div className="pb-8">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{item.year}</span>
                      </div>
                      <h3 className="font-semibold text-slate-100 mb-0.5">{item.title}</h3>
                      <p className="text-sm text-cyan-400 mb-2">{item.subtitle}</p>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
