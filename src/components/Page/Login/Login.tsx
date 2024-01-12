import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../utils/AuthContext/AuthContext";
import "./login.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  const handleLogin = () => {
    login(username, password);

    if (username === "usuario" && password === "contraseña") {
      navigate("/loadfile");
    }
  };

  return (
    <div className="container-login">
      {!isLoggedIn && username.length > 0 && (
        <div className="error-legend-container">
          <label className="error-legend-text">Credenciales Incorrectas</label>
        </div>
      )}
      <form className="form-container">
        <label className="input-field-container">
          <div className="legend-container">Usuario:</div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label className="input-field-container">
          <div className="legend-container">Contraseña:</div>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <div className="login-button-container">
          <button type="button" onClick={handleLogin}>
            Iniciar Sesión
          </button>
        </div>
      </form>
    </div>
  );
};

export { Login };
