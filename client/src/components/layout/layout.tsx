import { GlobeIcon } from '@/components/icon'
import type { PropsWithChildren } from 'react'

import { Footer } from '@/components/footer'
import { cn } from '@/utils/cn'

function Layout({
  children,
  className,
}: PropsWithChildren<{
  className?: string
}>) {
  return (
    <div
      className={cn(
        'relative mx-auto my-0 flex min-h-screen flex-col overflow-hidden shadow-2xl',
        className,
      )}
    >
      <GlobeIcon />
      <main className="flex-shrink-0 flex-grow items-center lg:flex">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
