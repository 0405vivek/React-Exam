# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



React Js Practical Exam - Web
Student Management System Project Outline

Admin = admin@test.in
Password = 123456

Instruction/Text linked with this question

1. Project Setup

- Set up a new React project using Create React App.

- Install required dependencies: `react-router-dom`, `redux`, `react-redux`, `redux-thunk`, `Bootstrap i/core`, `json-server` for API, etc.



2. Component Structure

- Create the necessary components:

- StudentList

- StudentForm

- StudentDetails

- PrivateRoute

- Navbar

- Implement the basic component structure for the student management system.



3. Redux Setup (5 points)

- Set up the Redux store with actions, reducers, and thunks.

- Define actions for fetching student data, handling loading and errors.

- Implement thunks for asynchronous operations.



4. JSON Server Setup (5 points)

- Set up a JSON Server to act as a backend for storing student data.

- Create a `db.json` file to store initial student data.

- Define routes for CRUD operations (e.g., `/students`).



5. Fetching and Displaying Student Data (5 points)

- Implement the `fetchStudents` function in the StudentList component.

- Display students dynamically using the StudentDetails component.

- Connect the StudentList component to the Redux store to fetch student data.



6. Adding New Students (5 points)

- Implement the `addStudent` function in the StudentForm component.

- Allow users to add new students with details such as name, roll number, and class.

- Dispatch a Redux action and thunk to add the student to the server and store.



7. Updating Student Details (5 points)

- Develop the `updateStudent` function in the StudentDetails component to allow users to edit existing student details.

- Identify a unique identifier for each student to ensure accurate updating.

- Dispatch a Redux action and thunk to update the student details on the server and in the store.



8. Deleting Students (5 points)

- Implement the `deleteStudent` function in the StudentDetails component to allow users to remove students.

- Dispatch a Redux action and thunk to delete the student from the server and store.



9. Sorting and Filtering (10 points)

- Implement sorting feature by name or roll number in the StudentList component.

- Implement filtering feature by class or any other relevant criteria in the StudentList component.



10. User Authentication (5 points)

- Implement a simple user authentication mechanism.

- Allow users to sign in to manage student information.

- Restrict access to student-related operations based on user authentication status.



11. Navbar

- Create a Navbar component to provide navigation within the application.

- Include links to the student list, add student form, user profile, and a sign-out option (if applicable).

- Ensure the Navbar is responsive and visually appealing.



12. Bootstrap I Styling (5 points)

- Utilize Bootstrap I components for a modern and clean UI.

- Apply styling and theming to enhance the overall look and feel of the application.