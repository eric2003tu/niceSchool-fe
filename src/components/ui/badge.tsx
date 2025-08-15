import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-all duration-200 overflow-hidden",
  {
    variants: {
      variant: {
        // Primary using your green color
        default:
          "border-transparent bg-[#0F9255] text-white [a&]:hover:bg-[#0F9255]/90 shadow-sm",
        
        // Dark variant using your dark blue
        primary:
          "border-transparent bg-[#0a0a40] text-white [a&]:hover:bg-[#0a0a40]/90 shadow-sm",
        
        // Secondary using gray
        secondary:
          "border-transparent bg-gray-100 text-gray-600 [a&]:hover:bg-gray-200",
        
        // Success variant (enhanced green)
        success:
          "border-transparent bg-green-500 text-white [a&]:hover:bg-green-600 shadow-sm",
        
        // Warning variant
        warning:
          "border-transparent bg-orange-100 text-orange-600 border-orange-200 [a&]:hover:bg-orange-200",
        
        // Info variant (blue)
        info:
          "border-transparent bg-blue-500 text-white [a&]:hover:bg-blue-600 shadow-sm",
        
        // Destructive - keeping original
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 shadow-sm",
        
        // Outline variants with your colors
        outline:
          "text-gray-600 border-gray-200 [a&]:hover:bg-gray-50 [a&]:hover:text-gray-700",
        
        "outline-green":
          "text-[#0F9255] border-[#0F9255]/30 bg-[#0F9255]/5 [a&]:hover:bg-[#0F9255]/10 [a&]:hover:border-[#0F9255]/50",
        
        "outline-blue":
          "text-[#0a0a40] border-[#0a0a40]/30 bg-[#0a0a40]/5 [a&]:hover:bg-[#0a0a40]/10 [a&]:hover:border-[#0a0a40]/50",
        
        "outline-info":
          "text-blue-600 border-blue-200 bg-blue-50 [a&]:hover:bg-blue-100 [a&]:hover:border-blue-300",
        
        "outline-warning":
          "text-orange-600 border-orange-200 bg-orange-50 [a&]:hover:bg-orange-100 [a&]:hover:border-orange-300",
        
        "outline-success":
          "text-green-600 border-green-200 bg-green-50 [a&]:hover:bg-green-100 [a&]:hover:border-green-300",
        
        // Ghost variants (minimal styling)
        ghost:
          "border-transparent text-gray-600 [a&]:hover:bg-gray-100",
        
        "ghost-green":
          "border-transparent text-[#0F9255] [a&]:hover:bg-[#0F9255]/10",
        
        "ghost-blue":
          "border-transparent text-[#0a0a40] [a&]:hover:bg-[#0a0a40]/10",
        
        // Status-specific variants
        published:
          "border-transparent bg-[#0F9255] text-white [a&]:hover:bg-[#0F9255]/90 shadow-sm",
        
        draft:
          "border-transparent bg-gray-100 text-gray-600 [a&]:hover:bg-gray-200",
        
        active:
          "border-transparent bg-blue-500 text-white [a&]:hover:bg-blue-600 shadow-sm",
        
        inactive:
          "border-transparent bg-gray-300 text-gray-600 [a&]:hover:bg-gray-400",
        
        pending:
          "border-transparent bg-yellow-100 text-yellow-700 border-yellow-200 [a&]:hover:bg-yellow-200",
        
        // Size-based enhancements for status
        "status-large":
          "px-3 py-1 text-sm font-semibold rounded-lg border-transparent bg-[#0F9255] text-white [a&]:hover:bg-[#0F9255]/90 shadow-md",
      },
      size: {
        default: "px-2 py-0.5 text-xs",
        sm: "px-1.5 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
        xl: "px-4 py-1.5 text-base font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }