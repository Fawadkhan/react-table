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
      "number": 13,
      "releaseDate": "06-05-2016",
      "title": "Captain America: Civil War",
      "productionBudget": 250000000,
      "worldwideBoxOffice": 1153304495
    },
    {
      "number": 3,
      "releaseDate": "07-05-2010",
      "title": "Iron Man 2",
      "productionBudget": 170000000,
      "worldwideBoxOffice": 621156389
    },
    {
      "number": 4,
      "releaseDate": "06-05-2011",
      "title": "Thor",
      "productionBudget": 150000000,
      "worldwideBoxOffice": 449326618
    },
  
    {
      "number": 6,
      "releaseDate": "04-05-2012",
      "title": "The Avengers",
      "productionBudget": 225000000,
      "worldwideBoxOffice": 1519479547
    },
  ]