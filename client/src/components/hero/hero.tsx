import { SearchForm } from '@/components/search-form'
import { cn } from '@/utils/cn'
import { useEffect, useRef } from 'react'
import ScrollReveal from 'scrollreveal'

type ScrollRevealRefElement = HTMLDivElement | HTMLHeadingElement | HTMLParagraphElement

function Hero({
  className,
  content,
  title,
}: {
  className?: string
  content: string
  title: string
}) {
  const scrollRevealRef = useRef<ScrollRevealRefElement[]>([])

  useEffect(() => {
    if (scrollRevealRef.current.length > 0) {
      scrollRevealRef.current.map((ref) =>
        ScrollReveal().reveal(ref, {
          duration: 1000,
          distance: '40px',
          easing: 'cubic-bezier(0.5, -0.01, 0, 1.005)',
          origin: 'top',
          interval: 150,
        }),
      )
    }

    return () => ScrollReveal().destroy()
  }, [])

  function onSearchSubmit(values: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ values })
      }, 1000)
    })
  }

  const addToScrollRevealRef = (el: ScrollRevealRefElement) => {
    scrollRevealRef.current.push(el)
  }

  return (
    <section className={cn('text-center lg:w-full lg:py-20 lg:text-left', className)}>
      <div className="mx-auto w-full max-w-6xl px-6">
          <div className="pb-16 pt-10 w-full lg:pr-20 lg:pt-16">
            <div className="mx-auto w-full max-w-3xl">
              <h1 className="mb-4 mt-0 text-4xl font-bold md:text-5xl " ref={addToScrollRevealRef}>
                {title}
              </h1>
              <p className="prose prose-xl m-auto text-gray-800" ref={addToScrollRevealRef}>
                {content}
              </p>
            </div>

            <div ref={addToScrollRevealRef}>
              <SearchForm
                className="mx-auto mt-8 max-w-md lg:mx-0"
                submitText="Search!"
                onSubmit={onSearchSubmit}
              />
            </div>
          </div>
      </div>
    </section>
  )
}

export default Hero
