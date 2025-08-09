import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button";

const Pagination = ({
  className,
  ...props
}) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props} />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-2", className)}
    {...props} />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  disabled,
  ...props
}) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "w-8 h-8 rounded-[6px] opacity-100 flex flex-row justify-center font-sans items-center p-2",
      "border border-[rgba(17,25,37,0.15)] text-black",
      "hover:border-[#468DFB] hover:text-[#468DFB]",
      "active:border-[#0E65E8] active:text-[#0E65E8]",
      "focus:border-[#166FF7] focus:text-[#166FF7]",
      disabled && "pointer-events-none opacity-50 border-[rgba(17,25,37,0.15)] text-[rgba(17,25,37,0.15)]",
      isActive && "border-[#166FF7] text-[#166FF7]",
      className
    )}
    disabled={disabled}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  disabled,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn(
      "w-8 h-8 rounded-[6px] opacity-100 flex flex-row justify-center items-center p-2",
      "border border-[rgba(17,25,37,0.15)] text-black",
      "hover:border-[#468DFB] hover:text-[#468DFB]",
      "active:border-[#0E65E8] active:text-[#0E65E8]",
      "focus:border-[#166FF7] focus:text-[#166FF7]",
      disabled && "pointer-events-none opacity-50 border-[rgba(17,25,37,0.15)] text-[rgba(17,25,37,0.15)]",
      className
    )}
    disabled={disabled}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="4.3"
      height="7.6"
      viewBox="0 0 4.29983171068269 7.599662961986058"
      className="current-color"
    >
      <g transform="matrix(-1,-4.214684778958144e-8,-4.214684778958144e-8,1,8.599663421365388,1.812243526309589e-7)">
        <path
          d="M5.1533847106826896,0.14644718122433953L8.45322171068269,3.4462801812243393C8.64848171068269,3.6415401812243395,8.64848171068269,3.9581201812243396,8.45322171068269,4.15338018122434L5.15338571068269,7.4532201812243395C4.95812371068269,7.64848018122434,4.64154071068269,7.64848018122434,4.44627871068269,7.4532201812243395C4.25101611068269,7.25795018122434,4.25101681068269,6.94137018122434,4.44627871068269,6.746110181224339L7.39255171068269,3.7998301812243396L4.44627871068269,0.8535531812243395C4.25101611068269,0.6582911812243395,4.25101611068269,0.3417091812243395,4.44627771068269,0.14644718122433953C4.64154071068269,-0.04881551877566046,4.95812271068269,-0.04881521877566047,5.1533847106826896,0.14644718122433953Z"
          fillRule="evenodd"
          fill="currentColor"
        />
      </g>
    </svg>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  disabled,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn(
      "w-8 h-8 rounded-[6px] opacity-100 flex flex-row justify-center items-center p-2",
      "border border-[rgba(17,25,37,0.15)] text-black",
      "hover:border-[#468DFB] hover:text-[#468DFB]",
      "active:border-[#0E65E8] active:text-[#0E65E8]",
      "focus:border-[#166FF7] focus:text-[#166FF7]",
      disabled && "pointer-events-none opacity-50 border-[rgba(17,25,37,0.15)] text-[rgba(17,25,37,0.15)]",
      className
    )}
    disabled={disabled}
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width="4.3"
      height="7.6"
      viewBox="0 0 4.299831710682689 7.599662961986058"
      className="current-color"
    >
      <g transform="matrix(1,-4.214684778958144e-8,4.214684778958144e-8,1,-7.638034654146355e-15,0)">
        <path
          d="M0.853553,0.14644718122433953L4.15339,3.4462801812243393C4.34865,3.6415401812243395,4.34865,3.9581201812243396,4.15339,4.15338018122434L0.853554,7.4532201812243395C0.658292,7.64848018122434,0.341709,7.64848018122434,0.146447,7.4532201812243395C-0.0488156,7.25795018122434,-0.0488149,6.94137018122434,0.146447,6.746110181224339L3.09272,3.7998301812243396L0.146447,0.8535531812243395C-0.0488156,0.6582911812243395,-0.0488156,0.3417091812243395,0.146446,0.14644718122433953C0.341709,-0.04881551877566046,0.658291,-0.04881521877566047,0.853553,0.14644718122433953Z"
          fillRule="evenodd"
          fill="currentColor"
        />
      </g>
    </svg>
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}>
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
