import { useState, useEffect } from "react";
import BookBuddyApi from "../../helpers/api";
import "./BookCardSearch.css";

function BookCard({ book }) {
  const [isSaved, setIsSaved] = useState(false);
  const [buttonText, setButtonText] = useState("Save Book");

  useEffect(() => {
    async function checkIfSaved() {
      try {
        const savedBooks = await BookBuddyApi.getSavedBooks(); // Fetch user's saved books
        const alreadySaved = savedBooks.some((b) => b.bookId === book.id);
        setIsSaved(alreadySaved);
        setButtonText(alreadySaved ? "Remove Book" : "Save Book");
      } catch (err) {
        console.error("Error checking saved books:", err);
      }
    }
    checkIfSaved();
  }, [book.id]);

  async function handleToggleSave() {
    const bookData = {
      book_id: book.id,
      title: book.title,
      authors: book.authors,
      thumbnail_url: book.thumbnailUrl || "",
    };

    try {
      if (isSaved) {
        // If book is already saved, remove it
        await BookBuddyApi.deleteBook(book.id);
        setIsSaved(false);
        setButtonText("Save Book");
      } else {
        // If book is not saved, save it
        await BookBuddyApi.saveBook(bookData);
        setIsSaved(true);
        setButtonText("Remove Book");
      }
    } catch (err) {
      console.error("Error toggling save:", err);
    }
  }

  return (
    <div className="BookCardSearch">
      {book.thumbnailUrl && (
        <div className="BookCard-card-left">
          <img src={book.thumbnailUrl} alt={book.title} />
        </div>
      )}
      <div className="BookCard-card-right">
        <h3>{book.title}</h3>
        <p>{book.authors}</p>
        <button
          onClick={handleToggleSave}
          style={{
            backgroundColor: isSaved ? "#54101d" : "#002907",
            color: "white",
            cursor: "pointer",
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default BookCard;
