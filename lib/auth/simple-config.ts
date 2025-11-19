// Configuración simplificada de auth para desarrollo
// TODO: Integrar NextAuth completo cuando sea compatible con Next.js 16

export type SimpleUser = {
  id: string
  email: string
  name: string | null
  image: string | null
  role: 'USER' | 'CREATOR' | 'ADMIN'
}

export type SimpleSession = {
  user: SimpleUser
  expires: string
}

// Por ahora usaremos un sistema simple de sesiones
// En producción esto será reemplazado por NextAuth
export async function getSimpleSession(): Promise<SimpleSession | null> {
  // TODO: Implementar con cookies/JWT
  return null
}
