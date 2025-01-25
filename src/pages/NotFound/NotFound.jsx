import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = ({ currentUser }) => {
  return (
    <div className="NotFound">
      <h2>404: Lost in the Stacks</h2>

      <p>
        Oops! The page you're looking for seems to have been misplaced in the
        library. Try navigating with one of the links below.
      </p>

      <div className="NotFound-btns-div">
        {currentUser ? (
          <>
            <Link to="/books" className="NotFound-btns">
              Book Search
            </Link>
            <Link to="/users" className="NotFound-btns">
              View Users
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup" className="NotFound-btns">
              Sign Up
            </Link>
            <Link to="/login" className="NotFound-btns">
              Log In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NotFound;
