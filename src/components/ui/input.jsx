import * as React from "react"

import {cn} from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
    return (
        (<input
            type={type}
            className={cn(
                "rounded-[6px]",
                "flex flex-col p-[5px_8px] flex-grow",
                "bg-white",
                "box-border border border-solid border-[rgba(17,25,37,0.15)]",
                "font-sans text-[14px] font-normal leading-[22px]",
                "flex items-center",
                "text-black",
                "placeholder:text-[rgba(17,25,37,0.3)]",
                "disabled:rounded-[6px] disabled:opacity-100",
                "disabled:flex disabled:flex-col disabled:p-[5px_8px] disabled:flex-grow",
                "disabled:bg-[rgba(17,25,37,0.05)]",
                "disabled:box-border disabled:border disabled:border-solid disabled:border-[rgba(17,25,37,0.15)]",
                "disabled:cursor-not-allowed",
                "focus:border-[rgb(22,111,247)] focus:outline-none focus:ring-0",
                "hover:border-[rgb(22,111,247)]",
                "disabled:bg-[rgba(17,25,37,0.05)]", // 添加这一行
                "-webkit-font-smoothing-antialiased",
                className
            )}
            ref={ref}
            {...props} />)
    );
})
Input.displayName = "Input"

export { Input }
