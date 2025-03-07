import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const LimitOptions: number[] = [5, 10, 15, 20, 30, 40, 50, 100];

export const TableEntriesPerPageSelect = ({
    limit,
    onLimitChange,
}: Readonly<{
    limit: number;
    onLimitChange: (limit: number) => void;
}>) => (
    <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground">Show</span>
        <Select
            onValueChange={(value) => onLimitChange(Number(value))}
            value={String(limit)}
        >
            <SelectTrigger className="w-20 h-9">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {LimitOptions.map((opt) => (
                    <SelectItem key={opt} value={opt.toString()}>
                        {opt}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground">entries</span>
    </div>
);

export const TablePagination = ({
    page,
    limit,
    total,
    onPageChange,
}: Readonly<{
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
}>) => {
    const totalPages = Math.ceil(total / limit);
    if (totalPages <= 1) return null;
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
                Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of{" "}
                {total} entries
            </div>
            <nav aria-label="Pagination">
                <div className="flex flex-wrap justify-center gap-1">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => onPageChange(page - 1)}
                        aria-label="Go to previous page"
                    >
                        Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <Button
                            key={p}
                            variant={p === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => onPageChange(p)}
                            aria-label={`Go to page ${p}`}
                            aria-current={p === page ? "page" : undefined}
                        >
                            {p}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={page === totalPages}
                        onClick={() => onPageChange(page + 1)}
                        aria-label="Go to next page"
                    >
                        Next
                    </Button>
                </div>
            </nav>
        </div>
    );
};
