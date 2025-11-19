'use client'

import { useState, useEffect, useRef } from 'react'
import { FeedCard } from '@/components/feed/feed-card'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'

// Mock data - esto será reemplazado con llamadas a la API
const mockDossiers = [
  {
    id: '1',
    title: 'Crisis climática: Nuevo informe revela datos alarmantes',
    slug: 'crisis-climatica-nuevo-informe',
    summary: 'Un nuevo estudio del IPCC muestra que las temperaturas globales podrían aumentar 2.5°C para 2050 si no se toman medidas inmediatas.',
    journScore: 87,
    verificationStatus: 'verified',
    mediaUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800',
    mediaType: 'image' as const,
    creator: {
      id: 'c1',
      name: 'María González',
      username: 'mariagonzalez',
      verified: true,
      journScore: 92,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      specialty: 'Ciencia y Medio Ambiente'
    },
    stats: {
      views: 245000,
      likes: 12500,
      comments: 892,
      shares: 3400
    },
    publishedAt: new Date('2025-11-18T10:00:00'),
    tags: ['Clima', 'Ciencia', 'Urgente']
  },
  {
    id: '2',
    title: 'Avance tecnológico: IA detecta cáncer con 99% de precisión',
    slug: 'ia-detecta-cancer',
    summary: 'Investigadores del MIT desarrollan un sistema de IA capaz de detectar cáncer de pulmón en etapas tempranas con precisión sin precedentes.',
    journScore: 94,
    verificationStatus: 'verified',
    mediaUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    mediaType: 'image' as const,
    creator: {
      id: 'c2',
      name: 'Dr. Carlos Ruiz',
      username: 'drcarlosruiz',
      verified: true,
      journScore: 96,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      specialty: 'Salud y Tecnología'
    },
    stats: {
      views: 580000,
      likes: 45000,
      comments: 2300,
      shares: 12000
    },
    publishedAt: new Date('2025-11-18T08:30:00'),
    tags: ['Tecnología', 'Salud', 'Investigación']
  },
  {
    id: '3',
    title: 'Economía global: Análisis del impacto de nuevas políticas comerciales',
    slug: 'economia-politicas-comerciales',
    summary: 'Expertos analizan cómo las recientes decisiones de los bancos centrales afectarán la inflación y el crecimiento económico mundial.',
    journScore: 81,
    verificationStatus: 'in_review',
    mediaUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    mediaType: 'image' as const,
    creator: {
      id: 'c3',
      name: 'Ana Martínez',
      username: 'anamartinez',
      verified: true,
      journScore: 88,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
      specialty: 'Economía y Finanzas'
    },
    stats: {
      views: 156000,
      likes: 8900,
      comments: 567,
      shares: 2100
    },
    publishedAt: new Date('2025-11-17T16:00:00'),
    tags: ['Economía', 'Política', 'Global']
  }
]

export default function FeedPage() {
  const [dossiers, setDossiers] = useState(mockDossiers)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Infinite scroll - cargar más contenido
  const loadMore = async () => {
    if (isLoading || !hasMore) return

    setIsLoading(true)

    // Simular carga de más datos
    setTimeout(() => {
      // En producción, esto sería una llamada a la API
      setDossiers(prev => [...prev, ...mockDossiers.map((d, i) => ({
        ...d,
        id: `${d.id}-${Date.now()}-${i}`
      }))])
      setIsLoading(false)

      // Simular que no hay más datos después de 5 cargas
      if (dossiers.length > 50) {
        setHasMore(false)
      }
    }, 1000)
  }

  // Configurar intersection observer para scroll infinito
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const lastCard = entries[0]
        if (lastCard.isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      { threshold: 0.5 }
    )

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [hasMore, isLoading])

  // Observar la última tarjeta
  useEffect(() => {
    const lastCard = document.querySelector('[data-last-card="true"]')
    if (lastCard && observerRef.current) {
      observerRef.current.observe(lastCard)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [dossiers])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 pb-20 md:pb-0">
      {/* Feed Container */}
      <div
        ref={containerRef}
        className="max-w-2xl mx-auto h-[calc(100vh-4rem)] md:h-[calc(100vh-4rem)] overflow-y-auto snap-y snap-mandatory scrollbar-hide"
      >
        {dossiers.map((dossier, index) => (
          <div
            key={dossier.id}
            data-last-card={index === dossiers.length - 1}
            className="snap-start snap-always h-[calc(100vh-4rem-5rem)] md:h-[calc(100vh-4rem)] flex items-center justify-center p-4"
          >
            <FeedCard dossier={dossier} />
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        )}

        {/* End of feed message */}
        {!hasMore && (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
            <p className="text-lg font-medium">Has llegado al final</p>
            <p className="text-sm">No hay más noticias por ahora</p>
          </div>
        )}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
