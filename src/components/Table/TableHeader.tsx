import React from "react";
import { Column } from "../../types";
import classNames from "./Table.module.css";

import { ReactComponent as AscIcon } from '../../assets/order-ascending.svg';
import { ReactComponent as DscIcon } from '../../assets/order-descending.svg';

export const TableHeader: React.FC<{ columns: Column[] }> = ({ 
  columns,

 }) => (
    <tr>
      {columns.map(({ id, title }) => (
        <th key={id}>
          {title}
          { title && (
          <>
            {title === 'ascending' ? (
              <AscIcon className={classNames[`sort-icon`]} />
            ) : (
              <DscIcon className={classNames[`sort-icon`]} />
            )}
          </>
        )}
        </th>
      ))}
    </tr>
  );