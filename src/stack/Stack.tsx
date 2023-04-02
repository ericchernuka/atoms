import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ElementRef, forwardRef, ReactNode } from "react";

/* -------------------------------------------------------------------------------------------------
 * Stack
 * -----------------------------------------------------------------------------------------------*/
const stackClasses = cva(
  "flex [--stack-spacing:theme(spacing.4)] gap-[var(--stack-spacing)]",
  {
    variants: {
      direction: {
        row: "flex-row",
        rowReverse: "flex-row-reverse",
        column: "flex-col",
        columnReverse: "flex-col-reverse",
      },
      spacing: {
        none: "[--stack-spacing:theme(spacing.0)]",
        extraTight: "[--stack-spacing:theme(spacing.1)]",
        tight: "[--stack-spacing:theme(spacing.2)]",
        base: "[--stack-spacing:theme(spacing.4)]",
        loose: "[--stack-spacing:theme(spacing.6)]",
        extraLoose: "[--stack-spacing:theme(spacing.8)]",
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
  }
);

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
