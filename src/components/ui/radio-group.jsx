import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import {cn} from "@/lib/utils"

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Root
            className={cn("grid gap-2", className)}
            {...props}
            ref={ref}
        />
    )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <RadioGroupPrimitive.Item
            ref={ref}
            className={cn(
                "box-border text-[rgb(17,25,37)] cursor-pointer block flex-none h-[14px] w-[14px] leading-[12px] relative text-left align-middle",
                "rounded-full border border-[rgba(17,25,37,0.15)] bg-white",
                "text-xs font-normal font-sans antialiased",
                "transition-all duration-500 ease-in-out",
                "hover:border-[rgba(22,111,247,1)]",
                "data-[state=checked]:bg-[rgb(22,111,247)] data-[state=checked]:border-[rgb(22,111,247)]",
                className
            )}
            {...props}
        >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
            </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
    )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
