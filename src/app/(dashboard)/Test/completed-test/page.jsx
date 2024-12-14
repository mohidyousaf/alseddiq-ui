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
  CircularProgress,
} from "@mui/material";
import jsPDF from "jspdf";
import "jspdf-autotable";
import axios from "axios";

export default function CompletedTestsPage() {
  const [tests, setTests] = useState([
    {
      id: 1,
      patient: {
        name: "John Doe",
        phone: "+923203543535",
        age: 35,
        gender: "M",
        civilId: "123456789012",
      },
      testName: "Hemoglobin Test",
      sample: "Blood Sample",
      completedAt: "2024-12-01 12:00",
      hostedPDF: "",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTestId, setCurrentTestId] = useState(null);

  // Filter completed tests
  const filteredTests = tests.filter(
    (test) =>
      test.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate PDF and host on Cloudinary
  const generateAndHostPDF = async (test) => {
    const doc = new jsPDF();
    const backgroundImage = "/images/assets/testBackground.jpeg";
  
    // Add background image and patient details
    doc.addImage(backgroundImage, "JPEG", 0, 0, 210, 297);
    doc.setFontSize(12);
    doc.text(`Patient Name: ${test.patient.name}`, 20, 50);
    doc.text(`Age/Gender: ${test.patient.age} Y/${test.patient.gender}`, 20, 60);
    doc.text(`Civil ID: ${test.patient.civilId}`, 20, 70);
    doc.text(`Phone No: ${test.patient.phone}`, 20, 80);
    doc.text(`Completed At: ${test.completedAt}`, 20, 90);
  
    // Test details
    doc.setFontSize(16);
    doc.text("LABORATORY REPORT", 105, 120, null, null, "center");
    doc.autoTable({
      startY: 130,
      head: [["Parameter", "Result", "Units", "Reference Range"]],
      body: [["Hemoglobin", "15", "g/dL", "12-16"]],
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 0, 0] },
    });
  
    // Footer
    doc.text("***END OF REPORT***", 105, 280, null, null, "center");
  
    // Convert PDF to Blob
    const pdfBlob = doc.output("blob", { type: "application/pdf" });
  
    // Prepare FormData
    const formData = new FormData();
    formData.append("file", pdfBlob, `${test.testName}.pdf`);
    formData.append("upload_preset", "pdf_upload_preset"); // Replace with your preset name
    formData.append("resource_type", "raw"); // Explicitly set resource type to raw
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dreh4vmxa/raw/upload`, // Use raw endpoint
        {
          method: "POST",
          body: formData,
        }
      );
  
      const data = await response.json();
  
      if (data.secure_url) {
        console.log("Hosted PDF URL:", data.secure_url);
        return data.secure_url; // Return the hosted URL
      } else {
        console.error("Cloudinary response:", data);
        throw new Error("Cloudinary upload failed");
      }
    } catch (error) {
      console.error("Error hosting PDF:", error);
      throw new Error("Failed to host PDF");
    }
  };
  
  // Send SMS with hosted PDF link
  const sendSMS = async (test) => {
    setLoading(true);
    setCurrentTestId(test.id);

    try {
      const hostedPDF = await generateAndHostPDF(test);

      // Update the hosted PDF URL in the state
      setTests((prevTests) =>
        prevTests.map((t) =>
          t.id === test.id ? { ...t, hostedPDF } : t
        )
      );

      // Send SMS using Twilio
      await axios.post("/api/send-sms", {
        phoneNumber: test.patient.phone,
        message: `Your lab report is ready. View it here: ${hostedPDF}`,
      });

      alert("SMS Sent Successfully!");
    } catch (error) {
      console.error("Error sending SMS:", error);
      alert("Failed to send SMS.");
    } finally {
      setLoading(false);
      setCurrentTestId(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Completed Tests
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

      {/* Completed Tests Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
            <TableCell>Test Name</TableCell>
            <TableCell>Sample</TableCell>
            <TableCell>Completed At</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTests.map((test) => (
            <TableRow key={test.id}>
              <TableCell>{test.patient.name}</TableCell>
              <TableCell>{test.testName}</TableCell>
              <TableCell>{test.sample}</TableCell>
              <TableCell>{test.completedAt}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  color="success"
                  onClick={() => sendSMS(test)}
                  disabled={loading && currentTestId === test.id}
                >
                  {loading && currentTestId === test.id ? (
                    <CircularProgress size={20} />
                  ) : (
                    "Send SMS"
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
