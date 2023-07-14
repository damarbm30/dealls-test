"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  Column,
  Table,
  ColumnDef,
} from "@tanstack/react-table";

import { InputHTMLAttributes, useEffect, useMemo, useState } from "react";
import { CartsType, ProductsType } from "~/types/common";

type Props = {
  columns: ColumnDef<any, unknown>[];
  data: {
    products?: ProductsType[];
    carts?: CartsType[];
  };
  page: string;
};

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">) => {
  const [value, setValue] = useState(initialValue);

  // set initial value state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // set debounce using useEffect
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);

      // remove item from local storage when it's empty
      // to handle undefined value
      if (!value) localStorage.removeItem(props.name as string);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
};

const Filter = ({ column, table }: { column: Column<any, unknown>; table: Table<any> }) => {
  const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  // get column id which is being filled
  const searchKey = (column.getFilterValue() && column.id) as string;
  const searchValue = column.getFilterValue() as string;

  // undefined left 1 character
  if (typeof searchKey !== "undefined" && typeof searchValue !== "undefined")
    localStorage.setItem(searchKey, searchValue);

  const sortedUniqueValues = useMemo(
    () => (typeof firstValue === "number" ? [] : Array.from(column.getFacetedUniqueValues().keys()).sort()),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <>
      <div className="flex justify-center space-x-2">
        <DebouncedInput
          name={column.id}
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? localStorage.getItem(column.id)?.split(",")[0]}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
          placeholder="Min"
          className="w-24 rounded border pl-2 shadow"
        />
        <DebouncedInput
          name={column.id}
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? localStorage.getItem(column.id)?.split(",")[1]}
          onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
          placeholder="Max"
          className="w-24 rounded border pl-2 shadow"
        />
      </div>
      <div className="h-1" />
    </>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>
      <DebouncedInput
        name={column.id}
        type="text"
        value={(columnFilterValue ?? localStorage.getItem(column.id)) as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder="Search"
        className="rounded border pl-2 shadow"
        list={column.id + "list"}
      />
      <div className="h-1" />
    </>
  );
};

const CustomTable = ({ columns, data, page }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: page === "products" ? (data.products as ProductsType[]) : (data.carts as CartsType[]),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
    },
    onSortingChange: setSorting,
  });

  // make sure if products is not undefined
  // and its array is not empty
  const isProductsExist = data?.products !== undefined && data?.products?.length > 0;
  const isCartsExist = data?.carts !== undefined && data?.carts?.length > 0;

  return (
    <>
      <table className="mb-4 max-w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-2 pb-4">
                  <div className="mb-2 cursor-pointer" onClick={header.column.getToggleSortingHandler()}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: " ⇧",
                      desc: " ⇩",
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                  {(isProductsExist || isCartsExist) && header.column.getCanFilter() && header.id !== "id" ? (
                    <Filter column={header.column} table={table} />
                  ) : null}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {(isProductsExist || isCartsExist) &&
            table.getRowModel().rows.map((row, idx) => (
              <tr key={row.id} className={`${idx % 2 === 0 ? "bg-secondary" : ""}`}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td key={cell.id} className="px-4 py-2 text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
      {/* pagination handler */}
      <div className="flex justify-center gap-4">
        <button
          disabled={(isProductsExist || isCartsExist) && !table.getCanPreviousPage()}
          className="rounded-md bg-primary px-4 py-1.5 font-bold text-white shadow transition-all hover:bg-white hover:text-primary disabled:bg-primary disabled:text-white disabled:opacity-25"
          onClick={() => table.setPageIndex(0)}
        >
          First
        </button>
        <button
          disabled={(isProductsExist || isCartsExist) && !table.getCanPreviousPage()}
          className="rounded-md px-4 py-1.5 font-bold text-primary shadow transition-all hover:bg-accent hover:text-white disabled:bg-white disabled:text-primary disabled:opacity-25"
          onClick={() => table.previousPage()}
        >
          Previous
        </button>
        <button
          disabled={(isProductsExist || isCartsExist) && !table.getCanNextPage()}
          className="rounded-md px-4 py-1.5 font-bold text-primary shadow transition-all hover:bg-accent hover:text-white disabled:bg-white disabled:text-primary disabled:opacity-25"
          onClick={() => table.nextPage()}
        >
          Next
        </button>
        <button
          disabled={(isProductsExist || isCartsExist) && !table.getCanNextPage()}
          className="rounded-md bg-primary px-4 py-1.5 font-bold text-white shadow transition-all hover:bg-white hover:text-primary disabled:bg-primary disabled:text-white disabled:opacity-25"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Last
        </button>
      </div>
    </>
  );
};
export default CustomTable;