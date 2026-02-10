"use client";
import * as React from "react";

type Variant =
  | "default"
  | "primary"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link"
  | "medical"
  | "secure";

type Size = "sm" | "md" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

/**
 * Properly typed Slot fallback (Radix-style)
 */
function Slot({
  children,
  ...rest
}: React.HTMLAttributes<HTMLElement> & { children: React.ReactNode }) {
  if (React.isValidElement(children)) {
    // 👇 tell TS the child supports className
    const child = children as React.ReactElement<{ className?: string }>;

    const incomingClass = (rest as any).className ?? "";
    const childClass = child.props.className ?? "";

    const mergedClass = [childClass, incomingClass]
      .filter(Boolean)
      .join(" ")
      .trim();

    return React.cloneElement(child, {
      ...child.props,
      ...rest,
      className: mergedClass || undefined,
    });
  }
  return <>{children}</>;
}

/** Variant styles */
const VARIANT_CLASSES: Record<Variant, string> = {
  default: "bg-green-500 text-white hover:bg-green-400",
  primary: "bg-green-500 text-white hover:bg-green-400",
  destructive: "bg-red-500 text-white hover:bg-red-400",
  outline: "bg-white border border-gray-200 hover:bg-gray-50 text-gray-800",
  secondary: "bg-blue-600 text-white hover:bg-blue-700",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-800",
  link: "bg-transparent underline text-green-500 hover:text-green-400",
  medical: "bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md hover:opacity-95",
  secure: "bg-slate-800 text-white hover:bg-slate-700 border border-slate-600",
};

/** Size styles */
const SIZE_CLASSES: Record<Size, string> = {
  sm: "h-9 rounded-md px-3 text-sm",
  md: "h-10 rounded-md px-4 text-base",
  lg: "h-11 rounded-md px-6 text-base",
  icon: "h-10 w-10 p-0 inline-flex items-center justify-center",
};

/** FIX: allow function to be called with zero args */
export function buttonVariants(options?: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const {
    variant = "default",
    size = "md",
    className = "",
  } = options || {};

  const base =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  return [
    base,
    VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.default,
    SIZE_CLASSES[size] ?? SIZE_CLASSES.md,
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      className = "",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp: any = asChild ? Slot : "button";
    const classes = buttonVariants({ variant, size, className });

    return (
      <Comp ref={ref} className={classes} {...props}>
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button };
