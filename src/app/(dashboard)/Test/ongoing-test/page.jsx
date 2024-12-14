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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function OngoingTestsPage() {
  const [tests, setTests] = useState([
    {
      id: 1,
      patient: {
        name: "John Doe",
        phone: "1234567890",
        age: 35,
        gender: "M",
        civilId: "123456789012",
        doctorName: "Dr. Smith",
        sampleDate: "2024-12-01 10:00",
      },
      testName: "Hemoglobin Test",
      sample: "Blood Sample",
      collectionDate: "2024-12-01",
      status: "Ongoing",
      timestamp: null,
      parameters: [
        { name: "Hemoglobin", unit: "g/dL", min: 12, max: 16, value: "", comment: "" },
        { name: "RBC Count", unit: "millions/µL", min: 4.5, max: 5.5, value: "", comment: "" },
      ],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Helper function to check if all results are valid
  const isValidResults = (parameters) => {
    return parameters.every(
      (param) => param.value >= param.min && param.value <= param.max
    );
  };

  // Filter tests by search query
  const filteredTests = tests.filter(
    (test) =>
      test.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open modal to enter test results
  const handleEnterResults = (test) => {
    setSelectedTest(test);
    setOpenModal(true);
  };

  // Handle saving results
  const handleSaveResults = () => {
    const updatedTests = tests.map((test) =>
      test.id === selectedTest.id ? selectedTest : test
    );
    setTests(updatedTests);
    setOpenModal(false);
  };

  // Generate PDF for the selected test
  const generatePDF = (test) => {
    const doc = new jsPDF();

    // Correct path to background image
    const backgroundImage = "/images/assets/testBackground.jpeg";

    // Add the background image
    doc.addImage(backgroundImage, "JPEG", 0, 0, 210, 297); // A4 size (210mm x 297mm)

    // Add Patient Details
    doc.setFontSize(12);
    doc.text(`Patient Name: ${test.patient.name}`, 20, 50);
    doc.text(`Age/Gender: ${test.patient.age} Y/${test.patient.gender}`, 20, 60);
    doc.text(`Civil ID: ${test.patient.civilId}`, 20, 70);
    doc.text(`Phone No: ${test.patient.phone}`, 20, 80);
    doc.text(`Doctor Name: ${test.patient.doctorName}`, 20, 90);
    doc.text(`Sample Date: ${test.patient.sampleDate}`, 20, 100);

    // Add Test Details Header
    doc.setFontSize(16);
    doc.text("LABORATORY REPORT", 105, 120, null, null, "center");

    // Add Test Results Table
    const tableData = test.parameters.map((param) => [
      param.name,
      param.value,
      param.unit,
      `${param.min} - ${param.max}`,
      param.value < param.min || param.value > param.max ? "Out of Range" : "Normal",
    ]);

    doc.autoTable({
      startY: 130,
      head: [["Parameter", "Result", "Units", "Reference Range", "Flag"]],
      body: tableData,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 0, 0] },
    });

    // Footer
    const finalY = doc.previousAutoTable.finalY + 10;
    doc.text("Lab Incharge", 20, finalY);
    doc.text("***END OF REPORT***", 105, finalY + 20, null, null, "center");

    // Save PDF
    doc.save(`Test_Report_${test.patient.civilId}.pdf`);
  };

  // Mark test as complete
  const handleMarkComplete = (testId) => {
    const updatedTests = tests.map((test) =>
      test.id === testId
        ? { ...test, status: "Completed", timestamp: new Date().toISOString() }
        : test
    );
    setTests(updatedTests);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Ongoing Tests
      </Typography>

      {/* Search Section */}
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Search by Patient Name or Test Name"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Grid>
      </Grid>

      {/* Ongoing Tests Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
            <TableCell>Test Name</TableCell>
            <TableCell>Sample</TableCell>
            <TableCell>Collection Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTests.map((test) => (
            <TableRow key={test.id}>
              <TableCell>{test.patient.name}</TableCell>
              <TableCell>{test.testName}</TableCell>
              <TableCell>{test.sample}</TableCell>
              <TableCell>{test.collectionDate}</TableCell>
              <TableCell>{test.status}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleEnterResults(test)}
                  sx={{ marginRight: 1 }}
                >
                  Enter Results
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="success"
                  onClick={() => generatePDF(test)}
                  disabled={!isValidResults(test.parameters)}
                  sx={{ marginRight: 1 }}
                >
                  Generate Report
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  onClick={() => handleMarkComplete(test.id)}
                  disabled={!isValidResults(test.parameters)}
                >
                  Mark Complete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Enter Test Results Modal */}
      {selectedTest && (
        <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="md" fullWidth>
          <DialogTitle>Enter Results for {selectedTest.testName}</DialogTitle>
          <DialogContent>
            <Typography variant="subtitle1" gutterBottom>
              Patient Name: {selectedTest.patient.name}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Parameter Name</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Min Value</TableCell>
                  <TableCell>Max Value</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Comments</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedTest.parameters.map((param, index) => (
                  <TableRow key={index}>
                    <TableCell>{param.name}</TableCell>
                    <TableCell>{param.unit}</TableCell>
                    <TableCell>{param.min}</TableCell>
                    <TableCell>{param.max}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        error={param.value < param.min || param.value > param.max}
                        helperText={
                          param.value < param.min || param.value > param.max
                            ? "Out of Range"
                            : ""
                        }
                        value={param.value}
                        onChange={(e) => {
                          const updatedParameters = [...selectedTest.parameters];
                          updatedParameters[index].value = parseFloat(e.target.value) || "";
                          setSelectedTest({
                            ...selectedTest,
                            parameters: updatedParameters,
                          });
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={param.comment}
                        onChange={(e) => {
                          const updatedParameters = [...selectedTest.parameters];
                          updatedParameters[index].comment = e.target.value;
                          setSelectedTest({
                            ...selectedTest,
                            parameters: updatedParameters,
                          });
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenModal(false)} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => handleSaveResults()}
              variant="contained"
              color="primary"
            >
              Save Results
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
