import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserX } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <UserX className="w-16 h-16 text-slate-700 mb-4" />
      <h2 className="text-xl font-semibold text-slate-200 mb-2">Paciente no encontrado</h2>
      <p className="text-slate-400 mb-6">El paciente que buscas no existe o no tienes acceso.</p>
      <Link href="/pacientes">
        <Button variant="outline">Volver a pacientes</Button>
      </Link>
    </div>
  )
}
