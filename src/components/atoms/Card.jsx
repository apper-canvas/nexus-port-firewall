import React from "react"
import { cn } from "@/utils/cn"

const Card = React.forwardRef(({ 
  className, 
  variant = "default",
  hover = false,
  children, 
  ...props 
}, ref) => {
  const baseClasses = "bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-200"
  
  const variants = {
    default: "p-6",
    compact: "p-4",
    none: ""
  }
  
  const hoverClasses = hover ? "card-hover cursor-pointer" : ""
  
  return (
    <div
      className={cn(
        baseClasses,
        variants[variant],
        hoverClasses,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card