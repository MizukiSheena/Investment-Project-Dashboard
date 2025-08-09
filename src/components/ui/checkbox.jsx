import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer w-[16px] h-[16px] rounded-[4px] opacity-100 bg-white border border-[rgba(17,25,37,0.15)] box-border shrink-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#166FF7] data-[state=checked]:text-white data-[state=checked]:border-[#166FF7] hover:border-[#166FF7]",
      className
    )}
    {...props}>
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current w-full h-full")}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 11.314 8.347"
                className="w-[70.71%] h-[52.17%]"
                preserveAspectRatio="xMidYMid meet"
            >
                <path
                    fillRule="evenodd"
                    fill="currentColor"
                    d="M10.607.707a1 1 0 010 1.414L4.478 8.25a.5.5 0 01-.707 0L.707 4.95a1 1 0 011.414-1.414l2.122 2.121L9.192.707a1 1 0 011.415 0z"
                />
            </svg>
        </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
