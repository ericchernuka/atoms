import * as TextField from "./text-field/TextField";
import {
  ChevronDoubleRightIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { LoadingButton } from "./button/LoadingButton";
import * as Dialog from "./dialog/Dialog";
import * as Collapsible from "./collapsible/Collapsible";
import { Button } from "./button/Button";
import { Stack } from "./stack/Stack";
import { Card, CardItemRow } from "./card/Card";
import { DateOfBirthField } from "./dob-field/dob-field";

function App() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const RightIcon = show ? EyeIcon : EyeSlashIcon;

  const [dobState, setDobState] = useState<string | undefined>("2026-02-01");

  return (
    <div className="space-y-8">
      <div className="p-8">
        <DateOfBirthField
          onChange={(date) => setDobState(date)}
          value={dobState}
        />
        <button type="button" onClick={() => setDobState("2021-06-12")}>
          Set date
        </button>
      </div>
      <div className="p-8">
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
      </div>

      <Dialog.Dialog open={loading} onOpenChange={(open) => setLoading(open)}>
        <div className="p-8">
          <Dialog.DialogTrigger asChild>
            <LoadingButton
              intent="primary-frida"
              iconBefore={<LockClosedIcon />}
              iconAfter={<ChevronDoubleRightIcon />}
              isLoading={loading}
              onClick={() => setLoading(true)}
            >
              Checkout
            </LoadingButton>
          </Dialog.DialogTrigger>
        </div>

        <Dialog.DialogContent open={loading}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis. Class
          aptent taciti sociosqu ad litora torquent per conubia nostra, per
          inceptos himenaeos. Curabitur tempus urna at turpis condimentum
          lobortis.
        </Dialog.DialogContent>
      </Dialog.Dialog>

      <div className="p-8">
        <Stack direction="row">
          <Button>Click</Button>
          <Button intent="primary-frida">Me</Button>
          <Button intent="secondary">Or Me?</Button>
        </Stack>
      </div>

      <div className="p-8">
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
      </div>

      <div className="p-8">
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
      </div>
    </div>
  );
}

export default App;
