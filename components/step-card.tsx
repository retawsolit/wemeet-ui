import type { ReactNode } from "react"

interface StepCardProps {
  number: number
  icon: ReactNode
  title: string
  description: string
}

export function StepCard({ number, icon, title, description }: StepCardProps) {
  return (
    <div className="flex gap-4">
      {/* Step Number Circle */}
      <div className="flex-shrink-0">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold">
          {number}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <div className="text-primary text-xl">{icon}</div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
