"use-client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import React from "react";

interface DropDownComponentProps {
  label: string;
  dropdown_values: string[];
  onChange?: (value: string) => void;
  id: string;
}

export function DropDownComponenet({
  label,
  dropdown_values,
  onChange,
  id,
}: DropDownComponentProps) {
  const [position, setPosition] = React.useState("Select an option");

  React.useEffect(() => {
    if (dropdown_values.length > 0) {
      setPosition(dropdown_values[0]);
    } else {
      setPosition("Select an option");
    }
  }, [dropdown_values]);

  const handleValueChange = (value: string) => {
    setPosition(value);
    onChange?.(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button id={id} variant="outline">
          {position}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent id={`${id}-content`} className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {dropdown_values.length > 0 ? (
          <DropdownMenuRadioGroup
            value={position}
            onValueChange={handleValueChange}
          >
            {dropdown_values.map((dropdown_value) => (
              <DropdownMenuRadioItem
                key={dropdown_value}
                value={dropdown_value}
              >
                {dropdown_value}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        ) : (
          <DropdownMenuLabel className="text-sm text-muted-foreground">
            The current provider does not support this task, consider changing
            the provider.
          </DropdownMenuLabel>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
