import { render, screen, fireEvent } from "@testing-library/react";
import { LoadFileComponent } from "./load-file";

// Mock useLoadFile hook
jest.mock("./use-load-file/use-load-file", () => ({
  useLoadFile: () => ({
    gridData: [
      {
        id: 1,
        Library: "Library 1",
        Component: "Component 1",
        Status: "Active",
        "% COVERAGE": 80,
      },
      // Add more sample data if needed
    ],
    selectedRows: [],
    logout: jest.fn(),
    handleFileUpload: jest.fn(),
    handleRowSelection: jest.fn(),
    handleDeleteRows: jest.fn(),
    exportToExcel: jest.fn(),
  }),
}));

test("renders LoadFileComponent correctly", () => {
  render(<LoadFileComponent />);

  // Verify the file input and logout button are rendered
  expect(screen.getByLabelText("ID")).toBeDefined();
  expect(screen.getByText("Cerrar Sesión")).toBeDefined();

  // Simulate a file upload
  const fileInput = screen.getByLabelText("ID");
  fireEvent.change(fileInput, {
    target: { files: [new File([""], "test.xlsx")] },
  });

  expect(screen.getByText("Exportar a Excel")).toBeDefined();

  expect(screen.getByText("Borrar Filas")).toBeDefined();

  //click in logout
  fireEvent.click(screen.getByText("Cerrar Sesión"));
});
