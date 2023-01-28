import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

/* -------------------------------------------------------------------------------------------------
 * Input
 * -----------------------------------------------------------------------------------------------*/
type InputElement = ElementRef<"input">;
interface InputProps extends ComponentPropsWithoutRef<"input"> {
  hasErrors?: boolean;
}

const Input = forwardRef<InputElement, InputProps>(
  ({ hasErrors, ...props }, forwardedRef) => {
    return (
      <input
        {...props}
        className={clsx(
          "relative px-2 var-spacing-2 w-full form-input rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm truncate transition-colors duration-200 ease-in-out",
          "disabled:bg-gray-200",
          "read-only:bg-white",
          hasErrors && "border-red-400"
        )}
        ref={forwardedRef}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
