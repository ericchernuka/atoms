import { renderHook } from "@testing-library/react";
import { useFormControl } from "../use-form-control";
import * as formControl from "../FormControl";
import { buildAccessibleIds } from "../FormControl";

describe("useFormControl", () => {
  describe("disabled attributes", () => {
    const attribute = "disabled";

    test.each([
      {
        attribute,
        attributeValue: undefined,
        outputProperty: "disabled",
        expected: undefined,
      },
      {
        attribute,
        attributeValue: true,
        outputProperty: "disabled",
        expected: true,
      },
      {
        attribute,
        attributeValue: false,
        outputProperty: "disabled",
        expected: false,
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

  describe("readOnly attributes", () => {
    const attribute = "readOnly";

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
    const attribute = "required";

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

  describe('"aria-describedby"', () => {
    const ids = buildAccessibleIds("foo", false);
    const baseMockProps = {
      disabled: false,
      feedbackId: ids.feedbackId,
      getErrorMessageProps: vi.fn(),
      getHelpTextProps: vi.fn(),
      getLabelProps: vi.fn(),
      hasFeedbackText: false,
      hasHelpText: false,
      helpTextId: ids.helpTextId,
      id: ids.id,
      isInvalid: false,
      labelId: ids.labelId,
      readOnly: false,
      required: false,
      setHasFeedbackText: vi.fn(),
      setHasHelpText: vi.fn(),
    };

    it('should prepend "aria-describedby" when provided by the consumer', () => {
      vi.spyOn(formControl, "useFormControlContext").mockReturnValueOnce(
        baseMockProps
      );
      const { result } = renderHook(useFormControl, {
        initialProps: { "aria-describedby": "foo" },
      });

      expect(result.current["aria-describedby"]).toBe("foo");
    });

    it("should append the helpTextId when hasHelpText is true", () => {
      vi.spyOn(formControl, "useFormControlContext").mockReturnValueOnce({
        ...baseMockProps,
        hasHelpText: true,
      });
      const { result } = renderHook(useFormControl, {
        initialProps: { "aria-describedby": "foo" },
      });

      expect(result.current["aria-describedby"]).toBe("foo foo-helperText");
    });

    it("should not append the feedbackId when hasFeedbackText is true and isInvalid is false", () => {
      vi.spyOn(formControl, "useFormControlContext").mockReturnValueOnce({
        ...baseMockProps,
        hasFeedbackText: true,
        isInvalid: false,
      });
      const { result } = renderHook(useFormControl, {
        initialProps: { "aria-describedby": "foo" },
      });

      expect(result.current["aria-describedby"]).toBe("foo");
    });

    it("should append the feedbackId when hasFeedbackText is true and isInvalid is true", () => {
      vi.spyOn(formControl, "useFormControlContext").mockReturnValueOnce({
        ...baseMockProps,
        hasFeedbackText: true,
        isInvalid: true,
      });
      const { result } = renderHook(useFormControl, {
        initialProps: { "aria-describedby": "foo" },
      });

      expect(result.current["aria-describedby"]).toBe("foo foo-feedback");
    });

    it("should alaways append feedbackId first before the helpTextId when hasHelpText, hasFeedbackText, and isInvalid are true", () => {
      vi.spyOn(formControl, "useFormControlContext").mockReturnValueOnce({
        ...baseMockProps,
        hasFeedbackText: true,
        hasHelpText: true,
        isInvalid: true,
      });
      const { result } = renderHook(useFormControl, {
        initialProps: { "aria-describedby": "foo" },
      });

      expect(result.current["aria-describedby"]).toBe(
        "foo foo-feedback foo-helperText"
      );
    });
  });
});
