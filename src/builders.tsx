import { ReactNode } from "react";
import { TableColumnConfig } from "./types";

const withDefaultMeta = <T,>(
  header: string,
  options?: Partial<TableColumnConfig<T>>,
): Partial<TableColumnConfig<T>> => ({
  sortable: false,
  meta: { title: header, ...(options?.meta ?? {}) },
  ...options,
});

export const textColumn = <T,>(
  id: keyof T | string,
  header: string,
  options?: Partial<TableColumnConfig<T>>,
): TableColumnConfig<T> => ({
  type: "accessor",
  id,
  header,
  ...withDefaultMeta<T>(header, options),
});

export const formattedColumn = <T,>(
  id: keyof T | string,
  header: string,
  format: (value: unknown) => ReactNode,
  options?: Partial<TableColumnConfig<T>>,
): TableColumnConfig<T> => ({
  type: "accessor",
  id,
  header,
  cellTemplate: (_row, value) => <span>{format(value)}</span>,
  ...withDefaultMeta<T>(header, options),
});

export const displayColumn = <T,>(
  id: keyof T | string,
  header: string,
  render: NonNullable<TableColumnConfig<T>["cellTemplate"]>,
  options?: Partial<TableColumnConfig<T>>,
): TableColumnConfig<T> => ({
  type: "display",
  id,
  header,
  cellTemplate: render,
  ...withDefaultMeta<T>(header, options),
});

export const accessorColumn = <T,>(
  id: keyof T | string,
  header: string,
  render: NonNullable<TableColumnConfig<T>["cellTemplate"]>,
  options?: Partial<TableColumnConfig<T>>,
): TableColumnConfig<T> => ({
  type: "accessor",
  id,
  header,
  cellTemplate: render,
  ...withDefaultMeta<T>(header, options),
});
