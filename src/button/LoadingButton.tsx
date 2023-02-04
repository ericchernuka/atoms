/* -------------------------------------------------------------------------------------------------
 * LoadingButton
 * -----------------------------------------------------------------------------------------------*/

import { ElementRef, ComponentPropsWithoutRef, forwardRef } from "react";
import { Button } from "./Button";

type LoadingButtonElement = ElementRef<typeof Button>;
interface LoadingButtonProps
  extends Omit<ComponentPropsWithoutRef<typeof Button>, "overlay"> {
  isLoading?: Boolean;
}

const LoadingButton = forwardRef<LoadingButtonElement, LoadingButtonProps>(
  ({ isLoading, ...props }, forwardedRef) => {
    return (
      <>
        <Button
          {...props}
          ref={forwardedRef}
          disabled={isLoading ? true : props.disabled}
          overlay={isLoading ? <Spinner /> : null}
        />
        {isLoading ? (
          <span aria-atomic="true" aria-live="polite" className="sr-only">
            Loading, please wait.
          </span>
        ) : null}
      </>
    );
  }
);

LoadingButton.displayName = "LoadingButton";

const Spinner = () => {
  return (
    <svg
      className="animate-spin text-current h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export { LoadingButton };
