'use client';
import React, { useState } from "react";
import { TextField, MenuItem, Button, Grid, Typography } from "@mui/material";

export default function AddPatientForm() {
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const handleInputChange = (field, value) => {
    setPatient({ ...patient, [field]: value });
  };

  const handleSubmit = () => {
    // Add form submission logic
    console.log("Patient Data:", patient);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Add New Patient
      </Typography>
      <Grid container spacing={2}>
        {/* Personal Information */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            fullWidth
            value={patient.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            fullWidth
            value={patient.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={patient.dateOfBirth}
            onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Gender"
            select
            fullWidth
            value={patient.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone Number"
            fullWidth
            value={patient.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email Address"
            fullWidth
            value={patient.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Home Address"
            fullWidth
            multiline
            rows={3}
            value={patient.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </Grid>

        {/* Emergency Contact */}
        <Grid item xs={12} sm={6}>
          <TextField
            label="Emergency Contact Name"
            fullWidth
            value={patient.emergencyContactName}
            onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Emergency Contact Phone"
            fullWidth
            value={patient.emergencyContactPhone}
            onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
          />
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginRight: "10px" }}
          >
            Submit
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setPatient({})}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
