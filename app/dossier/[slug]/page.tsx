'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Eye,
  CheckCircle2,
  Clock,
  ExternalLink,
  Calendar,
  TrendingUp,
  Users,
  Shield,
  AlertCircle,
  Link as LinkIcon
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

// Mock data - en producción esto vendría de una API
const mockDossier = {
  id: '1',
  title: 'Crisis climática: Nuevo informe del IPCC revela datos alarmantes sobre el futuro del planeta',
  slug: 'crisis-climatica-nuevo-informe',
  summary: 'Un nuevo estudio del IPCC muestra que las temperaturas globales podrían aumentar 2.5°C para 2050 si no se toman medidas inmediatas. El informe incluye datos de más de 14,000 estudios científicos y presenta un panorama crítico del cambio climático.',
  content: `
    <h2>Resumen Ejecutivo</h2>
    <p>El Panel Intergubernamental sobre Cambio Climático (IPCC) ha publicado su último informe, y las conclusiones son más urgentes que nunca. El estudio, que involucró a más de 700 científicos de 90 países, presenta evidencia contundente de que el cambio climático se está acelerando.</p>

    <h2>Hallazgos Principales</h2>
    <p>Los hallazgos clave del informe incluyen:</p>
    <ul>
      <li>Las temperaturas globales han aumentado 1.1°C desde la era preindustrial</li>
      <li>Se proyecta un aumento de 2.5°C para 2050 en el escenario actual</li>
      <li>El nivel del mar ha aumentado 20cm en el último siglo y se acelerará</li>
      <li>Los eventos climáticos extremos son cada vez más frecuentes</li>
    </ul>

    <h2>Implicaciones Globales</h2>
    <p>El informe subraya que cada fracción de grado de calentamiento importa. Un aumento de 2°C en lugar de 1.5°C significaría:</p>
    <ul>
      <li>El doble de población expuesta a olas de calor extremas</li>
      <li>Mayor riesgo de colapso de ecosistemas críticos</li>
      <li>Aumento significativo en la escasez de agua</li>
      <li>Mayor frecuencia de eventos climáticos catastróficos</li>
    </ul>
  `,
  journScore: 87,
  verificationStatus: 'verified',
  publishedAt: new Date('2025-11-18T10:00:00'),
  updatedAt: new Date('2025-11-18T14:30:00'),
  creator: {
    id: 'c1',
    name: 'María González',
    username: 'mariagonzalez',
    verified: true,
    journScore: 92,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    specialty: 'Ciencia y Medio Ambiente',
    bio: 'Periodista especializada en cambio climático y política ambiental. 15 años de experiencia cubriendo conferencias climáticas globales.'
  },
  stats: {
    views: 245000,
    likes: 12500,
    comments: 892,
    shares: 3400,
    saves: 4200
  },
  tags: ['Clima', 'Ciencia', 'Urgente', 'Global'],
  sources: [
    {
      id: 's1',
      title: 'Climate Change 2023: Synthesis Report - IPCC',
      url: 'https://www.ipcc.ch/report/ar6/syr/',
      type: 'Informe Oficial',
      verified: true,
      date: new Date('2023-03-20')
    },
    {
      id: 's2',
      title: 'Nature Climate Change - Peer-reviewed Article',
      url: 'https://www.nature.com/nclimate/',
      type: 'Artículo Científico',
      verified: true,
      date: new Date('2023-05-15')
    },
    {
      id: 's3',
      title: 'NASA Climate Change Data',
      url: 'https://climate.nasa.gov/',
      type: 'Datos Oficiales',
      verified: true,
      date: new Date('2023-06-01')
    }
  ],
  timeline: [
    {
      id: 't1',
      date: new Date('2023-03-20'),
      title: 'Publicación del Informe AR6 del IPCC',
      description: 'El Panel Intergubernamental sobre Cambio Climático publica su Sexto Informe de Evaluación.'
    },
    {
      id: 't2',
      date: new Date('2023-05-15'),
      title: 'Reacción de la comunidad científica',
      description: 'Más de 50 organizaciones científicas internacionales respaldan los hallazgos del informe.'
    },
    {
      id: 't3',
      date: new Date('2023-06-10'),
      title: 'Cumbre climática de urgencia',
      description: 'Líderes mundiales se reúnen para discutir acciones inmediatas basadas en el informe.'
    },
    {
      id: 't4',
      date: new Date('2023-07-01'),
      title: 'Nuevos compromisos de reducción de emisiones',
      description: 'Varios países anuncian metas más ambiciosas de reducción de emisiones para 2030.'
    }
  ],
  keyFigures: [
    {
      id: 'kf1',
      name: 'Dr. Jim Skea',
      role: 'Presidente del IPCC',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=JimSkea',
      quote: 'Este informe es una llamada de atención definitiva. Tenemos las herramientas y el conocimiento, ahora necesitamos la voluntad política.'
    },
    {
      id: 'kf2',
      name: 'Dra. Valérie Masson-Delmotte',
      role: 'Co-presidenta del Grupo de Trabajo I',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Valerie',
      quote: 'Cada tonelada de CO2 emitida contribuye al calentamiento global. Cada fracción de grado importa.'
    }
  ]
}

