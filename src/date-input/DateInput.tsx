/* -------------------------------------------------------------------------------------------------
 * DateInput
 * -----------------------------------------------------------------------------------------------*/

import { parseISO } from "date-fns";
import { ElementRef, ComponentPropsWithoutRef, forwardRef } from "react";
import { useFormControlContext } from "../forms/FormControl";
import { useFormControl } from "../forms/use-form-control";
import { Input } from "../input/Input";
import { callAllHandlers } from "../shared-utils";
import { useControllableState } from "../use-controllable-state";

type DateInputElement = ElementRef<typeof Input>;
interface DateInputProps
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    "className" | "value" | "type" | "value" | "onChange" | "defaultValue"
  > {
  onChange?: (valueAsString: string) => void;
  value?: string;
  defaultValue?: string;
}

const DateInput = forwardRef<DateInputElement, DateInputProps>(
  ({ defaultValue, ...props }, forwardedRef) => {
    const context = useFormControlContext();
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
        disabled={context?.isDisabled}
        hasErrors={context?.isInvalid}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        ref={forwardedRef}
      />
    );
  }
);

DateInput.displayName = "DateInput";

export { DateInput };
