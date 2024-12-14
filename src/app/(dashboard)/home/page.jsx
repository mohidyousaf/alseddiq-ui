'use client';
import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register the components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);
import {
  Group as GroupIcon,
  PendingActions as PendingActionsIcon,
  Loop as LoopIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    testsPending: 0,
    testsInProcess: 0,
    testsCompletedToday: 0,
  });

  const [financeData, setFinanceData] = useState([]);
  const [newTests, setNewTests] = useState([]);

  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      setStats({
        totalPatients: 150,
        testsPending: 25,
        testsInProcess: 40,
        testsCompletedToday: 30,
      });
      setFinanceData([20000, 25000, 30000, 35000, 40000, 45000, 50000]);
      setNewTests([
        {
          id: 955451,
          name: "Aslam Ahamed",
          date: "June 14, 2024",
          test: "Thyroid Panel",
          status: "Collected",
        },
        {
          id: 955452,
          name: "Abdul Salim",
          date: "June 14, 2024",
          test: "Glucose Fasting",
          status: "Collected",
        },
        {
          id: 955453,
          name: "Muthu Kumar",
          date: "June 14, 2024",
          test: "Liver Function Test",
          status: "Collected",
        },
      ]);
      setLoading(false);
    }, 1000); // Replace with actual API calls
  }, []);

  const StatCard = ({ icon, label, value, color }) => (
    <Card elevation={3}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Box
            sx={{
              backgroundColor: color,
              color: "#fff",
              borderRadius: "50%",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
            {loading ? <CircularProgress size={24} /> : value}
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="textSecondary">
          {label}
        </Typography>
      </CardContent>
    </Card>
  );

  const financeChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const financeChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Paid",
        data: financeData,
        fill: true,
        borderColor: "blue",
        backgroundColor: "rgba(66, 135, 245, 0.2)",
      },
      // {
      //   label: "Due",
      //   data: financeData.map((d) => d * 0.8), // Simulate some due amounts
      //   fill: true,
      //   borderColor: "gray",
      //   backgroundColor: "rgba(220, 220, 220, 0.2)",
      // },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Stat Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<GroupIcon fontSize="large" />}
            label="Total Patients"
            value={stats.totalPatients}
            color="#3f51b5"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<PendingActionsIcon fontSize="large" />}
            label="Tests Pending"
            value={stats.testsPending}
            color="#ff9800"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<LoopIcon fontSize="large" />}
            label="Tests In Process"
            value={stats.testsInProcess}
            color="#9c27b0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={<CheckCircleIcon fontSize="large" />}
            label="Tests Completed Today"
            value={stats.testsCompletedToday}
            color="#4caf50"
          />
        </Grid>
      </Grid>

      {/* Finance Chart */}
      <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
        Finance Overview
      </Typography>
      <Card elevation={3} style={{ padding: "20px" }}>
        <Line data={financeChartData} options={financeChartOptions} />
      </Card>

      {/* New Incoming Tests */}
      <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
        New Incoming Tests
      </Typography>
      <Card elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Test</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newTests.map((test) => (
              <TableRow key={test.id}>
                <TableCell>{test.id}</TableCell>
                <TableCell>{test.name}</TableCell>
                <TableCell>{test.date}</TableCell>
                <TableCell>{test.test}</TableCell>
                <TableCell>{test.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}