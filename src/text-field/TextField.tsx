import { useControllableState } from "@radix-ui/react-use-controllable-state";
import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactNode,
  useLayoutEffect,
  useRef,
} from "react";
import { useFormControlContext } from "../forms/FormControl";
import { useFormControl } from "../forms/use-form-control";
import { Input } from "../input/Input";

/* -------------------------------------------------------------------------------------------------
 * Utils
 * -----------------------------------------------------------------------------------------------*/
function isTextFieldInput(child: any): child is TextFieldInputElement {
  return isValidElement(child) && child.type === TextFieldInput;
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
  let input: TextFieldInputElement | null = null;

  const rootRef = useRef<HTMLDivElement>(null);

  const leftSlotRef = useRef<HTMLDivElement>();
  const rightSlotRef = useRef<HTMLDivElement>();

  Children.forEach(children, (child) => {
    if (!child) {
      return;
    }

    if (isTextFieldInput(child)) {
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
    const setSlotsWidth = () => {
      const leftSlotWidth = leftSlotRef.current?.offsetWidth;
      const rightSlotWidth = rightSlotRef.current?.offsetWidth;

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

    const observer = new ResizeObserver(setSlotsWidth);

    if (leftSlotRef.current) {
      observer.observe(leftSlotRef.current, { box: "border-box" });
    }

    if (rightSlotRef.current) {
      observer.observe(rightSlotRef.current, { box: "border-box" });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="relative z-0">
      {leftSlot}
      {input}
      {rightSlot}
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TextFieldInput
 * -----------------------------------------------------------------------------------------------*/

type TextFieldInputElement = React.ElementRef<"input">;
interface TextFieldInputProps
  extends Omit<React.ComponentPropsWithoutRef<"input">, "onChange"> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const TextFieldInput = forwardRef<TextFieldInputElement, TextFieldInputProps>(
  (props, forwardedRef) => {
    const context = useFormControlContext();
    const field = useFormControl(props);

    const [value, setValue] = useControllableState({
      prop: props.value,
      defaultProp: props.defaultValue,
      onChange: props.onChange,
    });

    return (
      <Input
        type="text"
        {...field}
        disabled={context?.isDisabled}
        hasErrors={context?.isInvalid}
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

TextFieldInput.displayName = "TextFieldInput";

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
  TextFieldInput as Input,
  TextFieldSlot as Slot,
  TextFieldRoot as TextField,
  TextFieldInput,
  TextFieldSlot,
};
