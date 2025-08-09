import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
    <TabsPrimitive.List
        ref={ref}
        className={cn(
            "inline-flex h-[32px] items-start justify-start rounded-sm bg-transparent p-0",
            "space-x-6",
            "relative w-full", // 添加这行，使组件宽度为100%
            "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[rgba(17,25,37,0.1)]", // 添加这行，创建下划线
            className
        )}
        {...props} />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "relative py-1.5 px-0",
      "data-[state=active]:text-[#166FF7] data-[state=active]:font-medium",
      "text-[rgba(17,25,37,0.85)] font-normal",
      "hover:text-[#166FF7] hover:font-normal",
      "disabled:opacity-30 disabled:text-[rgba(17,25,37,0.3)]",
      "after:absolute after:bottom-[-1px] after:left-0 after:h-[2px] after:bg-[#166FF7]",
      "after:w-full",
        "data-[state=active]:after:translate-x-0",
        "data-[state=inactive]:after:transform data-[state=inactive]:after:scale-x-0 data-[state=inactive]:after:transition-none", // 修改这行
        className
    )}
    {...props} />
))

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
    <TabsPrimitive.Content
        ref={ref}
        className={cn(
            "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "text-[14px] font-normal leading-[22px] text-[rgba(17,25,37,0.85)] font-sans",
            className
        )}
        {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
