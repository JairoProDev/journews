'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Save,
  Eye,
  Plus,
  X,
  Upload,
  Link as LinkIcon,
  Calendar,
  User,
  FileText,
  AlertCircle
} from 'lucide-react'

export default function CreateDossierPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [sources, setSources] = useState<Array<{ title: string; url: string }>>([])
  const [newSource, setNewSource] = useState({ title: '', url: '' })
  const [isSaving, setIsSaving] = useState(false)

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleAddSource = () => {
    if (newSource.title.trim() && newSource.url.trim()) {
      setSources([...sources, { ...newSource }])
      setNewSource({ title: '', url: '' })
    }
  }

  const handleRemoveSource = (index: number) => {
    setSources(sources.filter((_, i) => i !== index))
  }

  const handleSaveDraft = async () => {
    setIsSaving(true)
    // Aquí iría la lógica para guardar el borrador
    setTimeout(() => {
      setIsSaving(false)
      alert('Borrador guardado')
    }, 1000)
  }

  const handlePublish = async () => {
    setIsSaving(true)
    // Aquí iría la lógica para publicar
    setTimeout(() => {
      setIsSaving(false)
      alert('Dossier publicado')
      router.push('/dashboard')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-16 pb-20 md:pb-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Crear Nuevo Dossier
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comparte una historia completa y verificada
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              isLoading={isSaving}
              disabled={!title.trim()}
            >
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Guardar Borrador</span>
            </Button>
            <Button
              variant="primary"
              onClick={handlePublish}
              isLoading={isSaving}
              disabled={!title.trim() || !summary.trim() || !content.trim()}
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Publicar</span>
            </Button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Información Básica
            </h2>

            <div className="space-y-4">
              <Input
                label="Título del Dossier"
                placeholder="Un título claro y descriptivo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <Textarea
                label="Resumen"
                placeholder="Un resumen conciso del dossier (2-3 oraciones)"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={3}
                helperText="Este resumen aparecerá en el feed y en las vistas previas"
                required
              />

              <Textarea
                label="Contenido Principal"
                placeholder="Escribe el contenido completo del dossier aquí. Puedes incluir HTML básico para formateo."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                required
              />
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4">Etiquetas</h2>

            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Agregar etiqueta"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                />
                <Button
                  variant="outline"
                  onClick={handleAddTag}
                  disabled={!newTag.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="gap-1 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      #{tag}
                      <X className="h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sources */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-blue-600" />
              Fuentes
            </h2>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Título de la fuente"
                  placeholder="Ej: Informe del IPCC"
                  value={newSource.title}
                  onChange={(e) => setNewSource({ ...newSource, title: e.target.value })}
                />
                <Input
                  label="URL"
                  type="url"
                  placeholder="https://ejemplo.com"
                  value={newSource.url}
                  onChange={(e) => setNewSource({ ...newSource, url: e.target.value })}
                />
              </div>
              <Button
                variant="outline"
                onClick={handleAddSource}
                disabled={!newSource.title.trim() || !newSource.url.trim()}
                className="w-full"
              >
                <Plus className="h-4 w-4" />
                Agregar Fuente
              </Button>

              {sources.length > 0 && (
                <div className="space-y-2 mt-4">
                  {sources.map((source, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 dark:text-white truncate">
                          {source.title}
                        </p>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate block"
                        >
                          {source.url}
                        </a>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSource(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Media Upload */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-600" />
              Media
            </h2>

            <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Arrastra y suelta imágenes o videos aquí
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                o haz clic para seleccionar archivos
              </p>
              <Button variant="outline" size="sm">
                Seleccionar Archivos
              </Button>
            </div>

            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900 dark:text-blue-300">
                <p className="font-medium mb-1">Próximamente</p>
                <p className="text-blue-700 dark:text-blue-400">
                  La carga de archivos multimedia estará disponible pronto. Por ahora, puedes usar URLs de imágenes externas en el contenido.
                </p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              Línea de Tiempo
            </h2>

            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Calendar className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="mb-2">Editor de línea de tiempo</p>
              <p className="text-sm">Próximamente: agrega eventos cronológicos a tu dossier</p>
            </div>
          </div>

          {/* Key Figures */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Figuras Clave
            </h2>

            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <User className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="mb-2">Gestor de figuras clave</p>
              <p className="text-sm">Próximamente: agrega personas relevantes y sus declaraciones</p>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="sticky bottom-4 mt-8 flex justify-end gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-lg">
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard')}
          >
            Cancelar
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveDraft}
            isLoading={isSaving}
            disabled={!title.trim()}
          >
            <Save className="h-4 w-4" />
            Guardar Borrador
          </Button>
          <Button
            variant="primary"
            onClick={handlePublish}
            isLoading={isSaving}
            disabled={!title.trim() || !summary.trim() || !content.trim()}
          >
            <Eye className="h-4 w-4" />
            Publicar
          </Button>
        </div>
      </div>
    </div>
  )
}
