import {
  ChevronDoubleRightIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { ReactNode, useState } from "react";
import { Button } from "./button/Button";
import { LoadingButton } from "./button/LoadingButton";
import * as Collapsible from "./collapsible/Collapsible";
import { DateInput } from "./date-input/DateInput";
import * as Dialog from "./dialog/Dialog";
import { DateOfBirthField } from "./dob-field/dob-field";
import { FormControl } from "./forms/FormControl";
import { FormErrorMessage } from "./forms/FormFeedback";
import { FormHelperText } from "./forms/FormHelpText";
import { FormLabel } from "./forms/FormLabel";
import { FormGrid } from "./layout/FormGrid";
import * as ListContainerPrimitive from "./list-containers/List";
import * as List from "./list/List";
import { NumberInput } from "./number-input/NumberInput";
import * as CardPrimitive from "./panels/Card";
import * as CardList from "./panels/CardList";
import { Stack } from "./stack/Stack";
import { Text } from "./Text";
import * as TextField from "./text-input/TextInput";

const SectionSpacer = (props: { children: ReactNode }) => (
  <div className="p-8" {...props} />
);

function App() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
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
          <Text weight="semibold" intent="subdued" transform="uppercase">
            Form Controls
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
              <TextField.Input name="firstName" placeholder="asdsadfs" />
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
                max={666}
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
          <div className="bg-slate-200">
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
        <CardPrimitive.Card divided>
          <CardPrimitive.Header>Welcome</CardPrimitive.Header>
          <CardPrimitive.Content>
            Officia tempor est deserunt fugiat veniam.
          </CardPrimitive.Content>
          <CardPrimitive.Content inset="none">
            <div className="p-20">
              Consectetur elit elit cillum ipsum non consectetur enim
              exercitation in irure nisi. Id laboris eu non mollit tempor sit
              sunt ea enim. Deserunt est exercitation ipsum voluptate culpa
              laboris minim ipsum qui ipsum. Sit magna eu consequat occaecat
              nostrud quis sit qui et. Fugiat cillum laborum amet magna cillum
              cupidatat proident cillum. Culpa pariatur in elit ex.
            </div>
          </CardPrimitive.Content>
          <CardPrimitive.Content>
            <Stack direction="column" spacing="extraLoose">
              <List.Root listType="ordered">
                <List.Item>First</List.Item>
                <List.Item>Second</List.Item>
                <List.Item>Third</List.Item>
              </List.Root>
              <List.Root>
                <List.Item>Let's</List.Item>
                <List.Item>Get</List.Item>
                <List.Item>Listing</List.Item>
              </List.Root>
              <List.Root listType="none">
                <List.Item>Right</List.Item>
                <List.Item>To</List.Item>
                <List.Item>The</List.Item>
                <List.Item>Edge</List.Item>
              </List.Root>
              <List.Root listType="ordered" position="inside">
                <List.Item>First</List.Item>
                <List.Item>Second</List.Item>
                <List.Item>Third</List.Item>
              </List.Root>
            </Stack>
          </CardPrimitive.Content>
          <CardPrimitive.Content>
            And lastly, a tiny bit of footer text
          </CardPrimitive.Content>
        </CardPrimitive.Card>
      </SectionSpacer>

      <SectionSpacer>
        <CardList.Root>
          <CardList.Card divided>
            <CardPrimitive.Header>Hello</CardPrimitive.Header>
            <CardPrimitive.Content>World!</CardPrimitive.Content>
          </CardList.Card>

          <CardList.Card divided>
            <CardPrimitive.Header>Hello</CardPrimitive.Header>
            <CardPrimitive.Content>World!</CardPrimitive.Content>
          </CardList.Card>
        </CardList.Root>
      </SectionSpacer>

      <SectionSpacer>
        <ListContainerPrimitive.Root>
          <ListContainerPrimitive.Item>
            <CardPrimitive.Card divided>
              <CardPrimitive.Header>Hello</CardPrimitive.Header>
              <CardPrimitive.Content>World!</CardPrimitive.Content>
            </CardPrimitive.Card>
          </ListContainerPrimitive.Item>
          <ListContainerPrimitive.Item>
            <CardPrimitive.Card>
              <CardPrimitive.Header>Hello</CardPrimitive.Header>
              <CardPrimitive.Content>World!</CardPrimitive.Content>
            </CardPrimitive.Card>
          </ListContainerPrimitive.Item>
          <ListContainerPrimitive.Item>
            In velit dolor culpa reprehenderit aliqua fugiat. Deserunt ex ad
            anim adipisicing consequat ex reprehenderit duis labore sit duis.
            Labore ea qui cupidatat ut laboris consequat nisi labore
            reprehenderit amet. Exercitation minim est tempor est. Eiusmod sint
            nostrud Lorem cupidatat ullamco. Ea commodo veniam esse mollit.
            Reprehenderit aute deserunt adipisicing veniam nostrud consectetur
            adipisicing sit culpa proident nulla et dolore consequat dolore.
          </ListContainerPrimitive.Item>
        </ListContainerPrimitive.Root>
      </SectionSpacer>
    </div>
  );
}

export default App;
