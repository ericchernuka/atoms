import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import * as React from "react";

/* -------------------------------------------------------------------------------------------------
 * Text
 * -----------------------------------------------------------------------------------------------*/

const textClassBuilder = cva("transition-colors ease-in-out duration-300", {
  variants: {
    intent: {
      critical: "text-red-700",
      positive: "text-green-700",
      subdued: "text-gray-400",
      default: "text-gray-900",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg",
      xl: "text-xl",
    },
    transform: {
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
    },
    wordBreak: {
      normal: "normal",
      breakAll: "break-all",
      breakWords: "break-words",
    },
    truncate: {
      true: "truncate",
    },
    underline: {
      true: "underline",
    },
  },
});

const ELEMENT = "span" as const;

type TextElement = React.ElementRef<typeof ELEMENT>;

interface TextProps extends VariantProps<typeof textClassBuilder> {
  asChild?: boolean;
  children?: React.ReactNode;
  id?: string;
}

const Text = React.forwardRef<TextElement, TextProps>(
  ({ asChild, ...props }, forwardedRef) => {
    const Component = asChild ? Slot : ELEMENT;
    return (
      <Component
        {...props}
        className={textClassBuilder(props)}
        ref={forwardedRef}
      />
    );
  }
);

Text.displayName = "Text";

/* -------------------------------------------------------------------------------------------------
 * Text2
 * -----------------------------------------------------------------------------------------------*/
type Element =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "legend";

interface Text2Props extends VariantProps<typeof textClassBuilder> {
  as?: Element;
  children?: React.ReactNode;
  id?: string;
}

const Text2 = ({ as, ...props }: Text2Props) => {
  const Component = as || ELEMENT;
  return <Component {...props} className={textClassBuilder(props)} />;
};

export { Text, Text2 };
