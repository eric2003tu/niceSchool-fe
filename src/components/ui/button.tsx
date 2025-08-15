import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Primary button using your project's green color
        default:
          "bg-[#0F9255] text-white shadow-xs hover:bg-[#0F9255]/90 focus-visible:ring-[#0F9255]/20 dark:focus-visible:ring-[#0F9255]/40",
        
        // Dark blue variant using your project's dark blue
        primary:
          "bg-[#0a0a40] text-white shadow-xs hover:bg-[#0a0a40]/90 focus-visible:ring-[#0a0a40]/20 dark:focus-visible:ring-[#0a0a40]/40",
        
        // Green outline variant
        outline:
          "border border-[#0F9255] bg-transparent text-[#0F9255] shadow-xs hover:bg-[#0F9255] hover:text-white focus-visible:ring-[#0F9255]/20",
        
        // Dark outline variant
        "outline-dark":
          "border border-[#0a0a40] bg-transparent text-[#0a0a40] shadow-xs hover:bg-[#0a0a40] hover:text-white focus-visible:ring-[#0a0a40]/20",
        
        // Secondary using gray tones from your project
        secondary:
          "bg-gray-400 text-white shadow-xs hover:bg-gray-500 focus-visible:ring-gray-400/20",
        
        // Ghost variant with project colors
        ghost:
          "hover:bg-[#0F9255]/10 hover:text-[#0F9255] dark:hover:bg-[#0F9255]/20",
        
        // Ghost dark variant
        "ghost-dark":
          "hover:bg-[#0a0a40]/10 hover:text-[#0a0a40] dark:hover:bg-[#0a0a40]/20",
        
        // Destructive - keeping original for form validation, etc.
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        
        // Link variant with project colors
        link: 
          "text-[#0F9255] underline-offset-4 hover:underline hover:text-[#0F9255]/80",
        
        // Link dark variant
        "link-dark": 
          "text-[#0a0a40] underline-offset-4 hover:underline hover:text-[#0a0a40]/80",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        // Added rounded-full size to match your filter buttons
        pill: "h-9 px-5 py-2 rounded-full has-[>svg]:px-4",
        "pill-sm": "h-8 px-4 py-2 rounded-full has-[>svg]:px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }