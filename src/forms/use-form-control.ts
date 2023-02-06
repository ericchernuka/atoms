import { ariaAttr } from "../shared-utils";
import { FormControlOptions, useFormControlContext } from "./FormControl";

export interface UseFormControlProps<T extends HTMLElement>
  extends FormControlOptions {
  id?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  "aria-describedby"?: string;
}

/**
 * React hook that provides the props that should be spread on to
 * input fields (`input`, `select`, `textarea`, etc.).
 *
 * It provides a convenient way to control a form fields, validation
 * and helper text.
 *
 * @internal
 */
export function useFormControl<T extends HTMLElement>(
  props: UseFormControlProps<T>
) {
  const { disabled, isInvalid, readOnly, required, ...rest } =
    useFormControlProps(props);

  return {
    ...rest,
    disabled,
    readOnly,
    required,
    "aria-invalid": ariaAttr(isInvalid),
    "aria-required": ariaAttr(required),
    "aria-readonly": ariaAttr(readOnly),
  };
}

/**
 * @internal
 */
export function useFormControlProps<T extends HTMLElement>(
  props: UseFormControlProps<T>
) {
  const field = useFormControlContext();

  const { id, disabled, readOnly, required, isInvalid, ...rest } = props;

  const labelIds: string[] = rest["aria-describedby"]
    ? [rest["aria-describedby"]]
    : [];

  // Error message must be described first in all scenarios.
  if (field?.hasFeedbackText && field?.isInvalid) {
    labelIds.push(field.feedbackId);
  }

  if (field?.hasHelpText) {
    labelIds.push(field.helpTextId);
  }

  return {
    ...rest,
    "aria-describedby": labelIds.join(" ") || undefined,
    id: id ?? field?.id,
    disabled: disabled ?? field?.disabled,
    readOnly: readOnly ?? field?.readOnly,
    required: required ?? field?.required,
    isInvalid: isInvalid ?? field?.isInvalid,
  };
}
