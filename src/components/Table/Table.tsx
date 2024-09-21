import React, { useState, useMemo } from 'react';
import classNames from "./Table.module.css";
import { TableProps, Column, Row } from '../../types';
import { filterRows } from '../../utils';

const TableHeader: React.FC<{ columns: Column[] }> = ({ columns }) => (
  <tr>
    {columns.map(({ id, title }) => (
      <th key={id}>{title}</th>
    ))}
  </tr>
);

const FilterRow: React.FC<{
  columns: Column[];
  filters: Record<string, string>;
  onFilterChange: (columnId: string, value: string) => void;
}> = ({ columns, filters, onFilterChange }) => (
  <tr>
    {columns.map(({ id }) => (
      <th key={id}>
        <input
          type="text"
          placeholder={`Filter ${id}`}
          onChange={(e) => onFilterChange(id, e.target.value)}
          value={filters[id] || ''}
        />
      </th>
    ))}
  </tr>
);

const TableBody: React.FC<{
  columns: Column[];
  rows: Row[];
  types: Record<string, string>;
}> = ({ columns, rows, types }) => (
  <tbody>
    {rows.map((row, index) => (
      <tr key={index}>
        {columns.map(({ id }) => (
          <td
            data-testid={`row-${index}-${id}`}
            className={classNames[`cell-type-${types[id]}`]}
            key={id}
          >
            {row[id]}
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);


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
        <FilterRow 
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
