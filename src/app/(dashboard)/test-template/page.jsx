'use client';
import React, { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Grid,
  Box,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AllTemplatesPage() {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: "Blood Panel",
      category: "Blood",
      price: 150,
      parameters: [
        { description: "Hemoglobin", units: "g/dL", minValue: 12, maxValue: 16 },
        { description: "RBC Count", units: "millions/µL", minValue: 4.5, maxValue: 6 },
      ],
    },
    {
      id: 2,
      title: "Urine Test",
      category: "Urine",
      price: 100,
      parameters: [
        { description: "pH", units: "", minValue: 4.5, maxValue: 8 },
      ],
    },
  ]);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState(null);

  const handleEditClick = (template) => {
    setCurrentTemplate({ ...template, parameters: [...template.parameters] });
    setEditDialogOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      setTemplates(templates.filter((template) => template.id !== id));
    }
  };

  const handleEditChange = (field, value) => {
    setCurrentTemplate({ ...currentTemplate, [field]: value });
  };

  const handleParamChange = (index, field, value) => {
    const updatedParams = [...currentTemplate.parameters];
    updatedParams[index][field] = value;
    setCurrentTemplate({ ...currentTemplate, parameters: updatedParams });
  };

  const handleAddParam = () => {
    const newParam = { description: "", units: "", minValue: "", maxValue: "" };
    setCurrentTemplate({
      ...currentTemplate,
      parameters: [...currentTemplate.parameters, newParam],
    });
  };

  const handleDeleteParam = (index) => {
    const updatedParams = currentTemplate.parameters.filter((_, i) => i !== index);
    setCurrentTemplate({ ...currentTemplate, parameters: updatedParams });
  };

  const handleSaveEdit = () => {
    setTemplates(
      templates.map((template) =>
        template.id === currentTemplate.id ? currentTemplate : template
      )
    );
    setEditDialogOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        All Templates
      </Typography>

      {/* Templates Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {templates.map((template) => (
            <TableRow key={template.id}>
              <TableCell>{template.title}</TableCell>
              <TableCell>{template.category}</TableCell>
              <TableCell>${template.price}</TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  onClick={() => handleEditClick(template)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDeleteClick(template.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Template Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Edit Template</DialogTitle>
        <DialogContent>
          {/* Title, Category, Price */}
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={currentTemplate?.title || ""}
            onChange={(e) => handleEditChange("title", e.target.value)}
          />
          <TextField
            label="Category"
            select
            fullWidth
            margin="normal"
            value={currentTemplate?.category || ""}
            onChange={(e) => handleEditChange("category", e.target.value)}
          >
            <MenuItem value="Blood">Blood</MenuItem>
            <MenuItem value="Urine">Urine</MenuItem>
            <MenuItem value="Radiology">Radiology</MenuItem>
            <MenuItem value="Imaging">Imaging</MenuItem>
          </TextField>
          <TextField
            label="Price"
            fullWidth
            margin="normal"
            type="number"
            value={currentTemplate?.price || ""}
            onChange={(e) => handleEditChange("price", e.target.value)}
          />

          {/* Parameters Table */}
          <Typography variant="h6" gutterBottom>
            Parameters
          </Typography>
          {currentTemplate?.parameters.map((param, index) => (
            <Grid container spacing={2} sx={{marginBottom: 4}} key={index}>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Description"
                  fullWidth
                  value={param.description}
                  onChange={(e) =>
                    handleParamChange(index, "description", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Units"
                  fullWidth
                  value={param.units}
                  onChange={(e) =>
                    handleParamChange(index, "units", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Min Value"
                  fullWidth
                  type="number"
                  value={param.minValue}
                  onChange={(e) =>
                    handleParamChange(index, "minValue", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="Max Value"
                  fullWidth
                  type="number"
                  value={param.maxValue}
                  onChange={(e) =>
                    handleParamChange(index, "maxValue", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <IconButton
                  color="secondary"
                  onClick={() => handleDeleteParam(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button
            variant="outlined"
            startIcon={<AddCircleIcon />}
            onClick={handleAddParam}
            sx={{ marginTop: "10px" }}
          >
            Add Parameter
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditDialogOpen(false)}
            color="secondary"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}