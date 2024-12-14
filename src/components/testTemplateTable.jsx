import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function TestTemplatesTable() {
  const [templates, setTemplates] = useState([]);

  const dummyTemplates = [
    { id: 1, name: "Blood Test", category: "Blood", createdDate: "2024-01-01" },
    { id: 2, name: "X-Ray", category: "Radiology", createdDate: "2024-02-15" },
    { id: 3, name: "CT Scan", category: "Imaging", createdDate: "2024-03-10" },
  ];

  useEffect(() => {
    setTemplates(dummyTemplates);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Template Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Created Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.map((template) => (
            <TableRow key={template.id}>
              <TableCell>{template.name}</TableCell>
              <TableCell>{template.category}</TableCell>
              <TableCell>{template.createdDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
