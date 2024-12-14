import React, { useState } from "react";
import { TextField, MenuItem, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export default function AddTemplateForm() {
  const [rows, setRows] = useState([{ description: "", result: "", units: "", referenceRange: "" }]);
  const [template, setTemplate] = useState({ title: "", category: "" });

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { description: "", result: "", units: "", referenceRange: "" }]);
  };

  return (
    <>
      <TextField
        label="Template Title"
        value={template.title}
        onChange={(e) => setTemplate({ ...template, title: e.target.value })}
        style={{ marginRight: 10 }}
      />
      <TextField
        label="Category"
        select
        value={template.category}
        onChange={(e) => setTemplate({ ...template, category: e.target.value })}
        style={{ marginRight: 10 }}
      >
        <MenuItem value="Blood">Blood</MenuItem>
        <MenuItem value="Radiology">Radiology</MenuItem>
        <MenuItem value="Imaging">Imaging</MenuItem>
      </TextField>
      <Table style={{ marginTop: 20 }}>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Result</TableCell>
            <TableCell>Units</TableCell>
            <TableCell>Reference Range</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <TextField
                  value={row.description}
                  onChange={(e) => handleRowChange(index, "description", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.result}
                  onChange={(e) => handleRowChange(index, "result", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.units}
                  onChange={(e) => handleRowChange(index, "units", e.target.value)}
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.referenceRange}
                  onChange={(e) => handleRowChange(index, "referenceRange", e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" onClick={handleAddRow} style={{ marginTop: 20 }}>
        Add Row
      </Button>
    </>
  );
}
