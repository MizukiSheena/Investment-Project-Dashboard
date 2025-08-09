import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "rounded-[6px] opacity-100 flex flex-row justify-center items-center  gap-[4px] bg-[#166FF7] text-white hover:bg-[#468DFB] active:bg-[#0E65E8]",
                destructive:
                    "rounded-[6px] opacity-100 flex flex-row justify-center items-center  gap-[4px] bg-[#FF1F1F]  font-['PingFang_SC'] text-[14px] font-medium leading-[22px] tracking-[0px] text-white hover:bg-[#ff4040] active:bg-[#f01d1d]",
                outline:
                    "rounded-[6px] opacity-100 flex flex-row justify-center items-center  gap-[4px] bg-white border border-[rgba(17,25,37,0.15)] box-border font-['PingFang_SC'] text-[14px] font-medium leading-[22px] tracking-[0px] text-[#111925] hover:bg-[rgba(17,25,37,0.03)] active:bg-[rgba(17,25,37,0.1)]",
                secondary:
                    "rounded-[6px] opacity-100 flex flex-row justify-center items-center  gap-[4px] bg-[rgba(17,37,37,0.05)]  hover:bg-[rgba(17,25,37,0.03)] active:bg-[rgba(17,25,37,0.1)]",
                ghost: "opacity-100 font-['PingFang_SC'] text-[14px] font-normal leading-[22px] tracking-[0em] text-[#111925] rounded-[6px] flex flex-row justify-center items-center  gap-[4px] hover:bg-[rgba(17,25,37,0.03)] active:bg-[rgba(17,25,37,0.1)] disabled:text-[rgba(17,25,37,0.3)] disabled:bg-transparent",
                link:  "opacity-100 font-['PingFang_SC'] text-[14px] font-normal leading-[22px] tracking-[0em] text-[#166FF7]  hover:text-[#468DFB] active:text-[#0E65E8]",

            },
            size: {
                default: "h-8 px-4 py-2",
                sm: "h-6 rounded-md px-3",
                lg: "h-10 rounded-md px-8",
                icon: "h-8 w-8",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
        (<Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props} />)
    );
})
Button.displayName = "Button"

export { Button, buttonVariants }
