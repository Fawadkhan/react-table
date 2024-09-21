import React from 'react';
import { Table } from './components';
import  tableData  from './data.json';
import { columnTypes } from './types/table';
import classNames from "./App.module.css";


const App: React.FC = () => {
  return (
    <div className={classNames.app}>
      <Table
        columns={tableData.columns}
        rows={tableData.rows}
        types={columnTypes}
        initialSortColumn="number"
        initialSortDirection="ascending"
      />
    </div>
  );
};

export default App;