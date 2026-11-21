import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addBook,
  updateBook,
  deleteBook,
} from "../features/books/booksSlice";

import BookForm from "./BookForm";
import BookCard from "./BookCard";

import {
  Plus,
  Search,
  BookOpen,
  Users,
  Library,
  ArrowUpRight,
  Sparkles,
  X,
} from "lucide-react";

function Dashboard() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);

  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchText, setSearchText] = useState("");

  const authors = new Set(
    books.map((book) => book.authorName.toLowerCase())
  );

  const filteredBooks = books.filter((book) => {
    const search = searchText.toLowerCase();

    return (
      book.title.toLowerCase().includes(search) ||
      book.authorName.toLowerCase().includes(search) ||
      book.isbn.includes(search)
    );
  });

  const handleAdd = (book) => {
    dispatch(addBook(book));
    closeForm();
  };

  const handleUpdate = (book) => {
    dispatch(updateBook(book));
    closeForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this book from your library?")) {
      dispatch(deleteBook(id));
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingBook(null);
  };

  return (
    <main className="workspace-main" id="overview">
      <div className="mobile-topbar">
        <strong>BOOKVERSE</strong>
        <div className="profile-avatar">H</div>
      </div>

      <header className="page-header">
        <div>
          <p className="breadcrumb">WORKSPACE / OVERVIEW</p>
          <h1>Good day, Admin <span>✦</span></h1>
          <p className="page-subtitle">
            Your stories, your collection, your little universe.
          </p>
        </div>

        <div className="header-date">
          <span>YOUR LIBRARY</span>
          <strong>PERSONAL COLLECTION</strong>
        </div>
      </header>

      <section className="editorial-hero">
        <div className="editorial-copy">
          <span className="hero-kicker">
            <Sparkles size={14} />
            A SPACE FOR EVERY STORY
          </span>

          <h2>
            Every book has
            <br />
            a world <em>inside.</em>
          </h2>

          <p>
            Keep your favourite titles organized.
            Build a collection that tells your story.
          </p>

          <button
            className="hero-add-button"
            onClick={() => {
              setEditingBook(null);
              setShowForm(true);
            }}
          >
            <Plus size={18} />
            Add to my library
          </button>
        </div>

        <div className="editorial-art">
          <div className="art-circle"></div>
          <div className="art-book art-book-back">STORIES</div>
          <div className="art-book art-book-front">
            <span>THE</span>
            <strong>BOOK<br />OF<br />DREAMS</strong>
            <small>VOL. 01</small>
          </div>
          <div className="art-star star-one">✦</div>
          <div className="art-star star-two">✧</div>
          <div className="art-star star-three">✦</div>
        </div>

        <div className="hero-index">01 — YOUR COLLECTION</div>
      </section>

      <section className="overview-stats">
        <div className="overview-stat">
          <div className="stat-symbol orange-symbol">
            <BookOpen size={20} />
          </div>
          <div>
            <span>TOTAL BOOKS</span>
            <strong>{books.length}</strong>
          </div>
          <ArrowUpRight size={17} className="stat-arrow" />
        </div>

        <div className="overview-stat">
          <div className="stat-symbol green-symbol">
            <Users size={20} />
          </div>
          <div>
            <span>UNIQUE AUTHORS</span>
            <strong>{authors.size}</strong>
          </div>
          <ArrowUpRight size={17} className="stat-arrow" />
        </div>

        <div className="overview-stat">
          <div className="stat-symbol blue-symbol">
            <Library size={20} />
          </div>
          <div>
            <span>LIBRARY STATUS</span>
            <strong>{books.length ? "Active" : "New"}</strong>
          </div>
          <ArrowUpRight size={17} className="stat-arrow" />
        </div>
      </section>

      <section className="library-section" id="library">
        <div className="library-heading">
          <div>
            <p className="section-label">THE READING ROOM</p>
            <h2>My Library <span>({books.length})</span></h2>
            <p>All the books you've added to your universe.</p>
          </div>

          <button
            className="add-library-button"
            onClick={() => {
              setEditingBook(null);
              setShowForm(true);
            }}
          >
            <Plus size={17} />
            New book
          </button>
        </div>

        <div className="library-toolbar">
          <div className="catalogue-tabs">
            <span className="tab-active">All books</span>
            <span>Catalogue</span>
          </div>

          <div className="catalogue-search">
            <Search size={17} />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Find a book or author..."
            />
            {searchText && (
              <button onClick={() => setSearchText("")}>
                <X size={15} />
              </button>
            )}
          </div>
        </div>

        {filteredBooks.length === 0 ? (
          <div className="library-empty">
            <div className="empty-illustration">
              <BookOpen size={36} />
            </div>
            <h3>{searchText ? "Nothing found here." : "A blank page."}</h3>
            <p>
              {searchText
                ? "Try searching with another title or author."
                : "Your library is waiting for its first story."}
            </p>

            {!searchText && (
              <button
                className="add-library-button"
                onClick={() => setShowForm(true)}
              >
                <Plus size={17} />
                Add your first book
              </button>
            )}
          </div>
        ) : (
          <div className="catalogue-list">
            {filteredBooks.map((book, index) => (
              <BookCard
                key={book.id}
                book={book}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </section>

      <footer className="workspace-footer">
        <span>BOOKVERSE © YOUR PERSONAL READING SPACE</span>
        <span>MADE FOR THE LOVE OF STORIES ✦</span>
      </footer>

      {showForm && (
        <BookForm
          book={editingBook}
          onSubmit={editingBook ? handleUpdate : handleAdd}
          onClose={closeForm}
        />
      )}
    </main>
  );
}

export default Dashboard;