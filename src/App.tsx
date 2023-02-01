import {
  ChevronDoubleRightIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { ReactNode, useState } from "react";
import { Button } from "./button/Button";
import { LoadingButton } from "./button/LoadingButton";
import { Card, CardItemRow } from "./card/Card";
import * as Collapsible from "./collapsible/Collapsible";
import { DateInput } from "./date-input/DateInput";
import * as Dialog from "./dialog/Dialog";
import { DateOfBirthField } from "./dob-field/dob-field";
import { FormControl } from "./forms/FormControl";
import { FormErrorMessage } from "./forms/FormFeedback";
import { FormHelperText } from "./forms/FormHelpText";
import { FormLabel } from "./forms/FormLabel";
import { FormGrid } from "./layout/FormGrid";
import { NumberInput } from "./number-input/NumberInput";
import { Stack } from "./stack/Stack";
import { Text } from "./Text";
import * as TextField from "./text-input/TextInput";

const SectionSpacer = (props: { children: ReactNode }) => (
  <div className="p-8" {...props} />
);

function App() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [number, setNumber] = useState(-123.1231);
  const RightIcon = show ? EyeIcon : EyeSlashIcon;

  const [dobState, setDobState] = useState<string | undefined>("2026-02-01");
  const isInvalid = false;
  const isDisabled = false;
  const isReadOnly = false;

  return (
    <div className="space-y-8">
      <SectionSpacer>
        <Stack direction="column">
          <Text asChild weight="semibold" truncate transform="uppercase">
            <p style={{ width: 80 }}>Form Controls</p>
          </Text>
          <FormGrid columns={6}>
            <FormControl
              isRequired={false}
              isInvalid={isInvalid}
              isDisabled={isDisabled}
              isReadOnly={isReadOnly}
              className="sm:col-span-2"
            >
              <FormLabel>First Name</FormLabel>
              <TextField.Input name="firstName" value="123444" />
              <FormHelperText>This is a helper text.</FormHelperText>
              <FormErrorMessage>This is an error message.</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={isInvalid}
              isDisabled={isDisabled}
              isReadOnly={isReadOnly}
              className="sm:col-span-4"
            >
              <FormLabel>Age</FormLabel>
              <NumberInput
                name="age"
                value={number}
                onChange={(val) => setNumber(val)}
              />
              <FormHelperText>Enter your age</FormHelperText>
              <FormErrorMessage>Incorrect age.</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired={false}
              isInvalid={isInvalid}
              isDisabled={isDisabled}
              isReadOnly={isReadOnly}
              className="sm:col-span-4"
            >
              <FormLabel>Date</FormLabel>
              <DateInput
                name="date"
                defaultValue="2023-01-20"
                onChange={(val) => console.log(val)}
              />
              <FormHelperText>This is a helper text.</FormHelperText>
              <FormErrorMessage>This is an error message.</FormErrorMessage>
            </FormControl>
          </FormGrid>
        </Stack>
      </SectionSpacer>
      <SectionSpacer>
        <DateOfBirthField
          onChange={(date) => setDobState(date)}
          value={dobState}
        />
        <button type="button" onClick={() => setDobState("2021-06-12")}>
          Set date
        </button>
      </SectionSpacer>
      <SectionSpacer>
        <TextField.Root>
          <TextField.Slot>
            <LockClosedIcon className="h-5 w-5 text-gray-400" />
          </TextField.Slot>
          <TextField.Input
            type={show ? "text" : "password"}
            defaultValue="kalsdjflkajsdflkajsklfjaskalsdjflkajsdflkajsklfjas"
          />
          <TextField.Slot>
            <RightIcon className="h-5 w-5 text-gray-400" />
            <Button
              intent="secondary"
              size="xs"
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? "Hide Password" : "Show"}
            </Button>
          </TextField.Slot>
        </TextField.Root>
      </SectionSpacer>

      <Dialog.Dialog open={loading} onOpenChange={(open) => setLoading(open)}>
        <SectionSpacer>
          <Dialog.DialogTrigger asChild>
            <LoadingButton
              intent="primary-frida"
              iconBefore={<LockClosedIcon />}
              iconAfter={<ChevronDoubleRightIcon />}
              isLoading={loading}
            >
              Checkout
            </LoadingButton>
          </Dialog.DialogTrigger>
        </SectionSpacer>

        <Dialog.DialogContent open={loading}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos. Curabitur tempus urna at turpis condimentum
          lobortis.
        </Dialog.DialogContent>
      </Dialog.Dialog>

      <SectionSpacer>
        <Stack
          direction="row"
          spacing="extraLoose"
          justify="spaceBetween"
          asChild
        >
          <div className="bg-slate-400">
            <Button>Click</Button>
            <Button intent="primary-frida">Me</Button>
            <Button intent="secondary">Or Me?</Button>
          </div>
        </Stack>
      </SectionSpacer>

      <SectionSpacer>
        <Collapsible.Root>
          <Collapsible.Trigger asChild>
            <Button intent="primary-frida">Expand me</Button>
          </Collapsible.Trigger>

          <Collapsible.Content>
            klasjdflkasjdfla lkasd falksdf j klasjdflkasjdfla lkasd falksdf j
            klasjdflkasjdfla lkasd falksdf j klasjdflkasjdfla lkasd falksdf j
            klasjdflkasjdfla lkasd falksdf j klasjdflkasjdfla lkasd falksdf j
            klasjdflkasjdfla lkasd falksdf j klasjdflkasjdfla lkasd falksdf j
            klasjdflkasjdfla lkasd falksdf j klasjdflkasjdfla lkasd falksdf j
            klasjdflkasjdfla lkasd falksdf j
          </Collapsible.Content>
        </Collapsible.Root>
      </SectionSpacer>

      <SectionSpacer>
        <Card>
          <CardItemRow>
            <Button
              size="sm"
              intent="primary-frida"
              onClick={() => setExpanded((prev) => !prev)}
            >
              Click to Expand
            </Button>
          </CardItemRow>
          {expanded && <CardItemRow className="bg-red-300">World</CardItemRow>}
          <CardItemRow>Foo</CardItemRow>
          <CardItemRow>Bar</CardItemRow>
          <CardItemRow>Baz</CardItemRow>
        </Card>
      </SectionSpacer>
    </div>
  );
}

export default App;
