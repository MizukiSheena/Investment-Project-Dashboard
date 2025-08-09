import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef(
  ({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />
)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center break-words text-sm text-muted-foreground",
      className
    )}
    {...props} />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center", className)}
    {...props} />
))

BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef(({ asChild, className, disabled, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <div className={cn("relative group inline-block", disabled && "pointer-events-none")}>
      <Comp
        ref={ref}
        className={cn(
          "inline-block h-[14pt] opacity-100",
          "font-['PingFang_SC'] text-sm font-normal leading-[14pt] text-center",
          "transition-colors",
          disabled
            ? "text-[rgba(17,25,37,0.3)]"
            : "px-1 text-[rgba(17,25,37,0.65)] hover:text-[#111925]",
          className
        )}
        {...props}
      />
      {!disabled && (
        <div className="absolute left-1 right-1 bottom-0 h-[1px] bg-[#111925] opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </div>
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative group inline-block">
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn(
        "inline-block h-[14pt] opacity-100",
        "font-['PingFang_SC'] text-sm font-normal leading-[14pt] text-center",
        "text-[#111925] px-1",
        className
      )}
      {...props}
    />
    <div className="absolute left-1 right-1 bottom-0 h-[1px] bg-[#111925] opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  className,
  ...props
}) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("flex items-center justify-center w-4 h-4 mx-0.25", className)}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="none"
      version="1.1"
      width="5.6"
      height="12"
      viewBox="0 0 5.596803665161133 12"
    >
      <g>
        <path
          d="M4.5968,0L5.5968,0L1,12L0,12L4.5968,0Z"
          fillRule="evenodd"
          fill="#111925"
          fillOpacity="0.30000001192092896"
        />
      </g>
    </svg>
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
