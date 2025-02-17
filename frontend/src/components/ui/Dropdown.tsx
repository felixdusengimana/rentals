import * as React from "react";
import { DropdownMenu } from "radix-ui";
import { ReactNode } from "react";

const Dropdown = ({trigger, items}:{trigger: ReactNode, items: {label:string, onClick: ()=>void}[]}) => {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button className="p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700" aria-label="Customise options">
					{trigger}
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content className="min-w-52 w-full bg-white rounded-md shadow-lg p-2 mt-1 flex flex-col gap-3" sideOffset={5}>

          {items?.map((item, index) => (
            <DropdownMenu.Item key={index} className="px-4 cursor-pointer py-2 w-full text-gray-700 hover:bg-gray-100 rounded-md" onClick={item.onClick}>
              {item.label}
            </DropdownMenu.Item>
          ))}

					<DropdownMenu.Arrow className="fill-white text-gray-500" />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};

export default Dropdown;
