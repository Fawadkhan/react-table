import React, { useState, useMemo } from 'react';
import classNames from "components/Table/Table.module.css";
import { SORT_DIRECTION, SortDirection, TableProps } from 'types';
import { filterRows, sortRows } from 'utils';
import { TableHeader } from './TableHeader';
import { TableFilterRow } from './TableFilterRow';
import { TableBody } from './TableBody';

const TableTitle: React.FC = () => (
  <>
    <h3>Sortable and Filterable Table</h3>
    <p style={{ fontSize: "0.9em", color: "#6c757d" }}>
      Click on the column titles to sort the table.
    </p>
  </>
);


const Table: React.FC<TableProps> = ({ columns, rows, types, initialSortColumn, initialSortDirection }) => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortColumn, setSortColumn] = useState<string>(''); // default sort
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialSortDirection);

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters(prev => ({ ...prev, [columnId]: value }));
  };

  const handleSortChange = (columnId: string) => {
    if (columnId === sortColumn) {
      setSortDirection(prev => (prev === SORT_DIRECTION.Ascending ?  SORT_DIRECTION.Descending :  SORT_DIRECTION.Ascending));
    } else {
      setSortColumn(columnId);
      setSortDirection(SORT_DIRECTION.Ascending);
    }
  }

  const filteredRows = useMemo(() => filterRows(rows, filters), [rows, filters]);

  const sortedRows = useMemo(() => sortRows(filteredRows, {
    sortColumn, sortDirection, columnTypes: types
  }), [filteredRows, sortColumn, sortDirection, types]);

  return (
    <>
    <TableTitle />
    <table title="Movies" className={classNames.table}>
      <thead>
        <TableHeader 
          columns={columns}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />
        <TableFilterRow 
          columns={columns}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </thead>
      <TableBody
        columns={columns}
        rows={sortedRows}
        types={types}
      />
    </table>
    </>
  );
};

export default Table;
