'use client'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, BarChart, Bar
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import type { MoodTrend } from '@/types'

interface MoodChartProps {
  data: MoodTrend[]
  title?: string
  description?: string
  type?: 'line' | 'bar'
  compact?: boolean
}

const CustomTooltip = ({ active, payload, label }: {
  active?: boolean
  payload?: Array<{ color: string; name: string; value: number }>
  label?: string
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="text-xs text-slate-400 mb-2">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs mb-1">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-400">{entry.name}:</span>
            <span className="font-medium text-slate-200">{entry.value}/10</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const COLORS = {
  mood: '#06b6d4',
  anxiety: '#f59e0b',
  stress: '#ef4444',
  sleep: '#8b5cf6',
  energy: '#10b981',
}

export function MoodChart({ data, title = 'Evolución emocional', description, type = 'line', compact = false }: MoodChartProps) {
  const height = compact ? 160 : 240

  return (
    <Card className="overflow-hidden">
      <CardHeader className={compact ? 'pb-2 px-5 pt-4' : 'pb-2'}>
        <CardTitle className="text-sm">{title}</CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent className={compact ? 'px-5 pb-4' : ''}>
        <ResponsiveContainer width="100%" height={height}>
          {type === 'line' ? (
            <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: '#64748b', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 10]}
                tick={{ fill: '#64748b', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                ticks={[0, 2, 4, 6, 8, 10]}
              />
              <Tooltip content={<CustomTooltip />} />
              {!compact && (
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '12px' }}
                  formatter={(value) => (
                    <span style={{ color: '#94a3b8', fontSize: '11px' }}>{value}</span>
                  )}
                />
              )}
              <Line
                type="monotone"
                dataKey="mood"
                name="Ánimo"
                stroke={COLORS.mood}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: COLORS.mood }}
              />
              <Line
                type="monotone"
                dataKey="anxiety"
                name="Ansiedad"
                stroke={COLORS.anxiety}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: COLORS.anxiety }}
              />
              {!compact && (
                <>
                  <Line type="monotone" dataKey="sleep" name="Sueño" stroke={COLORS.sleep} strokeWidth={2} dot={false} activeDot={{ r: 4, fill: COLORS.sleep }} />
                  <Line type="monotone" dataKey="energy" name="Energía" stroke={COLORS.energy} strokeWidth={2} dot={false} activeDot={{ r: 4, fill: COLORS.energy }} />
                </>
              )}
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" name="Total" fill="rgba(6,182,212,0.25)" radius={[4,4,0,0]} />
              <Bar dataKey="completadas" name="Completadas" fill="#06b6d4" radius={[4,4,0,0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
