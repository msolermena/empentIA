import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border-2 border-slate-700 bg-slate-800/50 px-5 py-3 text-base text-slate-50 placeholder:text-slate-500 transition-all duration-300",
          "focus:border-emerald-500 focus:bg-slate-800/80 focus:outline-none focus:ring-4 focus:ring-emerald-500/10",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
