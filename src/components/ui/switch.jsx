import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex w-[44px] h-[24px] shrink-0 cursor-pointer items-center rounded-[13px] border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "data-[state=unchecked]:bg-[rgba(17,25,37,0.15)] data-[state=unchecked]:hover:bg-[rgba(17,25,37,0.3)] data-[state=unchecked]:active:bg-[rgba(17,25,37,0.3)]",
      "data-[state=checked]:bg-[#166FF7] data-[state=checked]:hover:bg-[#468DFB] data-[state=checked]:active:bg-[#0E65E8]",
      "disabled:cursor-not-allowed disabled:opacity-100 disabled:bg-[rgba(17,25,37,0.05)] disabled:hover:bg-[rgba(17,25,37,0.05)] disabled:active:bg-[rgba(17,25,37,0.05)]",
      "disabled:data-[state=unchecked]:bg-[rgba(17,25,37,0.05)] disabled:data-[state=unchecked]:hover:bg-[rgba(17,25,37,0.05)] disabled:data-[state=unchecked]:active:bg-[rgba(17,25,37,0.05)]",
      "disabled:data-[state=checked]:bg-[rgba(17,25,37,0.05)] disabled:data-[state=checked]:hover:bg-[rgba(17,25,37,0.05)] disabled:data-[state=checked]:active:bg-[rgba(17,25,37,0.05)]",
      className
    )}
    {...props}
    ref={ref}>
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block w-[20px] h-[20px] rounded-full bg-white shadow-[0px_2px_6px_0px_rgba(0,0,0,0.08)] ring-0 transition-transform data-[state=checked]:translate-x-[22px] data-[state=unchecked]:translate-x-[2px]"

      )} />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
