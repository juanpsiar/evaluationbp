import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { useAuth } from "../../../../utils/AuthContext/AuthContext";
import { DataGrid, GridRowId, GridColDef } from "@mui/x-data-grid";

const useLoadFile = () => {
  const [gridData, setGridData] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const headers: any = sheetData[0];
        const rows = sheetData.slice(1).map((row: any, index: number) => {
          const rowData: { [key: string]: any } = {};
          row.forEach((cell: any, cellIndex: number) => {
            rowData[headers[cellIndex]] = cell;
          });
          return { id: index + 1, ...rowData };
        });

        setGridData(rows);
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleRowSelection = (selection: GridRowId[]) => {
    setSelectedRows(selection);
  };

  const handleDeleteRows = () => {
    setGridData((prevData) =>
      prevData.filter((row) => !selectedRows.includes(row.id))
    );
    setSelectedRows([]);
  };

  const exportToExcel = () => {
    const sheetData = [Object.keys(gridData[0])].concat(
      gridData.map((row) => Object.values(row))
    );
    const ws = XLSX.utils.aoa_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet 1");
    XLSX.writeFile(wb, "exported_data.xlsx");
  };

  return {
    gridData,
    selectedRows,
    logout,
    handleFileUpload,
    handleRowSelection,
    handleDeleteRows,
    exportToExcel,
  };
};

export { useLoadFile };
