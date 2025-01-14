import {
  ChevronDoubleRightIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "./button/Button";
import { LoadingButton } from "./button/LoadingButton";
import { CharacterCount } from "./character-count/CharacterCount";
import * as CollapsiblePrimitive from "./collapsible/Collapsible";
import { DateInput } from "./date-input/DateInput";
import { Brand } from "./design-system/types";
import * as Dialog from "./dialog/Dialog";
import { DateOfBirthField } from "./dob-field/dob-field";
import { FormControl } from "./forms/FormControl";
import { FormErrorMessage } from "./forms/FormErrorMessage";
import { FormHelperText } from "./forms/FormHelperText";
import { FormLabel } from "./forms/FormLabel";
import { FormGrid } from "./layout/FormGrid";
import * as ListContainerPrimitive from "./list-containers/List";
import * as List from "./list/List";
import { NumberInput } from "./number-input/NumberInput";
import * as CardPrimitive from "./panels/Card";
import * as CardList from "./panels/CardList";
import { inputClasses } from "./shared-utils/design";
import { HStack, Stack } from "./stack/Stack";
import { Text } from "./Text";
import * as TextField from "./text-input/TextInput";
import { TextArea } from "./textarea/TextArea";

const SectionSpacer = (props: { children: ReactNode }) => (
  <div className="p-8 flex flex-col items-start space-y-2 w-full" {...props} />
);

const Header = ({
  level = 2,
  ...props
}: {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}) => {
  const Component = `h${level}` as const;

  return (
    <Text
      asChild
      size="lg"
      weight="semibold"
      intent="subdued"
      transform="uppercase"
    >
      <Component {...props} />
    </Text>
  );
};

const BRANDS: Brand[] = ["freddie", "frida", "purposemed"];

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [brand, setBrand] = useState<Brand>(BRANDS[0]);
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState(-123.1231);
  const [description, setDescription] = useState("");
  const descriptionLimit = 20;
  const isDescriptionInvalid = description.length > descriptionLimit;

  const RightIcon = showPassword ? EyeIcon : EyeSlashIcon;

  const [dobState, setDobState] = useState<string | undefined>("2026-02-01");
  const isInvalid = false;
  const isDisabled = false;
  const isReadOnly = false;

  useEffect(() => {
    document.body.setAttribute("data-brand", brand);
  }, [brand]);

  return (
    <div className="space-y-8">
      <div className="sticky top-0 z-50 bg-white p-4">
        <select
          className={inputClasses("form-select max-w-md", {
            includeReadOnly: false,
          })}
          onChange={(e) => setBrand(e.target.value as Brand)}
        >
          {BRANDS.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <SectionSpacer>
        <Stack direction="column" shouldFillContainer>
          <Header>Form Controls</Header>
          <FormGrid columns={6}>
            <FormControl
              isInvalid={isInvalid}
              disabled={isDisabled}
              readOnly={isReadOnly}
              className="sm:col-span-2"
            >
              <FormLabel>First Name</FormLabel>
              <FormHelperText>This is a helper text.</FormHelperText>
              <TextField.Input name="firstName" placeholder="asdsadfs" />
              <FormErrorMessage>This is an error message.</FormErrorMessage>
            </FormControl>
            <FormControl
              required={false}
              isInvalid={isInvalid}
              disabled={isDisabled}
              readOnly={isReadOnly}
              className="sm:col-span-4"
            >
              <FormLabel>Age</FormLabel>
              <NumberInput
                name="age"
                value={number}
                max={666}
                onChange={(val) => setNumber(val)}
              />
              <FormErrorMessage>Incorrect age.</FormErrorMessage>
            </FormControl>

            <FormControl
              required={false}
              isInvalid={isDescriptionInvalid}
              disabled={isDisabled}
              readOnly={isReadOnly}
              className="sm:col-span-6"
            >
              <HStack justify="spaceBetween">
                <FormLabel>Description</FormLabel>
                <CharacterCount
                  count={description.length}
                  limit={descriptionLimit}
                />
              </HStack>
              <FormHelperText>Tell us about yourself</FormHelperText>
              <TextArea
                name="description"
                rows={4}
                value={description}
                onChange={(val) => setDescription(val)}
              />
              <FormErrorMessage>
                Description exceeds maximum character limit of{" "}
                {descriptionLimit}
              </FormErrorMessage>
            </FormControl>

            <FormControl
              required={false}
              isInvalid={isInvalid}
              disabled={isDisabled}
              readOnly={isReadOnly}
              className="sm:col-span-4"
            >
              <FormLabel>Date</FormLabel>
              <FormHelperText>This is a helper text.</FormHelperText>
              <DateInput name="date" defaultValue="2023-01-20" />
              <FormErrorMessage>This is an error message.</FormErrorMessage>
            </FormControl>
          </FormGrid>
        </Stack>
      </SectionSpacer>
      <SectionSpacer>
        <Header>DOB Input</Header>
        <DateOfBirthField
          onChange={(date) => setDobState(date)}
          value={dobState}
        />
        <button type="button" onClick={() => setDobState("2021-06-12")}>
          Set date
        </button>
      </SectionSpacer>
      <SectionSpacer>
        <Header>Text Field</Header>

        <TextField.Root>
          <TextField.Slot>
            <LockClosedIcon className="h-5 w-5 text-gray-400" />
          </TextField.Slot>
          <TextField.Input
            type={showPassword ? "text" : "password"}
            defaultValue="kalsdjflkajsdflkajsklfjaskalsdjflkajsdflkajsklfjas"
          />
          <TextField.Slot>
            <RightIcon className="h-5 w-5 text-gray-400" />
            <Button
              intent="secondary"
              size="xs"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide Password" : "Show"}
            </Button>
          </TextField.Slot>
        </TextField.Root>
      </SectionSpacer>

      <SectionSpacer>
        <Header>Loading Button</Header>
        <LoadingButton
          intent="primary"
          icon={ChevronDoubleRightIcon}
          isLoading={loading}
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
          }}
        >
          Save
        </LoadingButton>
      </SectionSpacer>

      <SectionSpacer>
        <Header>Dialog</Header>

        <Dialog.Root
          open={isDialogOpen}
          onOpenChange={(open) => setIsDialogOpen(open)}
        >
          <Dialog.DialogTrigger asChild>
            <LoadingButton intent="primary" icon={ChevronDoubleRightIcon}>
              Checkout
            </LoadingButton>
          </Dialog.DialogTrigger>

          <Dialog.Content>
            <Dialog.Header>Welcome</Dialog.Header>
            <Dialog.Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Curabitur tempus urna at turpis condimentum
              lobortis.
            </Dialog.Description>
            <Dialog.Footer>
              <Dialog.Close asChild>
                <Button intent="secondary" shouldFillContainer>
                  Cancel
                </Button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Button shouldFillContainer intent="primary">
                  Deactivate
                </Button>
              </Dialog.Close>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Root>
      </SectionSpacer>
      <SectionSpacer>
        <Header>Stack</Header>
        <Stack
          direction="row"
          spacing="tight"
          justify="spaceBetween"
          align="center"
          shouldFillContainer
          asChild
        >
          <div className="bg-slate-200 p-2">
            <Button>Click</Button>
            <Button intent="primary">Me</Button>
            <Stack
              direction="column"
              spacing="extraLoose"
              justify="spaceBetween"
              // shouldFillContainer
              asChild
            >
              <div className="bg-slate-200 p-2">
                <Button>Click</Button>
                <Button intent="primary">Me</Button>
                <Button intent="secondary">Or Me?</Button>
              </div>
            </Stack>
          </div>
        </Stack>
      </SectionSpacer>

      <SectionSpacer>
        <Header>Collapsible</Header>
        <CollapsiblePrimitive.Root>
          <CollapsiblePrimitive.Trigger asChild>
            <Button intent="primary">Expand me</Button>
          </CollapsiblePrimitive.Trigger>

          <CollapsiblePrimitive.Content>
            klasjdflkasjdfla lkasd falksdf j klasjdflkasjdfla lkasd falksdf j
            klasjdflkasjdfla lkasd falksdf j klasjdflkasjdfla lkasd falksdf j
            klasjdflkasjdfla lkasd falksdf j klasjdflkasjdfla lkasd falksdf j
            klasjdflkasjdfla lkasd falksdf j klasjdflkasjdfla lkasd falksdf j
            klasjdflkasjdfla lkasd falksdf j klasjdflkasjdfla lkasd falksdf j
            klasjdflkasjdfla lkasd falksdf j
          </CollapsiblePrimitive.Content>
        </CollapsiblePrimitive.Root>
      </SectionSpacer>

      <SectionSpacer>
        <Header>Cards</Header>

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
        <Header>Card List</Header>
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
        <Header>List Container</Header>
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
