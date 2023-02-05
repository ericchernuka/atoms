import clsx from "clsx";

export const inputClasses: typeof clsx = (props) =>
  clsx(
    "w-full px-2 rounded-md border-gray-300 shadow-sm focus:outline-none focus-visible:border-focused focus-visible:ring-[var(--focused)] sm:text-sm transition-all duration-200 ease-in-out",
    "disabled:bg-gray-200",
    "read-only:bg-white read-only:border-transparent read-only:shadow-none read-only:ml-0",
    "aria-[invalid]:border-red-400 aria-[invalid]:ring-red-400",
    props
  );
