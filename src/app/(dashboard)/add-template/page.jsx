"use client";
import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Box,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AddTemplatePage() {
  const [template, setTemplate] = useState({
    title: "",
    category: "",
    price: "",
  });

  const [rows, setRows] = useState([
    { description: "", units: "", minValue: "", maxValue: "" },
  ]);

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      { description: "", units: "", minValue: "", maxValue: "" },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleSubmit = () => {
    console.log("Template Data:", template);
    console.log("Parameters:", rows);
    // Add logic to send the data to your backend
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Add New Template
      </Typography>

      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        {/* Template Title */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="Template Title"
            fullWidth
            value={template.title}
            onChange={(e) => setTemplate({ ...template, title: e.target.value })}
          />
        </Grid>

        {/* Template Category */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="Category"
            select
            fullWidth
            value={template.category}
            onChange={(e) => setTemplate({ ...template, category: e.target.value })}
          >
            <MenuItem value="Blood">Blood</MenuItem>
            <MenuItem value="Urine">Urine</MenuItem>
            <MenuItem value="Radiology">Radiology</MenuItem>
            <MenuItem value="Imaging">Imaging</MenuItem>
          </TextField>
        </Grid>

        {/* Template Price */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="Price"
            fullWidth
            value={template.price}
            onChange={(e) => setTemplate({ ...template, price: e.target.value })}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>
        Parameters
      </Typography>

      {/* Parameters Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Units</TableCell>
            <TableCell>Min Value</TableCell>
            <TableCell>Max Value</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <TextField
                  value={row.description}
                  onChange={(e) => handleRowChange(index, "description", e.target.value)}
                  placeholder="Description"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.units}
                  onChange={(e) => handleRowChange(index, "units", e.target.value)}
                  placeholder="Units"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.minValue}
                  onChange={(e) => handleRowChange(index, "minValue", e.target.value)}
                  placeholder="Min Value"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  value={row.maxValue}
                  onChange={(e) => handleRowChange(index, "maxValue", e.target.value)}
                  placeholder="Max Value"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <IconButton color="secondary" onClick={() => handleDeleteRow(index)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Add Row Button */}
      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={handleAddRow}
        sx={{ marginTop: "20px" }}
      >
        Add Row
      </Button>

      {/* Submit Button */}
      <Box sx={{ marginTop: "30px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ marginRight: "10px" }}
        >
          Submit Template
        </Button>
        <Button variant="outlined" color="secondary" onClick={() => setRows([])}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}