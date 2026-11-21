
# 📚 BookVerse – Book Management Dashboard

BookVerse is a modern and interactive book management dashboard built using React. It allows users to manage their personal book collection with CRUD operations, form validation, and centralized state management.

The application features an editorial-style dashboard with an animated interface, responsive layout, and an organized book catalogue.

## ✨ Features

- **Add Books:** Add new books with title, ISBN, publication date, author details, and biography.
- **Edit Books:** Update existing book information.
- **Delete Books:** Remove books from the collection.
- **Form Validation:** Implemented using Formik and Yup.
- **ISBN Validation:** Supports 10-digit and 13-digit ISBN numbers.
- **Date Validation:** Validates publication dates and author dates of birth.
- **Author Validation:** Validates author names and minimum age.
- **Biography Validation:** Enforces minimum and maximum character limits.
- **Redux State Management:** Centralized application state using Redux Toolkit.
- **Search Functionality:** Search books by title, author, or ISBN.
- **Dashboard Statistics:** Displays total books, unique authors, and library status.
- **Responsive Design:** Optimized for desktop and mobile screens.
- **Animated UI:** Interactive transitions and animated dashboard elements.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | UI development |
| Vite | Development server and build tool |
| JavaScript | Application logic |
| Redux Toolkit | State management |
| React Redux | Connecting React with Redux |
| Formik | Form handling |
| Yup | Form validation |
| Lucide React | Icons |
| CSS3 | Styling and animations |

## 📂 Project Structure

```text
src/
├── app/
│   └── store.js
│
├── features/
│   └── books/
│       └── booksSlice.js
│
├── components/
│   ├── Header.jsx
│   ├── BookForm.jsx
│   ├── BookCard.jsx
│   └── Dashboard.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/bookverse-react-book-management-dashboard.git
```

### 2. Navigate to the project directory

```bash
cd bookverse-react-book-management-dashboard
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install required packages

```bash
npm install @reduxjs/toolkit react-redux formik yup lucide-react
```

### 5. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## 🔄 CRUD Operations

BookVerse supports the following operations:

- **Create:** Add new books to the library.
- **Read:** Display books in the catalogue.
- **Update:** Edit existing book details.
- **Delete:** Remove books from the library.

Redux Toolkit manages the book collection through a dedicated Redux slice.

## 🧠 Key Concepts Practiced

- React Functional Components
- Props and State Management
- React Hooks (`useState`)
- Redux Toolkit (`configureStore`, `createSlice`)
- `useSelector` and `useDispatch`
- Formik Form Handling
- Yup Schema Validation
- Conditional Rendering
- Array Methods (`map`, `filter`)
- JavaScript Sets
- Component Reusability
- Responsive CSS and Animations

## 📌 Data Persistence

This project uses Redux Toolkit for in-memory state management.

There is no backend API or database integration. Book records are stored in the Redux store and reset when the application is refreshed.

## 🚀 Future Improvements

- Backend API integration
- Database persistence
- User authentication
- Book categories and filters
- Pagination
- Advanced library analytics

## 👨‍💻 Author

**YOUR NAME**

GitHub: [YOUR_GITHUB_PROFILE](https://github.com/YOUR_USERNAME)

---

⭐ If you like this project, consider giving it a star!
