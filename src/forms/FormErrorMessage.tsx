import clsx from "clsx";
import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import { useFormControlContext } from "./FormControl";

type FormErrorMessageElement = ElementRef<"div">;

export interface FormErrorMessageProps
  extends ComponentPropsWithoutRef<"div"> {}

/**
 * Used to provide feedback about an invalid input,
 * and suggest clear instructions on how to fix it.
 */
export const FormErrorMessage = forwardRef<
  FormErrorMessageElement,
  FormErrorMessageProps
>((props, ref) => {
  const field = useFormControlContext();

  if (!field?.isInvalid) return null;

  return (
    <div
      {...field?.getErrorMessageProps(props, ref)}
      className={clsx(
        "text-red-500 sm:text-sm flex items-center",
        props.className
      )}
    />
  );
});

FormErrorMessage.displayName = "FormErrorMessage";
