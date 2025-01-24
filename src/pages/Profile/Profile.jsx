import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import BookCardProfile from "../../components/BookCardProfile/BookCardProfile";
import BookBuddyApi from "../../helpers/api";
import "./Profile.css";

function Profile({ currentUser }) {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await BookBuddyApi.getUser(username);
        setUser(user);
      } catch (err) {
        console.error("Error fetching user profile:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, [username]);

  function handleUpdateComment(bookId, newComment) {
    setUser((userState) => ({
      ...userState,
      savedBooks: userState.savedBooks.map((book) =>
        book.bookId === bookId ? { ...book, comment: newComment } : book
      ),
    }));
  }

  if (isLoading) return <p>Loading user profile...</p>;
  if (!user)
    return (
      <div className="Profile-holder-div">
        <p className="Profile-not-found">
          User not found, try searching for someone else.
        </p>
        <Link to="/users" className="Profile-link">
          View Users
        </Link>
      </div>
    );

  const isOwnProfile = username === currentUser.username;

  return (
    <div className="Profile">
      <div className="Profile-top-div">
        <h1>{user.username}'s reading list</h1>
        <p>Email: {user.email}</p>
      </div>

      {user.savedBooks && user.savedBooks.length > 0 ? (
        <>
          {user.savedBooks.map((book) => (
            <BookCardProfile
              key={book.id}
              book={book}
              isOwnProfile={isOwnProfile}
              onUpdateComment={handleUpdateComment}
            />
          ))}
        </>
      ) : (
        <div className="Profile-holder-div">
          <p className="Profile-no-books">This user has no saved books.</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
