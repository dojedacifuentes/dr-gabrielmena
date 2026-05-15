import Link from 'next/link'
import { Heart, Mail, Phone, MapPin, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Heart className="w-4.5 h-4.5 text-white" fill="currentColor" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-100">Dr. Gabriel Ignacio Mena Bañados</p>
                <p className="text-xs text-slate-400">Médico General · Salud Mental</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Atención médica integrativa centrada en la persona, con enfoque en salud mental,
              bienestar emocional y calidad de vida. Consulta privada en Chile.
            </p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Navegación</p>
            <ul className="space-y-2.5">
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Sobre mí', href: '/sobre-mi' },
                { label: 'Servicios', href: '/servicios' },
                { label: 'Recursos', href: '/recursos' },
                { label: 'Preguntas frecuentes', href: '/faq' },
                { label: 'Contacto', href: '/contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="text-sm text-slate-400 hover:text-slate-100 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Contacto</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">contacto@drgabrielmena.cl</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">+56 9 XXXX XXXX</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-400">Santiago, Chile<br />Consulta privada</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Dr. Gabriel Ignacio Mena Bañados. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacidad" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Política de privacidad
            </Link>
            <Link href="/terminos" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Términos de uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
