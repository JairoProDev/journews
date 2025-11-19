'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Settings,
  Heart,
  Bookmark,
  Clock,
  TrendingUp,
  Users,
  Eye,
  MessageCircle
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

// Mock data
const mockUser = {
  id: 'u1',
  name: 'Juan Pérez',
  email: 'juan@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
  bio: 'Apasionado por las noticias verificadas y el periodismo de calidad.',
  joinedDate: new Date('2023-06-15'),
  stats: {
    following: 42,
    savedDossiers: 128,
    likedDossiers: 342,
    comments: 89
  }
}

const mockSavedDossiers = [
  {
    id: 'd1',
    title: 'Crisis climática: Nuevo informe revela datos alarmantes',
    slug: 'crisis-climatica-nuevo-informe',
    journScore: 87,
    creator: {
      name: 'María González',
      username: 'mariagonzalez'
    },
    thumbnail: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&fit=crop',
    savedAt: new Date('2025-11-18')
  },
  {
    id: 'd2',
    title: 'Avance tecnológico: IA detecta cáncer con 99% de precisión',
    slug: 'ia-detecta-cancer',
    journScore: 94,
    creator: {
      name: 'Dr. Carlos Ruiz',
      username: 'drcarlosruiz'
    },
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop',
    savedAt: new Date('2025-11-17')
  }
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'saved' | 'liked' | 'history'>('saved')

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long'
    })
  }

  const formatNumber = (num: number): string => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 pb-20 md:pb-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <Avatar
                src={mockUser.avatar}
                alt={mockUser.name}
                fallback={mockUser.name}
                size="xl"
              />
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {mockUser.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {mockUser.email}
                  </p>
                  <Badge variant="secondary">Usuario</Badge>
                </div>

                <Link href="/settings">
                  <Button variant="outline" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Configuración
                  </Button>
                </Link>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {mockUser.bio}
              </p>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Miembro desde {formatDate(mockUser.joinedDate)}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockUser.stats.following}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Siguiendo
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockUser.stats.savedDossiers}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Guardados
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockUser.stats.likedDossiers}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Me gusta
              </div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockUser.stats.comments}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Comentarios
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('saved')}
              className={cn(
                'pb-3 font-medium border-b-2 transition flex items-center gap-2',
                activeTab === 'saved'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              )}
            >
              <Bookmark className="h-4 w-4" />
              Guardados
            </button>
            <button
              onClick={() => setActiveTab('liked')}
              className={cn(
                'pb-3 font-medium border-b-2 transition flex items-center gap-2',
                activeTab === 'liked'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              )}
            >
              <Heart className="h-4 w-4" />
              Me gusta
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={cn(
                'pb-3 font-medium border-b-2 transition flex items-center gap-2',
                activeTab === 'history'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              )}
            >
              <Clock className="h-4 w-4" />
              Historial
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSavedDossiers.map(dossier => (
              <Link
                key={dossier.id}
                href={`/dossier/${dossier.slug}`}
                className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition"
              >
                <div className="relative h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <img
                    src={dossier.thumbnail}
                    alt={dossier.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="primary" className="backdrop-blur-sm">
                      {dossier.journScore}
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                    {dossier.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{dossier.creator.name}</span>
                    <span className="text-xs">{formatDate(dossier.savedAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'liked' && (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-12 text-center">
            <Heart className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Dossiers que te gustaron
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Aquí aparecerán todos los dossiers a los que diste me gusta
            </p>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-12 text-center">
            <Clock className="h-16 w-16 mx-auto mb-4 text-gray-300 dark:text-gray-700" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Historial de lectura
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Aquí aparecerán los dossiers que has leído recientemente
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
