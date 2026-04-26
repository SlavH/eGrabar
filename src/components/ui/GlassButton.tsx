"use client"

import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes } from "react"

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
}

export function GlassButton({
  className,
  variant = "primary",
  children,
  ...props
}: GlassButtonProps) {
  return (
    <button
      className={cn(
        "glass px-6 py-3 rounded-lg font-medium transition-all duration-200",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
        variant === "secondary" && "bg-white/10 backdrop-blur-md border border-white/20 text-slate-100 hover:bg-white/20",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}