import React from "react";
import { Column } from "../../types";

export const TableHeader: React.FC<{ columns: Column[] }> = ({ columns }) => (
    <tr>
      {columns.map(({ id, title }) => (
        <th key={id}>{title}</th>
      ))}
    </tr>
  );