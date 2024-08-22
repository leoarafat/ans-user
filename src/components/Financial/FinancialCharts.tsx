// import React, { useEffect, useState } from "react";
// import {
//   Paper,
//   Typography,
//   Box,
//   MenuItem,
//   FormControl,
//   Select,
// } from "@mui/material";
// import {
//   ComposedChart,
//   Line,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import axios from "axios";
// import dayjs from "dayjs";
// import Loader from "@/utils/Loader";
// import { useMediaQuery } from "@mui/material";
// import { imageURL } from "@/redux/api/baseApi";

// const FinancialCharts = () => {
//   const currentYear = new Date().getFullYear();
//   const [selectedYear, setSelectedYear] = useState(currentYear);
//   const [financialData, setFinancialData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const isMobile = useMediaQuery("(max-width: 600px)");

//   const fetchFinancialData = async (year: any) => {
//     setLoading(true);
//     try {
//       let url = `${imageURL}/statics/financial-analytics`;
//       const response = await axios.get(url, {
//         params: {
//           year,
//         },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });

//       if (response && response.data && response.data.data) {
//         const fetchedData = response.data.data;
//         const dataMap = new Map(
//           fetchedData.map((item) => [item.month, item.amount])
//         );
//         const months = Array.from({ length: 12 }, (_, index) => {
//           const monthName = dayjs().month(index).format("MMMM");
//           return {
//             date: `${year}-${index + 1 < 10 ? "0" + (index + 1) : index + 1}`,
//             amount: dataMap.get(monthName) || 0,
//           };
//         });
//         setFinancialData(months);
//       }
//     } catch (error) {
//       console.error("Error fetching financial data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFinancialData(selectedYear);
//   }, [selectedYear]);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <Box m={isMobile ? 1 : 3}>
//       <Paper sx={{ padding: isMobile ? 1 : 3 }}>
//         <Box
//           display="flex"
//           flexDirection={isMobile ? "column" : "row"}
//           justifyContent="space-between"
//           alignItems="center"
//           mb={2}
//         >
//           <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
//             Financial Analytics for {selectedYear}
//           </Typography>
//           <FormControl>
//             <Select
//               value={selectedYear}
//               onChange={(e) => setSelectedYear(e.target.value)}
//             >
//               {Array.from({ length: 10 }, (_, index) => (
//                 <MenuItem key={currentYear - index} value={currentYear - index}>
//                   {currentYear - index}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>
//         <ResponsiveContainer width="100%" height={isMobile ? 200 : 400}>
//           <ComposedChart
//             data={financialData}
//             margin={{
//               top: 20,
//               right: 20,
//               bottom: 20,
//               left: 20,
//             }}
//           >
//             <CartesianGrid stroke="#f5f5f5" />
//             <XAxis dataKey="date" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Area
//               type="monotone"
//               dataKey="amount"
//               fill="#8884d8"
//               stroke="#8884d8"
//             />
//             <Line type="monotone" dataKey="amount" stroke="#ff7300" />
//           </ComposedChart>
//         </ResponsiveContainer>
//       </Paper>
//     </Box>
//   );
// };

// export default FinancialCharts;
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
  amount: Math.random() * 1000,
}));

const FinancialCharts = () => {
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
            <Bar dataKey="amount" fill="#8884d8" />
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
                dataKey="amount"
                stroke="#00C49F"
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

export default FinancialCharts;
