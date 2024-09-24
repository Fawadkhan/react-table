import React from "react";
import { Column } from "types";
import classNames from "./Table.module.css";
// @ts-ignore
import DOMPurify from "dompurify";

export const TableFilterRow: React.FC<{
  columns: Column[];
  filters: Record<string, string>;
  onFilterChange: (columnId: string, value: string) => void;
}> = ({ columns, filters, onFilterChange }) => {
  const handleFilterChange = (id: string, value: string) => {
    const sanitized = DOMPurify.sanitize(value);
    onFilterChange(id, sanitized);
  };

  return (
    <tr>
      {columns.map(({ id }) => (
        <th key={id}>
          <input
            type="text"
            className={classNames[`table-input`]}
            placeholder={`Filter ${id}`}
            onChange={(e) => handleFilterChange(id, e.target.value)}
            value={filters[id] || ""}
          />
        </th>
      ))}
    </tr>
  );
};
