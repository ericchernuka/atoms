import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { inputClasses } from "../shared-utils/design";

/* -------------------------------------------------------------------------------------------------
 * Input
 * -----------------------------------------------------------------------------------------------*/
type InputElement = ElementRef<"input">;
interface InputProps extends ComponentPropsWithoutRef<"input"> {
  hasErrors?: boolean;
}

const Input = forwardRef<InputElement, InputProps>(
  ({ hasErrors, className, ...props }, forwardedRef) => {
    return (
      <input
        {...props}
        className={inputClasses("form-input truncate", className)}
        ref={forwardedRef}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
