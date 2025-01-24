import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookBuddyApi from "../../helpers/api";
import "./BookCardProfile.css";
import CommentForm from "../CommentForm/CommentForm";

function BookCardProfile({ book, isOwnProfile, onUpdateComment }) {
  const { username } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [comment, setComment] = useState("");

  useEffect(() => {
    async function getSaved() {
      try {
        const savedBooks = await BookBuddyApi.getSavedBooks();
        setIsSaved(savedBooks);
        if (savedBooks.comment) {
          setComment(savedBooks.comment);
        }
      } catch (err) {
        console.error("Error checking saved books:", err);
      }
    }
    getSaved();
  }, []);

  async function handleRemoveBook() {
    try {
      await BookBuddyApi.deleteBook(book.bookId);
      setIsSaved(false);
    } catch (err) {
      console.error("Error removing book:", err);
    }
  }

  async function handleSaveComment(newComment) {
    try {
      await BookBuddyApi.updateComment(book.bookId, newComment);
      setComment(newComment);
      if (onUpdateComment) {
        onUpdateComment(book.bookId, newComment);
      }
    } catch (err) {
      console.error("Error saving comment:", err);
    }
  }

  if (!isSaved) return null;

  return (
    <div className="BookCardProfile">
      {book.thumbnailUrl && (
        <div className="BookCardProfile-card-left">
          <img src={book.thumbnailUrl} alt={book.title} />
        </div>
      )}

      <div className="BookCardProfile-card-mid">
        <h3>{book.title}</h3>
        <p>{book.authors}</p>
        {isOwnProfile && (
          <button
            onClick={handleRemoveBook}
            style={{
              backgroundColor: "#54101d",
              color: "white",
              cursor: "pointer",
            }}
          >
            Remove Book
          </button>
        )}
      </div>
      <div className="BookCardProfile-card-right">
        {book.comment && (
          <p>
            <strong>{username}'s thoughts:</strong>
            <br />
            {book.comment}
          </p>
        )}
        {isOwnProfile && (
          <>
            <p>Make/update a note</p>
            <CommentForm currentComment={comment} onSave={handleSaveComment} />
          </>
        )}
      </div>
    </div>
  );
}

export default BookCardProfile;
