import React from 'react';
import { Table } from './components';
import  tableData  from './data.json';
import { CellType } from './types/table';
import classNames from "./App.module.css";

const types: Record<string, CellType> = {
  number: "number",
  title: "text",
  releaseDate: "date",
  productionBudget: "money",
  worldwideBoxOffice: "money",
};

const App: React.FC = () => {
  return (
    <div className={classNames.app}>
      <Table
        columns={tableData.columns}
        rows={tableData.rows}
        types={types}
        initialSortColumn="number"
        initialSortDirection="ascending"
      />
    </div>
  );
};

export default App;