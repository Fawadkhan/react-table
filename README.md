# 💅 Signavio front-end coding challenge

Welcome to the Signavio front-end coding challenge!

We appreciate you taking the time and energy to work on this coding challenge ❤️

It consists of a small React.js application which shall be extended by you.

The next sections describe the three tasks and give some general hints.
At the end you can leave any comments about design decisions, instructions or general feedback.

## Task 0 - 🧰 Setup

**Before you start please read** through this document.

If something is unclear or you're stuck please do not hesitate to reach out to us: "reaching out to us" is not perceived negatively in any way. 
We believe that unclear requirements or ambiguous instructions should always be clarified.
In case of questions, please reach out to the assigned reviewer who was tagged in the email you received.
The section called [example data](#example-data) is important: please **don't** change it!

## Task 1 - 🔎 Filtering

Users should be able to filter the table.
They expressed that every column should include an input field where they could type their search.
The table should then be filtered so that only rows that match the search term for the respective column are included.
Your task is to make this possible!

Make sure you start the test runner for the `Table` component.
The test suite includes some essential TODOs to help get started.

## Task 2 - 🗄️ Sorting

Your task is to add a feature that lets the user sort every column of the table.
If you click the column title for the first time it should sort this column in ascending order.
When you click the same title again this should toggle between ascending and descending.

Once again have a look at the test suite for the `Table` component.

## 📍 General hints

### 🎁 Installing dependencies

This project uses `yarn`.
You can run the following command to install all dependencies.

```sh
yarn install
```

### 🛠️ Running the dev server

To see what you're building run the following command:

```sh
yarn start
```

It will start the dev-server and open a page in your default browser.

### 🧪 Testing

This project uses [`jest`](https://jestjs.io/) as a test runner.
The tests are written using [`@testing-library/react`](https://testing-library.com/docs/react-testing-library/intro).
Also, we have enhanced the `expects` with [`@testing-library/jest-dom`](https://github.com/testing-library/jest-dom) to give you some more explicit assertions.

You can run all tests with the following command:

```sh
yarn test
```

### 🔮 Other libraries

Feel free to add any libraries you think are important.
But consider that we're interested in **your** coding skills: the balance between "building ourselves" and "not reinventing the wheel" makes for interesting conversations to follow up in the technical interview and code walkthrough.

If you solve the whole task with a library we will have some questions for you later on.

### 📦 Example data

Since there is no backend in this exercise all data comes from `./src/data.json`.

Do not change this file.

On a real world scenario, you could potentially argue with a backend developer to change the way the data is provided. For this specific exercise our focus in on how you would handle this data in the way you got it right now.

---

## 📝 Design decisions and feedback

_Here you can leave any comments about your design decisions, further instructions and comments as well as feedback._

### Node Version

- **Note**: Use `.nvmrc` to set the node version to Node 18.

  ```sh
  nvm use
    ```

### TypeScript

I decided to update the project to use **TypeScript** to keep the project type safe

### Component Structure

I introduced three new components to manage different parts of the table:

- **`TableHeader`**: Handles sorting of the table columns.
- **`TableFilterRow`**: Manages filtering functionality for each column.
- **`TableBody`**: Responsible for rendering the table's body (rows).

All these components are located in the `/Table` folder. Although separating components into individual folders is a good practice, I chose to keep them together as they are **tightly coupled** and don't require dedicated style folders. They share functionality and are closely related, making this structure more convenient for now.

### Filtering and Sorting Strategy

- I implemented **filtering first** and then **sorting**. This allows sorting to only affect the filtered data, which is a common use case.
- The sorting logic is managed in the `TableHeader` component. By default, the data is sorted in **ascending order** on the initial load.
- No specific column is pre-set for sorting. However, any column header can be clicked to sort the data. However this can be changed by adding a default sorted column in the `Table` component.


### Sorting Logic Optimization

Initially, I used a basic sorting strategy (`a-b` for ascending and `b-a` for descending) with the JavaScript `sort()` method. However, I encountered issues with sorting mixed data types (strings and numbers) for dates.
To address this, I implemented a **switch-case** structure to handle different cases, such as numbers, strings, and dates, ensuring accurate sorting for each data type.

### Handling Edge Cases for Sorting

- **Unknown Dates**: Dates labeled as `"Unknown"` are treated as the largest possible number to keep them on extreme ends in both asc and desc order
- **Year-Only Dates**: For dates that only contain a year, I append the date `12-31` (end of the year) to maintain consistency in formatting. This allows for easier sorting of partial dates.
- **Strings**: Also its not ideal to subtract string from a string "abc" - "bcd" and for this purpose I used localeCompare method to compare strings.
- Some of these techniques I found online through a quick search

- I just added very basic styles to the table as this was not the focus of the challenge. 

### Error boundry 
- I added a simple error boundary to catch any errors that might occur in the application.
- Ideally I could maybe write my own error boundary component that would display a more user friendly error message but to keep it simple I just used a library for it. 

### Dompurify for XSS attacks
- I used dompurify to sanitize the input text before rendering it to the table to prevent XSS attacks.
- To keep it simple im just using dompurify to sanizte the input using very basic sanitization. Dompurify allows for more advanced sanitization techniques.
