import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-blue-600/10 rounded-full blur-3xl" />
        </div>
        <div className="relative w-full flex flex-col justify-between p-12">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Heart className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">Dr. Gabriel Mena</p>
              <p className="text-xs text-slate-400">Medicina & Salud Mental</p>
            </div>
          </Link>

          {/* Quote */}
          <div>
            <blockquote className="text-2xl font-medium text-slate-200 leading-relaxed mb-4">
              &ldquo;La salud mental no es la ausencia de dificultad, sino la capacidad de
              atravesarla con recursos y acompañamiento.&rdquo;
            </blockquote>
            <p className="text-slate-400 text-sm">— Dr. Gabriel Ignacio Mena Bañados</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: '500+', label: 'Pacientes atendidos' },
              { value: '8+', label: 'Años de experiencia' },
              { value: '100%', label: 'Confidencialidad' },
            ].map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/40">
                <p className="text-xl font-bold text-cyan-400">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12">
        <div className="lg:hidden mb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Heart className="w-4.5 h-4.5 text-white" fill="currentColor" />
            </div>
            <p className="text-sm font-semibold text-slate-100">Dr. Gabriel Mena</p>
          </Link>
        </div>
        {children}
      </div>
    </div>
  )
}
