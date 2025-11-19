'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  FileText,
  Users,
  BarChart3,
  Settings,
  Edit,
  Trash2,
  MoreVertical
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

// Mock data
const mockStats = {
  totalViews: 1250000,
  totalLikes: 45000,
  totalComments: 3200,
  totalShares: 8900,
  totalDossiers: 24,
  totalFollowers: 12500,
  avgJournScore: 89,
  viewsGrowth: 12.5,
  likesGrowth: 8.3,
  followersGrowth: 15.2
}

const mockDossiers = [
  {
    id: '1',
    title: 'Crisis climática: Nuevo informe revela datos alarmantes',
    slug: 'crisis-climatica-nuevo-informe',
    status: 'published',
    journScore: 87,
    publishedAt: new Date('2025-11-18'),
    stats: {
      views: 245000,
      likes: 12500,
      comments: 892,
      shares: 3400
    }
  },
  {
    id: '2',
    title: 'Energías renovables: El futuro de la transición energética',
    slug: 'energias-renovables-futuro',
    status: 'published',
    journScore: 91,
    publishedAt: new Date('2025-11-15'),
    stats: {
      views: 189000,
      likes: 9800,
      comments: 654,
      shares: 2100
    }
  },
  {
    id: '3',
    title: 'Investigación en curso: Efectos del microplástico',
    slug: 'microplastico-efectos',
    status: 'draft',
    journScore: null,
    publishedAt: null,
    stats: {
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0
    }
  }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'dossiers' | 'analytics'>('overview')

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatDate = (date: Date | null): string => {
    if (!date) return 'Sin publicar'
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="success">Publicado</Badge>
      case 'draft':
        return <Badge variant="warning">Borrador</Badge>
      case 'in_review':
        return <Badge variant="primary">En revisión</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 pb-20 md:pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard de Creador
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Gestiona tu contenido y analiza tu rendimiento
            </p>
          </div>
          <Link href="/dashboard/create">
            <Button variant="primary" className="gap-2">
              <Plus className="h-5 w-5" />
              Nuevo Dossier
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={cn(
                'pb-3 font-medium border-b-2 transition flex items-center gap-2',
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              )}
            >
              <TrendingUp className="h-4 w-4" />
              Resumen
            </button>
            <button
              onClick={() => setActiveTab('dossiers')}
              className={cn(
                'pb-3 font-medium border-b-2 transition flex items-center gap-2',
                activeTab === 'dossiers'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              )}
            >
              <FileText className="h-4 w-4" />
              Mis Dossiers
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={cn(
                'pb-3 font-medium border-b-2 transition flex items-center gap-2',
                activeTab === 'analytics'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              )}
            >
              <BarChart3 className="h-4 w-4" />
              Analytics
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <Eye className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    +{mockStats.viewsGrowth}%
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {formatNumber(mockStats.totalViews)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Vistas Totales
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                    <Heart className="h-5 w-5 text-red-600" />
                  </div>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    +{mockStats.likesGrowth}%
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {formatNumber(mockStats.totalLikes)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Me Gusta
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                    +{mockStats.followersGrowth}%
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {formatNumber(mockStats.totalFollowers)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Seguidores
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {mockStats.totalDossiers}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Dossiers Publicados
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-4">Actividad Reciente</h2>
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <BarChart3 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Gráficos de actividad próximamente</p>
              </div>
            </div>
          </div>
        )}

        {/* Dossiers Tab */}
        {activeTab === 'dossiers' && (
          <div className="space-y-4">
            {mockDossiers.map(dossier => (
              <div
                key={dossier.id}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-blue-500 dark:hover:border-blue-500 transition"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusBadge(dossier.status)}
                      {dossier.journScore && (
                        <Badge variant="primary">
                          JournScore {dossier.journScore}
                        </Badge>
                      )}
                    </div>
                    <Link
                      href={dossier.status === 'published' ? `/dossier/${dossier.slug}` : `/dashboard/edit/${dossier.id}`}
                      className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      {dossier.title}
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {formatDate(dossier.publishedAt)}
                    </p>
                  </div>

                  {dossier.status === 'published' && (
                    <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Eye className="h-4 w-4" />
                        <span>{formatNumber(dossier.stats.views)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Heart className="h-4 w-4" />
                        <span>{formatNumber(dossier.stats.likes)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="h-4 w-4" />
                        <span>{formatNumber(dossier.stats.comments)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Share2 className="h-4 w-4" />
                        <span>{formatNumber(dossier.stats.shares)}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Link href={`/dashboard/edit/${dossier.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4">Analytics Detallados</h2>
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Analytics Avanzados</p>
              <p className="text-sm">
                Próximamente: gráficos detallados, métricas de engagement, demografía de audiencia y más
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
