import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-[background-color,color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border border-amber-600/25 bg-wood-texture text-on-wood shadow-sm hover:brightness-95 active:brightness-90",
        destructive: "bg-error text-ink-50 hover:bg-error/90",
        outline:
          "border-2 border-ink-900 bg-transparent text-ink-900 hover:bg-ink-900 hover:text-ink-50",
        secondary: "bg-ink-100 text-ink-900 hover:bg-ink-100/80",
        ghost: "text-ink-900 hover:bg-ink-100",
        link: "text-amber-700 underline-offset-4 hover:text-amber-800 hover:underline",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        default: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-sm",
        xl: "h-14 px-8 text-lg",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
