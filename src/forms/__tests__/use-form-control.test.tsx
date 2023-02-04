import { renderHook } from "@testing-library/react";
import { useFormControl } from "../use-form-control";

describe("useFormControl", () => {
  describe("readOnly attributes", () => {
    const attribute = "isReadOnly";

    test.each([
      {
        attribute,
        attributeValue: undefined,
        outputProperty: "readOnly",
        expected: undefined,
      },
      {
        attribute,
        attributeValue: undefined,
        outputProperty: "aria-readonly",
        expected: undefined,
      },
      {
        attribute,
        attributeValue: true,
        outputProperty: "readOnly",
        expected: true,
      },
      {
        attribute,
        attributeValue: false,
        outputProperty: "readOnly",
        expected: false,
      },
      {
        attribute,
        attributeValue: true,
        outputProperty: "aria-readonly",
        expected: true,
      },
      {
        attribute,
        attributeValue: false,
        outputProperty: "aria-readonly",
        expected: undefined,
      },
    ] as const)(
      'should return $expected for $outputProperty when "$attributeName" is $attributeValue',
      ({ attribute, attributeValue, outputProperty, expected }) => {
        const { result } = renderHook(useFormControl, {
          initialProps: { [attribute]: attributeValue },
        });

        expect(result.current[outputProperty]).toBe(expected);
      }
    );
    it("should ");
  });

  describe("required attributes", () => {
    const attribute = "isRequired";

    test.each([
      {
        attribute,
        attributeValue: undefined,
        outputProperty: "required",
        expected: undefined,
      },
      {
        attribute,
        attributeValue: undefined,
        outputProperty: "aria-required",
        expected: undefined,
      },
      {
        attribute,
        attributeValue: true,
        outputProperty: "required",
        expected: true,
      },
      {
        attribute,
        attributeValue: false,
        outputProperty: "required",
        expected: false,
      },
      {
        attribute,
        attributeValue: true,
        outputProperty: "aria-required",
        expected: true,
      },
      {
        attribute,
        attributeValue: false,
        outputProperty: "aria-required",
        expected: undefined,
      },
    ] as const)(
      'should return $expected for $outputProperty when "$attributeName" is $attributeValue',
      ({ attribute, attributeValue, outputProperty, expected }) => {
        const { result } = renderHook(useFormControl, {
          initialProps: { [attribute]: attributeValue },
        });

        expect(result.current[outputProperty]).toBe(expected);
      }
    );
  });

  describe("invalid attributes", () => {
    const attribute = "isInvalid";

    test.each([
      {
        attribute,
        attributeValue: undefined,
        outputProperty: "aria-invalid",
        expected: undefined,
      },
      {
        attribute,
        attributeValue: true,
        outputProperty: "aria-invalid",
        expected: true,
      },
      {
        attribute,
        attributeValue: false,
        outputProperty: "aria-invalid",
        expected: undefined,
      },
    ] as const)(
      'should return $expected for $outputProperty when "$attributeName" is $attributeValue',
      ({ attribute, attributeValue, outputProperty, expected }) => {
        const { result } = renderHook(useFormControl, {
          initialProps: { [attribute]: attributeValue },
        });

        expect(result.current[outputProperty]).toBe(expected);
      }
    );
  });
});
