import { Link } from "react-router-dom";
import "./UserCard.css";

function UserCard({ user }) {
  return (
    <div className="UserCard">
      <p>{user.username}</p>
      <Link to={`/users/${user.username}`} className="UserCard-btn">
        View Profile
      </Link>
    </div>
  );
}

export default UserCard;
