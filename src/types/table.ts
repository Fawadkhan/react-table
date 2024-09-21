export interface Column {
  id: string;
  title: string;
}

export interface Row {
  [key: string]: string | number | undefined;
}

export type TableCellType = 'number' | 'text' | 'date' | 'money';

export interface TableProps {
  columns: Column[];
  rows: Row[];
  types: Record<string, TableCellType>;
  initialSortColumn: string;
  initialSortDirection: 'ascending';
}

export const columnTypes: Record<string, TableCellType> = {
  number: "number",
  title: "text",
  releaseDate: "date",
  productionBudget: "money",
  worldwideBoxOffice: "money",
};


export type SortDirection = 'ascending' | 'descending';