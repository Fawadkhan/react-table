
## 📝 Design decisions and feedback


### Node Version

- **Note**: Use `.nvmrc` to set the node version to Node 18

  ```sh
  nvm use
    ```

### TypeScript

I decided to update the project to use **TypeScript** to keep the project type safe

### Component Structure

I introduced three new components to manage different parts of the table:

- **`Table`**: The main component that combines all the above components to render the table.
- **`TableHeader`**: Handles sorting of the table columns.
- **`TableFilterRow`**: Manages filtering functionality for each column.
- **`TableBody`**: Responsible for rendering the table's body (rows).
- **`TableTitle`**: Renders the title of the table with caption. (This could be a generic common component but for simplicity I coupled this to the table)


All these components are located in the `/Table` folder. Although separating components into individual folders is a good practice, I chose to keep them together as they are **tightly coupled** and don't require dedicated style folders. They share functionality and are closely related, making this structure more convenient for now.

### Filtering and Sorting Strategy

- I implemented **filtering first** and then **sorting**. This allows sorting to only affect the filtered data, which is a common use case.
- The sorting logic is managed in the `TableHeader` component. By default, the data is sorted in **ascending order** on the initial load.
- No specific column is pre-set for sorting. However, any column header can be clicked to sort the data. However this can be changed by adding a default sorted column in the `Table` component.


### Sorting Logic Optimization

Initially, I used a basic sorting strategy (`a-b` for ascending and `b-a` for descending) with the JavaScript. However, I encountered issues with sorting mixed data types strings, numbers and dates.
To address this, I implemented a **if-else** logic to handle different cases, such as numbers, strings, and dates, ensuring accurate sorting for each data type.

### Handling Edge Cases for Sorting

- **Unknown Dates**: Dates labeled as `"Unknown"` are treated as the largest possible number to keep them on extreme ends in both asc and desc order as Im not allowed to modify the data I keep it as it is, I just sorted them at the bottom 
- **Year-Only Dates**: For dates that only contain a year, I append the date `12-31` (end of the year) to maintain consistency in formatting. This allows for easier sorting of partial dates.
- **Strings**: Also its not ideal to subtract string from a string "abc" - "bcd" (done in sorting logic) and for this purpose I used localeCompare method to compare strings.
- Some of these techniques I found online through a quick search

- I just added very basic styles to the table as this was not the focus of the challenge. 

### Error boundry 
- Added a simple error boundary to catch any errors that might occur in the application due to rendering issues.
- Ideally I could maybe write my own error boundary component that would display a more user friendly error message but to keep it simple I just used a library for it. 

### Dompurify for XSS attacks
- I used dompurify to sanitize the input text before rendering it to the table to prevent XSS attacks.
- To keep it simple im just using dompurify to sanizte the input using very basic sanitization. Dompurify allows for more advanced sanitization techniques.

### Potential improvements
- As the project grows, we can create subfolders for each component to manage their styles and tests separately.
- We can also add a standrd theme in the global styles to keep the design consistent.
- We can add more tests to cover edge cases and improve the overall test coverage.
- I didn't add any e2e testing in this case but we can take advantage of ***webdriver*** or ***cypress*** for that.
- We can also add further improvements to the sorting logic to handle more edge cases and data types.
- Project in general can be more typesafe as I have used ***any*** in some places to keep it simple which isn't ideal 
