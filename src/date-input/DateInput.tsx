import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { useFormControl, UseFormControlProps } from "../forms/use-form-control";
import { Input } from "../input/Input";
import { useControllableState } from "../use-controllable-state";

/* -------------------------------------------------------------------------------------------------
 * DateInput
 * -----------------------------------------------------------------------------------------------*/

type DateInputElement = ElementRef<typeof Input>;
interface DateInputProps
  extends Omit<
      ComponentPropsWithoutRef<"input">,
      "className" | "value" | "type" | "onChange" | "defaultValue"
    >,
    UseFormControlProps<DateInputElement> {
  onChange?: (valueAsString: string) => void;
  value?: string;
  defaultValue?: string;
}

const DateInput = forwardRef<DateInputElement, DateInputProps>(
  ({ defaultValue, ...props }, forwardedRef) => {
    const field = useFormControl(props);

    const [value, setValue] = useControllableState({
      prop: props.value,
      defaultProp: defaultValue,
      onChange: props.onChange,
    });

    return (
      <Input
        type="date"
        {...field}
        className="appearance-textfield"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        ref={forwardedRef}
      />
    );
  }
);

DateInput.displayName = "DateInput";

export { DateInput };
