# @rotsides/table-columns

Thin helpers around `@tanstack/react-table` column definitions.

## Install

```bash
pnpm add @rotsides/table-columns
```

## Usage

```tsx
import {
  buildColumns,
  textColumn,
  formattedColumn,
  displayColumn,
  accessorColumn,
  type TableColumnConfig,
} from "@rotsides/table-columns";

const text = textColumn<User>;
const formatted = formattedColumn<User>;
const display = displayColumn<User>;
const accessor = accessorColumn<User>;

const columns = [
  text("email", "Email"),
  formatted("createdAt", "Created", (value) => formatDate(value)),
  display("profile", "Profile", (row) => <div>{row.original.name}</div>),
  accessor("status", "Status", (_row, value) => (
    <Badge variant={value === "active" ? "success" : "secondary"}>
      {String(value)}
    </Badge>
  )),
];

const tableColumns = buildColumns(columns, {
  fallback: (value) => (value == null ? "—" : value),
  renderActionsColumn: () => actionColumn,
});
```

## Notes

- `buildColumns` returns TanStack `ColumnDef[]`.
- Pass an app-specific `fallback` to control empty rendering.
- Keep UI-specific renderers (badges, avatars, actions) in your app.
- Builder aliases (`const text = textColumn<User>`) are useful to declare the model type once and avoid repeating `<User>` everywhere.

## Build

```bash
pnpm build
```
