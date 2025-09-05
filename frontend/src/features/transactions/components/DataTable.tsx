import {
    type ColumnDef,
    type SortingState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export const DataTable = <TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <div data-testid="transactions-table" className="">
            <div className="overflow-hidden rounded-md border min-h-[491.5px]">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="h-10 px-4 text-xs font-bold text-muted-foreground tracking-wider"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="text-left py-3 px-4"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-96 text-center"
                                >
                                    No transaction found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {table.getFilteredRowModel().rows.length > 0 && (
                <div className="flex items-center justify-between mt-4">
                    <div className="text-muted-foreground text-xs flex-1">
                        {(() => {
                            const pageIndex =
                                table.getState().pagination.pageIndex;
                            const pageSize =
                                table.getState().pagination.pageSize;
                            const total =
                                table.getFilteredRowModel().rows.length;

                            const start = pageIndex * pageSize + 1;
                            const end = Math.min(
                                (pageIndex + 1) * pageSize,
                                total
                            );

                            return `Results ${start}-${end} of ${total}`;
                        })()}
                    </div>
                    <div className="flex items-center justify-end space-x-1">
                        <Button
                            variant="pagination"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="w-6 h-6"
                        >
                            <ChevronLeft />
                        </Button>
                        {/* Page Links */}
                        {Array.from({ length: table.getPageCount() }).map(
                            (_, page) => (
                                <Button
                                    key={page}
                                    variant={
                                        table.getState().pagination
                                            .pageIndex === page
                                            ? "default"
                                            : "pagination"
                                    }
                                    size="sm"
                                    className="w-6 h-6"
                                    onClick={() => table.setPageIndex(page)}
                                >
                                    {page + 1}
                                </Button>
                            )
                        )}
                        <Button
                            variant="pagination"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="w-6 h-6"
                        >
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};
