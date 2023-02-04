import { cx } from "class-variance-authority";
import clsx from "clsx";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useEffect,
} from "react";

type CharacterCountElement = ElementRef<"div">;
export interface CharacterCountProps extends ComponentPropsWithoutRef<"div"> {
  count?: number;
  limit?: number;
}

/**
 * CharacterCount
 *
 * Assistive component that displays the current character count of a text field.
 */
export const CharacterCount = forwardRef<
  CharacterCountElement,
  CharacterCountProps
>(({ count = 0, limit = 0, ...props }, forwardedRef) => {
  const percentageToLimit = count / limit;
  const shouldAnnounceLimit = percentageToLimit > 0.75;

  const announceProps = shouldAnnounceLimit
    ? ({
        role: "status",
        "aria-live": "polite",
        "aria-atomic": true,
        "aria-label": characterCountMessage(count, limit),
      } as const)
    : undefined;

  return (
    <div
      {...props}
      {...announceProps}
      className={clsx("sm:text-sm", {
        "text-gray-500": !shouldAnnounceLimit,
        "text-red-400": percentageToLimit > 0.75,
        "text-red-500": percentageToLimit > 0.9,
        "text-red-600": percentageToLimit > 1,
      })}
    >
      <span aria-hidden="true">{`${count} / ${limit}`}</span>
    </div>
  );
});

CharacterCount.displayName = "CharacterCount";

const characterCountMessage = (count: number, limit: number) => {
  if (count >= limit) {
    return `You have exceeded the character limit by ${
      count - limit
    } characters.`;
  }

  return `You have ${limit - count} characters remaining.`;
};
