'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Search,
  TrendingUp,
  CheckCircle2,
  Users,
  FileText,
  Hash
} from 'lucide-react'

const trendingTopics = [
  { tag: 'Clima', count: 12500, trending: true },
  { tag: 'Tecnología', count: 9800, trending: true },
  { tag: 'Salud', count: 7600, trending: false },
  { tag: 'Economía', count: 6400, trending: true },
  { tag: 'Política', count: 5200, trending: false },
  { tag: 'Ciencia', count: 4800, trending: true }
]

const topCreators = [
  {
    id: '1',
    name: 'María González',
    username: 'mariagonzalez',
    journScore: 92,
    verified: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    specialty: 'Ciencia y Medio Ambiente',
    followers: 125000
  },
  {
    id: '2',
    name: 'Dr. Carlos Ruiz',
    username: 'drcarlosruiz',
    journScore: 96,
    verified: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    specialty: 'Salud y Tecnología',
    followers: 210000
  },
  {
    id: '3',
    name: 'Ana Martínez',
    username: 'anamartinez',
    journScore: 88,
    verified: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    specialty: 'Economía y Finanzas',
    followers: 95000
  }
]

export default function ExplorePage() {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 pb-20 md:pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Explorar
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Descubre nuevas noticias, temas y creadores
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar noticias, temas o creadores..."
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Trending Topics */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Temas en Tendencia
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trendingTopics.map(topic => (
                  <Link
                    key={topic.tag}
                    href={`/explore/${topic.tag.toLowerCase()}`}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Hash className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {topic.tag}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatNumber(topic.count)} publicaciones
                        </p>
                      </div>
                    </div>
                    {topic.trending && (
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Dossiers */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center gap-2 mb-6">
                <FileText className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Dossiers Destacados
                </h2>
              </div>

              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Próximamente</p>
                <p className="text-sm">Los mejores dossiers curados para ti</p>
              </div>
            </div>
          </div>

          {/* Sidebar - Top Creators */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 sticky top-20">
              <div className="flex items-center gap-2 mb-6">
                <Users className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Creadores Destacados
                </h2>
              </div>

              <div className="space-y-4">
                {topCreators.map(creator => (
                  <Link
                    key={creator.id}
                    href={`/creator/${creator.username}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <Avatar
                      src={creator.avatar}
                      alt={creator.name}
                      fallback={creator.name}
                      size="lg"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="font-semibold text-gray-900 dark:text-white truncate">
                          {creator.name}
                        </span>
                        {creator.verified && (
                          <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate mb-1">
                        {creator.specialty}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="primary" className="text-xs">
                          {creator.journScore}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatNumber(creator.followers)} seguidores
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}

                <Button variant="outline" className="w-full mt-4">
                  Ver más creadores
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
