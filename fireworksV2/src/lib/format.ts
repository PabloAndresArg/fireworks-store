const currency = new Intl.NumberFormat('es-GT', {
  style: 'currency',
  currency: 'GTQ',
})

export function formatPrice(value: number) {
  return currency.format(value)
}
