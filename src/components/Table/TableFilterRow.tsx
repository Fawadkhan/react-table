import React from "react";
import { Column } from "../../types";

export const TableFilterRow: React.FC<{
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
  