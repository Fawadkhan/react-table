export interface Column {
  id: string;
  title: string;
}

export interface Row {
  [key: string]: string | number | undefined;
}

export type CellType = 'number' | 'text' | 'date' | 'money';

export interface TableProps {
  columns: Column[];
  rows: Row[];
  types: Record<string, CellType>;
  initialSortColumn: string;
  initialSortDirection: 'ascending' | 'descending';
}

export type SortDirection = 'ascending' | 'descending';