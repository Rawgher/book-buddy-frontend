import { useState } from "react";
import "./CommentForm.css";

function CommentForm({ currentComment, onSave }) {
  const [newComment, setNewComment] = useState(currentComment);

  async function handleSubmit(evt) {
    evt.preventDefault();
    onSave(newComment);
    setNewComment("");
  }

  return (
    <form onSubmit={handleSubmit} className="CommentForm">
      <textarea
        placeholder="Add or update your comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button type="submit">Add Comment</button>
    </form>
  );
}

export default CommentForm;
