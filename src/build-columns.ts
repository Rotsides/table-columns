import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import type { ReactNode } from 'react';
import { TableColumnConfig } from './types';

export type FallbackFn = (value: unknown) => ReactNode;

export interface BuildColumnsOptions<T> {
  fallback?: FallbackFn;
  renderActionsColumn?: () => ColumnDef<T>;
}

export function buildColumns<T>(
  columns: TableColumnConfig<T>[],
  options?: BuildColumnsOptions<T>,
): ColumnDef<T>[] {
  const columnHelper = createColumnHelper<T>();
  const fallback = options?.fallback ?? ((value) => (value == null ? '—' : value));

  const resolved = columns.map((column) => {
    const columnKey = column.id as string;

    if (column.type === 'display') {
      return columnHelper.display({
        id: columnKey,
        header: ({ table }) => column.headerTemplate?.(table) ?? column.header ?? null,
        cell: ({ row, getValue }) =>
          column.cellTemplate ? column.cellTemplate(row, getValue()) : fallback(getValue()),
        enableSorting: column.sortable ?? false,
        enableHiding: column.enableHiding,
        size: column.size ?? 100,
        meta: column.meta,
      });
    }

    return {
      accessorKey: columnKey,
      id: columnKey,
      header: column.header,
      cell: ({ row, getValue }) =>
        column.cellTemplate ? column.cellTemplate(row, getValue()) : fallback(getValue()),
      size: column.size ?? 150,
      enableSorting: column.sortable ?? false,
      enableHiding: column.enableHiding,
      meta: column.meta,
    } satisfies ColumnDef<T>;
  });

  if (options?.renderActionsColumn) {
    return [...resolved, options.renderActionsColumn()];
  }

  return resolved;
}
