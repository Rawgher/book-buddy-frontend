import { Link } from "react-router-dom";
import "./Splash.css";

const Splash = () => {
  return (
    <div className="Splash">
      <h2>Welcome to your personal library</h2>

      <p>Find a new book or see what other's are reading right now</p>

      <div className="Splash-btns-div">
        <Link to="/books" className="Splash-btns">
          Book Search
        </Link>
        <Link to="/users" className="Splash-btns">
          View Users
        </Link>
      </div>
    </div>
  );
};

export default Splash;
