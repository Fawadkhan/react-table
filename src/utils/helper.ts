import { Row, SortDirection, TableCellType } from "../types";

// utlity method to parse date for sorting. 
const parseDateForSorting = (dateString: string): number => {
  if (!dateString || dateString.toLowerCase() === 'unknown') {
    return Number.MAX_SAFE_INTEGER;
  }

  const fullDateMatch = dateString.match(/(\d{2})-(\d{2})-(\d{4})/);
  if (fullDateMatch) {
    const [, day, month, year] = fullDateMatch;
    return new Date(`${year}-${month}-${day}`).getTime();
  }

  const yearMatch = dateString.match(/^\d{4}$/);
  if (yearMatch) {
    return new Date(`${yearMatch[0]}-12-31`).getTime();
  }

  return Number.MAX_SAFE_INTEGER;
};


export const filterRows = (rows: Row[], filters: Record<string, string>) =>
  rows.filter(row =>
    Object.entries(filters).every(([key, value]) =>
      String(row[key]).toLowerCase().includes(value.toLowerCase())
    )
  );



const sortByType = (a: any, b: any, columnType: TableCellType, sortDirection: SortDirection): number => {
  if (columnType === 'number' || columnType === 'money') {
    return sortDirection === 'ascending' ? Number(a) - Number(b) : Number(b) - Number(a);
  }

  if (columnType === 'date') {
    const dateA = parseDateForSorting(a);
    const dateB = parseDateForSorting(b);
    return sortDirection === 'ascending' ? dateA - dateB : dateB - dateA;
  }

  return sortDirection === 'ascending' 
    ? String(a).localeCompare(String(b)) 
    : String(b).localeCompare(String(a));
};

export const sortRows = (rows: Row[], sortColumn: string, sortDirection: SortDirection, columnTypes: Record<string, TableCellType>) =>
  [...rows].sort((a, b) => {
    const columnType = columnTypes[sortColumn];
    console.log("columnType", columnType, a[sortColumn], b[sortColumn]);
    return sortByType(a[sortColumn], b[sortColumn], columnType, sortDirection);
  });