import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Select,
  MenuItem,
  Stack,
  Divider,
} from "@mui/material";
import { PictureAsPdf, Description } from "@mui/icons-material";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  Bar,
  Pie,
  BarChart,
  PieChart,
} from "recharts";
import { years } from "@/utils/languages";
import { imageURL } from "@/redux/api/baseApi";
import Loader from "@/utils/Loader";
import AnalyticsByTitlePage from "./TitleAnalyticsPage";

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState({
    monthly: [],
    yearly: [],
  });

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentMonth = new Date().getMonth();
    return currentMonth === 0 ? 12 : currentMonth;
  });
  const [selectedYear, setSelectedYear] = useState(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    return currentMonth === 0 ? currentYear - 1 : currentYear;
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);
  useEffect(() => {
    localStorage.removeItem("releaseFormData");
    localStorage.removeItem("tracksInformation");
  }, []);
  const fetchAnalyticsData = async (month: any, year: any) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${imageURL}/statics/analytics?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setAnalyticsData({
        monthly: response.data.data.monthly,
        yearly: response.data.data.yearly,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
      setLoading(false);
    }
  };

  const handleMonthChange = (event: any) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event: any) => {
    setSelectedYear(event.target.value);
  };

  const handlePDFDownload = () => {
    const currentChartData = analyticsData.monthly;

    // Create a new jsPDF instance
    const pdf = new jsPDF();
    let y = 20;

    // Header
    pdf.setFontSize(30);
    pdf.setFont("helvetica", "bold");
    pdf.text("ANS Music LTD.", 10, y);
    y += 10;

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    pdf.text("Distribution services", 10, y);
    y += 20;

    // Date
    const selectedMonthName = new Date(
      selectedYear,
      selectedMonth - 1
    ).toLocaleString("default", { month: "long" });
    pdf.setFontSize(12);
    pdf.text(`${selectedMonthName} ${selectedYear}`, 10, y);
    y += 10;

    // Partner greeting
    pdf.text("Dear partner,", 10, y);
    y += 10;

    pdf.text(
      "Here is the total amount of royalties credited on your account (ANS Music LTD) regarding",
      10,
      y
    );
    y += 10;
    pdf.text("the selected filters:", 10, y);
    y += 20;

    // Table header
    pdf.setFont("helvetica", "bold");
    pdf.text("Store", 10, y);
    pdf.text("Total", 150, y);
    y += 10;

    pdf.setFont("helvetica", "normal");

    // Data rows
    currentChartData.forEach((item: any) => {
      pdf.text(item.name, 10, y);
      pdf.text(String(item.value), 150, y);
      y += 10;
    });

    y += 10;

    pdf.text("NET REVENUE", 10, y);
    pdf.text(
      String(
        currentChartData.reduce((acc: any, item: any) => acc + item.value, 0)
      ),
      150,
      y
    );
    y += 20;

    // Footer
    pdf.text(
      "For any requests, please contact your local support team.",
      10,
      y
    );
    y += 10;

    pdf.text("Very best regards,", 10, y);
    y += 10;
    pdf.text("Royalty Accounting Team", 10, y);
    y += 10;
    pdf.text("ANS Music LTD", 10, y);

    // Save the PDF with a specific filename
    pdf.save("analytics_report.pdf");
  };

  const handleCSVDownload = () => {
    // Implement CSV download logic
    const currentChartData = analyticsData.monthly;

    // Prepend column headers
    const csvContent = `Store,Total\n${currentChartData
      .map((item: any) => `${item.name},${item.value}`)
      .join("\n")}`;

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "chart_data.csv";

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return <Loader />;
  }

  const currentData = analyticsData.monthly || [];

  return (
    <Box
      sx={{
        padding: 3,
        background: "linear-gradient(to right, #74ebd5, #acb6e5)",
      }}
    >
      <Paper
        sx={{
          padding: 3,
          marginBottom: 3,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h5">Analytics Overview</Typography>
          <Stack direction="row" spacing={1}>
            <Select
              value={selectedMonth}
              onChange={handleMonthChange}
              sx={{ minWidth: 120 }}
            >
              {[...Array(12)].map((_, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  {new Date(0, index).toLocaleString("default", {
                    month: "long",
                  })}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              sx={{ minWidth: 120 }}
            >
              {years?.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
            <IconButton onClick={handlePDFDownload} color="primary">
              <PictureAsPdf />
            </IconButton>
            <IconButton onClick={handleCSVDownload} color="primary">
              <Description />
            </IconButton>
          </Stack>
        </Box>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Total Improvements | {selectedMonth}/1
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6">Data Visualization</Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Box sx={{ flex: 1, bgcolor: "#f5f5f5", p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Monthly Revenue by Store
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <RechartsTooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            <Box sx={{ flex: 1, bgcolor: "#f5f5f5", p: 2, borderRadius: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Revenue Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={currentData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  />
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Stack>
        </Box>
      </Paper>
      <AnalyticsByTitlePage month={selectedMonth} year={selectedYear} />
    </Box>
  );
};

export default AnalyticsPage;
