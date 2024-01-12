import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext/AuthContext";
import { Login } from "./components/Page/Login/login";
import { LoadFileComponent } from "./components/Page/LoadFile/load-file";

import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/loadfile",
      element: <LoadFileComponent />,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
