import { useEffect, useRef } from 'react'
import type { Product } from '../data/products'
import { Icon } from './Icon'

type VideoModalProps = {
  product: Product | null
  onClose: () => void
}

function youtubeEmbedUrl(url: string) {
  const match = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/)
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0` : null
}

export function VideoModal({ product, onClose }: VideoModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (product && !dialog.open) dialog.showModal()
    if (!product && dialog.open) dialog.close()
  }, [product])

  const embed = product?.video ? youtubeEmbedUrl(product.video) : null

  return (
    <dialog
      ref={dialogRef}
      className="video-modal"
      onClose={onClose}
      // Cierra al hacer clic fuera del contenido.
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-label={product ? `Video de ${product.name}` : undefined}
    >
      {product?.video && (
        <div className="video-frame">
          <div className="video-head">
            <p className="video-title">{product.name}</p>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Cerrar video">
              <Icon name="x" size={20} />
            </button>
          </div>
          {embed ? (
            <iframe
              src={embed}
              title={`Video de ${product.name}`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video src={product.video} controls autoPlay playsInline />
          )}
        </div>
      )}
    </dialog>
  )
}
