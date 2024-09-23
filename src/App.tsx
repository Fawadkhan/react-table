import React from 'react';
import { Table } from './components';
import  tableData  from 'data/data.json';
import { columnTypes } from './types/table';
import classNames from "./App.module.css";
import { ErrorBoundary } from 'react-error-boundary';


const App: React.FC = () => {

  const logError = (error: Error, info: { componentStack?: any  }) => {
    console.error(error, info);
  };
  
  return (
    <ErrorBoundary fallback={<div>Something went wrong. Please refresh the page</div>} onError={logError}>
    <div className={classNames.app}>
      <Table
        columns={tableData.columns}
        rows={tableData.rows}
        types={columnTypes}
        initialSortColumn="number"
        initialSortDirection="ascending"
      />
    </div>
    </ErrorBoundary>
  );
};

export default App;