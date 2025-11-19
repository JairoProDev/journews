'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Home,
  Search,
  Bell,
  Plus,
  User,
  LogOut,
  Settings,
  TrendingUp,
  FileText
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { useState } from 'react'

export function Navbar() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const navItems = [
    { href: '/feed', label: 'Feed', icon: Home },
    { href: '/explore', label: 'Explorar', icon: Search },
    { href: '/trending', label: 'Tendencias', icon: TrendingUp },
  ]

  const isActive = (path: string) => pathname === path

  if (status === 'loading') {
    return (
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-8 w-32 rounded" />
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={session ? '/feed' : '/'} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">J</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hidden sm:inline">
              JourNews
            </span>
          </Link>

          {/* Navigation Items (Desktop) */}
          {session && (
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                      isActive(item.href)
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {session ? (
              <>
                {/* Create Button */}
                {(session.user.role === 'CREATOR' || session.user.role === 'ADMIN') && (
                  <Link href="/dashboard/create">
                    <Button variant="primary" size="sm">
                      <Plus className="h-4 w-4" />
                      <span className="hidden sm:inline">Crear</span>
                    </Button>
                  </Link>
                )}

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 hover:opacity-80 transition"
                  >
                    <Avatar
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      fallback={session.user.name || session.user.email || 'User'}
                      size="default"
                    />
                  </button>

                  {showProfileMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowProfileMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800 z-50">
                        <div className="p-3 border-b border-gray-200 dark:border-gray-800">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {session.user.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {session.user.email}
                          </p>
                        </div>
                        <div className="p-2">
                          <Link
                            href="/profile"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                            onClick={() => setShowProfileMenu(false)}
                          >
                            <User className="h-4 w-4" />
                            Mi Perfil
                          </Link>
                          {(session.user.role === 'CREATOR' || session.user.role === 'ADMIN') && (
                            <Link
                              href="/dashboard"
                              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                              onClick={() => setShowProfileMenu(false)}
                            >
                              <FileText className="h-4 w-4" />
                              Dashboard
                            </Link>
                          )}
                          <Link
                            href="/settings"
                            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                            onClick={() => setShowProfileMenu(false)}
                          >
                            <Settings className="h-4 w-4" />
                            Configuración
                          </Link>
                        </div>
                        <div className="p-2 border-t border-gray-200 dark:border-gray-800">
                          <button
                            onClick={() => signOut({ callbackUrl: '/' })}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                          >
                            <LogOut className="h-4 w-4" />
                            Cerrar Sesión
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="primary" size="sm">
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      {session && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 md:hidden z-50">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex flex-col items-center gap-1 px-4 py-2',
                    isActive(item.href)
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
              )
            })}
            {(session.user.role === 'CREATOR' || session.user.role === 'ADMIN') && (
              <Link
                href="/dashboard/create"
                className="flex flex-col items-center gap-1 px-4 py-2 text-blue-600 dark:text-blue-400"
              >
                <Plus className="h-6 w-6" />
                <span className="text-xs font-medium">Crear</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
