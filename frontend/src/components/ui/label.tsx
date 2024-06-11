import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-gray-800 flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants> & { errMsg?: string; required?: boolean }
>(({ className, errMsg, ...props }, ref) => (
  <>
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
    {errMsg && (
      <p className="text-red-400 !mt-0 text-xs text-end mr-2">{errMsg}</p>
    )}
  </>
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
