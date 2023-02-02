import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

/* -------------------------------------------------------------------------------------------------
 * Card
 * -----------------------------------------------------------------------------------------------*/
const cardClassBuilder = cva("overflow-hidden bg-white shadow", {
  variants: {
    divided: {
      true: "divide-y divide-gray-200",
    },
    shouldFillContainerOnMobile: {
      true: "sm:rounded-md",
      false: "rounded-md",
    },
  },
  defaultVariants: {
    shouldFillContainerOnMobile: false,
  },
});

type CardElement = React.ElementRef<"div">;

type CardElementProps = Pick<React.ComponentPropsWithoutRef<"div">, "children">;
interface CardProps
  extends CardElementProps,
    VariantProps<typeof cardClassBuilder> {
  asChild?: boolean;
}

const Card = React.forwardRef<CardElement, CardProps>(
  (
    { asChild, shouldFillContainerOnMobile, divided, ...props },
    forwardedRef
  ) => {
    const Component = asChild ? Slot : "div";
    const classNames = cardClassBuilder({
      shouldFillContainerOnMobile,
      divided,
    });

    return <Component {...props} className={classNames} ref={forwardedRef} />;
  }
);

Card.displayName = "Card";

/* -------------------------------------------------------------------------------------------------
 * CardContent
 * -----------------------------------------------------------------------------------------------*/

const cardContentClassBuilder = cva(null, {
  variants: {
    inset: {
      none: "p-0",
      condensed: "py-4 px-4 sm:px-6",
      base: "py-5 px-4 sm:px-6",
    },
  },
  defaultVariants: {
    inset: "base",
  },
});

type CardContentElement = React.ElementRef<"div">;

type CardContentElementProps = Pick<
  React.ComponentPropsWithoutRef<"div">,
  "children"
>;

interface CardContentProps
  extends CardContentElementProps,
    VariantProps<typeof cardContentClassBuilder> {
  asChild?: boolean;
}

const CardContent = React.forwardRef<CardContentElement, CardContentProps>(
  ({ asChild, inset: intent, ...props }, forwardedRef) => {
    const Component = asChild ? Slot : "div";
    const classNames = cardContentClassBuilder({ inset: intent });

    return <Component {...props} className={classNames} ref={forwardedRef} />;
  }
);

/* -------------------------------------------------------------------------------------------------
 * CardHeader
 * -----------------------------------------------------------------------------------------------*/

type CardHeaderElement = React.ElementRef<"div">;
interface CardHeaderProps extends Omit<CardContentProps, "intent"> {}

const CardHeader = React.forwardRef<CardHeaderElement, CardHeaderProps>(
  (props, forwardedRef) => {
    return <CardContent {...props} inset="base" ref={forwardedRef} />;
  }
);

CardHeader.displayName = "CardHeader";

/* -------------------------------------------------------------------------------------------------
 * CardFooter
 * -----------------------------------------------------------------------------------------------*/

type CardFooterElement = React.ElementRef<"div">;
interface CardFooterProps extends Omit<CardContentProps, "intent"> {}

const CardFooter = React.forwardRef<CardFooterElement, CardFooterProps>(
  (props, forwardedRef) => {
    return <CardContent {...props} inset="condensed" ref={forwardedRef} />;
  }
);

CardFooter.displayName = "CardFooter";

const Root = Card;
const Header = CardHeader;
const Content = CardContent;
const Footer = CardFooter;

export {
  Card,
  Content,
  Footer,
  Header,
  //
  Root,
  CardContent,
  CardHeader,
  CardFooter,
};
