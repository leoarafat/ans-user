import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  MenuItem,
  FormControl,
  Select,
  useMediaQuery,
} from "@mui/material";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import Loader from "@/utils/Loader";

const mockData = Array.from({ length: 12 }, (_, index) => ({
  month: `${dayjs().month(index).format("MMM")}`,
  revenue: Math.random() * 1000,
  profit: Math.random() * 400,
  expenses: Math.random() * 600,
}));

const ProfitsCharts = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [financialData, setFinancialData] = useState(mockData);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const fetchFinancialData = async (year: any) => {
    setLoading(true);
    try {
      setTimeout(() => {
        setFinancialData(mockData);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching financial data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFinancialData(selectedYear);
  }, [selectedYear]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box>
      <Paper
        sx={{
          padding: isMobile ? 2 : 4,
          backgroundColor: "#ffffff",
          color: "#333333",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "16px",
        }}
      >
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems="center"
          mb={isMobile ? 2 : 4}
        >
          <Typography
            variant={isMobile ? "h6" : "h4"}
            gutterBottom
            sx={{ fontWeight: "bold", color: "#333333" }}
          >
            Financial Overview for {selectedYear}
          </Typography>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              sx={{
                bgcolor: "#f0f0f0",
                color: "#333333",
                borderRadius: "8px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <MenuItem key={currentYear - index} value={currentYear - index}>
                  {currentYear - index}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <ResponsiveContainer width="100%" height={isMobile ? 300 : 500}>
          <BarChart
            data={financialData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barGap={8}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="expenses" stackId="a" fill="#FFBB28" />
            <Bar dataKey="profit" stackId="a" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
        <Box mt={4}>
          <ResponsiveContainer width="100%" height={isMobile ? 250 : 400}>
            <LineChart
              data={financialData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfitsCharts;
