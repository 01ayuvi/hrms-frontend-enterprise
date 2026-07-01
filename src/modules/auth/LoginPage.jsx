import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import { loginUser } from "../../services/authService";
import "./LoginPage.css";

function LoginPage() {
const navigate = useNavigate();

const { login } = useContext(AuthContext);

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await loginUser(
      username,
      password
    );

    await login(
      data.access_token,
      data.refresh_token
    );

    navigate("/dashboard");

  } catch (error) {

    console.log(error);

    alert("Login Failed");

  }
};

return (
  <div className="login-page">

    <div className="login-card">

      <h1 className="login-title">
        HRMS Login
      </h1>

      <form
        onSubmit={handleSubmit}
        className="login-form"
      >

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="login-btn"
        >
          Login
        </button>
        

      </form>

    </div>

  </div>
);
}

export default LoginPage;
