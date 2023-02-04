import * as React from "react";

type VisuallyHiddenElement = React.ElementRef<"span">;
interface VisuallyHiddenElementProps
  extends Omit<React.ComponentPropsWithoutRef<"span">, "className"> {}

const VisuallyHidden = React.forwardRef<
  VisuallyHiddenElement,
  VisuallyHiddenElementProps
>((props, forwardedRef) => {
  return <span className="sr-only" {...props} ref={forwardedRef} />;
});

export { VisuallyHidden as Root, VisuallyHidden };
