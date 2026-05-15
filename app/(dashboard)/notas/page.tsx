'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileText, Plus, Search, Tag, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockClinicalNotes, mockPatients } from '@/lib/mock-data'
import { formatDate, truncate } from '@/lib/utils'

export default function NotasPage() {
  const [search, setSearch] = useState('')

  const notes = mockClinicalNotes.filter(n =>
    n.subjective.toLowerCase().includes(search.toLowerCase()) ||
    n.assessment.toLowerCase().includes(search.toLowerCase()) ||
    n.plan.toLowerCase().includes(search.toLowerCase())
  )

  const getPatient = (patientId: string) =>
    mockPatients.find(p => p.id === patientId)

  return (
    <div className="space-y-6 page-transition">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Notas clínicas</h2>
          <p className="text-sm text-slate-400 mt-0.5">{notes.length} notas registradas</p>
        </div>
        <Button size="sm" className="gap-1.5">
          <Plus className="w-4 h-4" />
          Nueva nota SOAP
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <Input
          placeholder="Buscar en notas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Notes */}
      {notes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <FileText className="w-14 h-14 text-slate-700 mb-4" />
          <p className="text-slate-400 font-medium">No se encontraron notas</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note, i) => {
            const patient = getPatient(note.patient_id)

            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="hover:border-slate-600/60 transition-all cursor-pointer group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/pacientes/${note.patient_id}`}
                          className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                        >
                          {patient?.full_name}
                        </Link>
                        <CardTitle className="text-xs text-slate-500 font-normal mt-0.5">
                          {formatDate(note.date)} · Nota SOAP
                        </CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        {note.tags?.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-[10px]">
                            <Tag className="w-2.5 h-2.5 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-semibold text-cyan-400 uppercase tracking-wide mb-1.5">Subjetivo</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{truncate(note.subjective, 140)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold text-violet-400 uppercase tracking-wide mb-1.5">Evaluación</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{truncate(note.assessment, 140)}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wide mb-1.5">Plan</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{truncate(note.plan, 200)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
