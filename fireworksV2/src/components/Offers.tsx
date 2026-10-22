import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import type { Offer } from '../data/offers'
import { useReveal } from '../hooks/useReveal'
import { Icon } from './Icon'

type OffersProps = {
  offers: Offer[]
  onSeeOffer: (offer: Offer) => void
}

// Distancia mínima de arrastre con el mouse para que no cuente como clic.
const DRAG_THRESHOLD = 6

export function Offers({ offers, onSeeOffer }: OffersProps) {
  const headRef = useReveal<HTMLDivElement>()
  const bodyRef = useReveal<HTMLDivElement>()
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })
  const [current, setCurrent] = useState(0)

  // El banner que ocupa la mayor parte del carril es el activo (sirve para el deslizamiento táctil).
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setCurrent(Number((entry.target as HTMLElement).dataset.index))
        }
      },
      { root: track, threshold: 0.6 },
    )
    for (const slide of track.children) observer.observe(slide)
    return () => observer.disconnect()
  }, [offers.length])

  const goTo = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const total = offers.length
    const target = ((index % total) + total) % total
    const slide = track.children[target] as HTMLElement
    track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' })
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') goTo(current + 1)
    else if (e.key === 'ArrowLeft') goTo(current - 1)
    else return
    e.preventDefault()
  }

  // Arrastre con el mouse; en pantallas táctiles el carril ya se desliza solo.
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    const track = e.currentTarget
    drag.current = { active: true, startX: e.clientX, startScroll: track.scrollLeft, moved: false }
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d.active) return
    const dx = e.clientX - d.startX
    const track = e.currentTarget
    if (!d.moved && Math.abs(dx) > DRAG_THRESHOLD) {
      d.moved = true
      track.setPointerCapture(e.pointerId)
      track.classList.add('is-dragging')
    }
    if (d.moved) track.scrollLeft = d.startScroll - dx
  }

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d.active) return
    d.active = false
    if (!d.moved) return
    const track = e.currentTarget
    track.classList.remove('is-dragging')
    const dx = e.clientX - d.startX
    // Basta con un arrastre corto para pasar al siguiente banner.
    goTo(Math.abs(dx) > track.clientWidth / 6 ? current + (dx < 0 ? 1 : -1) : current)
  }

  return (
    <section id="ofertas" className="offers" aria-labelledby="ofertas-title">
      <div ref={headRef} className="section-head reveal">
        <h2 id="ofertas-title" className="section-title">
          Aprovecha por <span className="accent">tiempo limitado</span>
        </h2>
        <p className="section-sub">
          Promociones de esta temporada. Desliza o usa las flechas para ver todas.
        </p>
      </div>

      <div ref={bodyRef} className="reveal">
        <div
          ref={trackRef}
          className="offers-track"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Promociones"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          // Evita que soltar un arrastre encima del botón dispare su clic.
          onClickCapture={(e) => {
            if (drag.current.moved) {
              e.preventDefault()
              e.stopPropagation()
              drag.current.moved = false
            }
          }}
        >
          {offers.map((offer, i) => (
            <article
              key={offer.id}
              className="offer"
              data-index={i}
              role="group"
              aria-roledescription="promoción"
              aria-label={`${i + 1} de ${offers.length}`}
              inert={i !== current}
            >
              <div className="offer-copy">
                <p className="eyebrow">{offer.eyebrow}</p>
                <h3 className="offer-title">{offer.title}</h3>
                <p className="offer-desc">{offer.description}</p>
                <button type="button" className="btn btn-primary" onClick={() => onSeeOffer(offer)}>
                  {offer.cta}
                </button>
              </div>
              <div className="offer-media">
                <img src={offer.image} alt={offer.imageAlt} draggable={false} decoding="async" />
              </div>
            </article>
          ))}
        </div>

        <div className="offers-controls">
          <button
            type="button"
            className="icon-btn"
            onClick={() => goTo(current - 1)}
            aria-label="Promoción anterior"
          >
            <Icon name="caretLeft" size={20} />
          </button>
          <div className="offers-dots">
            {offers.map((offer, i) => (
              <button
                key={offer.id}
                type="button"
                className="offers-dot"
                aria-label={`Ver promoción ${i + 1}`}
                aria-current={i === current}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={() => goTo(current + 1)}
            aria-label="Promoción siguiente"
          >
            <Icon name="caretRight" size={20} />
          </button>
        </div>
      </div>
    </section>
  )
}
