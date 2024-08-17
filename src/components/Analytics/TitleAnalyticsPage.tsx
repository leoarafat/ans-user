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
} from "@mui/material";
import { PictureAsPdf, Description } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import { HighlightItemData } from "@mui/x-charts/context";
import { BarChart as XBarChart, BarChartProps } from "@mui/x-charts/BarChart";
import { PieChart, PieChartProps } from "@mui/x-charts/PieChart";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
} from "recharts";
import { years } from "@/utils/languages";
import Loader from "@/utils/Loader";
import { imageURL } from "@/redux/api/baseApi";

const AnalyticsByTitlePage = () => {
  const [analyticsData, setAnalyticsData] = useState({
    monthly: [],
    yearly: [],
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() - 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);
  useEffect(() => {
    localStorage.removeItem("releaseFormData");
    localStorage.removeItem("tracksInformation");
  }, []);
  const fetchAnalyticsData = async (month, year) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${imageURL}/statics/analytics-by-tracks?month=${month}&year=${year}`,
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

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
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
    pdf.text("ANS Music.", 10, y);
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
      "Here is the total amount of royalties credited on your account (ANS Music) regarding",
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
    currentChartData.forEach((item) => {
      pdf.text(item.name, 10, y);
      pdf.text(String(item.value), 150, y);
      y += 10;
    });

    y += 10;

    // Net revenue
    pdf.text("NET REVENUE", 10, y);
    pdf.text(
      String(currentChartData.reduce((acc, item) => acc + item.value, 0)),
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
    pdf.text("ANS Music", 10, y);

    // Save the PDF with a specific filename
    pdf.save("analytics_report.pdf");
  };

  const handleCSVDownload = () => {
    // Implement CSV download logic
    const currentChartData = analyticsData.monthly;

    // Prepend column headers
    const csvContent = `Store,Total\n${currentChartData
      .map((item) => `${item.name},${item.value}`)
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
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack direction="row" spacing={1}>
            <Select value={selectedMonth} onChange={handleMonthChange}>
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
            </Select>
            <Select value={selectedYear} onChange={handleYearChange}>
              {years?.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
            <IconButton onClick={handlePDFDownload}>
              <PictureAsPdf />
            </IconButton>
            <IconButton onClick={handleCSVDownload}>
              <Description />
            </IconButton>
          </Stack>
        </Box>
      </Paper>

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6">Total Stream and Revenue By Title</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={currentData.map((item) => ({
              name: item.name,
              stream: item.totalStreams,
              revenue: `$ ${item.value?.toFixed(0, 6)}`,
            }))}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />

            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stream" fill="#8884d8" />
            <Bar dataKey="revenue" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default AnalyticsByTitlePage;
