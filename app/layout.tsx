import { getLocaleOnServer } from '@/i18n/server'

import './styles/globals.css'
import './styles/markdown.scss'

const LocaleLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  const locale = await getLocaleOnServer()
  return (
    <html lang={locale ?? 'hr'} className="h-full">
      <body className="h-full">
        <div className="overflow-x-hidden">
          <div className="min-w-[300px] w-full h-screen">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}

export default LocaleLayout
