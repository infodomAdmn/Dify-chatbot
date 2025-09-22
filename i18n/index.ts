export const i18n = {
  defaultLocale: 'hr',
  locales: ['en', 'es', 'zh-Hans', 'ja', 'fr', 'hr'],
} as const

export type Locale = typeof i18n['locales'][number]
