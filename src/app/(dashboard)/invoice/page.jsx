"use client";

import React, { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  IconButton,
} from "@mui/material";
import { jsPDF } from "jspdf";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

export default function AllInvoicesPage() {
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      invoiceNumber: "INV001",
      patient: { name: "John Doe", phone: "1234567890" },
      total: 150,
      status: "Paid",
      issueDate: "2024-11-30",
    },
    {
      id: 2,
      invoiceNumber: "INV002",
      patient: { name: "Jane Smith", phone: "9876543210" },
      total: 200,
      status: "Unpaid",
      issueDate: "2024-12-01",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Invoices
  const filteredInvoices = invoices.filter((invoice) => {
    if (filterStatus !== "All" && invoice.status !== filterStatus) {
      return false;
    }
    if (
      searchQuery &&
      !invoice.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !invoice.patient.phone.includes(searchQuery)
    ) {
      return false;
    }
    return true;
  });

  const handleGeneratePDF = (invoice) => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Invoice Details", 10, 10);
    doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 10, 20);
    doc.text(`Patient Name: ${invoice.patient.name}`, 10, 30);
    doc.text(`Phone: ${invoice.patient.phone}`, 10, 40);
    doc.text(`Total: $${invoice.total}`, 10, 50);
    doc.text(`Status: ${invoice.status}`, 10, 60);
    doc.text(`Issue Date: ${invoice.issueDate}`, 10, 70);

    doc.save(`${invoice.invoiceNumber}.pdf`);
  };

  const handleViewDetails = (invoice) => {
    alert(`Viewing details for Invoice #${invoice.invoiceNumber}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        All Invoices
      </Typography>

      {/* Filters Section */}
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            {/* <InputLabel>Status</InputLabel> */}
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Unpaid">Unpaid</MenuItem>
              <MenuItem value="Partially Paid">Partially Paid</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={3}>
          <TextField
            label="Search by Name or Phone"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Invoices Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Invoice Number</TableCell>
            <TableCell>Patient Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Issue Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.patient.name}</TableCell>
              <TableCell>{invoice.patient.phone}</TableCell>
              <TableCell>${invoice.total}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell>{invoice.issueDate}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => handleViewDetails(invoice)}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleGeneratePDF(invoice)}
                >
                  <PictureAsPdfIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
