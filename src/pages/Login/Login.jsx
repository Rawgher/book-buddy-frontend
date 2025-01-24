import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ login }) {
  const INITIAL_STATE = {
    username: "",
    password: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="Login">
      <h1>Log In</h1>
      {error && (
        <p className="Login-error-txt">
          There has been an error with your submission. Please try again.
        </p>
      )}
      <form onSubmit={handleSubmit} className="Login-form">
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          id="password"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button>Log In</button>
      </form>
    </div>
  );
}

export default Login;
