// Límite de intentos por ventana de tiempo, guardado en localStorage para que
// sobreviva recargas y se comparta entre pestañas. Es una protección del lado del
// cliente: evita clics repetidos y envíos dobles, pero no sustituye un límite en el servidor.

type RateLimiterOptions = {
  key: string
  limit: number
  windowMs: number
}

export function createRateLimiter({ key, limit, windowMs }: RateLimiterOptions) {
  // Respaldo en memoria cuando localStorage no está disponible (modo privado, bloqueado).
  let memory: number[] = []

  const read = (): number[] => {
    try {
      const parsed: unknown = JSON.parse(window.localStorage.getItem(key) ?? '[]')
      return Array.isArray(parsed) ? parsed.filter((t): t is number => typeof t === 'number') : []
    } catch {
      return memory
    }
  }

  const write = (stamps: number[]) => {
    memory = stamps
    try {
      window.localStorage.setItem(key, JSON.stringify(stamps))
    } catch {
      // Se queda solo en memoria.
    }
  }

  const recent = (now: number) => read().filter((t) => now - t < windowMs && t <= now)

  return {
    // Milisegundos que faltan para poder intentar de nuevo; 0 si ya se puede.
    retryIn(now = Date.now()) {
      const stamps = recent(now)
      if (stamps.length < limit) return 0
      return windowMs - (now - Math.min(...stamps))
    },
    // Registra un intento.
    hit(now = Date.now()) {
      write([...recent(now), now])
    },
  }
}
