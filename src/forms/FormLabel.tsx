import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { useFormControlContext } from "./FormControl";

type FormErrorMessageElement = ElementRef<"label">;

export interface FormLabelProps extends ComponentPropsWithoutRef<"label"> {}

/**
 * Used to enhance the usability of form controls.
 *
 * It is used to inform users as to what information
 * is requested for a form field.
 *
 * ♿️ Accessibility: Every form field should have a form label.
 */
export const FormLabel = forwardRef<FormErrorMessageElement, FormLabelProps>(
  function FormLabel(props, ref) {
    const { className, children, ...rest } = props;

    const field = useFormControlContext();
    const ownProps = field?.getLabelProps(rest, ref) ?? { ref, ...rest };
    const optionalIndicator = field?.required ? null : (
      <span className="text-gray-500">(optional)</span>
    );
    return (
      <label
        {...ownProps}
        className={clsx(
          "block text-start font-medium sm:text-sm space-x-1",
          props.className
        )}
      >
        <span>{children}</span>
        {optionalIndicator}
      </label>
    );
  }
);

FormLabel.displayName = "FormLabel";
