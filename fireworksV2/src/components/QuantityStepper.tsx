import { Icon } from './Icon'

export const MIN_QTY = 1
export const MAX_QTY = 99

type QuantityStepperProps = {
  value: number
  onChange: (value: number) => void
  label: string
}

export function QuantityStepper({ value, onChange, label }: QuantityStepperProps) {
  const clamp = (n: number) => Math.min(MAX_QTY, Math.max(MIN_QTY, n))

  return (
    <div className="stepper" role="group" aria-label={`Cantidad de ${label}`}>
      <button
        type="button"
        className="stepper-btn"
        onClick={() => onChange(clamp(value - 1))}
        disabled={value <= MIN_QTY}
        aria-label="Quitar uno"
      >
        <Icon name="minus" size={16} />
      </button>
      <input
        className="stepper-input"
        type="number"
        inputMode="numeric"
        min={MIN_QTY}
        max={MAX_QTY}
        value={value}
        onChange={(e) => {
          const n = Number.parseInt(e.target.value, 10)
          onChange(Number.isNaN(n) ? MIN_QTY : clamp(n))
        }}
        aria-label="Cantidad"
      />
      <button
        type="button"
        className="stepper-btn"
        onClick={() => onChange(clamp(value + 1))}
        disabled={value >= MAX_QTY}
        aria-label="Agregar uno"
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  )
}
