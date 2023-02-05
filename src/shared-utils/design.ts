import clsx from "clsx";

export const inputClasses = (
  props: string | string[],
  options: { includeReadOnly?: boolean } = {}
) =>
  clsx(
    "w-full px-2 rounded-md border-gray-300 shadow-sm sm:text-sm transition-all duration-200 ease-in-out",
    "focus:ring-focused focus:outline-none focus:ring-2 focus:ring-offset-2 focus:border-focused",
    "disabled:bg-gray-200",
    options.includeReadOnly &&
      "read-only:bg-white read-only:border-transparent read-only:shadow-none read-only:ml-0",
    "aria-[invalid]:border-red-400 aria-[invalid]:ring-red-400",
    props
  );
