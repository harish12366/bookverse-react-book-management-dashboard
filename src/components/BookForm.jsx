
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  X,
  BookOpen,
  UserRound,
  CalendarDays,
  Hash,
  FileText,
  Sparkles,
} from "lucide-react";

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];

// Validate whether a date is a real calendar date
const isValidDate = (value) => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
};

// Check whether author is at least 5 years old
const isAtLeastFiveYearsOld = (value) => {
  if (!isValidDate(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const dob = new Date(Date.UTC(year, month - 1, day));

  const current = new Date();
  const minimumDate = new Date(
    Date.UTC(
      current.getFullYear() - 5,
      current.getMonth(),
      current.getDate()
    )
  );

  return dob <= minimumDate;
};

// Form validation schema
const validationSchema = Yup.object({
  title: Yup.string()
    .strict(true)
    .trim()
    .min(3, "Title must contain at least 3 characters")
    .max(100, "Title cannot exceed 100 characters")
    .required("Book title is required"),

  isbn: Yup.string()
    .strict(true)
    .matches(/^(?:\d{10}|\d{13})$/, "ISBN must contain exactly 10 or 13 digits")
    .required("ISBN number is required"),

  publicationDate: Yup.string()
    .required("Publication date is required")
    .test(
      "valid-date",
      "Enter a valid date",
      (value) => !value || isValidDate(value)
    )
    .test(
      "not-future",
      "Publication date cannot be in the future",
      (value) => !value || !isValidDate(value) || value <= today
    ),

  authorName: Yup.string()
    .strict(true)
    .trim()
    .min(3, "Author name must contain at least 3 characters")
    .max(60, "Author name cannot exceed 60 characters")
    .matches(
      /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
      "Author name can contain only letters, spaces, hyphens and apostrophes"
    )
    .required("Author name is required"),

  dateOfBirth: Yup.string()
    .required("Author date of birth is required")
    .test(
      "valid-date",
      "Enter a valid date",
      (value) => !value || isValidDate(value)
    )
    .test(
      "not-future",
      "Date of birth cannot be in the future",
      (value) => !value || !isValidDate(value) || value <= today
    )
    .test(
      "minimum-age",
      "Author must be at least 5 years old",
      (value) =>
        !value ||
        !isValidDate(value) ||
        isAtLeastFiveYearsOld(value)
    ),

  biography: Yup.string()
    .strict(true)
    .trim()
    .min(20, "Biography must contain at least 20 characters")
    .max(300, "Biography cannot exceed 300 characters")
    .required("Biography is required"),
});

function BookForm({ book, onSubmit, onClose }) {
  const formik = useFormik({
    initialValues: {
      title: book?.title || "",
      isbn: book?.isbn || "",
      publicationDate: book?.publicationDate || "",
      authorName: book?.authorName || "",
      dateOfBirth: book?.dateOfBirth || "",
      biography: book?.biography || "",
    },

    enableReinitialize: true,

    validationSchema,

    onSubmit: (values) => {
      const bookData = {
        ...values,
        id: book?.id || crypto.randomUUID(),
      };

      onSubmit(bookData);
    },
  });

  const getError = (field) =>
    formik.touched[field] && formik.errors[field];

  return (
    <div className="form-overlay" onClick={onClose}>
      <div
        className="form-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="form-header">
          <div className="form-heading-icon">
            <Sparkles size={23} />
          </div>

          <button
            type="button"
            className="form-close-button"
            onClick={onClose}
          >
            <X size={20} />
          </button>

          <p className="form-kicker">LIBRARY COLLECTION</p>

          <h2>{book ? "Edit Book" : "Add New Book"}</h2>

          <p className="form-description">
            Enter the book and author information below.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="form-grid">

            {/* Book Title */}
            <div className="form-group">
              <label htmlFor="title">
                <BookOpen size={15} />
                Book Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter book title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getError("title") ? "input-error" : ""}
              />

              {getError("title") && (
                <small className="error-message">
                  {formik.errors.title}
                </small>
              )}
            </div>

            {/* ISBN */}
            <div className="form-group">
              <label htmlFor="isbn">
                <Hash size={15} />
                ISBN Number
              </label>

              <input
                id="isbn"
                name="isbn"
                type="text"
                inputMode="numeric"
                placeholder="Enter 10 or 13 digit ISBN"
                value={formik.values.isbn}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={getError("isbn") ? "input-error" : ""}
              />

              {getError("isbn") && (
                <small className="error-message">
                  {formik.errors.isbn}
                </small>
              )}
            </div>

            {/* Publication Date */}
            <div className="form-group">
              <label htmlFor="publicationDate">
                <CalendarDays size={15} />
                Publication Date
              </label>

              <input
                id="publicationDate"
                name="publicationDate"
                type="date"
                max={today}
                value={formik.values.publicationDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  getError("publicationDate") ? "input-error" : ""
                }
              />

              {getError("publicationDate") && (
                <small className="error-message">
                  {formik.errors.publicationDate}
                </small>
              )}
            </div>

            {/* Author Name */}
            <div className="form-group">
              <label htmlFor="authorName">
                <UserRound size={15} />
                Author Name
              </label>

              <input
                id="authorName"
                name="authorName"
                type="text"
                placeholder="Enter author name"
                value={formik.values.authorName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  getError("authorName") ? "input-error" : ""
                }
              />

              {getError("authorName") && (
                <small className="error-message">
                  {formik.errors.authorName}
                </small>
              )}
            </div>

            {/* Author Date of Birth */}
            <div className="form-group">
              <label htmlFor="dateOfBirth">
                <CalendarDays size={15} />
                Author Date of Birth
              </label>

              <input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                max={today}
                value={formik.values.dateOfBirth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  getError("dateOfBirth") ? "input-error" : ""
                }
              />

              {getError("dateOfBirth") && (
                <small className="error-message">
                  {formik.errors.dateOfBirth}
                </small>
              )}
            </div>

            {/* Biography */}
            <div className="form-group full-width">
              <label htmlFor="biography">
                <FileText size={15} />
                Short Biography
              </label>

              <textarea
                id="biography"
                name="biography"
                rows="5"
                maxLength="300"
                placeholder="Write a short biography about the book or author..."
                value={formik.values.biography}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  getError("biography") ? "input-error" : ""
                }
              />

              <div className="textarea-footer">
                <span>
                  {getError("biography")
                    ? formik.errors.biography
                    : "Minimum 20 characters"}
                </span>

                <span>
                  {formik.values.biography.length}/300
                </span>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="form-submit-button"
            disabled={formik.isSubmitting}
          >
            {book ? "Update Book" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookForm;
