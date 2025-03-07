import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const TableSearchInput = ({
    value,
    onChange,
    placeholder,
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
}) => (
    <div className="relative">
        <Input
            type="text"
            placeholder={placeholder}
            className="w-full sm:w-64 pl-10"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
        <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={16}
        />
    </div>
);
