'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const faqs = [
  {
    q: '¿Cuánto dura una consulta?',
    a: 'Las consultas de seguimiento tienen una duración estándar de 50 minutos. La primera evaluación puede extenderse hasta 60-70 minutos, ya que incluye la elaboración de la historia clínica completa.',
  },
  {
    q: '¿Puedo atenderme por teleconsulta?',
    a: 'Sí. Ofrezco teleconsultas por videollamada con la misma calidad de atención que la modalidad presencial. Solo necesitas una conexión estable a internet y un dispositivo con cámara.',
  },
  {
    q: '¿Con qué frecuencia debo venir a consulta?',
    a: 'Depende de la situación de cada paciente. En general, al inicio se recomienda una consulta cada 2-4 semanas. A medida que el proceso avanza, los controles se van espaciando.',
  },
  {
    q: '¿El Dr. Mena realiza psicoterapia o solo manejo farmacológico?',
    a: 'Ofrezco atención médica integral que incluye evaluación diagnóstica, psicoeducación, orientación terapéutica y manejo farmacológico cuando es necesario. Para psicoterapia en profundidad, trabajo en coordinación con psicólogos de mi red.',
  },
  {
    q: '¿Cómo sé si necesito un médico o un psicólogo?',
    a: 'Ambos son complementarios. En términos generales, si experimentas síntomas que pueden tener una base biológica (insomnio severo, cambios de ánimo intensos, episodios de pánico), la evaluación médica es un buen primer paso. El Dr. Mena puede orientarte sobre qué tipo de apoyo es más adecuado para tu caso.',
  },
  {
    q: '¿Las consultas son confidenciales?',
    a: 'Absolutamente. Todo lo que se comparte en consulta está protegido por el secreto médico. La información de los pacientes se maneja con estricta confidencialidad y solo se comparte con otros profesionales cuando el paciente lo autoriza explícitamente.',
  },
  {
    q: '¿Se emiten recetas y certificados médicos?',
    a: 'Sí. Se emiten recetas médicas (incluyendo recetas retenidas para medicamentos controlados), certificados de salud, licencias médicas y otros documentos clínicos según se requiera.',
  },
  {
    q: '¿Aceptan seguros de salud o FONASA?',
    a: 'Actualmente la consulta es de modalidad privada. Puedes utilizar el bono de tu Isapre para reembolso según tu plan. FONASA Modalidad de Libre Elección (MLE) puede aplicar en algunos casos. Consulta directamente para información actualizada.',
  },
  {
    q: '¿Cómo funciona la plataforma digital para pacientes?',
    a: 'Cada paciente activo tiene acceso a un portal personal donde puede registrar su estado emocional diariamente, ver sus tareas terapéuticas asignadas, revisar sus próximas citas y comunicarse con el equipo clínico.',
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border border-slate-700/50 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full text-left flex items-start justify-between gap-4 p-5 transition-colors',
          open ? 'bg-slate-800/60' : 'bg-slate-900/40 hover:bg-slate-800/40'
        )}
      >
        <span className="text-sm font-medium text-slate-100 leading-snug">{q}</span>
        <ChevronDown className={cn('w-4 h-4 text-cyan-400 shrink-0 mt-0.5 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="px-5 py-4 text-sm text-slate-400 leading-relaxed border-t border-slate-700/50">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQPage() {
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mx-auto mb-5 text-cyan-400">
            <HelpCircle className="w-7 h-7" />
          </div>
          <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Preguntas frecuentes</p>
          <h1 className="text-4xl font-bold text-slate-100 mb-4">Todo lo que necesitas saber</h1>
          <p className="text-lg text-slate-400">
            Respuestas a las dudas más comunes antes de tu primera consulta.
          </p>
        </motion.div>

        <div className="space-y-3 mb-16">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center p-10 rounded-2xl border border-slate-700/50 bg-slate-900/60"
        >
          <p className="text-slate-300 font-medium mb-2">¿No encuentras lo que buscas?</p>
          <p className="text-sm text-slate-400 mb-6">
            Escríbeme directamente. Con gusto responderé tus dudas personalmente.
          </p>
          <Link href="/contacto">
            <Button className="gap-2">Contactar al Dr. Mena</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
