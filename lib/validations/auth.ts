// Schemas de validación para autenticación con Zod
import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Email inválido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'La contraseña debe contener al menos una minúscula')
    .regex(/[0-9]/, 'La contraseña debe contener al menos un número'),
  confirmPassword: z
    .string()
    .min(1, 'Confirma tu contraseña'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})

export const creatorApplicationSchema = z.object({
  displayName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  bio: z
    .string()
    .min(50, 'La biografía debe tener al menos 50 caracteres')
    .max(500, 'La biografía no puede exceder 500 caracteres'),
  organization: z
    .string()
    .max(100, 'El nombre de la organización no puede exceder 100 caracteres')
    .optional(),
  title: z
    .string()
    .max(100, 'El título no puede exceder 100 caracteres')
    .optional(),
  expertise: z
    .array(z.string())
    .min(1, 'Debes seleccionar al menos un área de especialización')
    .max(5, 'No puedes seleccionar más de 5 áreas'),
  yearsExperience: z
    .number()
    .int('Los años de experiencia deben ser un número entero')
    .min(0, 'Los años de experiencia no pueden ser negativos')
    .max(70, 'Los años de experiencia no pueden exceder 70')
    .optional(),
  portfolioUrl: z
    .string()
    .url('URL inválida')
    .optional()
    .or(z.literal('')),
  twitterHandle: z
    .string()
    .regex(/^@?[A-Za-z0-9_]{1,15}$/, 'Twitter handle inválido')
    .optional()
    .or(z.literal('')),
  linkedinUrl: z
    .string()
    .url('URL de LinkedIn inválida')
    .regex(/linkedin\.com/, 'Debe ser una URL de LinkedIn')
    .optional()
    .or(z.literal('')),
})

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .optional(),
  bio: z
    .string()
    .max(500, 'La biografía no puede exceder 500 caracteres')
    .optional(),
  location: z
    .string()
    .max(100, 'La ubicación no puede exceder 100 caracteres')
    .optional(),
  website: z
    .string()
    .url('URL inválida')
    .optional()
    .or(z.literal('')),
  interests: z
    .array(z.string())
    .max(10, 'No puedes seleccionar más de 10 intereses')
    .optional(),
})

// Tipos inferidos desde los schemas
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type CreatorApplicationInput = z.infer<typeof creatorApplicationSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
