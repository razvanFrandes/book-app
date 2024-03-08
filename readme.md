
# Book App

URL : [https://book-app-client-mu.vercel.app/](https://book-app-client-mu.vercel.app/)
API USED : [https://openlibrary.org/developers/api](https://openlibrary.org/developers/api)
Used my server to host express.js : https://book.maat.directory/

The Book App is a straightforward web application designed to organize and manage your reading preferences using an open API book list. With this app, users can categorize books they like, books they plan to read, and books they have already read. The primary functionalities include the ability to add books to your "want to read" list, update your reading lists by moving books between three categories (read, want to read, and finished), and view and interact with books based on their categories.

## Technologies Used

The Book App was built using the following technologies:

-   **React + TypeScript:** The frontend of the application was developed using React with TypeScript to ensure type safety and better code organization.
-   **Express.js:** The backend server was built using Express.js, a lightweight and flexible Node.js framework, to handle API requests and serve static assets.
-   **Axios:** Axios was utilized for making HTTP requests to fetch book data from the open API.
-   **Material-UI:** Material-UI provided a set of pre-designed React components with a Material Design look and feel, allowing for a visually appealing user interface.
-   **JSON as Database:** Vercel dosent let the use of fs.writeFileSync so the CRUD operations wont work on the live site.
-   **SWR:** For state management and caching.
-   **Formik:** Form functionality to handle errors and updates.

## Features

-   **Book Categorization:** Users can categorize books into different lists based on their reading preferences, including books they want to read, books they have read, and books they have finished reading.
-   **API Integration:** The app integrates with an open API book list to fetch book data, allowing users to explore and discover new books to add to their lists.
-   **Custom Design:** A custom theme was implemented using Material-UI's theme options to provide a visually pleasing and cohesive design throughout the application.
-   **Add a book** A custom form build with formik where the user can upload a books to his want-to-read list.

## Conclusion

The Book App offers a user-friendly solution for organizing and managing your reading preferences. By leveraging modern web technologies and a simple yet effective user interface, the app provides an intuitive way to track and update your reading lists. With its integration of open API book data and custom design elements, the Book App delivers an engaging and enjoyable user experience for book enthusiasts.