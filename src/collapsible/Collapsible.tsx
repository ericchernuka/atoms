import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import clsx from "clsx";
import { ElementRef, ComponentPropsWithoutRef, forwardRef } from "react";
/* -------------------------------------------------------------------------------------------------
 * Collapsible
 * -----------------------------------------------------------------------------------------------*/

type CollapsibleElement = ElementRef<typeof CollapsiblePrimitive.Root>;
interface CollapsibleProps
  extends ComponentPropsWithoutRef<typeof CollapsiblePrimitive.Root> {}

const Collapsible = forwardRef<CollapsibleElement, CollapsibleProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <CollapsiblePrimitive.Content
        {...props}
        className={clsx(
          className,
          "overflow-hidden radix-state-open:animate-slide-down radix-state-closed:animate-slide-up"
        )}
        ref={forwardedRef}
      />
    );
  }
);

Collapsible.displayName = "Collapsible";

export const CollapsibleTrigger = CollapsiblePrimitive.Trigger;
export const CollapsibleRoot = CollapsiblePrimitive.Root;

export {
  CollapsibleRoot as Root,
  Collapsible as Content,
  CollapsibleTrigger as Trigger,
};
