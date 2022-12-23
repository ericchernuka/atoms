import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ElementRef, forwardRef, ReactNode } from "react";

/* -------------------------------------------------------------------------------------------------
 * Stack
 * -----------------------------------------------------------------------------------------------*/
const stackClasses = cva("stack", {
  variants: {
    direction: {
      row: "stack-row",
      rowReverse: "flex-row-reverse stack-row-reverse",
      column: "flex-col stack-col",
      columnReverse: "flex-col-reverse stack-col-reverse",
    },
    align: {
      stretch: "items-stretch",
      center: "items-center",
      start: "items-start",
      end: "items-end",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      spaceBetween: "justify-between",
      spaceAround: "justify-around",
      spaceEvenly: "justify-evenly",
    },
    wrap: {
      noWrap: "nowrap",
      wrap: "wrap",
      reverse: "wrap-reverse",
    },
    spacing: {
      none: "stack-space-0",
      extraTight: "stack-space-1",
      tight: "stack-space-2",
      base: "stack-space-4",
      loose: "stack-space-6",
      extraLoose: "stack-space-8",
    },
  },
  defaultVariants: {
    direction: "column",
    spacing: "base",
  },
});

type StackElement = ElementRef<"div">;
interface StackProps extends VariantProps<typeof stackClasses> {
  asChild?: boolean;
  children?: ReactNode;
}

const Stack = forwardRef<StackElement, StackProps>(
  ({ asChild, direction = "column", ...props }, forwardedRef) => {
    const Component = asChild ? Slot : "div";
    return (
      <Component
        {...props}
        className={stackClasses({ direction, ...props })}
        ref={forwardedRef}
      />
    );
  }
);

Stack.displayName = "Stack";

type OrientatedStackProps = Omit<StackProps, "direction">;

/* -------------------------------------------------------------------------------------------------
 * HStack
 * -----------------------------------------------------------------------------------------------*/

const HStack = forwardRef<StackElement, OrientatedStackProps>(
  (props, forwardedRef) => {
    return (
      <Stack align="center" {...props} direction="row" ref={forwardedRef} />
    );
  }
);

HStack.displayName = "HStack";

/* -------------------------------------------------------------------------------------------------
 * VStack
 * -----------------------------------------------------------------------------------------------*/

const VStack = forwardRef<StackElement, OrientatedStackProps>(
  (props, forwardedRef) => {
    return (
      <Stack align="center" {...props} direction="column" ref={forwardedRef} />
    );
  }
);

VStack.displayName = "VStack";

export { Stack, HStack, VStack };
