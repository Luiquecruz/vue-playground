import { describe, expect, it } from 'vitest'
import { toErrorMessage } from '../../app/utils/errorMessage'
import { splitInlineCode } from '../../app/utils/inlineCode'
import { describeWeatherCode } from '../../app/utils/weatherCondition'

describe('describeWeatherCode', () => {
  it('describes a known WMO code', () => {
    expect(describeWeatherCode(0)).toEqual({ label: 'Clear sky', icon: '☀️' })
  })

  it('falls back for an unknown code', () => {
    expect(describeWeatherCode(42).label).toBe('Unknown')
  })
})

describe('toErrorMessage', () => {
  it('prefers the API error message', () => {
    expect(toErrorMessage({ data: { message: 'Lisbon is already on the watchlist' } })).toBe(
      'Lisbon is already on the watchlist',
    )
  })

  it('uses the error message for runtime errors', () => {
    expect(toErrorMessage(new Error('Network down'))).toBe('Network down')
  })

  it('returns a generic message for unknown values', () => {
    expect(toErrorMessage('boom')).toBe('Unexpected error')
  })
})

describe('splitInlineCode', () => {
  it('splits plain text and code segments', () => {
    expect(splitInlineCode('Use `useCookie` in the `cities` store')).toEqual([
      { text: 'Use ', code: false },
      { text: 'useCookie', code: true },
      { text: ' in the ', code: false },
      { text: 'cities', code: true },
      { text: ' store', code: false },
    ])
  })

  it('keeps text without backticks as a single segment', () => {
    expect(splitInlineCode('Plain text')).toEqual([{ text: 'Plain text', code: false }])
  })
})
