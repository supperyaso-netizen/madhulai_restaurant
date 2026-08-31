'use client'

import { ErrorPage } from '@/components/error'

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorPage
      code="500"
      title="Something Went Wrong"
      description="An unexpected error occurred. Please try again."
      primaryAction={{ label: 'Try Again', href: 'retry' }}
      secondaryAction={{ label: 'Go Home', href: '/' }}
    />
  )
}
