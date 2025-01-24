import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import userContext from "./helpers/userContext";
import BookBuddyApi from "./helpers/api";
import RouteList from "./RouteList";
import Nav from "./components/Nav/Nav";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    function fetchUserToken() {
      async function fetchUser() {
        if (token) {
          BookBuddyApi.token = token;
          localStorage.setItem("token", token);
          const decodedToken = jwtDecode(token);
          const username = decodedToken.username;
          const user = await BookBuddyApi.getUser(username);
          setCurrentUser({ ...user, applications: new Set(user.applications) });
        } else {
          localStorage.removeItem("token");
          setCurrentUser(null);
        }
        setIsLoading(false);
      }
      fetchUser();
    },
    [token]
  );

  // Sign up user
  async function signup(formD) {
    const token = await BookBuddyApi.signup(formD);
    setToken(token);
  }

  // Log in user
  async function login(formD) {
    const token = await BookBuddyApi.login(formD);
    console.log(token);
    setToken(token);
  }

  // Log out user
  function logout() {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
  }

  // Update user information
  async function updateUser(formD) {
    const updatedUser = await BookBuddyApi.updateUser(formD);
    setCurrentUser((currentUser) => ({
      ...updatedUser,
      applications: currentUser.applications,
    }));
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <BrowserRouter>
      <userContext.Provider value={{ currentUser, setCurrentUser }}>
        <Nav logout={logout} />
        <RouteList login={login} signup={signup} updateUser={updateUser} />
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
