import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import * as React from "react";

/* -------------------------------------------------------------------------------------------------
 * List
 * -----------------------------------------------------------------------------------------------*/

const listClassBuilder = cva(null, {
  variants: {
    spacing: {
      none: "space-y-0",
      tight: "space-y-1",
      condensed: "space-y-2",
      base: "space-y-3",
      relaxed: "space-y-4",
      loose: "space-y-6",
    },
    listType: {
      none: "list-none",
      ordered: "list-decimal",
      unordered: "list-disc",
    },
    position: {
      inside: "list-inside",
      outside: "list-outside",
    },
  },
  defaultVariants: {
    spacing: "base",
    listType: "unordered",
    position: "outside",
  },
});

type ListElement = React.ElementRef<"ul">;
interface ListProps
  extends Omit<React.ComponentPropsWithoutRef<"ul">, "className">,
    VariantProps<typeof listClassBuilder> {}

const List = React.forwardRef<ListElement, ListProps>(
  ({ spacing, listType, position, ...props }, forwardedRef) => {
    const className = listClassBuilder({ spacing, listType, position });

    if (listType === "ordered") {
      return (
        <Slot ref={forwardedRef}>
          <ol {...props} className={className} />
        </Slot>
      );
    }
    return <ul {...props} className={className} ref={forwardedRef} />;
  }
);

List.displayName = "List";

/* -------------------------------------------------------------------------------------------------
 * ListItem
 * -----------------------------------------------------------------------------------------------*/

type ListItemElement = React.ElementRef<"li">;
interface ListItemProps
  extends Omit<React.ComponentPropsWithoutRef<"li">, "className"> {}

const ListItem = React.forwardRef<ListItemElement, ListItemProps>(
  (props, forwardedRef) => {
    return <li {...props} ref={forwardedRef} />;
  }
);

ListItem.displayName = "ListItem";

const Root = List;
const Item = ListItem;

export {
  Root,
  Item,
  //
  List,
  ListItem,
};
