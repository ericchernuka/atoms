import { FocusScope, type FocusScopeProps } from "@radix-ui/react-focus-scope";

/* -------------------------------------------------------------------------------------------------
 * FocusGroup
 * -----------------------------------------------------------------------------------------------*/

import { ElementRef, forwardRef } from "react";

type FocusGroupElement = ElementRef<"div">;
interface FocusGroupProps extends FocusScopeProps {}

const FocusGroup = forwardRef<FocusGroupElement, FocusGroupProps>(
  (props, forwardedRef) => {
    return <FocusScope {...props} ref={forwardedRef} />;
  }
);

FocusGroup.displayName = "FocusGroup";

export { FocusGroup };
