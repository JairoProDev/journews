'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  CheckCircle2,
  MapPin,
  Link as LinkIcon,
  Calendar,
  Users,
  FileText,
  Eye,
  TrendingUp,
  Award,
  Shield,
  Heart,
  MessageCircle
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

// Mock data
const mockCreator = {
  id: 'c1',
  name: 'María González',
  username: 'mariagonzalez',
  verified: true,
  journScore: 92,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
  coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop',
  specialty: 'Ciencia y Medio Ambiente',
  bio: 'Periodista especializada en cambio climático y política ambiental. 15 años de experiencia cubriendo conferencias climáticas globales. Ganadora del Premio Nacional de Periodismo Científico 2022.',
  location: 'Madrid, España',
  website: 'https://mariagonzalez.com',
  joinedDate: new Date('2020-03-15'),
  stats: {
    followers: 125000,
    following: 342,
    dossiers: 187,
    totalViews: 12500000,
    totalLikes: 450000,
    avgJournScore: 89
  },
  badges: [
    { id: 'b1', name: 'Verificado', icon: Shield, color: 'blue' },
    { id: 'b2', name: 'Top Contributor', icon: Award, color: 'yellow' },
    { id: 'b3', name: '100+ Dossiers', icon: FileText, color: 'green' }
  ],
  recentDossiers: [
    {
      id: 'd1',
      title: 'Crisis climática: Nuevo informe revela datos alarmantes',
      slug: 'crisis-climatica-nuevo-informe',
      journScore: 87,
      publishedAt: new Date('2025-11-18'),
      stats: { views: 245000, likes: 12500, comments: 892 },
      thumbnail: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&fit=crop'
    },
    {
      id: 'd2',
      title: 'Energías renovables: El futuro de la transición energética',
      slug: 'energias-renovables-futuro',
      journScore: 91,
      publishedAt: new Date('2025-11-15'),
      stats: { views: 189000, likes: 9800, comments: 654 },
      thumbnail: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop'
    },
    {
      id: 'd3',
      title: 'Biodiversidad en peligro: Especies al borde de la extinción',
      slug: 'biodiversidad-especies-peligro',
      journScore: 88,
      publishedAt: new Date('2025-11-10'),
      stats: { views: 156000, likes: 8200, comments: 432 },
      thumbnail: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=250&fit=crop'
    }
  ]
}

export default function CreatorProfilePage() {
  const params = useParams()
  const [isFollowing, setIsFollowing] = useState(false)
  const [followersCount, setFollowersCount] = useState(mockCreator.stats.followers)

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    setFollowersCount(prev => isFollowing ? prev - 1 : prev + 1)
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    })
  }

  const getJournScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getJournScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800'
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800'
    return 'bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 pb-20 md:pb-4">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
        {mockCreator.coverImage && (
          <img
            src={mockCreator.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="relative -mt-16 mb-6">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Avatar
                  src={mockCreator.avatar}
                  alt={mockCreator.name}
                  fallback={mockCreator.name}
                  size="xl"
                  className="ring-4 ring-white dark:ring-gray-900"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        {mockCreator.name}
                      </h1>
                      {mockCreator.verified && (
                        <CheckCircle2 className="h-6 w-6 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      @{mockCreator.username}
                    </p>
                    <Badge variant="primary" className="text-sm">
                      {mockCreator.specialty}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant={isFollowing ? 'outline' : 'primary'}
                      onClick={handleFollow}
                      className="min-w-[120px]"
                    >
                      {isFollowing ? 'Siguiendo' : 'Seguir'}
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {mockCreator.bio}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {mockCreator.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{mockCreator.location}</span>
                    </div>
                  )}
                  {mockCreator.website && (
                    <a
                      href={mockCreator.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <LinkIcon className="h-4 w-4" />
                      <span>{new URL(mockCreator.website).hostname}</span>
                    </a>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Se unió en {formatDate(mockCreator.joinedDate)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(followersCount)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Seguidores
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(mockCreator.stats.dossiers)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Dossiers
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatNumber(mockCreator.stats.totalViews)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Vistas Totales
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className={cn(
                  'text-2xl font-bold',
                  getJournScoreColor(mockCreator.journScore)
                )}>
                  {mockCreator.journScore}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  JournScore
                </div>
              </div>
            </div>

            {/* Badges */}
            {mockCreator.badges.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                {mockCreator.badges.map(badge => {
                  const Icon = badge.icon
                  return (
                    <div
                      key={badge.id}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <Icon className={cn(
                        'h-4 w-4',
                        badge.color === 'blue' && 'text-blue-600',
                        badge.color === 'yellow' && 'text-yellow-600',
                        badge.color === 'green' && 'text-green-600'
                      )} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {badge.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Dossiers Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dossiers Recientes
            </h2>
            <Button variant="outline" size="sm">
              Ver todos
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCreator.recentDossiers.map(dossier => (
              <Link
                key={dossier.id}
                href={`/dossier/${dossier.slug}`}
                className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <img
                    src={dossier.thumbnail}
                    alt={dossier.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <div className={cn(
                      'px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-sm',
                      getJournScoreBg(dossier.journScore)
                    )}>
                      <span className={getJournScoreColor(dossier.journScore)}>
                        {dossier.journScore}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {dossier.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{formatNumber(dossier.stats.views)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{formatNumber(dossier.stats.likes)}</span>
                      </div>
                    </div>
                    <span className="text-xs">
                      {formatDate(dossier.publishedAt)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
