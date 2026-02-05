# @acme/table-columns

Thin helpers around `@tanstack/react-table` column definitions.

## Install

```bash
pnpm add @acme/table-columns
```

## Usage

```tsx
import {
  buildColumns,
  textColumn,
  formattedColumn,
  displayColumn,
  type TableColumnConfig,
} from '@acme/table-columns';

const columns = [
  textColumn<Employee>('email', 'Email'),
  formattedColumn<Employee>('createdAt', 'Created', (value) => formatDate(value)),
  displayColumn<Employee>('profile', 'Profile', (row) => (
    <div>{row.original.name}</div>
  )),
];

const tableColumns = buildColumns(columns, {
  fallback: (value) => (value == null ? '—' : value),
  renderActionsColumn: () => actionColumn,
});
```

## Notes

- `buildColumns` returns TanStack `ColumnDef[]`.
- Pass an app-specific `fallback` to control empty rendering.
- Keep UI-specific renderers (badges, avatars, actions) in your app.

## Build

```bash
pnpm build
```
