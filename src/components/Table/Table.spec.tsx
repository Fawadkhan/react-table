import { fireEvent, render, screen, within } from "@testing-library/react";
import Table from './Table'; 
import { mockColumns, mockRows, mockTypes } from "./__mocks__/tableData";

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
            initialSortDirection="ascending"
          />
        );

        const headerTitle = screen.getByText(title);
        fireEvent.click(headerTitle);
        // casting is not ideal here but for now it should be good. We are expecing it to be not null
        // else we fail the test. This is to avoid an IF-ELSE check.
        const headerCell = headerTitle.closest('th') as HTMLTableCellElement; 
        expect(headerCell).not.toBeNull();

        const sortIcon = within(headerCell).getByTestId('ascending-icon');
        expect(sortIcon).toBeInTheDocument();

      });

      it("should be possible to toggle the sorting direction of a column.", () => {
        render(
          <Table
            columns={mockColumns}
            rows={mockRows}
            types={mockTypes}
            initialSortColumn=""
            initialSortDirection="ascending"
          />
        );

        const headerTitle = screen.getByText(title);
        // casting is not ideal here but for now it should be good. We are expecing it to be not be null
        // else we fail the test. This is to avoid an IF-ELSE check.
        const headerCell = headerTitle.closest('th') as HTMLTableCellElement; 
        expect(headerCell).not.toBeNull();
        

          fireEvent.click(headerTitle);
          let sortIcon = within(headerCell).getByTestId('ascending-icon');
          expect(sortIcon).toHaveClass('sort-icon');
          expect(sortIcon).toHaveAttribute('data-testid', 'ascending-icon');

          fireEvent.click(headerTitle);
          sortIcon = within(headerCell).getByTestId('descending-icon');
          expect(sortIcon).toHaveClass('sort-icon');
          expect(sortIcon).toHaveAttribute('data-testid', 'descending-icon');

      });
    });
  });

  describe("filtering", () => {
    describe.each(columnTable)(
      'should offer a means to filter the "%s" column',
      (id, title) => {
        it.todo("should be possible to filter a column.");
      }
    );

    it.todo("should be possible to combine filters.");
  });

});