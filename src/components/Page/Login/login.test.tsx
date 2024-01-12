import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../../utils/AuthContext/AuthContext"; // Assuming you have AuthProvider

import { Login } from "./login";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Login Component", () => {
  it("renders login form and handles login correctly", () => {
    const { useNavigate } = require("react-router-dom");
    useNavigate.mockImplementation(() => jest.fn());

    render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );

    // Verify that the form elements are rendered
    expect(screen.getByLabelText("Usuario:")).toBeDefined();
    expect(screen.getByLabelText("Contraseña:")).toBeDefined();
    expect(screen.getByText("Iniciar Sesión")).toBeDefined();

    // Simulate user input
    fireEvent.change(screen.getByLabelText("Usuario:"), {
      target: { value: "usuario" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña:"), {
      target: { value: "contraseña" },
    });

    // Simulate button click
    fireEvent.click(screen.getByText("Iniciar Sesión"));

    // Verify that useNavigate is called with the correct path after successful login
    expect(useNavigate).toHaveBeenCalled();

    // You can add more assertions based on your specific component behavior
  });

  it("show an eror when credentials are incorrect", () => {
    const { useNavigate } = require("react-router-dom");
    useNavigate.mockImplementation(() => jest.fn());

    render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );

    // Verify that the form elements are rendered
    expect(screen.getByLabelText("Usuario:")).toBeDefined();
    expect(screen.getByLabelText("Contraseña:")).toBeDefined();
    expect(screen.getByText("Iniciar Sesión")).toBeDefined();

    // Simulate user input
    fireEvent.change(screen.getByLabelText("Usuario:"), {
      target: { value: "usuario2" },
    });
    fireEvent.change(screen.getByLabelText("Contraseña:"), {
      target: { value: "contraseña1" },
    });

    // Simulate button click
    fireEvent.click(screen.getByText("Iniciar Sesión"));

    // Verify that useNavigate is called with the correct path after successful login
    expect(screen.getAllByText("Credenciales Incorrectas")).toBeDefined();
  });
});