export default function DossierPage() {
  const params = useParams()
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [likesCount, setLikesCount] = useState(mockDossier.stats.likes)
  const [activeTab, setActiveTab] = useState<'content' | 'timeline' | 'sources'>('content')

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
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

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 pb-20 md:pb-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="success" className="gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Verificado
            </Badge>
            <div className={cn(
              'px-3 py-1 rounded-full border text-sm font-semibold',
              getJournScoreBg(mockDossier.journScore)
            )}>
              <span className={getJournScoreColor(mockDossier.journScore)}>
                JournScore {mockDossier.journScore}
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {mockDossier.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {mockDossier.summary}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {mockDossier.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Creator and Stats */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-gray-800">
            <Link
              href={`/creator/${mockDossier.creator.username}`}
              className="flex items-center gap-3 hover:opacity-80 transition"
            >
              <Avatar
                src={mockDossier.creator.avatar}
                alt={mockDossier.creator.name}
                fallback={mockDossier.creator.name}
                size="lg"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {mockDossier.creator.name}
                  </span>
                  {mockDossier.creator.verified && (
                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {mockDossier.creator.specialty}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  JournScore {mockDossier.creator.journScore}
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{formatNumber(mockDossier.stats.views)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(mockDossier.publishedAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="sticky top-16 z-40 bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-3 mb-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={isLiked ? 'primary' : 'outline'}
                size="sm"
                onClick={handleLike}
                className="gap-1"
              >
                <Heart className={cn('h-4 w-4', isLiked && 'fill-current')} />
                <span>{formatNumber(likesCount)}</span>
              </Button>

              <Button variant="outline" size="sm" className="gap-1">
                <MessageCircle className="h-4 w-4" />
                <span>{formatNumber(mockDossier.stats.comments)}</span>
              </Button>

              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Compartir</span>
              </Button>

              <Button
                variant={isSaved ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setIsSaved(!isSaved)}
              >
                <Bookmark className={cn('h-4 w-4', isSaved && 'fill-current')} />
                <span className="hidden sm:inline">{isSaved ? 'Guardado' : 'Guardar'}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab('content')}
              className={cn(
                'pb-3 font-medium border-b-2 transition',
                activeTab === 'content'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              )}
            >
              Contenido
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={cn(
                'pb-3 font-medium border-b-2 transition flex items-center gap-2',
                activeTab === 'timeline'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              )}
            >
              <Clock className="h-4 w-4" />
              Línea de Tiempo
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={cn(
                'pb-3 font-medium border-b-2 transition flex items-center gap-2',
                activeTab === 'sources'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              )}
            >
              <Shield className="h-4 w-4" />
              Fuentes ({mockDossier.sources.length})
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 md:p-8 mb-8">
          {activeTab === 'content' && (
            <div>
              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: mockDossier.content }}
              />

              {/* Key Figures */}
              {mockDossier.keyFigures.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Figuras Clave
                  </h3>
                  <div className="space-y-4">
                    {mockDossier.keyFigures.map(figure => (
                      <div
                        key={figure.id}
                        className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex items-start gap-3 mb-2">
                          <Avatar
                            src={figure.avatar}
                            alt={figure.name}
                            fallback={figure.name}
                            size="default"
                          />
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              {figure.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {figure.role}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 italic pl-12">
                          "{figure.quote}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'timeline' && (
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                Cronología de Eventos
              </h3>
              <div className="space-y-6">
                {mockDossier.timeline.map((event, index) => (
                  <div key={event.id} className="relative pl-8 pb-6 last:pb-0">
                    {/* Timeline line */}
                    {index !== mockDossier.timeline.length - 1 && (
                      <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                    )}

                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-gray-900" />

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                        {formatDate(event.date)}
                      </p>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {event.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'sources' && (
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Fuentes Verificadas
              </h3>
              <div className="space-y-4">
                {mockDossier.sources.map(source => (
                  <a
                    key={source.id}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="primary" className="text-xs">
                            {source.type}
                          </Badge>
                          {source.verified && (
                            <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                              <CheckCircle2 className="h-3 w-3" />
                              Verificado
                            </div>
                          )}
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {source.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <LinkIcon className="h-3 w-3" />
                          {new URL(source.url).hostname}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(source.date)}
                        </p>
                      </div>
                      <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex-shrink-0" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Dossiers */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h3 className="text-xl font-bold mb-4">Dossiers Relacionados</h3>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <TrendingUp className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Próximamente</p>
          </div>
        </div>
      </div>
    </div>
  )
}
