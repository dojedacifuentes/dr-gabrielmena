'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Brain, Heart, Shield, Users, Clock, ChevronRight,
  Star, ArrowRight, Sparkles, Activity, Moon, Sun,
  CheckCircle, MessageSquare, Calendar, LineChart
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
}

const services = [
  {
    icon: Brain,
    title: 'Salud Mental',
    desc: 'Evaluación y tratamiento de trastornos del ánimo, ansiedad, estrés y otras condiciones de salud mental con enfoque integrador.',
    color: 'from-violet-500/20 to-purple-600/20',
    border: 'border-violet-500/20',
    iconColor: 'text-violet-400',
  },
  {
    icon: Heart,
    title: 'Medicina Integrativa',
    desc: 'Atención médica que combina la medicina convencional con herramientas complementarias para el bienestar global de la persona.',
    color: 'from-rose-500/20 to-pink-600/20',
    border: 'border-rose-500/20',
    iconColor: 'text-rose-400',
  },
  {
    icon: Activity,
    title: 'Seguimiento Emocional',
    desc: 'Monitoreo continuo del estado emocional mediante herramientas digitales personalizadas entre sesiones.',
    color: 'from-cyan-500/20 to-blue-600/20',
    border: 'border-cyan-500/20',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Shield,
    title: 'Atención de Crisis',
    desc: 'Acompañamiento especializado en momentos de crisis emocional, con intervención oportuna y segura.',
    color: 'from-amber-500/20 to-orange-600/20',
    border: 'border-amber-500/20',
    iconColor: 'text-amber-400',
  },
  {
    icon: Moon,
    title: 'Trastornos del Sueño',
    desc: 'Evaluación y tratamiento de insomnio, alteraciones del ritmo circadiano y condiciones relacionadas al descanso.',
    color: 'from-indigo-500/20 to-blue-600/20',
    border: 'border-indigo-500/20',
    iconColor: 'text-indigo-400',
  },
  {
    icon: Users,
    title: 'Orientación y Contención',
    desc: 'Espacio seguro y confidencial para explorar dificultades personales, laborales o relacionales con acompañamiento profesional.',
    color: 'from-emerald-500/20 to-teal-600/20',
    border: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
  },
]

const features = [
  { icon: Calendar, text: 'Agenda flexible y teleconsulta' },
  { icon: MessageSquare, text: 'Comunicación directa y segura' },
  { icon: LineChart, text: 'Seguimiento continuo entre sesiones' },
  { icon: Shield, text: 'Confidencialidad total garantizada' },
  { icon: Clock, text: 'Consultas a tiempo y sin esperas' },
  { icon: Sun, text: 'Enfoque holístico e integrador' },
]

