/* -------------------------------------------------------------------------------------------------
 * ButtonGroup
 * -----------------------------------------------------------------------------------------------*/

import clsx from "clsx";
import { ElementRef, ComponentPropsWithoutRef, forwardRef } from "react";

type ButtonGroupElement = ElementRef<"div">;
interface ButtonGroupProps extends ComponentPropsWithoutRef<"div"> {}

const ButtonGroup = forwardRef<ButtonGroupElement, ButtonGroupProps>(
  (props, forwardedRef) => {
    return (
      <div
        {...props}
        className={clsx(props.className, "flex gap-2")}
        ref={forwardedRef}
      />
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
