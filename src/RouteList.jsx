import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import userContext from "./helpers/userContext";
import Home from "./pages/Home/Home";
import Splash from "./pages/Splash/Splash";
import BookSearch from "./pages/Search/Search";
import UserProfile from "./pages/Profile/Profile";
import UserSearch from "./pages/UserSearch/UserSearch";
import SignUp from "./pages/Register/Register";
import Login from "./pages/Login/Login";

function RouteList({ signup, login }) {
  const { currentUser } = useContext(userContext);

  return (
    <Routes>
      <Route
        path="/"
        element={currentUser ? <Navigate to="/splash" /> : <Home />}
      />

      <Route
        path="/splash"
        element={currentUser ? <Splash /> : <Navigate to="/login" />}
      />
      <Route
        path="/books"
        element={currentUser ? <BookSearch /> : <Navigate to="/login" />}
      />

      <Route
        path="/users"
        element={currentUser ? <UserSearch /> : <Navigate to="/login" />}
      />

      <Route
        path="/users/:username"
        element={
          currentUser ? (
            <UserProfile currentUser={currentUser} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route path="/signup" element={<SignUp signup={signup} />} />
      <Route path="/login" element={<Login login={login} />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default RouteList;