const testimonials = [
  {
    name: 'M. González',
    text: 'El Dr. Mena me ayudó a entender lo que me pasaba en un momento muy difícil. Su atención es cálida y profesional al mismo tiempo.',
    stars: 5,
    role: 'Paciente desde 2023',
  },
  {
    name: 'J. Herrera',
    text: 'Encontré en el Dr. Mena un espacio donde finalmente pude hablar con libertad. La plataforma digital hace todo mucho más accesible.',
    stars: 5,
    role: 'Paciente desde 2024',
  },
  {
    name: 'C. Valdés',
    text: 'Su enfoque integrador me cambió la perspectiva. No solo trató mis síntomas, sino que me acompañó a entender mis emociones.',
    stars: 5,
    role: 'Paciente desde 2024',
  },
]

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 pb-32">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-600/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-600/5 rounded-full blur-3xl" />
          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
          >
            {/* Tag */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-8">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Atención médica del siglo XXI
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-100 leading-[1.1] mb-6"
            >
              Medicina que{' '}
              <span className="text-gradient">entiende</span>{' '}
              a las personas
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg lg:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl"
            >
              Soy el Dr. Gabriel Mena, médico general con enfoque en salud mental e medicina
              integrativa. Acompaño a mis pacientes desde una perspectiva humana, técnica y
              comprometida con su bienestar real.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link href="/contacto">
                <Button size="xl" className="gap-2 w-full sm:w-auto shadow-2xl shadow-cyan-500/20">
                  Solicitar consulta
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/sobre-mi">
                <Button size="xl" variant="outline" className="gap-2 w-full sm:w-auto">
                  Conocer mi enfoque
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-slate-800/60"
            >
              {[
                { value: '+8 años', label: 'de experiencia clínica' },
                { value: '500+', label: 'pacientes acompañados' },
                { value: '100%', label: 'atención personalizada' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl lg:text-3xl font-bold text-cyan-400">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-slate-900/50" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Áreas de atención</p>
            <h2 className="text-4xl font-bold text-slate-100 mb-4">Servicios clínicos</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Un enfoque integral que combina el rigor médico con la comprensión humana.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative p-6 rounded-2xl border ${service.border} bg-gradient-to-br ${service.color} backdrop-blur-sm group cursor-default`}
              >
                <div className={`w-11 h-11 rounded-xl bg-slate-900/60 flex items-center justify-center mb-4 ${service.iconColor}`}>
                  <service.icon className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-base font-semibold text-slate-100 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/20 via-blue-600/10 to-violet-600/10 border border-cyan-500/20" />
                <div className="absolute inset-4 rounded-2xl bg-slate-900/60 border border-slate-700/50 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-cyan-500/30">
                      <span className="text-white font-bold text-3xl">GM</span>
                    </div>
                    <p className="text-slate-100 font-semibold text-lg">Dr. Gabriel Ignacio</p>
                    <p className="text-slate-100 font-semibold text-lg">Mena Bañados</p>
                    <p className="text-cyan-400 text-sm mt-2">Médico General</p>
                    <div className="mt-4 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                      <p className="text-xs text-slate-400">Especialización en Salud Mental</p>
                      <p className="text-xs text-slate-400 mt-0.5">Medicina Integrativa · Chile</p>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
                  <Brain className="w-8 h-8 text-violet-400" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                  <Heart className="w-7 h-7 text-emerald-400" fill="currentColor" />
                </div>
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Mi enfoque</p>
              <h2 className="text-4xl font-bold text-slate-100 mb-6 leading-tight">
                Una medicina más humana para tiempos complejos
              </h2>
              <p className="text-slate-400 leading-relaxed mb-5">
                En mi práctica clínica, creo que entender a una persona va mucho más allá de sus síntomas.
                La salud mental no puede separarse del contexto vital, las relaciones, el trabajo y
                la historia personal de cada paciente.
              </p>
              <p className="text-slate-400 leading-relaxed mb-8">
                Por eso combino la medicina basada en evidencia con herramientas modernas de seguimiento
                emocional, para ofrecerte una atención continua, personalizada y genuinamente comprometida
                con tu bienestar.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {features.map((f) => (
                  <div key={f.text} className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <f.icon className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <span className="text-sm text-slate-300">{f.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/sobre-mi">
                <Button variant="outline" className="gap-2">
                  Conocer más sobre mi trabajo
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Digital Platform feature */}
      <section className="py-24 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Plataforma digital</p>
            <h2 className="text-4xl font-bold text-slate-100 mb-4">Tu salud, siempre cerca</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Una plataforma clínica diseñada para que nunca pierdas el hilo de tu proceso terapéutico.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Activity,
                title: 'Seguimiento emocional',
                desc: 'Registra tu estado de ánimo, ansiedad y calidad del sueño cada día. Verás tu evolución en tiempo real.',
                color: 'text-cyan-400',
                bg: 'bg-cyan-500/10 border-cyan-500/20',
              },
              {
                icon: Calendar,
                title: 'Portal de citas',
                desc: 'Solicita horas, recibe confirmaciones y gestiona tus sesiones fácilmente desde cualquier dispositivo.',
                color: 'text-violet-400',
                bg: 'bg-violet-500/10 border-violet-500/20',
              },
              {
                icon: CheckCircle,
                title: 'Tareas terapéuticas',
                desc: 'Recibe recomendaciones personalizadas entre sesiones: ejercicios, reflexiones y hábitos saludables.',
                color: 'text-emerald-400',
                bg: 'bg-emerald-500/10 border-emerald-500/20',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`p-6 rounded-2xl border ${item.bg} bg-slate-900/40`}
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} border flex items-center justify-center mb-4 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-slate-100 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Experiencias</p>
            <h2 className="text-4xl font-bold text-slate-100 mb-4">Lo que dicen los pacientes</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-slate-700/50 bg-slate-900/60 backdrop-blur-sm"
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-5 italic">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-semibold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-slate-200 text-sm font-medium">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900/80 to-blue-600/10 p-12 lg:p-16 text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-cyan-500/10 rounded-full blur-3xl" />
            <div className="relative">
              <p className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Primera consulta</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-100 mb-6 max-w-2xl mx-auto leading-tight">
                El primer paso siempre es el más importante
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                Agenda tu primera consulta hoy. Sin listas de espera extensas. Con atención real y comprometida.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contacto">
                  <Button size="xl" className="gap-2 shadow-2xl shadow-cyan-500/25">
                    Agendar consulta ahora
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/servicios">
                  <Button size="xl" variant="outline" className="gap-2">
                    Ver todos los servicios
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
