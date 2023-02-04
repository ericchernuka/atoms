import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactNode,
  useLayoutEffect,
  useRef,
} from "react";
import { useFormControl, UseFormControlProps } from "../forms/use-form-control";
import { Input } from "../input/Input";
import { useControllableState } from "../use-controllable-state";

/* -------------------------------------------------------------------------------------------------
 * Utils
 * -----------------------------------------------------------------------------------------------*/
function isTextInput(child: any): child is TextInputElement {
  return isValidElement(child) && child.type === TextInput;
}

function isTextFieldSlot(child: any): child is TextFieldSlotElement {
  return isValidElement(child) && child.type === TextFieldSlot;
}

interface TextFieldRootProps {
  children?: ReactNode;
}

/* -------------------------------------------------------------------------------------------------
 * TextFieldRoot
 * -----------------------------------------------------------------------------------------------*/
const TextFieldRoot = ({ children }: TextFieldRootProps) => {
  let leftSlot: React.ReactElement | null = null;
  let rightSlot: React.ReactElement | null = null;
  let input: TextInputElement | null = null;

  const rootRef = useRef<HTMLDivElement>(null);

  const leftSlotRef = useRef<HTMLDivElement>();
  const rightSlotRef = useRef<HTMLDivElement>();

  Children.forEach(children, (child) => {
    if (!child) {
      return;
    }

    if (isTextInput(child)) {
      if (input) {
        throw Error(
          'Only a single "Input" part is expected among "Root" children'
        );
      }

      input = child;
      return;
    }

    if (isValidElement(child) && isTextFieldSlot(child)) {
      if (leftSlot && !input) {
        throw Error(
          'Only a single "Slot" part is expected before "Input" children'
        );
      }

      if (leftSlot && rightSlot) {
        throw Error(
          'Only a single "Slot" part is expected after "Input" children'
        );
      }

      if (leftSlot || input) {
        rightSlot = cloneElement(child, {
          "data-side": "right",
          ref: (el: HTMLDivElement) => (rightSlotRef.current = el),
        } as Record<string, unknown>);
        return;
      }

      leftSlot = cloneElement(child, {
        "data-side": "left",
        ref: (el: HTMLDivElement) => (leftSlotRef.current = el),
      } as Record<string, unknown>);
      return;
    }

    throw Error(
      'Only "Slot" and "Input" parts are expected as "Root" children'
    );
  });

  // Measure the slot widths, save values as CSS custom properties.
  // Update the widths when slot change size
  useLayoutEffect(() => {
    const setSlotsWidth = (forceOverride?: number) => {
      const leftSlotWidth = forceOverride ?? leftSlotRef.current?.offsetWidth;
      const rightSlotWidth = forceOverride ?? rightSlotRef.current?.offsetWidth;

      if (typeof leftSlotWidth === "number") {
        rootRef.current?.style.setProperty(
          "--left-slot-width",
          `${leftSlotWidth}px`
        );
      }

      if (typeof rightSlotWidth === "number") {
        rootRef.current?.style.setProperty(
          "--right-slot-width",
          `${rightSlotWidth}px`
        );
      }
    };

    setSlotsWidth();

    const observer = new ResizeObserver(() => setSlotsWidth());

    if (leftSlotRef.current) {
      observer.observe(leftSlotRef.current, { box: "border-box" });
    }

    if (rightSlotRef.current) {
      observer.observe(rightSlotRef.current, { box: "border-box" });
    }

    return () => {
      setSlotsWidth(0);
      observer.disconnect();
    };
  }, [children]);

  return (
    <div ref={rootRef} className="relative z-0 w-full">
      {leftSlot}
      {input}
      {rightSlot}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TextInput
 * -----------------------------------------------------------------------------------------------*/

type TextInputElement = React.ElementRef<"input">;
interface TextInputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "onChange">,
    UseFormControlProps<TextInputElement> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const TextInput = forwardRef<TextInputElement, TextInputProps>(
  ({ defaultValue, ...props }, forwardedRef) => {
    const field = useFormControl(props);

    const [value, setValue] = useControllableState({
      prop: props.value,
      defaultProp: defaultValue,
      onChange: props.onChange,
    });

    return (
      <Input
        type="text"
        {...field}
        onChange={(event) => setValue(event.target.value)}
        value={value}
        style={{
          paddingLeft:
            "max(var(--spacing-2, 0.5rem), var(--left-slot-width, 0.5rem))",
          paddingRight:
            "max(var(--spacing-2, 0.5rem), var(--right-slot-width, 0.5rem))",
        }}
        ref={forwardedRef}
      />
    );
  }
);

TextInput.displayName = "TextInput";

/* -------------------------------------------------------------------------------------------------
 * TextFieldSlot
 * -----------------------------------------------------------------------------------------------*/

type TextFieldSlotElement = React.ElementRef<"div">;
interface TextFieldSlotProps extends React.ComponentPropsWithoutRef<"div"> {}

const TextFieldSlot = forwardRef<TextFieldSlotElement, TextFieldSlotProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <div
        {...props}
        className={`absolute top-0 bottom-0 z-[1] items-center flex gap-2 px-2 empty:hidden data-[side=left]:left-0 data-[side=right]:right-0 ${className}`}
        ref={forwardedRef}
      />
    );
  }
);

TextFieldSlot.displayName = "TextFieldSlot";

export {
  TextFieldRoot as Root,
  TextInput as Input,
  TextFieldSlot as Slot,
  TextFieldRoot as TextField,
  TextInput,
  TextFieldSlot,
};
