import classNames from "./Table.module.css";
import { TableProps } from '../../types/table';


const Table: React.FC<TableProps>  = ({ columns, rows, types, initialSortColumn, initialSortDirection }) => {
  return (
    <table title="Movies" className={classNames.table}>
      <thead>
        <tr>
          {columns.map(({ id, title }) => (
            <th key={id}>{title}</th>
          ))}
        </tr>
      </thead>

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
    </table>
  );
};

export default Table;
