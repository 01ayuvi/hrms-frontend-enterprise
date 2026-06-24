import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import { loginUser } from "../../services/authService";

function LoginPage() {
const navigate = useNavigate();

const { login } = useContext(AuthContext);

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = async (e) => {
e.preventDefault();

console.log("STEP 1");

try {
  console.log("STEP 2");

  const data = await loginUser(
    username,
    password
  );

  console.log("STEP 3");
  console.log(data);

  login(
    data.access_token,
    data.refresh_token
  );

  console.log("STEP 4");

  navigate("/dashboard");
} catch (error) {
  console.log("ERROR OCCURRED");
  console.log(error);
  console.log(error.response);

  alert("Login Failed");
}

};

return (
<div style={{ padding: "40px" }}> <h1>HRMS Login</h1>

  <form onSubmit={handleSubmit}>
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) =>
        setUsername(e.target.value)
      }
    />

    <br />
    <br />

    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
    />

    <br />
    <br />

    <button type="submit">
      Login
    </button>
  </form>
</div>


);
}

export default LoginPage;
