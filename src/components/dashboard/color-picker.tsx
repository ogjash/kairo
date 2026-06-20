"use client"

import { useRef } from "react"
import { Plus, Pipette } from "lucide-react"

export const DEFAULT_COLORS = [
  "#3b82f6", // Blue
  "#06b6d4", // Cyan
  "#14b8a6", // Teal
  "#22c55e", // Green
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#ec4899", // Pink
  "#a855f7", // Purple
]

interface ColorPickerProps {
  colors?: string[]
  value: string
  onChange: (color: string) => void
}

export function ColorPicker({ colors = DEFAULT_COLORS, value, onChange }: ColorPickerProps) {
  const colorInputRef = useRef<HTMLInputElement>(null)
  const isCustomColor = !colors.includes(value)

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {colors.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className="size-7 rounded-full border-2 transition-all hover:scale-110 cursor-pointer"
          style={{
            backgroundColor: c,
            borderColor: value === c ? "var(--foreground)" : "transparent",
          }}
          aria-label={`Select color ${c}`}
        />
      ))}

      {/* Custom color button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => colorInputRef.current?.click()}
          className="size-7 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center transition-all hover:scale-110 cursor-pointer hover:border-solid hover:border-foreground"
          style={
            isCustomColor
              ? {
                  backgroundColor: value,
                  borderColor: "var(--foreground)",
                  borderStyle: "solid",
                }
              : {}
          }
          aria-label="Pick custom color"
          title="Pick custom color"
        >
          {isCustomColor ? (
            <Pipette className="size-3.5 text-white mix-blend-difference" />
          ) : (
            <Plus className="size-4 text-muted-foreground hover:text-foreground" />
          )}
        </button>
        <input
          ref={colorInputRef}
          type="color"
          value={isCustomColor ? value : "#ffffff"}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
        />
      </div>
    </div>
  )
}
