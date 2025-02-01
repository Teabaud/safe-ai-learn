import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckListItemProps {
  id: string;
  text: string;
  isChecked: boolean;
  onToggle: (id: string) => void;
}

export function CheckListItem({
  id,
  text,
  isChecked,
  onToggle,
}: CheckListItemProps) {
  return (
    <div className="flex items-start space-x-2">
      <Checkbox
        id={id}
        checked={isChecked}
        onCheckedChange={() => onToggle(id)}
      />
      <Label
        htmlFor={id}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {text}
      </Label>
    </div>
  );
}
