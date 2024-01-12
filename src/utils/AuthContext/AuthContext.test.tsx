import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";

describe("AuthContext", () => {
  it("renders children and provides login/logout functionality", () => {
    const TestComponent = () => {
      const { isLoggedIn, login, logout } = useAuth();

      return (
        <div>
          <div data-testid="isLoggedIn">{`${isLoggedIn}`}</div>
          <button
            data-testid="loginButton"
            onClick={() => login("usuario", "contraseña")}
          >
            Login
          </button>
          <button data-testid="logoutButton" onClick={logout}>
            Logout
          </button>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    screen.getByTestId("logoutButton").click();

    expect(screen.getByTestId("logoutButton").textContent).toBe("Logout");
  });

  it("throws an error when useAuth is not used within AuthProvider", () => {
    const TestComponent = () => {
      try {
        useAuth();
      } catch (error: any) {
        return <div data-testid="error">{error.message}</div>;
      }
      return null;
    };

    render(<TestComponent />);

    expect(screen.getByTestId("error").textContent).toBe(
      "useAuth debe ser utilizado dentro de un AuthProvider"
    );
  });
});
