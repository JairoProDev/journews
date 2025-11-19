import Link from 'next/link'
import { ArrowRight, Shield, Zap, Users, CheckCircle2, TrendingUp, Globe } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navegación */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">J</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                JourNews
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/auth/login"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition"
              >
                Iniciar Sesión
              </Link>
              <Link
                href="/auth/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Comenzar Gratis
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-8 animate-fade-in">
            <Zap className="w-4 h-4" />
            La Infraestructura de la Confianza
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Noticias Verificadas,
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Confianza Restaurada
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            La plataforma que combina la experiencia visual de TikTok con la credibilidad
            del mejor periodismo. Cada noticia verificada, cada fuente transparente,
            cada Dossier completo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/feed"
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-2"
            >
              Explorar Feed
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/creator"
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              Soy Periodista
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Verificado</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">0</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Fake News</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">∞</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Claridad</div>
            </div>
          </div>
        </div>
      </section>

      {/* El Problema */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              El Problema que Resolvemos
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              La desinformación no es un problema de noticias. Es un problema de confianza.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">😰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Fragmentación Agotadora
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Para entender una noticia, tienes que navegar 10 apps diferentes.
                Es trabajo a tiempo completo.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Ruido Infinito
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                100 publicaciones basura por cada noticia que realmente importa.
                Como buscar una aguja en un pajar.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎭</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Falta de Contexto
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Fragmentos sin historia completa. Un clip de 30 segundos sin el antes y el después.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* La Solución */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Nuestra Solución: El Dossier
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              No posts sueltos. Historias completas, verificadas y contextualizadas.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    JournScore Transparente
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Cada noticia tiene una puntuación de credibilidad de 0-100,
                    calculada con criterios públicos y auditables.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Cronología Completa
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Entiende cómo se desarrolló el evento desde el inicio hasta ahora,
                    con todas las fuentes verificadas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Múltiples Perspectivas
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    3-5 fuentes creíbles con diferentes ángulos, para que tengas
                    el panorama completo.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 rounded-2xl text-white shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">Un Ejemplo: Crisis Política</h3>
              <div className="space-y-4 text-blue-50">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">1</span>
                  </div>
                  <p>Resumen en 60 segundos: Lo esencial verificado</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">2</span>
                  </div>
                  <p>Cronología: Cómo llegamos aquí</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">3</span>
                  </div>
                  <p>Actores clave: Quién es quién</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">4</span>
                  </div>
                  <p>Fuentes: Documentos oficiales + análisis de expertos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ¿Por Qué JourNews?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No somos otra app de noticias. Somos tu escudo cognitivo.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verificación Multi-Capa',
                description: 'IA + expertos humanos + comunidad trabajando juntos para garantizar la verdad.'
              },
              {
                icon: Zap,
                title: 'Rápido pero Profundo',
                description: 'Formatos de 60 segundos a investigaciones completas. Tú eliges la profundidad.'
              },
              {
                icon: TrendingUp,
                title: 'Empodera Creadores',
                description: 'Monetización justa para periodistas. El buen contenido es recompensado.'
              },
              {
                icon: Globe,
                title: 'Transparencia Radical',
                description: 'Todos nuestros criterios de verificación son públicos y auditables.'
              },
              {
                icon: Users,
                title: 'Comunidad Constructiva',
                description: 'Debates civilizados, moderados por IA y humanos. Sin toxicidad.'
              },
              {
                icon: CheckCircle2,
                title: 'Sin Clickbait',
                description: 'Cero contenido sensacionalista. 100% señal, 0% ruido.'
              }
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Únete a la Revolución de la Confianza
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10">
            Forma parte de los primeros en experimentar noticias como deben ser:
            verificadas, contextualizadas y confiables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-2"
            >
              Comenzar Ahora
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
            </Link>
            <Link
              href="/creator"
              className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 px-8 py-4 rounded-lg font-semibold text-lg transition"
            >
              Aplicar como Creador
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">J</span>
                </div>
                <span className="text-lg font-bold">JourNews</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                La infraestructura de la confianza para el periodismo digital.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/feed" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Feed</Link></li>
                <li><Link href="/dossiers" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Dossiers</Link></li>
                <li><Link href="/creators" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Creadores</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Compañía</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Sobre Nosotros</Link></li>
                <li><Link href="/manifesto" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Manifiesto</Link></li>
                <li><Link href="/careers" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Trabaja con Nosotros</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Privacidad</Link></li>
                <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Términos</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 JourNews. Todos los derechos reservados. Construido con 💙 por un equipo que cree en la verdad.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
