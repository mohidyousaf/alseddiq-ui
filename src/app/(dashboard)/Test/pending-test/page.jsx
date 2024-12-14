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

export default function PendingTestsPage() {
  const router = useRouter();

  // Sample Data for Pending Tests
  const [tests, setTests] = useState([
    {
      id: 1,
      patient: { name: "John Doe", phone: "1234567890" },
      testName: "Hemoglobin Test",
      sample: "Blood Sample",
      date: "2024-11-30",
      status: "Pending",
    },
    {
      id: 2,
      patient: { name: "Jane Smith", phone: "9876543210" },
      testName: "Liver Function Test",
      sample: "Serum Sample",
      date: "2024-11-29",
      status: "Pending",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // Filter tests by search query
  const filteredTests = tests.filter(
    (test) =>
      test.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.patient.phone.includes(searchQuery)
  );

  // Mark test as ongoing
  const handleMarkAsOngoing = (testId) => {
    const updatedTests = tests.map((test) =>
      test.id === testId
        ? { ...test, status: "Ongoing", timestamp: new Date().toISOString() }
        : test
    );
    setTests(updatedTests);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Pending Tests
      </Typography>

      {/* Search Section */}
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Search by Patient Name or Phone"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Pending Tests Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Test Name</TableCell>
            <TableCell>Sample</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTests.map((test) => (
            <TableRow key={test.id}>
              <TableCell>{test.patient.name}</TableCell>
              <TableCell>{test.patient.phone}</TableCell>
              <TableCell>{test.testName}</TableCell>
              <TableCell>{test.sample}</TableCell>
              <TableCell>{test.date}</TableCell>
              <TableCell>{test.status}</TableCell>
              <TableCell>
                {test.status === "Pending" && (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleMarkAsOngoing(test.id)}
                  >
                    Mark as Ongoing
                  </Button>
                )}
                {test.timestamp && (
                  <Typography variant="body2" color="textSecondary">
                    {`Marked Ongoing at ${new Date(test.timestamp).toLocaleString()}`}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
