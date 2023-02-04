/* -------------------------------------------------------------------------------------------------
 * DateOfBirthField
 * -----------------------------------------------------------------------------------------------*/

import clsx from "clsx";
import { isValid, parse, parseISO } from "date-fns";
import {
  ElementRef,
  forwardRef,
  ReactNode,
  useEffect,
  useId,
  useMemo,
  useState,
} from "react";
import { Input } from "../input/Input";

type DateOfBirthFieldElement = ElementRef<"fieldset">;
interface DateOfBirthFieldProps {
  value?: string;
  onChange: (value?: string) => void;
}

const isValidISO8601Date = (date: string) =>
  isValid(parse(date, "yyyy-MM-dd", new Date()));

const DateOfBirthField = forwardRef<
  DateOfBirthFieldElement,
  DateOfBirthFieldProps
>(({ value, onChange, ...props }, forwardedRef) => {
  const [focused, setFocused] = useState<boolean>(false);
  const [localDate, setLocalDate] = useState<string | undefined>(() => {
    return isValidISO8601Date(value || "") ? value : undefined;
  });

  const formatDate = (dateParts: string[]) => {
    const [year, month, day] = dateParts;
    const internalValue = `${year}-${month}-${day}`;
    const persistedValue = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;
    return {
      value: internalValue,
      persisted: persistedValue,
      isValid: isValidISO8601Date(persistedValue),
    };
  };

  const { persisted: formattedDate, isValid: isValidLocalDate } =
    useMemo(() => {
      return formatDate((localDate || "").split("-"));
    }, [localDate]);

  useEffect(() => {
    if (
      !focused &&
      isValidISO8601Date(value || "") &&
      formattedDate !== value
    ) {
      setLocalDate(value);
    }
  }, [localDate, value, focused]);

  const dateParts = (localDate || "").split("-");
  const [yearPart = "", monthPart = "", dayPart = ""] = dateParts;

  const replaceDatePart = (index: number, value: string) => {
    const updatedDateParts: [string, string, string] = [
      yearPart,
      monthPart,
      dayPart,
    ];
    updatedDateParts[index] = value;
    return updatedDateParts;
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, persisted, isValid } = formatDate(
      replaceDatePart(1, event.target.value)
    );
    setLocalDate(value);
    onChange(isValid ? persisted : undefined);
  };
  const handleDayOrYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = event.target.name === "day" ? 2 : 0;
    const { value, persisted, isValid } = formatDate(
      replaceDatePart(newIndex, event.target.value)
    );
    setLocalDate(value);
    onChange(isValid ? persisted : undefined);
  };

  return (
    <fieldset
      {...props}
      ref={forwardedRef}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <legend className="sr-only">Date of Birth</legend>
      <div className={clsx("flex gap-1 sm:gap-4")}>
        <FormGroupWithLabel label="Birth month" id="month">
          <select
            id="month"
            name="month"
            value={monthPart}
            onChange={handleMonthChange}
            className={clsx(
              "relative px-2 var-spacing-2 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm truncate",
              "form-select",
              !isValidLocalDate && "border-red-400"
            )}
          >
            <option value="" disabled>
              Select a month
            </option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </FormGroupWithLabel>

        <FormGroupWithLabel id="day" label="Birth day">
          <Input
            id="day"
            type="number"
            name="day"
            value={dayPart}
            onChange={handleDayOrYear}
            hasErrors={!isValidLocalDate}
          />
        </FormGroupWithLabel>

        <FormGroupWithLabel label="Birth year" id="year">
          <Input
            id="year"
            type="number"
            name="year"
            value={yearPart}
            onChange={handleDayOrYear}
            hasErrors={!isValidLocalDate}
          />
        </FormGroupWithLabel>
      </div>
    </fieldset>
  );
});

const FormGroupWithLabel = ({
  children,
  label,
  id,
}: {
  children: ReactNode;
  label: string;
  id: string;
}) => {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {children}
    </div>
  );
};

DateOfBirthField.displayName = "DateOfBirthField";

export { DateOfBirthField };
