export interface TextSegment {
  text: string
  code: boolean
}

/**
 * Splits a text into plain and backtick delimited code segments.
 */
export function splitInlineCode(text: string): TextSegment[] {
  return text
    .split('`')
    .map((segment, index) => ({ text: segment, code: index % 2 === 1 }))
    .filter((segment) => segment.text !== '')
}
