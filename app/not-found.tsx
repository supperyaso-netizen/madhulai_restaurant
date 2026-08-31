'use client'

import { ErrorPage } from '@/components/error'

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      title="Page Not Found"
      description="The page you're looking for doesn't exist or may have been moved."
    />
  )
}
