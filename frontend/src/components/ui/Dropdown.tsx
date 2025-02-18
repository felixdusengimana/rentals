import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as React from "react";
import { ReactNode } from "react";

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
}

const Dropdown = ({ trigger, children }: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
          {trigger}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white rounded-md shadow-lg p-1 min-w-[180px] z-20" sideOffset={5}>
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
