import {
  CalendarDays,
  Hash,
  Pencil,
  Trash2,
} from "lucide-react";

const coverColors = [
  "cover-orange",
  "cover-blue",
  "cover-green",
  "cover-purple",
  "cover-red",
];

function formatDate(value) {
  if (!value) return "N/A";

  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function BookCard({ book, onEdit, onDelete, index }) {
  const colorClass = coverColors[index % coverColors.length];

  const initials = book.authorName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      className="catalogue-row"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className={`catalogue-cover ${colorClass}`}>
        <span>BOOKVERSE</span>
        <div className="cover-symbol">✦</div>
        <div className="cover-title">{book.title}</div>
        <small>{book.authorName}</small>
      </div>

      <div className="catalogue-details">
        <div className="catalogue-topline">
          <span className="book-number">
            BOOK NO. {String(index + 1).padStart(3, "0")}
          </span>
          <span className="available-status">
            <span></span> Available
          </span>
        </div>

        <h3>{book.title}</h3>

        <div className="catalogue-author">
          <div className="mini-avatar">{initials}</div>
          <span>by {book.authorName}</span>
        </div>

        <p className="catalogue-bio">{book.biography}</p>

        <div className="catalogue-metadata">
          <span>
            <Hash size={13} />
            {book.isbn}
          </span>

          <span>
            <CalendarDays size={13} />
            {formatDate(book.publicationDate)}
          </span>
        </div>
      </div>

      <div className="catalogue-actions">
        <button
          onClick={() => onEdit(book)}
          className="catalogue-edit"
          title="Edit book"
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => onDelete(book.id)}
          className="catalogue-delete"
          title="Delete book"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}

export default BookCard;