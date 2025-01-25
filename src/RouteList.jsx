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
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./pages/NotFound/NotFound";

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
        element={
          <ProtectedRoute currentUser={currentUser}>
            <Splash />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books"
        element={
          <ProtectedRoute currentUser={currentUser}>
            <BookSearch />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute currentUser={currentUser}>
            <UserSearch />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users/:username"
        element={
          <ProtectedRoute currentUser={currentUser}>
            <UserProfile currentUser={currentUser} />
          </ProtectedRoute>
        }
      />

      <Route path="/signup" element={<SignUp signup={signup} />} />
      <Route path="/login" element={<Login login={login} />} />

      <Route path="*" element={<NotFound currentUser={currentUser} />} />
    </Routes>
  );
}

export default RouteList;
