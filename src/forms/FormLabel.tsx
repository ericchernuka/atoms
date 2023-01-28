import clsx from "clsx";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { useFormControlContext } from "./FormControl";

type FormErrorMessageElement = ElementRef<"label">;

export interface FormLabelProps extends ComponentPropsWithoutRef<"label"> {
  /**
   * @type React.ReactElement
   */
  requiredIndicator?: React.ReactElement;
  /**
   * @type React.ReactNode
   */
  optionalIndicator?: React.ReactNode;
}

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
    const {
      className,
      children,
      requiredIndicator = <RequiredIndicator />,
      optionalIndicator = null,
      ...rest
    } = props;

    const field = useFormControlContext();
    const ownProps = field?.getLabelProps(rest, ref) ?? { ref, ...rest };

    return (
      <label
        {...ownProps}
        className={clsx("block text-start", props.className)}
      >
        {children}
        {field?.isRequired ? requiredIndicator : optionalIndicator}
      </label>
    );
  }
);

FormLabel.displayName = "FormLabel";

type RequiredIndicatorElement = ElementRef<"span">;
export interface RequiredIndicatorProps
  extends ComponentPropsWithoutRef<"span"> {}

/**
 * Used to show a "required" text or an asterisks (*) to indicate that
 * a field is required.
 */
export const RequiredIndicator = forwardRef<
  RequiredIndicatorElement,
  RequiredIndicatorProps
>(function RequiredIndicator(props, ref) {
  const field = useFormControlContext();

  if (!field?.isRequired) return null;

  return (
    <span
      {...field?.getRequiredIndicatorProps(props, ref)}
      className={props.className}
    />
  );
});

RequiredIndicator.displayName = "RequiredIndicator";
