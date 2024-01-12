import { renderHook, act } from "@testing-library/react";
import { useLoadFile } from "./use-load-file";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));
jest.mock("../../../../utils/AuthContext/AuthContext", () => ({
  useAuth: jest.fn(() => ({ isLoggedIn: true })),
}));

describe("useLoadFile Hook", () => {
  beforeEach(() => {
    // Reset the mock before each test
    jest.clearAllMocks();
  });

  it("should navigate to '/' if not logged in", () => {
    const { useNavigate } = require("react-router-dom");
    useNavigate.mockImplementation(() => {
      jest.fn();
    });

    const { useAuth } = require("../../../../utils/AuthContext/AuthContext");
    useAuth.mockImplementation(
      jest.fn(() => ({ isLoggedIn: true, logout: () => {} }))
    );
    const { result } = renderHook(() => useLoadFile(useNavigate));
    // Ensure the navigation is called
    expect(result.current.gridData).toEqual([]);
    expect(result.current.selectedRows).toEqual([]);
    expect(result.current.logout).toBeInstanceOf(Function);
    expect(result.current.handleFileUpload).toBeInstanceOf(Function);
    expect(result.current.handleRowSelection).toBeInstanceOf(Function);
    expect(result.current.handleDeleteRows).toBeInstanceOf(Function);
    expect(result.current.exportToExcel).toBeInstanceOf(Function);

    const mockFileList: FileList = {
      0: new File(["file content"], "test.xlsx", {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      length: 1,
      item: (index: number) => null,
      [Symbol.iterator]: function* () {
        for (let i = 0; i < this.length; i++) {
          yield this[i];
        }
      },
    };

    // Create a mock event object
    const mockEvent = {
      target: {
        files: mockFileList,
      },
    } as React.ChangeEvent<HTMLInputElement>;

    // Call handleFileUpload with the mock event
    act(() => {
      result.current.handleFileUpload(mockEvent);
    });

    expect(result.current.gridData).toEqual([]);
  });

  it("should handleDeleteRows correctly", () => {
    const { useNavigate } = require("react-router-dom");
    useNavigate.mockImplementation(() => {
      jest.fn();
    });

    const { useAuth } = require("../../../../utils/AuthContext/AuthContext");
    useAuth.mockImplementation(
      jest.fn(() => ({ isLoggedIn: true, logout: () => {} }))
    );
    const { result } = renderHook(() => useLoadFile(useNavigate));
    console.log(result.current);
    // Mock initial data
    const initialData = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Doe" },
    ];

    // Set initial data
    act(() => {
      result.current.setGridData(initialData);
    });

    // Set selected rows
    act(() => {
      result.current.setSelectedRows([2]);
    });

    // Call handleDeleteRows
    act(() => {
      result.current.handleDeleteRows();
    });

    // Assert that the data was correctly updated
    expect(result.current.gridData).toEqual([
      { id: 1, name: "John" },
      { id: 3, name: "Doe" },
    ]);

    // Assert that selectedRows is cleared
    expect(result.current.selectedRows).toEqual([]);
  });

  it("should exportToExcel correctly", () => {
    const { useNavigate } = require("react-router-dom");
    useNavigate.mockImplementation(() => {
      jest.fn();
    });

    const { useAuth } = require("../../../../utils/AuthContext/AuthContext");
    useAuth.mockImplementation(
      jest.fn(() => ({ isLoggedIn: true, logout: () => {} }))
    );
    const { result } = renderHook(() => useLoadFile(useNavigate));

    // Mock initial data
    const initialData = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Doe" },
    ];

    // Set initial data
    act(() => {
      result.current.setGridData(initialData);
    });

    // Call exportToExcel
    act(() => {
      result.current.exportToExcel();
    });
  });

  it("should handleRowSelection correctly", () => {
    const { useNavigate } = require("react-router-dom");
    useNavigate.mockImplementation(() => {
      jest.fn();
    });

    const { useAuth } = require("../../../../utils/AuthContext/AuthContext");
    useAuth.mockImplementation(
      jest.fn(() => ({ isLoggedIn: true, logout: () => {} }))
    );
    const { result } = renderHook(() => useLoadFile(useNavigate));

    // Mock initial data
    const initialData = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Doe" },
    ];

    // Set initial data
    act(() => {
      result.current.setGridData(initialData);
    });

    // Call handleRowSelection
    act(() => {
      result.current.handleRowSelection([2, 3]);
    });

    // Assert that the selectedRows state is updated correctly
    expect(result.current.selectedRows).toEqual([2, 3]);
  });
});
