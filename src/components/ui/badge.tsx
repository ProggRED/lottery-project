import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase",
  {
    variants: {
      variant: {
        default: "bg-primary/15 text-primary",
        muted: "bg-muted text-muted-foreground",
        outline: "shadow-[var(--shadow-border)] text-muted-foreground",
        success: "bg-primary/15 text-primary",
        danger: "bg-destructive/15 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
