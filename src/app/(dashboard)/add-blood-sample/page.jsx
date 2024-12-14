"use client";

import React, { useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  Button,
  Autocomplete,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function AllTestsPage() {
  const [tests, setTests] = useState([]);
  const [step, setStep] = useState(0);
  const [newBloodSampleOpen, setNewBloodSampleOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [newSample, setNewSample] = useState({
    patient: null,
    collector: "",
    collectionDate: new Date().toLocaleString(),
    testTemplates: [],
    discountType: "fixed",
    discountAmount: 0,
    paymentMode: "",
    paymentStatus: "Unpaid",
    additionalNotes: "",
    status: "Pending", // Default to Pending
  });

  const patients = [
    { id: 1, name: "John Doe", contact: "john@example.com", phone: "1234567890" },
    { id: 2, name: "Jane Smith", contact: "jane@example.com", phone: "9876543210" },
  ];

  const testTemplates = [
    { id: 1, name: "Hemoglobin Test", price: 50 },
    { id: 2, name: "RBC Count", price: 60 },
    { id: 3, name: "Liver Function Test", price: 100 },
  ];

  const steps = ["Patient Details", "Test Selection", "Invoice"];

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);

  const calculateSubtotal = () => {
    return newSample.testTemplates.reduce((acc, template) => acc + template.price, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    if (newSample.discountType === "percentage") {
      return subtotal - (subtotal * newSample.discountAmount) / 100;
    }
    return subtotal - newSample.discountAmount;
  };

  const handleSaveInvoice = () => {
    const newTest = {
      ...newSample,
      id: tests.length + 1,
      total: calculateTotal(),
      subtotal: calculateSubtotal(),
      status: "Pending", // Save as pending status initially
    };

    setTests([...tests, newTest]);

    // Reset and close modal
    setNewBloodSampleOpen(false);
    setStep(0);
    setNewSample({
      patient: null,
      collector: "",
      collectionDate: new Date().toLocaleString(),
      testTemplates: [],
      discountType: "fixed",
      discountAmount: 0,
      paymentMode: "",
      paymentStatus: "Unpaid",
      additionalNotes: "",
      status: "Pending",
    });
  };

  const handleCancelSample = () => {
    setNewBloodSampleOpen(false);
    setStep(0);
  };

  // Filter Tests by Status and Search
  const filteredTests = tests.filter((test) => {
    if (filterStatus !== "All" && test.status !== filterStatus) {
      return false;
    }
    if (
      searchQuery &&
      !test.patient?.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !test.patient?.phone.includes(searchQuery)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        All Tests
      </Typography>

      {/* Filter Section */}
      <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
        <Grid item xs={6} md={3}>
          <FormControl fullWidth>
            {/* <InputLabel>Status</InputLabel> */}
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Ongoing">Ongoing</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
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

      <Button
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={() => setNewBloodSampleOpen(true)}
        sx={{ marginBottom: "20px" }}
      >
        Add New Blood Sample
      </Button>

      {/* Tests Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sample ID</TableCell>
            <TableCell>Patient Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Collection Date</TableCell>
            <TableCell>Collector</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTests.map((test) => (
            <TableRow key={test.id}>
              <TableCell>{`BS${test.id}`}</TableCell>
              <TableCell>{test.patient?.name}</TableCell>
              <TableCell>{test.patient?.phone}</TableCell>
              <TableCell>{test.collectionDate}</TableCell>
              <TableCell>{test.collector}</TableCell>
              <TableCell>${test.total}</TableCell>
              <TableCell>{test.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Stepper Modal */}
      <Dialog
        open={newBloodSampleOpen}
        onClose={handleCancelSample}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Add New Blood Sample</DialogTitle>
        <DialogContent>
          <Stepper activeStep={step} sx={{ marginBottom: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step 1: Patient Details */}
          {step === 0 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Autocomplete
                  options={patients}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Patient" fullWidth />
                  )}
                  onChange={(e, value) =>
                    setNewSample({ ...newSample, patient: value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Collector Name"
                  fullWidth
                  value={newSample.collector}
                  onChange={(e) =>
                    setNewSample({ ...newSample, collector: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Collection Date"
                  fullWidth
                  value={newSample.collectionDate}
                  disabled
                />
              </Grid>
            </Grid>
          )}

          {/* Step 2: Test Selection */}
          {step === 1 && (
            <Autocomplete
              multiple
              options={testTemplates}
              getOptionLabel={(option) => `${option.name} - $${option.price}`}
              onChange={(e, value) =>
                setNewSample({ ...newSample, testTemplates: value })
              }
              renderInput={(params) => (
                <TextField {...params} label="Select Tests" fullWidth />
              )}
            />
          )}

          {/* Step 3: Invoice */}
          {step === 2 && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>
                  <strong>Patient Name:</strong> {newSample.patient?.name}
                </Typography>
                <Typography>
                  <strong>Phone:</strong> {newSample.patient?.phone}
                </Typography>
                <Typography>
                  <strong>Collection Date:</strong> {newSample.collectionDate}
                </Typography>
                <Typography>
                  <strong>Tests:</strong>
                </Typography>
                {newSample.testTemplates.map((test) => (
                  <Typography key={test.id}>
                    - {test.name} (${test.price})
                  </Typography>
                ))}
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Discount Amount"
                  type="number"
                  fullWidth
                  value={newSample.discountAmount}
                  onChange={(e) =>
                    setNewSample({ ...newSample, discountAmount: parseFloat(e.target.value) || 0 })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Payment Mode"
                  select
                  fullWidth
                  value={newSample.paymentMode}
                  onChange={(e) =>
                    setNewSample({ ...newSample, paymentMode: e.target.value })
                  }
                >
                  <MenuItem value="Cash">Cash</MenuItem>
                  <MenuItem value="KNET">KNET</MenuItem>
                  <MenuItem value="Cheque">Cheque</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Additional Notes"
                  fullWidth
                  multiline
                  rows={3}
                  value={newSample.additionalNotes}
                  onChange={(e) =>
                    setNewSample({ ...newSample, additionalNotes: e.target.value })
                  }
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          {step > 0 && (
            <Button onClick={handlePrevStep} variant="outlined">
              Back
            </Button>
          )}
          {step < steps.length - 1 ? (
            <Button onClick={handleNextStep} variant="contained">
              Next
            </Button>
          ) : (
            <Button onClick={handleSaveInvoice} variant="contained">
              Save
            </Button>
          )}
          <Button onClick={handleCancelSample} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
