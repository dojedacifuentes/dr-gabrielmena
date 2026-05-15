'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ComponentType<{ className?: string }>
  trend?: number
  trendLabel?: string
  color?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose' | 'blue'
  delay?: number
}

const colorMap = {
  cyan: 'from-cyan-500/15 to-cyan-600/5 border-cyan-500/20 text-cyan-400 bg-cyan-500/10',
  violet: 'from-violet-500/15 to-violet-600/5 border-violet-500/20 text-violet-400 bg-violet-500/10',
  emerald: 'from-emerald-500/15 to-emerald-600/5 border-emerald-500/20 text-emerald-400 bg-emerald-500/10',
  amber: 'from-amber-500/15 to-amber-600/5 border-amber-500/20 text-amber-400 bg-amber-500/10',
  rose: 'from-rose-500/15 to-rose-600/5 border-rose-500/20 text-rose-400 bg-rose-500/10',
  blue: 'from-blue-500/15 to-blue-600/5 border-blue-500/20 text-blue-400 bg-blue-500/10',
}

export function StatsCard({
  title, value, subtitle, icon: Icon, trend, trendLabel, color = 'cyan', delay = 0
}: StatsCardProps) {
  const colors = colorMap[color]
  const [gradientClass, borderClass, textClass, bgClass] = colors.split(' ')

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        'relative overflow-hidden rounded-xl border p-5',
        `bg-gradient-to-br ${gradientClass} to-transparent`,
        borderClass
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', bgClass, textClass)}>
          <Icon className="w-5 h-5" />
        </div>
        {trend !== undefined && (
          <div className={cn(
            'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
            trend > 0 ? 'bg-emerald-500/15 text-emerald-400' :
            trend < 0 ? 'bg-red-500/15 text-red-400' :
            'bg-slate-500/15 text-slate-400'
          )}>
            {trend > 0 ? <TrendingUp className="w-3 h-3" /> :
             trend < 0 ? <TrendingDown className="w-3 h-3" /> :
             <Minus className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div>
        <p className={cn('text-3xl font-bold mb-0.5', textClass)}>{value}</p>
        <p className="text-sm font-medium text-slate-200">{title}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        {trendLabel && <p className="text-xs text-slate-500 mt-1">{trendLabel}</p>}
      </div>

      {/* Decorative */}
      <div className={cn(
        'absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-10',
        bgClass
      )} />
    </motion.div>
  )
}
