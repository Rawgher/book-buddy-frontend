import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register({ signup }) {
  const INITIAL_STATE = {
    username: "",
    password: "",
    email: "",
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
      await signup(formData);
      navigate("/");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="Register">
      <h1>Join the Book Club</h1>
      {error && (
        <div className="Register-error-div">
          {error.map((err, idx) => (
            <p key={idx} className="Register-error-txt">
              {err.message}
            </p>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="Register-form">
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

        <input
          id="email"
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button>Join Now</button>
      </form>
    </div>
  );
}

export default Register;
