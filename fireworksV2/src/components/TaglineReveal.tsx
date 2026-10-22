import { useEffect, useRef } from 'react'

const lines = ['Una noche se recuerda', 'por cómo termina.', 'Haz que termine en lo alto.']

// Cada palabra pasa de tono apagado a blanco al cruzar la línea media de la pantalla.
export function TaglineReveal() {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const words = ref.current?.querySelectorAll<HTMLSpanElement>('.tag-word')
    if (!words) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const passed = entry.isIntersecting || entry.boundingClientRect.top < 0
          entry.target.classList.toggle('is-lit', passed)
        }
      },
      { rootMargin: '0px 0px -50% 0px' },
    )
    words.forEach((w) => observer.observe(w))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="tagline" aria-label="Nuestra promesa">
      <p ref={ref} className="tagline-text">
        {lines.map((line, li) => (
          <span key={li} className="tag-line">
            {line.split(' ').map((word, wi) => (
              <span key={wi} className="tag-word">
                {word}{' '}
              </span>
            ))}
          </span>
        ))}
      </p>
    </section>
  )
}
