import { fireEvent, render, screen, within } from "@testing-library/react";
import Table from "../../components/Table/Table";
import { mockColumns, mockRows, mockTypes } from "../__mocks__/tableData";
import { SORT_DIRECTION } from "../../types";

describe("Table", () => {
  const columnTable = mockColumns.map(({ id, title }) => [id, title]);

  describe("sorting", () => {
    describe.each(columnTable)('"%s" column', (id, title) => {
      it("should be possible to sort a column.", () => {
        render(
          <Table
            columns={mockColumns}
            rows={mockRows}
            types={mockTypes}
            initialSortColumn=""
            initialSortDirection={SORT_DIRECTION.Ascending}
          />
        );

        const headerTitle = screen.getByText(title);
        fireEvent.click(headerTitle);
        const headerCellKey = screen.getByTestId(id);
        expect(headerCellKey).not.toBeNull();

        const sortIcon = within(headerCellKey).getByTestId("ascending-icon");
        expect(sortIcon).toBeInTheDocument();
      });

      it("should be possible to toggle the sorting direction of a column.", () => {
        render(
          <Table
            columns={mockColumns}
            rows={mockRows}
            types={mockTypes}
            initialSortColumn=""
            initialSortDirection={SORT_DIRECTION.Ascending}
          />
        );

        const headerTitle = screen.getByText(title);

        const headerCellKey = screen.getByTestId(id);
        expect(headerCellKey).not.toBeNull();

        fireEvent.click(headerTitle);
        let sortIcon = within(headerCellKey).getByTestId("ascending-icon");
        expect(sortIcon).toHaveClass("sort-icon");
        expect(sortIcon).toHaveAttribute("data-testid", "ascending-icon");

        fireEvent.click(headerTitle);
        sortIcon = within(headerCellKey).getByTestId("descending-icon");
        expect(sortIcon).toHaveClass("sort-icon");
        expect(sortIcon).toHaveAttribute("data-testid", "descending-icon");
      });
    });
  });

  describe("filtering", () => {
    describe.each(columnTable)(
      'should offer a means to filter the "%s" column',
      (id, title) => {
        it(`should be possible to filter a column`, () => {
          render(
            <Table
              columns={mockColumns}
              rows={mockRows}
              types={mockTypes}
              initialSortColumn=""
              initialSortDirection={SORT_DIRECTION.Ascending}
            />
          );

          const filterInput = screen.getByPlaceholderText(
            `Filter ${mockColumns[0].id}`
          );
         expect(filterInput).toBeInTheDocument();
         fireEvent.change(filterInput, { target: { value: '3' } });
         expect(filterInput).toHaveValue('3');

         const visibleRows = screen.getAllByRole('row');
         const filteredRows = visibleRows.filter(row => row.textContent?.includes('3'));
         expect(filteredRows.length).toBeGreaterThan(0);

        });

      });

    it("should be possible to combine filters", () => {
      render(
        <Table
          columns={mockColumns}
          rows={mockRows}
          types={mockTypes}
          initialSortColumn=""
          initialSortDirection={SORT_DIRECTION.Ascending}
        />
      );
      const filterInput1 = screen.getByPlaceholderText(
        `Filter ${mockColumns[0].id}`
      );
      const filterInput2 = screen.getByPlaceholderText(
        `Filter ${mockColumns[1].id}`
      );

      fireEvent.change(filterInput1, { target: { value: '3' } });
      fireEvent.change(filterInput2, { target: { value: "Iron" } });

      expect(filterInput1).toHaveValue('3');
      expect(filterInput2).toHaveValue("Iron");

      const rows = screen.getAllByRole("row");
      const filteredRows = rows.filter(
        (row) =>
          row.textContent?.includes("3") && row.textContent?.includes("Iron")
      );
      expect(filteredRows.length).toBeGreaterThan(0);
    });

  });
});
