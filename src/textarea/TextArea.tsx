import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { useFormControl, UseFormControlProps } from "../forms/use-form-control";
import { inputClasses } from "../shared-utils/design";
import { useControllableState } from "../use-controllable-state";

/* -------------------------------------------------------------------------------------------------
 * TextArea
 * -----------------------------------------------------------------------------------------------*/
type TextAreaElement = ElementRef<"textarea">;
interface TextAreaProps
  extends Omit<
      ComponentPropsWithoutRef<"textarea">,
      "className" | "value" | "onChange" | "defaultValue"
    >,
    UseFormControlProps<TextAreaElement> {
  onChange?: (valueAsString: string) => void;
  value?: string;
  defaultValue?: string;
}

const TextArea = forwardRef<TextAreaElement, TextAreaProps>(
  ({ defaultValue, ...props }, forwardedRef) => {
    const field = useFormControl(props);

    const [value, setValue] = useControllableState({
      prop: props.value,
      defaultProp: defaultValue,
      onChange: props.onChange,
    });

    return (
      <textarea
        {...field}
        className={inputClasses("form-textarea")}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        ref={forwardedRef}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export { TextArea };
