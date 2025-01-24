import { Link } from "react-router-dom";
import "./Nav.css";
import { useContext } from "react";
import userContext from "../../helpers/userContext";

function Nav({ logout }) {
  const { currentUser } = useContext(userContext);

  return (
    <div className="Nav">
      <div className="Nav-left">
        <Link to="/" className="Nav-link">
          Book Buddy
        </Link>
      </div>
      {currentUser ? (
        <div className="Nav-right">
          <Link to="/books" className="Nav-link">
            Book Search
          </Link>
          <Link to="/users" className="Nav-link">
            View Users
          </Link>
          <Link to={`/users/${currentUser.username}`} className="Nav-link">
            View Profile
          </Link>
          <Link to="/" onClick={logout} className="Nav-link">
            Log out
          </Link>
        </div>
      ) : (
        <div className="Nav-right-not-logged-in">
          <Link to="/signup" className="Nav-link">
            Sign Up
          </Link>
          <Link to="/login" className="Nav-link">
            Log In
          </Link>
        </div>
      )}
    </div>
  );
}

export default Nav;
