import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/AuthContext/AuthContext";
import "./Login.css";
const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    login(username, password);
    if (username === "usuario" && password === "contraseña") {
      navigate("/loadfile");
    } else {
      alert("Credenciales incorrectas");
    }
  };
  return (
    <div className="container-login">
      <form>
        <label>
          Usuario:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Contraseña:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
