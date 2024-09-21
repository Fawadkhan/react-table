import React, { useState, useMemo } from 'react';
import classNames from "./Table.module.css";
import { TableProps } from '../../types';
import { filterRows } from '../../utils';
import { TableHeader } from './TableHeader';
import { TableFilterRow } from './TableFilterRow';
import { TableBody } from './TableBody';




const Table: React.FC<TableProps> = ({ columns, rows, types }) => {
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters(prev => ({ ...prev, [columnId]: value }));
  };

  const filteredRows = useMemo(() => {
    return filterRows(rows, filters);
  }, [rows, filters]);

  return (
    <table title="Movies" className={classNames.table}>
      <thead>
        <TableHeader columns={columns} />
        <TableFilterRow 
          columns={columns}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </thead>
      <TableBody
        columns={columns}
        rows={filteredRows}
        types={types}
      />
    </table>
  );
};

export default Table;
