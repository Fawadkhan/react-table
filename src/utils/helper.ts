import { Row } from "../types";

export const filterRows = (rows: Row[], filters: Record<string, string>) =>
    rows.filter(row =>
      Object.entries(filters).every(([key, value]) =>
        String(row[key]).toLowerCase().includes(value.toLowerCase())
      )
    );
  