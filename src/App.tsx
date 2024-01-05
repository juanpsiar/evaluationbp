import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext/AuthContext";
import Login from "./components/Page/Login/Login";
import LoadFile from "./components/Page/LoadFile/LoadFile";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/loadfile",
      element: <LoadFile />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
