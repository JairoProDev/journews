// Tipos TypeScript compartidos para JourNews
// Nota: Estos tipos están definidos manualmente hasta que Prisma esté configurado completamente

// Tipos base (temporal - se reemplazarán con tipos generados por Prisma)

export type UserRole = 'USER' | 'CREATOR' | 'ADMIN'
export type SubscriptionTier = 'FREE' | 'PRO' | 'ENTERPRISE'
export type DossierStatus = 'DRAFT' | 'PENDING_REVIEW' | 'PUBLISHED' | 'ARCHIVED'
export type DossierCategory =
  | 'POLITICS'
  | 'ECONOMY'
  | 'TECHNOLOGY'
  | 'SCIENCE'
  | 'HEALTH'
  | 'EDUCATION'
  | 'ENVIRONMENT'
  | 'CULTURE'
  | 'SPORTS'
  | 'WORLD'
  | 'LOCAL'
  | 'BREAKING'

export type NewsItemType =
  | 'VIDEO'
  | 'ARTICLE'
  | 'INFOGRAPHIC'
  | 'AUDIO'
  | 'IMAGE_GALLERY'
  | 'LIVE_STREAM'

export type ReactionType =
  | 'INSIGHTFUL'
  | 'IMPORTANT'
  | 'CONCERNING'
  | 'INSPIRING'

// Interfaces básicas

export interface User {
  id: string
  email: string
  name: string | null
  role: UserRole
  subscription: SubscriptionTier
  createdAt: Date
  updatedAt: Date
}

export interface Creator {
  id: string
  displayName: string
  email: string
  verified: boolean
  credibilityScore: number
  totalDossiers: number
  followerCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Dossier {
  id: string
  title: string
  slug: string
  description: string
  coverImage: string | null
  category: DossierCategory
  status: DossierStatus
  journScore: number
  viewCount: number
  saveCount: number
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  creatorId: string
}

export interface NewsItem {
  id: string
  dossierId: string
  type: NewsItemType
  title: string | null
  content: string | null
  mediaUrl: string | null
  thumbnailUrl: string | null
  duration: number | null
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface TimelineEvent {
  id: string
  dossierId: string
  title: string
  description: string
  eventDate: Date
  imageUrl: string | null
  order: number
  createdAt: Date
}

export interface KeyFigure {
  id: string
  dossierId: string
  name: string
  role: string
  bio: string | null
  imageUrl: string | null
}

export interface Source {
  id: string
  name: string
  type: string
  url: string | null
  credibilityScore: number
}

// Tipos extendidos con relaciones

export type DossierWithRelations = Dossier & {
  creator: Creator
  newsItems: NewsItem[]
  timeline: TimelineEvent[]
  keyFigures: KeyFigure[]
  sources: Array<{
    source: Source
  }>
  _count?: {
    views: number
    saves: number
    reactions: number
  }
}

export type CreatorWithStats = Creator & {
  _count?: {
    dossiers: number
    followers: number
  }
}

export type UserWithPreferences = User & {
  followedCreators: Creator[]
}

// Tipos para APIs

export type ApiResponse<T> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export type PaginatedResponse<T> = ApiResponse<{
  items: T[]
  pagination: {
    page: number
    pageSize: number
    totalItems: number
    totalPages: number
    hasMore: boolean
  }
}>

// Tipos para formularios

export type CreateDossierInput = {
  title: string
  description: string
  category: DossierCategory
  tags: string[]
  location?: string
  coverImage?: string
}

export type CreateNewsItemInput = {
  dossierId: string
  type: NewsItemType
  title?: string
  content?: string
  mediaUrl?: string
  duration?: number
  order: number
}

export type UpdateUserProfileInput = {
  name?: string
  bio?: string
  location?: string
  website?: string
  interests?: string[]
}

export type CreatorApplicationInput = {
  displayName: string
  bio: string
  organization?: string
  title?: string
  expertise: string[]
  yearsExperience?: number
  portfolioUrl?: string
  twitterHandle?: string
  linkedinUrl?: string
}

// Tipos para el JournScore

export type JournScoreBreakdown = {
  overall: number // 0-100
  components: {
    sourceCredibility: number
    factChecking: number
    biasAnalysis: number
    expertiseMatch: number
    timelinessAccuracy: number
  }
  badges: Array<{
    type: 'verified' | 'fact_checked' | 'expert_reviewed' | 'primary_source'
    label: string
    description: string
  }>
}

export type BiasAnalysis = {
  score: number // -100 (izquierda) a +100 (derecha)
  confidence: number // 0-100
  indicators: Array<{
    type: 'language' | 'source_selection' | 'framing' | 'omission'
    description: string
    examples: string[]
  }>
}

// Tipos para el feed

export type FeedItem = {
  type: 'dossier' | 'breaking_news' | 'recommended_creator'
  data: DossierWithRelations | Creator
  reason?: string // Por qué se recomienda este item
}

// Tipos para analytics (creadores)

export type CreatorAnalytics = {
  period: 'day' | 'week' | 'month' | 'year'
  totalViews: number
  totalEngagement: number
  averageJournScore: number
  topDossiers: Array<{
    dossier: Dossier
    views: number
    engagement: number
  }>
  audienceDemographics: {
    ageGroups: Record<string, number>
    locations: Record<string, number>
    interests: Record<string, number>
  }
  growthMetrics: {
    viewsGrowth: number // Porcentaje
    followersGrowth: number
    engagementGrowth: number
  }
}

// Tipos para búsqueda y filtros

export type SearchFilters = {
  query?: string
  category?: DossierCategory
  tags?: string[]
  dateFrom?: Date
  dateTo?: Date
  journScoreMin?: number
  location?: string
  creatorId?: string
}

export type SortOption =
  | 'recent'
  | 'popular'
  | 'journscore'
  | 'relevant'

// Configuración del usuario

export type UserPreferences = {
  theme: 'light' | 'dark' | 'system'
  language: 'es' | 'en'
  notifications: {
    email: boolean
    push: boolean
    dossiersFromFollowedCreators: boolean
    breakingNews: boolean
    weeklyDigest: boolean
  }
  feed: {
    autoplay: boolean
    showSensitiveContent: boolean
    preferredCategories: DossierCategory[]
  }
}

// Tipos para notificaciones

export type Notification = {
  id: string
  type: 'new_dossier' | 'breaking_news' | 'creator_milestone' | 'system'
  title: string
  message: string
  imageUrl?: string
  link?: string
  read: boolean
  createdAt: Date
}
