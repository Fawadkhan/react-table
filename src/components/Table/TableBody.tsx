import React from "react";
import { Column, Row } from "../../types";
import classNames from "./Table.module.css";

export const TableBody: React.FC<{
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
  