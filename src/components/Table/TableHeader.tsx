import React from "react";
import { Column, SORT_DIRECTION, SortDirection } from "../../types";
import classNames from "./Table.module.css";

import { ReactComponent as AscIcon } from '../../assets/order-ascending.svg';
import { ReactComponent as DscIcon } from '../../assets/order-descending.svg';

export const TableHeader: React.FC<{ 
  columns: Column[],
  sortColumn: string,
  sortDirection: SortDirection,
  onSortChange: (columnId: string ) => void }> = ({ 
  columns,
  sortColumn,
  sortDirection,
  onSortChange
 }) => (
    <tr>
      {columns.map(({ id, title }) => (
        <th data-testid={id} key={id} onClick={() => onSortChange(id)}>
          {title}
          { sortColumn === id && (
          <>
            {sortDirection ===  SORT_DIRECTION.Ascending ? (
              <AscIcon className={classNames[`sort-icon`]} data-testid="ascending-icon"/>
            ) : (
              <DscIcon className={classNames[`sort-icon`]} data-testid="descending-icon" />
            )}
          </>
        )}
        </th>
      ))}
    </tr>
  );