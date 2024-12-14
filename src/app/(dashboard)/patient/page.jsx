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
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function AllPatientsPage() {
  const router = useRouter();

  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "1234567890",
      email: "john@example.com",
      gender: "Male",
      dob: "1990-01-01",
      registrationDate: "2024-11-30",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "9876543210",
      email: "jane@example.com",
      gender: "Female",
      dob: "1995-02-15",
      registrationDate: "2024-12-01",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Search and Filter Patients
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewTests = (patientId) => {
    router.push(`/patient/patient-tests/${patientId}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        All Patients
      </Typography>

      {/* Search Section */}
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Search by Name, Phone, or Email"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Patients Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Registration Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPatients.map((patient) => (
            <TableRow
              key={patient.id}
              style={{ cursor: "pointer" }}
              onClick={() => handleViewTests(patient.id)}
            >
              <TableCell>{patient.name}</TableCell>
              <TableCell>{patient.phone}</TableCell>
              <TableCell>{patient.email}</TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.dob}</TableCell>
              <TableCell>{patient.registrationDate}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewTests(patient.id);
                  }}
                >
                  View Tests
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
