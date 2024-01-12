import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useLoadFile } from "./use-load-file/use-load-file";
import "./load-file.css";
interface ExcelGridProps {}

const LoadFileComponent: React.FC<ExcelGridProps> = () => {
  const {
    gridData,
    selectedRows,
    logout,
    handleFileUpload,
    handleRowSelection,
    handleDeleteRows,
    exportToExcel,
  } = useLoadFile();

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
      <input type="file" onChange={handleFileUpload} />
      <button type="button" onClick={() => logout()}>
        Cerrar Sesión
      </button>
      {gridData && gridData?.length > 0 && (
        <div>
          <DataGrid
            rows={gridData}
            columns={columns}
            onRowSelectionModelChange={handleRowSelection}
            editMode="row"
          />
          <button onClick={exportToExcel}>Exportar a Excel</button>

          <button onClick={handleDeleteRows}>Borrar Filas</button>
        </div>
      )}
    </div>
  );
};

export { LoadFileComponent };
