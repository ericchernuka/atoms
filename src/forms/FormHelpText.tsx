import { cx } from "class-variance-authority";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { useFormControlContext } from "./FormControl";

type FormHelperTextElement = ElementRef<"div">;
export interface FormHelperTextProps extends ComponentPropsWithoutRef<"div"> {}

/**
 * FormHelperText
 *
 * Assistive component that conveys additional guidance
 * about the field, such as how it will be used and what
 * types in values should be provided.
 */
export const FormHelperText = forwardRef<
  FormHelperTextElement,
  FormHelperTextProps
>(function FormHelperText(props, ref) {
  const field = useFormControlContext();
  return (
    <div
      {...field?.getHelpTextProps(props, ref)}
      className="text-sm text-gray-500"
    />
  );
});

FormHelperText.displayName = "FormHelperText";
