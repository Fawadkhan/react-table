import React, { useState, useMemo } from 'react';
import classNames from "./Table.module.css";
import { SortDirection, TableProps } from '../../types';
import { filterRows, sortRows } from '../../utils';
import { TableHeader } from './TableHeader';
import { TableFilterRow } from './TableFilterRow';
import { TableBody } from './TableBody';




const Table: React.FC<TableProps> = ({ columns, rows, types, initialSortColumn, initialSortDirection }) => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortColumn, setSortColumn] = useState<string>(initialSortColumn);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialSortDirection);

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters(prev => ({ ...prev, [columnId]: value }));
  };

  const handleSortChange = (columnId: string) => {
    if (columnId === sortColumn) {
      setSortDirection(prev => (prev === 'ascending' ? 'descending' : 'ascending'));
    } else {
      setSortColumn(columnId);
      setSortDirection('ascending');
    }
  }

  const filteredAndSortedRows = useMemo(() => {
     const filteredRows = filterRows(rows, filters);
    return sortRows(filteredRows, sortColumn, sortDirection, types);
  }, [rows, filters, sortColumn, sortDirection, types]);


  return (
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
        rows={filteredAndSortedRows}
        types={types}
      />
    </table>
  );
};

export default Table;
