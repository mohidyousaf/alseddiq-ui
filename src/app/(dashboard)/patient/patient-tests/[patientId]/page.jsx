"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";

export default function PatientTestsPage() {
  const params = useParams();
  const patientId = params.patientId; // Get the dynamic route parameter

  // Sample Test Data (with multiple sample tests per entry)
  const tests = [
    {
      id: 1,
      patientId: "1",
      date: "2024-11-30",
      status: "Completed",
      total: 150,
      samples: [
        { name: "Hemoglobin Test", sample: "Blood Sample", price: 50 },
        { name: "RBC Count", sample: "Blood Sample", price: 100 },
      ],
    },
    {
      id: 2,
      patientId: "1",
      date: "2024-11-29",
      status: "Ongoing",
      total: 200,
      samples: [
        { name: "Liver Function Test", sample: "Serum Sample", price: 200 },
      ],
    },
    {
      id: 3,
      patientId: "2",
      date: "2024-12-01",
      status: "Pending",
      total: 30,
      samples: [
        { name: "Glucose Test", sample: "Plasma Sample", price: 30 },
      ],
    },
  ];

  // Filter tests by patient ID
  const patientTests = tests.filter((test) => test.patientId === patientId);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Tests for Patient #{patientId}
      </Typography>

      {/* Table to Display Tests */}
      {patientTests.map((test) => (
        <div key={test.id} style={{ marginBottom: "30px" }}>
          <Typography variant="h6">
            Test Date: {test.date} | Status: {test.status} | Total: ${test.total}
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Test Name</TableCell>
                <TableCell>Sample</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {test.samples.map((sample, index) => (
                <TableRow key={index}>
                  <TableCell>{sample.name}</TableCell>
                  <TableCell>{sample.sample}</TableCell>
                  <TableCell>${sample.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}

      {/* Back Button */}
      <Button
        variant="outlined"
        onClick={() => {
          history.back();
        }}
        sx={{ marginTop: "20px" }}
      >
        Back to Patients
      </Button>
    </div>
  );
}
