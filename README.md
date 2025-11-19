# JourNews - La Infraestructura de la Confianza

![JourNews](https://img.shields.io/badge/JourNews-v0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

> **Noticias verificadas en formato vertical. La plataforma que combina la experiencia de TikTok con la confianza del mejor periodismo.**

---

## 🎯 Visión

Ser la plataforma global definitiva como fuente primaria de noticias e información para la humanidad, erradicando la desinformación mediante la transparencia radical y transformando el consumo de noticias en una experiencia personalizada, interactiva, educativa y empoderadora.

## 🚀 Características Principales

### Para Consumidores
- **Dossiers Completos**: No posts sueltos, sino historias completas con contexto, cronología y fuentes verificadas
- **JournScore Transparente**: Puntuación de credibilidad 0-100 para cada noticia
- **Feed Vertical**: Experiencia tipo TikTok pero con contenido 100% verificado
- **Múltiples Formatos**: Videos, artículos, infografías, audio - todo en un solo lugar
- **Zero Clickbait**: 100% señal, 0% ruido

### Para Creadores/Periodistas
- **Herramientas IA**: Asistencia para investigación, transcripción, verificación
- **Monetización Justa**: Múltiples vías de ingresos (ads, suscripciones, propinas, crowdfunding)
- **Analytics Avanzadas**: Métricas de impacto real, no solo vanidad
- **Sello de Credibilidad**: Tu JournScore personal como garantía de calidad

## 🏗️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS + CSS Variables personalizadas
- **Componentes UI**: Lucide React Icons
- **Animaciones**: CSS Animations + Framer Motion (planeado)

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes (Serverless)
- **Base de Datos**: PostgreSQL (Producción) / SQLite (Desarrollo)
- **ORM**: Prisma
- **Autenticación**: NextAuth.js (planeado)

### Infraestructura
- **Hosting**: Vercel
- **Base de Datos**: Neon PostgreSQL
- **Storage**: Uploadthing / Cloudinary
- **IA/ML**: OpenAI API (planeado)

## 📁 Estructura del Proyecto

```
journews/
├── app/                      # Next.js App Directory
│   ├── api/                 # API Routes
│   ├── auth/                # Páginas de autenticación
│   ├── feed/                # Feed principal
│   ├── dossier/             # Páginas de Dossiers
│   ├── creator/             # Panel de creadores
│   ├── profile/             # Perfiles de usuario
│   ├── layout.tsx           # Layout raíz
│   ├── page.tsx             # Landing page
│   └── globals.css          # Estilos globales
│
├── components/              # Componentes React
│   ├── ui/                 # Componentes UI base
│   ├── feed/               # Componentes del feed
│   ├── dossier/            # Componentes de Dossiers
│   ├── creator/            # Componentes de creadores
│   └── layout/             # Componentes de layout
│
├── lib/                     # Utilidades y lógica de negocio
│   ├── db/                 # Configuración de base de datos
│   ├── auth/               # Lógica de autenticación
│   ├── utils/              # Funciones auxiliares
│   ├── validations/        # Schemas de validación
│   ├── constants.ts        # Constantes de la aplicación
│   └── types.ts            # Tipos TypeScript compartidos
│
├── prisma/                  # Prisma ORM
│   └── schema.prisma       # Schema de base de datos
│
├── public/                  # Archivos estáticos
│
├── .env                     # Variables de entorno (local)
├── .env.example            # Ejemplo de variables de entorno
└── package.json            # Dependencias del proyecto
```

## 🚦 Comenzar

### Prerrequisitos

- Node.js 18+ instalado
- npm
- Git

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/journews.git
   cd journews
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   ```

   Edita `.env` y completa las variables necesarias.

4. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📜 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
```

## 🎨 Diseño y Branding

### Colores Principales

- **Azul Primario**: `hsl(221.2, 83.2%, 53.3%)` - Profesionalismo y confianza
- **Verde Secundario**: `hsl(142.1, 76.2%, 36.3%)` - Verificación y credibilidad
- **Gradientes JournScore**:
  - Alto (80-100): Verde
  - Medio (50-79): Amarillo
  - Bajo (0-49): Rojo

## 🗄️ Modelo de Datos

### Entidades Principales

1. **User**: Usuarios consumidores
2. **Creator**: Periodistas/creadores de contenido
3. **Dossier**: Historias completas de noticias
4. **NewsItem**: Piezas individuales de contenido
5. **TimelineEvent**: Cronología de eventos
6. **KeyFigure**: Personas clave en la historia
7. **Source**: Fuentes verificadas
8. **JournScore**: Sistema de credibilidad

Ver `prisma/schema.prisma` para el schema completo.

## 📊 Roadmap

### v0.1 (MVP) - En Desarrollo
- [x] Landing page con propuesta de valor
- [x] Diseño del schema de base de datos
- [x] Configuración del proyecto base
- [ ] Sistema de autenticación
- [ ] Feed vertical básico
- [ ] Crear y visualizar Dossiers
- [ ] Sistema JournScore manual (v1.0)

### v0.2 (Alpha)
- [ ] Panel de creadores
- [ ] Sistema de verificación básico
- [ ] Subida de media (videos/imágenes)
- [ ] Búsqueda y filtros
- [ ] Perfil de usuarios

### v0.3 (Beta)
- [ ] Integración con IA para asistencia
- [ ] Sistema de monetización
- [ ] Analytics para creadores
- [ ] Sistema de reacciones
- [ ] PWA para móvil

### v1.0 (Producción)
- [ ] API pública (Protocolo Guardián)
- [ ] Aplicaciones móviles nativas
- [ ] Internacionalización completa
- [ ] Sistema avanzado de IA
- [ ] Marketplace de medios

## 👥 Equipo

- **Jairo** - Full Stack Developer & CTO
- **Shantall** - Marketing & Growth Lead

---

## 🌟 Manifiesto

**Creemos que la verdad es un derecho humano esencial.**

No somos solo una app de noticias. Somos un movimiento para restaurar la confianza en la información. En un mundo donde la desinformación se ha industrializado mediante IA, nosotros usamos la tecnología para defender la realidad, no para distorsionarla.

Cada línea de código que escribimos, cada decisión de producto que tomamos, está guiada por una sola pregunta: **¿Esto hace que la verdad sea más accesible?**

Si la respuesta es sí, lo construimos. Si es no, no lo hacemos.

La claridad es poder. La confianza es nuestra infraestructura. Y juntos, estamos construyendo el futuro de cómo la humanidad se informa.

---

**Hecho con 💙 por un equipo que cree en la verdad.**
