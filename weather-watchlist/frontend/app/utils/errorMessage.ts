/**
 * Extracts a readable message from a fetch or runtime error.
 */
export function toErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'data' in error) {
    const data = error.data as { message?: string } | undefined
    if (data?.message) {
      return data.message
    }
  }

  return error instanceof Error ? error.message : 'Unexpected error'
}
