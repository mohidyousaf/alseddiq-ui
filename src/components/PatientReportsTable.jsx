"use client"
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, Paper } from "@mui/material";

export default function PatientReportsTable() {
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({ patientName: "", status: "" });

  const dummyReports = [
    { id: 1, patientName: "John Doe", report: "Blood Test", status: "Completed", paymentStatus: "Paid" },
    { id: 2, patientName: "Jane Smith", report: "X-Ray", status: "Pending", paymentStatus: "Unpaid" },
    { id: 3, patientName: "Sam Wilson", report: "CT Scan", status: "Completed", paymentStatus: "Paid" },
  ];

  useEffect(() => {
    setReports(dummyReports);
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div style={{ margin: "20px 0" }}>
        <TextField
          name="patientName"
          label="Patient Name"
          value={filters.patientName}
          onChange={handleFilterChange}
          style={{ marginRight: 10 }}
        />
        <TextField
          name="status"
          label="Status"
          value={filters.status}
          onChange={handleFilterChange}
          style={{ marginRight: 10 }}
        />
        <Button variant="contained" onClick={() => console.log("Filters applied!")}>
          Apply Filters
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Report</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.patientName}</TableCell>
                <TableCell>{report.report}</TableCell>
                <TableCell>{report.status}</TableCell>
                <TableCell>{report.paymentStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
