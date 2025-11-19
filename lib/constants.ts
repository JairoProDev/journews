// Constantes de la aplicación JourNews

export const APP_NAME = 'JourNews'
export const APP_DESCRIPTION = 'La plataforma de noticias verificadas con scroll vertical'

export const JOURNSCORE_THRESHOLDS = {
  HIGH: 80, // Altamente confiable
  MEDIUM: 50, // Moderadamente confiable
  LOW: 30, // Baja confiabilidad
} as const

export const SUBSCRIPTION_LIMITS = {
  FREE: {
    dossiersPerDay: 10,
    savedDossiers: 20,
    features: ['feed', 'basic_search'],
  },
  PRO: {
    dossiersPerDay: -1, // Ilimitado
    savedDossiers: -1, // Ilimitado
    features: ['feed', 'advanced_search', 'no_ads', 'download_dossiers', 'priority_support'],
  },
  ENTERPRISE: {
    dossiersPerDay: -1,
    savedDossiers: -1,
    features: [
      'feed',
      'advanced_search',
      'no_ads',
      'download_dossiers',
      'priority_support',
      'api_access',
      'white_label',
      'custom_branding',
    ],
  },
} as const

export const DOSSIER_CATEGORIES = [
  { value: 'POLITICS', label: 'Política', icon: 'Vote' },
  { value: 'ECONOMY', label: 'Economía', icon: 'TrendingUp' },
  { value: 'TECHNOLOGY', label: 'Tecnología', icon: 'Cpu' },
  { value: 'SCIENCE', label: 'Ciencia', icon: 'Flask' },
  { value: 'HEALTH', label: 'Salud', icon: 'Heart' },
  { value: 'EDUCATION', label: 'Educación', icon: 'GraduationCap' },
  { value: 'ENVIRONMENT', label: 'Medio Ambiente', icon: 'Leaf' },
  { value: 'CULTURE', label: 'Cultura', icon: 'Palette' },
  { value: 'SPORTS', label: 'Deportes', icon: 'Trophy' },
  { value: 'WORLD', label: 'Mundo', icon: 'Globe' },
  { value: 'LOCAL', label: 'Local', icon: 'MapPin' },
  { value: 'BREAKING', label: 'Último Momento', icon: 'Zap' },
] as const

export const CREATOR_STATUS_LABELS = {
  PENDING: 'Pendiente de verificación',
  VERIFIED: 'Verificado',
  SUSPENDED: 'Suspendido',
  BANNED: 'Baneado',
} as const

export const REACTION_LABELS = {
  INSIGHTFUL: 'Revelador',
  IMPORTANT: 'Importante',
  CONCERNING: 'Preocupante',
  INSPIRING: 'Inspirador',
} as const

export const SOURCE_TYPE_LABELS = {
  OFFICIAL_DOCUMENT: 'Documento Oficial',
  NEWS_AGENCY: 'Agencia de Noticias',
  EXPERT_TESTIMONY: 'Testimonio de Experto',
  WITNESS_ACCOUNT: 'Testimonio de Testigo',
  RESEARCH_PAPER: 'Publicación Científica',
  GOVERNMENT_SOURCE: 'Fuente Gubernamental',
  NGO_REPORT: 'Reporte de ONG',
  OTHER: 'Otro',
} as const

// URLs de redes sociales
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/journews',
  instagram: 'https://instagram.com/journews',
  linkedin: 'https://linkedin.com/company/journews',
  github: 'https://github.com/journews',
} as const

// Configuración de paginación
export const PAGINATION = {
  feedPageSize: 10,
  dossiersPageSize: 12,
  commentsPageSize: 20,
} as const
