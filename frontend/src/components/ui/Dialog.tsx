import React, { ReactNode, useImperativeHandle, useState, forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { IoClose } from 'react-icons/io5';

interface DialogProps {
  trigger: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
}

export interface CustomDialogRef {
  close: () => void;
}

const CustomDialog = forwardRef<CustomDialogRef, DialogProps>(({ trigger, title, description, children }: DialogProps, ref) => {
  const [open, setOpen] = useState(false);

  // Expose the `close` method to parent components using the ref
  useImperativeHandle(ref, () => ({
    close: () => {
      setOpen(false); // Close the dialog by setting open to false
    }
  }));

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md w-[90vw] bg-white rounded-md shadow-xl z-50 focus:outline-none overflow-hidden">
          <div className="p-4 max-h-[80vh] overflow-y-auto">
            <Dialog.Title className="text-xl font-semibold">{title}</Dialog.Title>
            <Dialog.Description className="text-sm mb-4">{description}</Dialog.Description>
            {children}
            <Dialog.Close asChild>
              <button className="absolute top-2 right-2 p-2 bg-white rounded-md" onClick={() => setOpen(false)}><IoClose/> </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

export default CustomDialog;
