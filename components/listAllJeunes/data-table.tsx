"use client"

import { ColumnDef, ColumnFiltersState, VisibilityState, getFilteredRowModel, SortingState, getSortedRowModel, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2Icon as Delete, SendHorizonal } from "lucide-react"
import SendSMS from "../sendSMS"
import { bddJeune } from "@/lib/types"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    dataJeunes: bddJeune[]
}

function sendSmsTrigger() {

}

export function DataTable<TData, TValue>({ columns, data, dataJeunes }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const [selection, setSelection] = React.useState<string[]>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div>
            <div className="flex items-center py-4">
                <div className='grid grid-cols-4 gap-2'>
                    <Input
                        placeholder="Filtrer par les prénom..."
                        value={(table.getColumn("prenom")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("prenom")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <Input
                        placeholder="Filtrer par les nom..."
                        value={(table.getColumn("nom")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("nom")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <Input
                        placeholder="Filtrer par N° Téléphone..."
                        value={(table.getColumn("telephone")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("telephone")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <Input
                        placeholder="Filtrer tribu..."
                        value={(table.getColumn("tribu")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("tribu")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Colonnes
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="w-full flex flex-row items-center justify-between gap-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} ligne(s) selecrionné(e).
                </div>
                {(table.getFilteredSelectedRowModel().rows.length > 0) &&
                    <div className="flex flex-row items-center rounded-lg mx-auto w-sm mb-2 p-0">
                        {(table.getFilteredSelectedRowModel().rows.length >= 2) &&
                            <SendSMS from={'TABLE'} listSelected={table.getFilteredSelectedRowModel().rows} data={dataJeunes} />
                        }
                        <Button variant="ghost" size="icon" onClick={() => {
                            console.log('')
                        }
                        } className="text-red-500 hover:bg-red-200 hover:text-red-500 m-1  hover:cursor-pointer">
                            <Delete />
                        </Button>
                    </div>
                }
                <div className="flex items-end mb-2">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">N° de lignes par Page</p>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}
                        >
                            <SelectTrigger className="h-8 w-[100px]">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[{ label: '10', value: 10 }, { label: '20', value: 20 }, { label: '30', value: 30 }, { label: '40', value: 40 }, { label: '50', value: 50 }, { label: '100', value: 100 }, { label: 'Toutes', value: table.getCoreRowModel().rows.length }].map((pageSize) => (
                                    <SelectItem key={pageSize.label} value={`${pageSize.value}`}>
                                        {pageSize.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="text-center">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="text-center">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selectionnées"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Aucun Jeunes inscrit
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Précédent
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Suivant
                </Button>
            </div>
        </div >

    )
}
