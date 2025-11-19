'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Play,
  Eye,
  CheckCircle2,
  Clock,
  TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface FeedCardProps {
  dossier: {
    id: string
    title: string
    slug: string
    summary: string
    journScore: number
    verificationStatus: string
    mediaUrl?: string
    mediaType?: 'image' | 'video'
    creator: {
      id: string
      name: string
      username: string
      verified: boolean
      journScore: number
      avatar?: string
      specialty?: string
    }
    stats: {
      views: number
      likes: number
      comments: number
      shares: number
    }
    publishedAt: Date
    tags: string[]
  }
}

export function FeedCard({ dossier }: FeedCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [likesCount, setLikesCount] = useState(dossier.stats.likes)

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
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

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <Badge variant="success" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Verificado
          </Badge>
        )
      case 'in_review':
        return (
          <Badge variant="warning" className="gap-1">
            <Clock className="h-3 w-3" />
            En revisión
          </Badge>
        )
      default:
        return null
    }
  }

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

  return (
    <div className="relative w-full max-w-lg h-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden flex flex-col">
      {/* Media Section */}
      <div className="relative flex-1 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
        {dossier.mediaUrl ? (
          <>
            {dossier.mediaType === 'video' ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={dossier.mediaUrl}
                  alt={dossier.title}
                  className="w-full h-full object-cover"
                />
                <button className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="h-8 w-8 text-gray-900 ml-1" />
                  </div>
                </button>
              </div>
            ) : (
              <img
                src={dossier.mediaUrl}
                alt={dossier.title}
                className="w-full h-full object-cover"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-gray-400">
              <TrendingUp className="h-16 w-16 mx-auto mb-2" />
              <p>Sin imagen</p>
            </div>
          </div>
        )}

        {/* Verification badge overlay */}
        <div className="absolute top-4 right-4">
          {getVerificationBadge(dossier.verificationStatus)}
        </div>

        {/* JournScore badge overlay */}
        <div className="absolute top-4 left-4">
          <div className={cn(
            'px-3 py-1.5 rounded-full border backdrop-blur-sm',
            getJournScoreBg(dossier.journScore)
          )}>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-200">
                JournScore
              </span>
              <span className={cn('text-lg font-bold', getJournScoreColor(dossier.journScore))}>
                {dossier.journScore}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-shrink-0 p-4 space-y-3">
        {/* Creator Info */}
        <Link
          href={`/creator/${dossier.creator.username}`}
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          <Avatar
            src={dossier.creator.avatar}
            alt={dossier.creator.name}
            fallback={dossier.creator.name}
            size="default"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-gray-900 dark:text-white truncate">
                {dossier.creator.name}
              </span>
              {dossier.creator.verified && (
                <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {dossier.creator.specialty} • JournScore {dossier.creator.journScore}
            </p>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {getTimeAgo(dossier.publishedAt)}
          </span>
        </Link>

        {/* Title and Summary */}
        <Link href={`/dossier/${dossier.slug}`} className="block">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition">
            {dossier.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
            {dossier.summary}
          </p>
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {dossier.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>

        {/* Stats and Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-800">
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{formatNumber(dossier.stats.views)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                'gap-1',
                isLiked && 'text-red-500 hover:text-red-600'
              )}
            >
              <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
              <span className="text-sm font-medium">{formatNumber(likesCount)}</span>
            </Button>

            <Button variant="ghost" size="sm" className="gap-1">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm font-medium">
                {formatNumber(dossier.stats.comments)}
              </span>
            </Button>

            <Button variant="ghost" size="sm">
              <Share2 className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className={cn(isSaved && 'text-blue-500')}
            >
              <Bookmark className={cn('h-5 w-5', isSaved && 'fill-current')} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
