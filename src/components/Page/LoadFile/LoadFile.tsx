import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import ReactDataGrid from "react-data-grid";
import { useAuth } from "../../../utils/AuthContext/AuthContext";
import "react-data-grid/lib/styles.css";

const LoadFile: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const [data, setData] = useState<any[]>([]);
  const [editedRows, setEditedRows] = useState(new Set<number>());

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const binaryStr = e.target?.result;
        if (binaryStr) {
          const workbook = XLSX.read(binaryStr, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          setData(sheetData);
        }
      };

      reader.readAsBinaryString(file);
    }
  };

  const handleRowUpdate = ({ fromRow, toRow, updated }: any) => {
    const updatedData = [...data];
    for (let i = fromRow; i <= toRow; i++) {
      updatedData[i] = { ...updatedData[i], ...updated };
      setEditedRows(new Set<number>([i, ...Array.from(editedRows)]));
    }
    setData(updatedData);
  };

  const handleRowDelete = (rowIndex: number) => {
    const updatedData = data.filter((_, index) => index !== rowIndex);
    setEditedRows(new Set<number>([...Array.from(editedRows), rowIndex]));
    setData(updatedData);
  };

  const handleSaveChanges = () => {
    console.log("Guardando cambios", data);
  };
  const columns =
    data.length > 0
      ? Object.keys(data[0]).map((key) => ({ key, name: key, editable: true }))
      : [];

  return (
    <div>
      <button type="button" onClick={() => logout()}>
        Cerrar Sesión
      </button>
      <h2>Cargar Archivo Excel</h2>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />

      {data.length > 0 && (
        <div>
          <ReactDataGrid
            columns={columns}
            rows={data}
            onRowsChange={handleRowUpdate}
          />

          <button onClick={handleSaveChanges}>Guardar Cambios</button>
        </div>
      )}
    </div>
  );
};

export default LoadFile;
