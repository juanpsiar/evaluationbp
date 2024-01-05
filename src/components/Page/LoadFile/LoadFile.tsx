import React, { useEffect } from "react";
import { useAuth } from "../../../utils/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";

const LoadFile: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  console.log(isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div>
      <button type="button" onClick={() => logout()}>
        Cerrar Sesión
      </button>
      <h2>Cargar Archivo Excel</h2>
    </div>
  );
};

export default LoadFile;
