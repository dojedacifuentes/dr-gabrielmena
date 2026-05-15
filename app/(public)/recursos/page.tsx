'use client'

import { motion } from 'framer-motion'
import { BookOpen, Brain, Moon, Heart, Wind, Pencil } from 'lucide-react'

const recursos = [
  {
    icon: Brain,
    category: 'Salud mental',
    title: '¿Qué es la ansiedad y cómo reconocerla?',
    desc: 'La ansiedad es una respuesta emocional normal ante situaciones percibidas como amenazantes. Aprende a distinguir la ansiedad adaptativa de los trastornos de ansiedad y cuándo buscar ayuda profesional.',
    readTime: '5 min',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10 border-violet-500/20',
  },
  {
    icon: Moon,
    category: 'Sueño',
    title: 'Higiene del sueño: guía práctica',
    desc: 'Un buen descanso es fundamental para la salud mental. Descubre los hábitos que favorecen un sueño reparador y las conductas que debes evitar antes de dormir.',
    readTime: '4 min',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10 border-indigo-500/20',
  },
  {
    icon: Wind,
    category: 'Técnicas',
    title: 'Respiración 4-7-8: cómo practicarla',
    desc: 'Una técnica simple y poderosa para activar el sistema nervioso parasimpático, reducir la ansiedad aguda y preparar el cuerpo para el descanso.',
    readTime: '3 min',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    icon: Heart,
    category: 'Bienestar',
    title: 'Burnout: señales de alerta y recuperación',
    desc: 'El agotamiento crónico no es un signo de debilidad. Conoce las señales del burnout y las estrategias validadas para recuperar el equilibrio y el sentido del trabajo.',
    readTime: '6 min',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10 border-rose-500/20',
  },
  {
    icon: Pencil,
    category: 'Herramientas',
    title: 'Diario de pensamientos: para qué sirve',
    desc: 'Escribir lo que pensamos y sentimos tiene un impacto real en nuestra salud mental. Descubre cómo el registro de pensamientos puede ayudarte a entender y transformar tus emociones.',
    readTime: '4 min',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: BookOpen,
    category: 'Psicoeducación',
    title: '¿Qué esperar de la primera consulta?',
    desc: 'Si es tu primera vez consultando con un médico especialista en salud mental, este artículo te explica qué ocurre en una evaluación inicial, qué preguntas pueden surgir y cómo prepararte.',
    readTime: '5 min',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10 border-emerald-500/20',
  },
]

export default function RecursosPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Recursos</p>
          <h1 className="text-5xl font-bold text-slate-100 mb-6 leading-tight">
            Información para tu bienestar
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Artículos y guías escritas desde la práctica clínica para ayudarte a comprender mejor
            la salud mental y desarrollar herramientas de autocuidado.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recursos.map((r, i) => (
            <motion.article
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl border border-slate-700/50 bg-slate-900/60 cursor-pointer group"
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-4 ${r.bg} ${r.color}`}>
                <r.icon className="w-3.5 h-3.5" />
                {r.category}
              </div>
              <h2 className="text-base font-semibold text-slate-100 mb-3 leading-snug group-hover:text-cyan-400 transition-colors">
                {r.title}
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-5">{r.desc}</p>
              <p className="text-xs text-slate-600">{r.readTime} de lectura</p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}
