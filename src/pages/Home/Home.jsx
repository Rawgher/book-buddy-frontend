import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="Home">
      <h2>Welcome to Book Buddy</h2>

      <p>Please log in or register to continue</p>

      <div className="Home-btns-div">
        <Link to="/signup" className="Home-btns">
          Sign Up
        </Link>
        <Link to="/login" className="Home-btns">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Home;
