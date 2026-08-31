'use client'

import {
  Flame, Lock, ServerCrash, WifiOff, AlertTriangle,
  SearchX, ImageOff, FileQuestion, ShieldOff, Clock
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type ErrorCategory = 'error' | 'empty' | 'network'

export interface ErrorConfig {
  code: string
  title: string
  description: string
  icon: LucideIcon
  category: ErrorCategory
  primaryAction?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  accentColor: string
}

export const errorConfigs: Record<string, ErrorConfig> = {
  '404': {
    code: '404',
    title: 'Page Not Found',
    description: "The page you're looking for doesn't exist or may have been moved.",
    icon: FileQuestion,
    category: 'error',
    primaryAction: { label: 'Go Home', href: '/' },
    secondaryAction: { label: 'Go Back', href: 'back' },
    accentColor: 'luxury-red',
  },
  '403': {
    code: '403',
    title: 'Access Denied',
    description: "You don't have permission to access this page.",
    icon: ShieldOff,
    category: 'error',
    primaryAction: { label: 'Go Home', href: '/' },
    secondaryAction: { label: 'Go Back', href: 'back' },
    accentColor: 'soft-amber',
  },
  '500': {
    code: '500',
    title: 'Server Error',
    description: 'Something went wrong on our side. Please try again.',
    icon: ServerCrash,
    category: 'error',
    primaryAction: { label: 'Try Again', href: 'retry' },
    secondaryAction: { label: 'Go Home', href: '/' },
    accentColor: 'luxury-red',
  },
  '502': {
    code: '502',
    title: 'Bad Gateway',
    description: 'The server received an invalid response. Please try again.',
    icon: ServerCrash,
    category: 'error',
    primaryAction: { label: 'Try Again', href: 'retry' },
    secondaryAction: { label: 'Go Home', href: '/' },
    accentColor: 'luxury-red',
  },
  '503': {
    code: '503',
    title: 'Service Unavailable',
    description: 'The service is temporarily unavailable. Please try again later.',
    icon: Clock,
    category: 'error',
    primaryAction: { label: 'Try Again', href: 'retry' },
    secondaryAction: { label: 'Go Home', href: '/' },
    accentColor: 'soft-amber',
  },
  '504': {
    code: '504',
    title: 'Gateway Timeout',
    description: 'The server took too long to respond. Please try again.',
    icon: Clock,
    category: 'error',
    primaryAction: { label: 'Try Again', href: 'retry' },
    secondaryAction: { label: 'Go Home', href: '/' },
    accentColor: 'soft-amber',
  },
  network: {
    code: '—',
    title: 'You\'re Offline',
    description: 'Please check your internet connection and try again.',
    icon: WifiOff,
    category: 'network',
    primaryAction: { label: 'Try Again', href: 'retry' },
    secondaryAction: { label: 'Go Home', href: '/' },
    accentColor: 'soft-amber',
  },
  generic: {
    code: '!',
    title: 'Something Went Wrong',
    description: 'An unexpected error occurred. Please try again.',
    icon: AlertTriangle,
    category: 'error',
    primaryAction: { label: 'Try Again', href: 'retry' },
    secondaryAction: { label: 'Go Home', href: '/' },
    accentColor: 'luxury-red',
  },
  'empty-search': {
    code: '—',
    title: 'No Results Found',
    description: 'We couldn\'t find what you\'re looking for. Try a different search.',
    icon: SearchX,
    category: 'empty',
    primaryAction: { label: 'Clear Search', href: 'clear' },
    accentColor: 'soft-amber',
  },
  'empty-content': {
    code: '—',
    title: 'Nothing Here Yet',
    description: 'This section is currently being prepared. Check back soon.',
    icon: FileQuestion,
    category: 'empty',
    primaryAction: { label: 'Go Home', href: '/' },
    accentColor: 'soft-amber',
  },
  'image-error': {
    code: '—',
    title: 'Image Unavailable',
    description: 'The image could not be loaded. It may be temporarily unavailable.',
    icon: ImageOff,
    category: 'empty',
    primaryAction: { label: 'Go Back', href: 'back' },
    accentColor: 'soft-amber',
  },
}
