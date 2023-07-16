"use client";

import { createColumnHelper } from "@tanstack/react-table";

import { CartsType, ProductsType } from "~/types/common";

const productsColumnHelper = createColumnHelper<ProductsType>();
const cartsColumnHelper = createColumnHelper<CartsType>();

export const productsColumns = [
  productsColumnHelper.accessor("id", {
    header: "ID",
    footer: (info) => info.column.id,
  }),
  productsColumnHelper.accessor("title", {
    header: "Product Name",
    footer: (info) => info.column.id,
  }),
  productsColumnHelper.accessor("brand", {
    header: "Brand",
    footer: (info) => info.column.id,
  }),
  productsColumnHelper.accessor("price", {
    header: "Price",
    footer: (info) => info.column.id,
  }),
  productsColumnHelper.accessor("stock", {
    header: "Stock",
    footer: (info) => info.column.id,
  }),
  productsColumnHelper.accessor("category", {
    header: "Category",
    footer: (info) => info.column.id,
  }),
];

export const cartsColumns = [
  cartsColumnHelper.accessor("id", {
    header: "ID",
    footer: (info) => info.column.id,
  }),
  cartsColumnHelper.accessor("products", {
    header: "Products",
    cell: ({ row }) => {
      // @ts-ignore
      return `${row.original.products[0].title} and ${row.original.products.length - 1} more`;
    },
    footer: (info) => info.column.id,
  }),
  cartsColumnHelper.accessor("total", {
    header: "Total Price",
    footer: (info) => info.column.id,
  }),
  cartsColumnHelper.accessor("discountedTotal", {
    header: "Total Discounts",
    footer: (info) => info.column.id,
  }),
  cartsColumnHelper.accessor("totalProducts", {
    header: "Total Items Types",
    footer: (info) => info.column.id,
  }),
  cartsColumnHelper.accessor("totalQuantity", {
    header: "Total Amounts",
    footer: (info) => info.column.id,
  }),
];
