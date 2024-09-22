import React from "react";
import { Column, Row, TableCellType } from "../../types";
import classNames from "./Table.module.css";

export const TableBody: React.FC<{
    columns: Column[];
    rows: Row[];
    types: Record<string, TableCellType>;
  }> = ({ columns, rows, types }) => (
    <tbody>
      {rows.map((row, index) => (
        <tr key={index} data-testid={`row-${index}`} role="row">
          {columns.map(({ id }) => (

            <td
              data-testid={`cell-${index}-${id}`} 
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
  