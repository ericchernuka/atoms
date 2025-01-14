import clsx from "clsx";
import {
  useCallback,
  useId,
  useState,
  createContext,
  useContext,
  ComponentPropsWithoutRef,
  forwardRef,
  ElementRef,
} from "react";
import { composeRefs } from "../compose-refs";
import { PropGetter } from "../react-types";
import { dataAttr } from "../shared-utils";

export interface FormControlOptions {
  /**
   * If `true`, the form control will be required. This has 2 side effects:
   * - The `FormLabel` will show a required indicator
   * - The form element (e.g, Input) will have `aria-required` set to `true`
   *
   * @default false
   */
  required?: boolean;
  /**
   * If `true`, the form control will be disabled. This has 2 side effects:
   * - The `FormLabel` will have `data-disabled` attribute
   * - The form element (e.g, Input) will be disabled
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the form control will be invalid. This has 2 side effects:
   * - The `FormLabel` and `FormErrorIcon` will have `data-invalid` set to `true`
   * - The form element (e.g, Input) will have `aria-invalid` set to `true`
   *
   * @default false
   */
  isInvalid?: boolean;
  /**
   * If `true`, the form control will be readonly
   *
   * @default false
   */
  readOnly?: boolean;
}

interface FormControlContext extends FormControlOptions {
  /**
   * The custom `id` to use for the form control. This is passed directly to the form element (e.g, Input).
   * - The form element (e.g. Input) gets the `id`
   * - The form label id: `${id}-label`
   * - The form error text id: `${id}-feedback`
   * - The form helper text id: `${id}-helperText`
   */
  id?: string;
}

type FormControlProviderContext = Omit<
  ReturnType<typeof useFormControlProviderProps>,
  "getRootProps" | "htmlProps"
>;

const FormControlContext = createContext<FormControlProviderContext | null>(
  null
);

export const useFormControlContext = () => useContext(FormControlContext);

export const buildAccessibleIds = (id: string, prefixFallback?: boolean) => {
  const idValue = prefixFallback ? `field-${id}` : id;

  return {
    id: idValue,
    labelId: `${idValue}-label`,
    feedbackId: `${idValue}-feedback`,
    helpTextId: `${idValue}-helperText`,
  };
};

const useFormControlProviderProps = (props: FormControlContext) => {
  const { id: idProp, required = true, isInvalid, disabled, readOnly } = props;

  // Generate all the required ids
  const uuid = useId();
  const { id, feedbackId, helpTextId, labelId } = buildAccessibleIds(
    idProp ?? uuid,
    !Boolean(idProp)
  );

  /**
   * Track whether the `FormErrorMessage` has been rendered.
   * We use this to append its id the `aria-describedby` of the `input`.
   */
  const [hasFeedbackText, setHasFeedbackText] = useState(false);

  /**
   * Track whether the `FormHelpText` has been rendered.
   * We use this to append its id the `aria-describedby` of the `input`.
   */
  const [hasHelpText, setHasHelpText] = useState(false);

  const getHelpTextProps = useCallback<PropGetter>(
    (props = {}, forwardedRef = null) => ({
      id: helpTextId,
      ...props,
      /**
       * Notify the field context when the help text is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
       */
      ref: composeRefs(forwardedRef, (node) => {
        if (!node) return;
        setHasHelpText(true);
      }),
    }),
    [helpTextId]
  );

  const getLabelProps = useCallback<PropGetter>(
    (props = {}, forwardedRef = null) => ({
      ...props,
      ref: forwardedRef,
      "data-disabled": dataAttr(disabled),
      "data-invalid": dataAttr(isInvalid),
      "data-readonly": dataAttr(readOnly),
      id: props.id ?? labelId,
      htmlFor: props.htmlFor ?? id,
    }),
    [id, disabled, isInvalid, readOnly, labelId]
  );

  const getErrorMessageProps = useCallback<PropGetter>(
    (props = {}, forwardedRef = null) => ({
      id: feedbackId,
      ...props,
      /**
       * Notify the field context when the error message is rendered on screen,
       * so we can apply the correct `aria-describedby` to the field (e.g. input, textarea).
       */
      ref: composeRefs(forwardedRef, (node) => {
        if (!node) return;
        setHasFeedbackText(true);
      }),
      "aria-live": "polite",
    }),
    [feedbackId]
  );

  return {
    required: !!required,
    isInvalid: !!isInvalid,
    readOnly: !!readOnly,
    disabled: !!disabled,
    hasFeedbackText,
    setHasFeedbackText,
    hasHelpText,
    setHasHelpText,
    id,
    labelId,
    feedbackId,
    helpTextId,
    getHelpTextProps,
    getErrorMessageProps,
    getLabelProps,
  };
};

type FormControlElement = ElementRef<"div">;

export interface FormControlProps
  extends ComponentPropsWithoutRef<"div">,
    FormControlContext {}

/**
 * FormControl provides context such as
 * `isInvalid`, `isDisabled`, and `required` to form elements.
 *
 * This is commonly used in form elements such as `input`,
 * `select`, `textarea`, etc.
 *
 */

export const FormControl = forwardRef<FormControlElement, FormControlProps>(
  function FormControl(props, forwardedRef) {
    const context = useFormControlProviderProps(props);

    return (
      <FormControlContext.Provider value={context}>
        <div
          role="group"
          className={clsx("space-y-1", props.className)}
          ref={forwardedRef}
        >
          {props.children}
        </div>
      </FormControlContext.Provider>
    );
  }
);

FormControl.displayName = "FormControl";
