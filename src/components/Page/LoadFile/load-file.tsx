import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useLoadFile } from "./use-load-file/use-load-file";
import { useNavigate } from "react-router-dom";

import "./load-file.css";
interface ExcelGridProps {}

const LoadFileComponent: React.FC<ExcelGridProps> = () => {
  const {
    gridData,
    logout,
    handleFileUpload,
    handleRowSelection,
    handleDeleteRows,
    exportToExcel,
  } = useLoadFile(useNavigate);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      hideable: false,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Library",
      headerName: "LIBRARY",
      width: 250,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Component",
      headerName: "COMPONENT",
      width: 250,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Status",
      headerName: "STATUS",
      width: 200,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "% COVERAGE",
      headerName: "% COVERAGE",
      width: 150,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
  ];

  return (
    <div className="load-file-container">
      <div className="header-container">
        <div className="load-file-section">
          <label>Cargar archivo</label>
          <input type="file" onChange={handleFileUpload} />
        </div>
        <button
          className="logout-button"
          type="button"
          onClick={() => logout()}
        >
          Cerrar Sesión
        </button>
      </div>
      {gridData && gridData?.length > 0 && (
        <div>
          <div className="button-container">
            <button
              className="button-table-interaction"
              onClick={exportToExcel}
            >
              Exportar a Excel
            </button>

            <button
              className="button-table-interaction"
              onClick={handleDeleteRows}
            >
              Borrar Filas
            </button>
          </div>
          <DataGrid
            rows={gridData}
            columns={columns}
            onRowSelectionModelChange={handleRowSelection}
            editMode="row"
          />
        </div>
      )}
    </div>
  );
};

export { LoadFileComponent };
