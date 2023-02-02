import * as React from "react";
import * as CardPrimitive from "./Card";

/* -------------------------------------------------------------------------------------------------
 * CardList
 * -----------------------------------------------------------------------------------------------*/

type CardListElement = React.ElementRef<"ul">;
interface CardListProps
  extends Pick<React.ComponentPropsWithoutRef<"ul">, "children"> {}

const CardList = React.forwardRef<CardListElement, CardListProps>(
  (props, forwardedRef) => {
    return (
      <ul {...props} role="list" className="space-y-3" ref={forwardedRef} />
    );
  }
);

CardList.displayName = "CardList";

/* -------------------------------------------------------------------------------------------------
 * CardList
 * -----------------------------------------------------------------------------------------------*/

type CardListCardElement = React.ElementRef<"li">;
interface CardListCardProps
  extends React.ComponentPropsWithoutRef<typeof CardPrimitive.Card> {}

const CardListCard = React.forwardRef<CardListCardElement, CardListCardProps>(
  ({ children, divided, shouldFillContainerOnMobile }, forwardedRef) => {
    return (
      <CardPrimitive.Card
        asChild
        divided={divided}
        shouldFillContainerOnMobile={shouldFillContainerOnMobile}
      >
        <li ref={forwardedRef}>{children}</li>
      </CardPrimitive.Card>
    );
  }
);

CardListCard.displayName = "CardListCard";

const Root = CardList;
const Card = CardListCard;

export {
  Root,
  Card,
  //
  CardList,
  CardListCard,
};
