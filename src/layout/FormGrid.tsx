import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { ElementRef, ComponentPropsWithoutRef, forwardRef } from "react";

const formGridClassBuilder = cva("grid grid-cols-1 gap-y-4 gap-x-4", {
  variants: {
    columns: {
      1: "sm:grid-cols-1",
      2: "sm:grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-4",
      5: "sm:grid-cols-5",
      6: "sm:grid-cols-6",
    },
  },
});

/* -------------------------------------------------------------------------------------------------
 * FormGrid
 * -----------------------------------------------------------------------------------------------*/
type FormGridElement = ElementRef<"div">;
interface FormGridProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof formGridClassBuilder> {}

const FormGrid = forwardRef<FormGridElement, FormGridProps>(
  ({ className, ...props }, forwardedRef) => {
    const classNames = formGridClassBuilder(props);
    return (
      <div
        {...props}
        className={clsx(classNames, className)}
        ref={forwardedRef}
      />
    );
  }
);

FormGrid.displayName = "FormGrid";

export { FormGrid };
