import { Row, SortConfig, SortDirection, TableCellType } from "../types";

// utlity method to parse date for sorting to take care of edge cases
const parseDateForSorting = (dateString: string): number => {

  const fullDateMatch = dateString.match(/(\d{2})-(\d{2})-(\d{4})/);

  if (fullDateMatch) {
    const [, day, month, year] = fullDateMatch;
    return new Date(`${year}-${month}-${day}`).getTime();
  }

  // a hacky way to add a day/month to the end of the year without any month or day
  const yearMatch = dateString.match(/^\d{4}$/);
  if (yearMatch) {
    return new Date(`${yearMatch[0]}-12-31`).getTime(); 
  }

  // return max safe integer if the date is not in the correct format to sort it at the end e.g "UNKNOWN"
  return Number.MAX_SAFE_INTEGER;
};

const isAscending = (sortDirection: SortDirection): boolean => sortDirection === 'ascending';

export const filterRows = (rows: Row[], filters: Record<string, string>) =>
  rows.filter(row =>
    Object.entries(filters).every(([key, value]) =>
      String(row[key]).toLowerCase().includes(value.toLowerCase())
    )
  );

const sortByType = (a: any, b: any, columnType: TableCellType, sortDirection: SortDirection): number => {
  if (columnType === 'number' || columnType === 'money') {
    return isAscending(sortDirection) ? Number(a) - Number(b) : Number(b) - Number(a);
  }

  if (columnType === 'date') {
    const dateA = parseDateForSorting(a);
    const dateB = parseDateForSorting(b);
    return isAscending(sortDirection) ? dateA - dateB : dateB - dateA;
  }

  return isAscending(sortDirection)
    ? String(a).localeCompare(String(b)) 
    : String(b).localeCompare(String(a));
};


export const sortRows = (rows: Row[], sortConfig: SortConfig) =>
  [...rows].sort((a, b) => {
    const { sortColumn, sortDirection, columnTypes } = sortConfig;
    const columnType = columnTypes[sortColumn];

    console.log('sortColumn', columnTypes);
    return sortByType(a[sortColumn], b[sortColumn], columnType, sortDirection);
  });