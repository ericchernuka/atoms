import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ElementRef, forwardRef, ReactNode } from "react";

/* -------------------------------------------------------------------------------------------------
 * Stack
 * -----------------------------------------------------------------------------------------------*/
const stackClasses = cva("stack group", {
  variants: {
    direction: {
      row: "stack-row",
      rowReverse: "stack-row-reverse",
      column: "stack-col",
      columnReverse: "stack-col-reverse",
    },
    spacing: {
      none: "stack-space-0",
      extraTight: "stack-space-1",
      tight: "stack-space-2",
      base: "stack-space-4",
      loose: "stack-space-6",
      extraLoose: "stack-space-8",
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
      noWrap: "flex-nowrap",
      wrap: "flex-wrap",
      reverse: "flex-wrap-reverse",
    },
    shouldFillContainer: {
      true: "w-full",
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
  (
    {
      asChild,
      direction,
      align,
      justify,
      spacing,
      wrap,
      shouldFillContainer,
      ...props
    },
    forwardedRef
  ) => {
    const Component = asChild ? Slot : "div";
    const classNames = stackClasses({
      direction,
      align,
      justify,
      shouldFillContainer,
      spacing,
      wrap,
    });

    return <Component {...props} className={classNames} ref={forwardedRef} />;
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
