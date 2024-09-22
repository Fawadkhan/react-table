import { TableCellType } from "../../types";

const numberColumn = { id: "numberColumn", title: "Number column" };
const textColumn = { id: "textColumn", title: "Text column" };
const dateColumn = { id: "dateColumn", title: "Date column" };
const moneyColumn = { id: "moneyColumn", title: "Money column" };

export const mockColumns = [numberColumn, textColumn, dateColumn, moneyColumn];
export const mockTypes: Record<string, TableCellType> = {
  numberColumn: 'number',
  textColumn: 'text',
  dateColumn: 'date',
  moneyColumn: 'money',
};

export const mockRows = [
    {
      "numberColumn": 13,
      "dateColumn": "06-05-2016",
      "textColumn": "Captain America: Civil War",
      "moneyColumn": 250000000,
    },
    {
      "numberColumn": 3,
      "dateColumn": "07-05-2010",
      "textColumn": "Iron Man 2",
      "moneyColumn": 170000000,
    },
    {
      "numberColumn": 4,
      "dateColumn": "06-05-2011",
      "textColumn": "Thor",
      "moneyColumn": 150000000,
    },
  ]