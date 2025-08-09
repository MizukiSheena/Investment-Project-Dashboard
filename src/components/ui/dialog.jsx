import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "font-sans fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
    )}
    {...props} />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                "font-sans fixed left-[50%] top-[50%] z-50 grid w-[400px] translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
                "[&>div:not(:first-child):not(:last-child)]:my-3",
                className
            )}
            {...props}>
            {children}
        </DialogPrimitive.Content>
    </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("font-sans flex flex-col text-center sm:text-left", className)}
    {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn("font-sans flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
    <div className="flex flex-row items-center justify-between w-full relative pb-3">
      <DialogPrimitive.Title
          ref={ref}
          className={cn(
              "font-sans text-lg leading-none tracking-tight",
              "h-[26px] opacity-100",
              "flex flex-row p-0 gap-2 self-stretch",
              className
          )}
          {...props} />
      <DialogPrimitive.Close
          className="absolute top-0 right-0 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground active:bg-[#f3f3f4] hover:bg-[#f3f3f4]">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="18" height="18" viewBox="0 0 20 20">
          <g>
            <g>
              <path d="M15.5994078125,3.51655409375C15.7166078125,3.39934189375,15.8756078125,3.33349609375,16.0413078125,3.33349609375C16.3865078125,3.33349609375,16.6663078125,3.61331709375,16.6663078125,3.95849609375C16.6663078125,4.12425409375,16.6005078125,4.28322909375,16.483207812499998,4.40056609375L10.8835478125,10.00016609375L16.4833078125,15.59989609375C16.6005078125,15.71709609375,16.6663078125,15.87609609375,16.6663078125,16.04179609375C16.6663078125,16.38699609375,16.3865078125,16.66679609375,16.0413078125,16.66679609375C15.8756078125,16.66679609375,15.7166078125,16.60099609375,15.5994078125,16.48379609375L9.9996778125,10.88403609375L4.3999478125,16.48379609375C4.2827408125,16.60099609375,4.1237658125,16.66679609375,3.9580078125,16.66679609375C3.6128288125,16.66679609375,3.333007961512,16.38699609375,3.333007961512,16.04179609375C3.333007961512,15.87609609375,3.3988579125,15.71709609375,3.5160658125,15.59989609375L3.5165958125,15.59939609375L9.1157978125,10.00016609375L3.5160668125,4.40043609375C3.3988539125,4.28322909375,3.333008060853,4.12425409375,3.333008060853,3.95849609375C3.333008060853,3.61331709375,3.6128288125,3.333496242762,3.9580078125,3.333496242762C4.1237668124999995,3.333496242762,4.2827418125,3.39934209375,4.4000778125,3.51668409375L9.9996778125,9.11628609375L15.5994078125,3.51655409375Z" fill="#111925" fill-opacity="1"/>
            </g>
          </g>
        </svg>
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </div>
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground font-sans", className)}
    {...props} />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
