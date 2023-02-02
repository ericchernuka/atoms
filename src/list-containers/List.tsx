import * as React from "react";

/* -------------------------------------------------------------------------------------------------
 * ListContainer
 * -----------------------------------------------------------------------------------------------*/

type ListContainerElement = React.ElementRef<"ul">;
interface ListContainerProps extends React.ComponentPropsWithoutRef<"ul"> {}

const ListContainer = React.forwardRef<
  ListContainerElement,
  ListContainerProps
>((props, forwardedRef) => {
  return (
    <ul
      {...props}
      role="list"
      className="divide-y divide-gray-200"
      ref={forwardedRef}
    />
  );
});

ListContainer.displayName = "ListContainer";

/* -------------------------------------------------------------------------------------------------
 * ListContainerItem
 * -----------------------------------------------------------------------------------------------*/

type ListContainerItemElement = React.ElementRef<"li">;
interface ListContainerItemProps
  extends Pick<React.ComponentPropsWithoutRef<"li">, "children"> {}

const ListContainerItem = React.forwardRef<
  ListContainerItemElement,
  ListContainerItemProps
>((props, forwardedRef) => {
  return <li {...props} className="py-4" ref={forwardedRef} />;
});

ListContainerItem.displayName = "ListContainerItem";

const Root = ListContainer;
const Item = ListContainerItem;

export {
  Root,
  Item,
  //
  ListContainer,
  ListContainerItem,
};
