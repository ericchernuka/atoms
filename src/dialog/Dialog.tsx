import React, { Fragment } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  type DialogContentProps,
  type DialogProps as DialogPrimitiveProps,
} from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Transition } from "@headlessui/react";

type DialogElement = React.ElementRef<typeof DialogPrimitive.Content>;
interface DialogProps extends DialogContentProps {}

const DialogContent = React.forwardRef<DialogElement, DialogProps>(
  ({ children, title, ...props }, forwardedRef) => {
    const { open } = useInnerDialogContext();

    return (
      <DialogPrimitive.Portal forceMount className="z-50">
        <Transition.Root show={open}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity grid place-items-center overflow-y-auto"
            >
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 sm:m-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95 motion-reduce:scale-[98%]"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95 motion-reduce:scale-[98%]"
                  >
                    <DialogPrimitive.Content
                      {...props}
                      ref={forwardedRef}
                      forceMount
                      className="relative transform rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-lg w-full flex flex-col divide-y divide-gray-300"
                    >
                      {children}
                    </DialogPrimitive.Content>
                  </Transition.Child>
                </div>
              </div>
            </DialogPrimitive.Overlay>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    );
  }
);

const DialogHeader = (props: DialogPrimitive.DialogTitleProps) => (
  <div className="flex justify-between items-center gap-2 py-4 px-6">
    <DialogPrimitive.Title className="text-lg" {...props} />

    <DialogPrimitive.Close
      aria-label="Close"
      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 hidden sm:block h-6 w-6"
    >
      <XMarkIcon className="h-full w-full" />
    </DialogPrimitive.Close>
  </div>
);

const DialogBody = (props: { children: React.ReactNode }) => (
  <div className="py-4 px-6 overflow-y-auto" {...props} />
);

const DialogFooter = (props: { children: React.ReactNode }) => (
  <div className="py-4 px-6" {...props} />
);

const DialogContext = React.createContext<{ open?: boolean }>({ open: false });
const useInnerDialogContext = () => React.useContext(DialogContext);

const Dialog = (props: DialogPrimitive.DialogProps) => {
  return (
    <DialogContext.Provider value={{ open: props.open }}>
      <DialogPrimitive.Root {...props} />
    </DialogContext.Provider>
  );
};
const DialogTitle = DialogPrimitive.Title;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogDescription = DialogPrimitive.Description;
const DialogClose = DialogPrimitive.Close;

export {
  Dialog as Root,
  DialogTrigger as Trigger,
  DialogContent as Content,
  DialogHeader as Header,
  DialogTitle as Title,
  DialogBody as Body,
  DialogFooter as Footer,
  DialogDescription as Description,
  DialogClose as Close,
  //
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogDescription,
  DialogClose,
};
