interface DecorativeLineProps {
  lineWidth?: number
  fullWidth?: boolean
}

export function DecorativeLine({
  lineWidth = 36,
  fullWidth = false,
}: DecorativeLineProps) {
  return (
    <div
      className={`h-px rounded-full bg-text ${
        fullWidth ? 'w-full' : ''
      }`}
      style={fullWidth ? undefined : { width: `${lineWidth}px` }}
    />
  )
}