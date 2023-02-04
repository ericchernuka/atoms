import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { useFormControl, UseFormControlProps } from "../forms/use-form-control";
import { Input } from "../input/Input";
import { callAllHandlers } from "../shared-utils";
import { useControllableState } from "../use-controllable-state";

/* -------------------------------------------------------------------------------------------------
 * NumberInput
 * -----------------------------------------------------------------------------------------------*/

type NumberInputElement = ElementRef<typeof Input>;
interface NumberInputProps
  extends Omit<
      ComponentPropsWithoutRef<"input">,
      "className" | "value" | "type" | "onChange" | "defaultValue"
    >,
    UseFormControlProps<NumberInputElement> {
  onChange?: (number: number) => void;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
}

const NumberInput = forwardRef<NumberInputElement, NumberInputProps>(
  (
    {
      defaultValue,
      min = Number.MIN_SAFE_INTEGER,
      max = Number.MAX_SAFE_INTEGER,
      ...props
    },
    forwardedRef
  ) => {
    const field = useFormControl(props);

    const [value, setValue] = useControllableState<number>({
      prop: props.value,
      defaultProp: defaultValue,
      onChange: props.onChange,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.valueAsNumber;
      setValue(value);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      const value = event.target.valueAsNumber;
      const clampedValue = clamp(value, min, max);
      setValue(clampedValue);
    };

    return (
      <Input
        type="number"
        {...field}
        className="appearance-textfield"
        value={typeof value === "number" && isNaN(value) ? "" : value}
        onChange={handleChange}
        onBlur={callAllHandlers(props.onBlur, handleBlur)}
        onWheel={(event) => {
          event.currentTarget.blur();
          event.stopPropagation();
          setTimeout(() => event.currentTarget?.focus(), 0);
        }}
        ref={forwardedRef}
      />
    );
  }
);

NumberInput.displayName = "NumberInput";

export { NumberInput };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}
