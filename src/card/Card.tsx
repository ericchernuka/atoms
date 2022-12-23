import { Slot } from "@radix-ui/react-slot";
import { cva, cx, VariantProps } from "class-variance-authority";
import { ElementRef, ComponentPropsWithoutRef, forwardRef } from "react";

/* -------------------------------------------------------------------------------------------------
 * Card
 * -----------------------------------------------------------------------------------------------*/

type CardElement = ElementRef<"div">;
interface CardProps extends ComponentPropsWithoutRef<"div"> {
  asChild?: boolean;
}

const Card = forwardRef<CardElement, CardProps>(
  ({ asChild, ...props }, forwardedRef) => {
    const Component = asChild ? Slot : "div";
    return (
      <Component
        {...props}
        className="rounded-md overflow-hidden border border-gray-300 divide-y divide-gray-300"
        ref={forwardedRef}
      />
    );
  }
);

Card.displayName = "Card";

/* -------------------------------------------------------------------------------------------------
 * CardItemRow
 * -----------------------------------------------------------------------------------------------*/

type CardItemRowElement = ElementRef<"div">;

const cardItemRowClasses = cva("transition", {
  variants: {
    flush: {
      true: "p-0",
      false: "p-4",
    },
  },
  defaultVariants: {
    flush: false,
  },
});
interface CardItemRowProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof cardItemRowClasses> {
  asChild?: boolean;
}

const CardItemRow = forwardRef<CardItemRowElement, CardItemRowProps>(
  ({ asChild, className, ...props }, forwardedRef) => {
    const Component = asChild ? Slot : "div";
    return (
      <Component
        {...props}
        className={cx(className, cardItemRowClasses(props))}
        ref={forwardedRef}
      />
    );
  }
);

CardItemRow.displayName = "CardItemRow";

export { Card, CardItemRow };
