import React, { useState, useEffect } from "react";
import { Box, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { years } from "@/utils/languages";
import { imageURL } from "@/redux/api/baseApi";
import axios from "axios";

ChartJS.register(Tooltip, Legend, ArcElement);

const mockData = {
  store: [
    { name: "Store A", value: 5000 },
    { name: "Store B", value: 3000 },
    { name: "Store C", value: 2000 },
    { name: "Store C", value: 2000 },
    { name: "Store C", value: 2000 },
    { name: "Store C", value: 2000 },
    { name: "Store C", value: 2000 },
  ],
  country: [
    { name: "Country A", value: 7000 },
    { name: "Country B", value: 4000 },
    { name: "Country C", value: 3000 },
    { name: "Country C", value: 3000 },
    { name: "Country C", value: 3000 },
    { name: "Country C", value: 3000 },
    { name: "Country C", value: 3000 },
    { name: "Country C", value: 3000 },
    { name: "Country C", value: 3000 },
    { name: "Country C", value: 3000 },
  ],
};

const StoreAnalytics = () => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentMonth = new Date().getMonth();
    return currentMonth === 0 ? 12 : currentMonth;
  });
  const [selectedYear, setSelectedYear] = useState(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    return currentMonth === 0 ? currentYear - 1 : currentYear;
  });
  const [dataStore, setDataStore] = useState([]);
  const [countryDataStore, setcountryDataStore] = useState([]);
  const fetchData = async (month, year) => {
    try {
      const response = await axios.get(
        `${imageURL}/statics/financial-by-store`,
        {
          params: {
            month,
            year,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const { data } = response.data;

      setDataStore(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchCountryData = async (month, year) => {
    try {
      const response = await axios.get(
        `${imageURL}/statics/financial-analytics-country`,
        {
          params: {
            month,
            year,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const { data } = response.data;

      setcountryDataStore(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedMonth, selectedYear);
    fetchCountryData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const generateChartData = (data) => {
    return {
      labels: data.map((item) => item.name),
      datasets: [
        {
          data: data.map((item) => item.value),
          backgroundColor: data.map(
            () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
          ),
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    };
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" m={2}>
        <FormControl sx={{ mr: 2 }}>
          <InputLabel>Select Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={handleMonthChange}
            label="Select Month"
          >
            {[...Array(12).keys()].map((month) => (
              <MenuItem key={month + 1} value={month + 1}>
                {new Date(0, month).toLocaleString("en", { month: "long" })}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Select Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={handleYearChange}
            label="Select Year"
          >
            {years?.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" justifyContent="space-around">
        <Box width="45%">
          <h2>Revenue by Store | {`${selectedYear}-${selectedMonth}`}</h2>
          <Doughnut
            data={generateChartData(dataStore)}
            options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      let label = context.label || "";
                      if (context.parsed !== null) {
                        label += `: $${context.parsed}`;
                      }
                      return label;
                    },
                  },
                },
                legend: {
                  position: "bottom",
                  labels: {
                    color: "#333",
                    font: {
                      size: 14,
                    },
                  },
                },
              },
            }}
          />
        </Box>
        <Box width="45%">
          <h2>Revenue by Country | {`${selectedYear}-${selectedMonth}`}</h2>
          <Doughnut
            data={generateChartData(countryDataStore)}
            options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      let label = context.label || "";
                      if (context.parsed !== null) {
                        label += `: $${context.parsed}`;
                      }
                      return label;
                    },
                  },
                },
                legend: {
                  position: "bottom",
                  labels: {
                    color: "#333",
                    font: {
                      size: 14,
                    },
                  },
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StoreAnalytics;
