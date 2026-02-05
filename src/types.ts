import type { JSX } from 'react';
import type { Row, Table } from '@tanstack/react-table';

export interface TableColumnConfig<T> {
  type: 'display' | 'accessor';
  id: keyof T | string;
  header?: string;
  size?: number;
  sortable?: boolean;
  enableHiding?: boolean;
  headerTemplate?: (table: Table<T>) => JSX.Element;
  cellTemplate?: (row: Row<T>, value: unknown) => JSX.Element;
  meta?: Record<string, unknown>;
}
