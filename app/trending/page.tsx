'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Flame,
  CheckCircle2
} from 'lucide-react'

const trendingDossiers = [
  {
    id: '1',
    rank: 1,
    title: 'Avance tecnológico: IA detecta cáncer con 99% de precisión',
    slug: 'ia-detecta-cancer',
    journScore: 94,
    creator: {
      name: 'Dr. Carlos Ruiz',
      username: 'drcarlosruiz',
      verified: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
    },
    stats: {
      views: 580000,
      likes: 45000,
      comments: 2300,
      shares: 12000,
      trendingScore: 98
    },
    publishedAt: new Date('2025-11-18T08:30:00'),
    tags: ['Tecnología', 'Salud']
  },
  {
    id: '2',
    rank: 2,
    title: 'Crisis climática: Nuevo informe revela datos alarmantes',
    slug: 'crisis-climatica-nuevo-informe',
    journScore: 87,
    creator: {
      name: 'María González',
      username: 'mariagonzalez',
      verified: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria'
    },
    stats: {
      views: 245000,
      likes: 12500,
      comments: 892,
      shares: 3400,
      trendingScore: 92
    },
    publishedAt: new Date('2025-11-18T10:00:00'),
    tags: ['Clima', 'Ciencia']
  },
  {
    id: '3',
    rank: 3,
    title: 'Economía global: Análisis del impacto de nuevas políticas comerciales',
    slug: 'economia-politicas-comerciales',
    journScore: 81,
    creator: {
      name: 'Ana Martínez',
      username: 'anamartinez',
      verified: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana'
    },
    stats: {
      views: 156000,
      likes: 8900,
      comments: 567,
      shares: 2100,
      trendingScore: 85
    },
    publishedAt: new Date('2025-11-17T16:00:00'),
    tags: ['Economía', 'Política']
  }
]

export default function TrendingPage() {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const getTimeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
    if (seconds < 60) return 'ahora'
    if (seconds < 3600) return `hace ${Math.floor(seconds / 60)}m`
    if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)}h`
    return `hace ${Math.floor(seconds / 86400)}d`
  }

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500'
    if (rank === 2) return 'text-gray-400'
    if (rank === 3) return 'text-amber-600'
    return 'text-gray-400'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 pb-20 md:pb-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Tendencias
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Las noticias más populares y relevantes del momento
          </p>
        </div>

        {/* Time filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button variant="primary" size="sm">
            Hoy
          </Button>
          <Button variant="outline" size="sm">
            Esta semana
          </Button>
          <Button variant="outline" size="sm">
            Este mes
          </Button>
          <Button variant="outline" size="sm">
            Todo el tiempo
          </Button>
        </div>

        {/* Trending List */}
        <div className="space-y-4">
          {trendingDossiers.map((dossier) => (
            <div
              key={dossier.id}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition overflow-hidden"
            >
              <Link href={`/dossier/${dossier.slug}`}>
                <div className="p-6">
                  {/* Rank and Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className={`text-4xl font-black ${getRankColor(dossier.rank)}`}>
                        #{dossier.rank}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition">
                        {dossier.title}
                      </h2>

                      {/* Creator Info */}
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar
                          src={dossier.creator.avatar}
                          alt={dossier.creator.name}
                          fallback={dossier.creator.name}
                          size="sm"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {dossier.creator.name}
                        </span>
                        {dossier.creator.verified && (
                          <CheckCircle2 className="h-4 w-4 text-blue-500" />
                        )}
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {getTimeAgo(dossier.publishedAt)}
                        </span>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {dossier.tags.map(tag => (
                          <Badge key={tag} variant="secondary">
                            #{tag}
                          </Badge>
                        ))}
                        <Badge
                          variant="primary"
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0"
                        >
                          JournScore {dossier.journScore}
                        </Badge>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1.5">
                          <Eye className="h-4 w-4" />
                          <span className="font-medium">{formatNumber(dossier.stats.views)}</span>
                          <span className="hidden sm:inline">vistas</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Heart className="h-4 w-4" />
                          <span className="font-medium">{formatNumber(dossier.stats.likes)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="h-4 w-4" />
                          <span className="font-medium">{formatNumber(dossier.stats.comments)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Share2 className="h-4 w-4" />
                          <span className="font-medium">{formatNumber(dossier.stats.shares)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 ml-auto">
                          <TrendingUp className="h-4 w-4 text-orange-500" />
                          <span className="font-bold text-orange-600 dark:text-orange-400">
                            {dossier.stats.trendingScore}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline" className="min-w-[200px]">
            Cargar más
          </Button>
        </div>
      </div>
    </div>
  )
}
