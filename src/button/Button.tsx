/* -------------------------------------------------------------------------------------------------
 * Button
 * -----------------------------------------------------------------------------------------------*/

import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactNode,
} from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

type IconReference = typeof XMarkIcon;

const buttonClasses = cva(
  [
    "inline-flex justify-center items-center rounded-md border border-transparent text-sm font-medium shadow-sm transition-all duration-300 relative",
    "focus:ring-focused focus:outline-none focus:ring-2 focus:ring-offset-2",
    "aria-[disabled=true]:opacity-75 aria-[disabled=true]:cursor-wait",
  ],
  {
    variants: {
      intent: {
        primary: "bg-action-primary hover:bg-action-primary-hovered text-white",
        secondary: "bg-white text-gray-800 border-gray-400 hover:bg-gray-100",
        tertiary: "bg-transparent hover:bg-gray-200 text-gray-900",
      },
      size: {
        xs: "rounded px-2.5 py-1.5 text-xs shadow-sm",
        sm: "rounded-md px-3 py-2 text-sm leading-4 shadow-sm",
        base: "rounded-md px-4 py-2 text-sm shadow-sm",
        lg: "rounded-md px-4 py-2 text-base shadow-sm",
        xl: "rounded-md px-6 py-3 text-base shadow-sm",
      },
      shouldFillContainer: {
        true: "w-full",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "lg",
    },
  }
);

type ButtonElement = ElementRef<"button">;
interface ButtonProps
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof buttonClasses> {
  busy?: boolean;
  icon?: IconReference;
  overlay?: ReactNode;
  shouldFillContainer?: boolean;
}

const Button = forwardRef<ButtonElement, ButtonProps>(
  (
    {
      icon: Icon,
      busy = false,
      className: _,
      children,
      disabled = false,
      overlay,
      shouldFillContainer,
      type = "button",
      ...props
    },
    forwardedRef
  ) => {
    const hasOverlay = Boolean(overlay);
    const isDisabled = disabled || busy;

    return (
      <button
        type={type}
        {...props}
        aria-disabled={isDisabled}
        data-has-overlay={hasOverlay ? true : undefined}
        className={buttonClasses({ shouldFillContainer, ...props })}
        onClick={(event) => {
          const ariaDisabled =
            event.currentTarget.getAttribute("aria-disabled");

          if (ariaDisabled !== null && ariaDisabled !== "false") {
            event.preventDefault();
            event.stopPropagation();
            return;
          }

          props.onClick?.(event);
        }}
        ref={forwardedRef}
      >
        {children ? (
          <ContentWrapper className={fadeClasses({ hasOverlay })}>
            {children}
          </ContentWrapper>
        ) : null}
        {Icon ? (
          <IconWrapper
            className={clsx(fadeClasses({ hasOverlay }), children && "ml-2")}
          >
            <Icon className="w-full h-full" />
          </IconWrapper>
        ) : null}
        {overlay ? <OverlayWrapper>{overlay}</OverlayWrapper> : null}
      </button>
    );
  }
);

const fadeClasses = ({ hasOverlay }: { hasOverlay: boolean }) =>
  clsx("will-change-contents", hasOverlay ? "opacity-0" : "opacity-100");

const ContentWrapper = (props: ComponentProps<"span">) => (
  <span {...props} className={clsx("", props.className)} />
);

const IconWrapper = (props: ComponentProps<"span">) => (
  <span
    {...props}
    className={clsx("h-4 w-4 flex-grow-0 flex-shrink-0", props.className)}
    aria-hidden="true"
  />
);

const OverlayWrapper = (props: ComponentProps<"span">) => (
  <span
    {...props}
    className={clsx(
      "absolute inset-0 flex justify-center items-center",
      props.className
    )}
  />
);

Button.displayName = "Button";

export { Button };
