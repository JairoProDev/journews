'use client'

import { useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  User,
  Lock,
  Bell,
  Palette,
  Shield,
  Globe,
  CreditCard,
  Upload,
  Save,
  Trash2
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<'profile' | 'account' | 'notifications' | 'privacy' | 'appearance'>('profile')
  const [isSaving, setIsSaving] = useState(false)

  // Mock user data
  const [name, setName] = useState('Juan Pérez')
  const [email, setEmail] = useState('juan@example.com')
  const [bio, setBio] = useState('Apasionado por las noticias verificadas y el periodismo de calidad.')
  const [location, setLocation] = useState('Madrid, España')
  const [website, setWebsite] = useState('')

  const handleSave = async () => {
    setIsSaving(true)
    // Simularciones API call
    setTimeout(() => {
      setIsSaving(false)
      alert('Configuración guardada')
    }, 1000)
  }

  const sections = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'account', label: 'Cuenta', icon: Lock },
    { id: 'notifications', label: 'Notificaciones', icon: Bell },
    { id: 'privacy', label: 'Privacidad', icon: Shield },
    { id: 'appearance', label: 'Apariencia', icon: Palette }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 pb-20 md:pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Configuración
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Administra tus preferencias y configuración de cuenta
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-2">
              <nav className="space-y-1">
                {sections.map(section => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id as any)}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-left',
                        activeSection === section.id
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              {activeSection === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Información del Perfil
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Actualiza tu información personal visible para otros usuarios
                    </p>
                  </div>

                  {/* Avatar */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Foto de perfil
                    </label>
                    <div className="flex items-center gap-4">
                      <Avatar
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Juan"
                        alt={name}
                        fallback={name}
                        size="xl"
                      />
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm" className="gap-2">
                          <Upload className="h-4 w-4" />
                          Cambiar foto
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Input
                    label="Nombre completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Textarea
                    label="Biografía"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    helperText="Cuéntale a otros sobre ti"
                  />

                  <Input
                    label="Ubicación"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ciudad, País"
                  />

                  <Input
                    label="Sitio web"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://tusitio.com"
                  />

                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <Button variant="outline">
                      Cancelar
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleSave}
                      isLoading={isSaving}
                      className="gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Guardar cambios
                    </Button>
                  </div>
                </div>
              )}

              {activeSection === 'account' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Configuración de Cuenta
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Administra tu email y contraseña
                    </p>
                  </div>

                  <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contraseña
                    </label>
                    <Button variant="outline">
                      Cambiar contraseña
                    </Button>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                    <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
                      Zona de peligro
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Una vez que elimines tu cuenta, no hay vuelta atrás.
                    </p>
                    <Button variant="outline" className="text-red-600 hover:text-red-700 hover:border-red-500">
                      Eliminar cuenta
                    </Button>
                  </div>
                </div>
              )}

              {activeSection === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Notificaciones
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Controla qué notificaciones recibes
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { id: 'new_followers', label: 'Nuevos seguidores', description: 'Cuando alguien comienza a seguirte' },
                      { id: 'comments', label: 'Comentarios', description: 'Cuando alguien comenta en tus dossiers' },
                      { id: 'likes', label: 'Me gusta', description: 'Cuando alguien da me gusta a tus dossiers' },
                      { id: 'mentions', label: 'Menciones', description: 'Cuando alguien te menciona' },
                      { id: 'newsletter', label: 'Newsletter', description: 'Recibe nuestro resumen semanal' }
                    ].map(item => (
                      <div key={item.id} className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.label}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Privacidad y Seguridad
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Controla quién puede ver tu información
                    </p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { id: 'profile_visibility', label: 'Perfil público', description: 'Permite que otros vean tu perfil' },
                      { id: 'show_liked', label: 'Mostrar dossiers que me gustaron', description: 'Visible en tu perfil público' },
                      { id: 'show_saved', label: 'Mostrar dossiers guardados', description: 'Visible en tu perfil público' },
                      { id: 'allow_messages', label: 'Permitir mensajes', description: 'Otros usuarios pueden enviarte mensajes' }
                    ].map(item => (
                      <div key={item.id} className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {item.label}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.description}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSection === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Apariencia
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Personaliza cómo se ve JourNews para ti
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Tema
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { id: 'light', label: 'Claro', icon: '☀️' },
                        { id: 'dark', label: 'Oscuro', icon: '🌙' },
                        { id: 'system', label: 'Sistema', icon: '💻' }
                      ].map(theme => (
                        <button
                          key={theme.id}
                          className="flex flex-col items-center gap-2 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-500 transition"
                        >
                          <span className="text-3xl">{theme.icon}</span>
                          <span className="font-medium text-gray-900 dark:text-white">
                            {theme.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Idioma
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
                      <option value="es">Español</option>
                      <option value="en">English</option>
                      <option value="pt">Português</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
