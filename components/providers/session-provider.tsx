// Session Provider para toda la aplicación
'use client'

// TODO: Reintegrar NextAuth cuando sea compatible con Next.js 16
// Por ahora usamos un provider simple

interface SessionProviderProps {
  children: React.ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
  return <>{children}</>
}
