import { cn } from "@/lib/utils"

export function GlassCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-primary-foreground/30 border-primary-foreground/30 flex flex-col gap-6 rounded-2xl border py-6 backdrop-blur-md min-w-0",
        className,
      )}
      {...props}
    />
  )
}

export function GlassCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "px-5 grid gap-1.5",
        className,
      )}
      {...props}
    />
  )
}

export function GlassCardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-lg font-semibold leading-none", className)}
      {...props}
    />
  )
}

export function GlassCardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-sm text-foreground/80", className)}
      {...props}
    />
  )
}

export function GlassCardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("px-5", className)} {...props} />
}

export function GlassCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center px-5 pt-4", className)} {...props} />
}
