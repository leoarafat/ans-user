/* eslint-disable @typescript-eslint/ban-ts-comment */
// /* eslint-disable @typescript-eslint/ban-ts-comment */

// import React, { useEffect, useState } from "react";
// import {
//   Paper,
//   Typography,
//   Box,
//   MenuItem,
//   FormControl,
//   Select,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   BarChart,
//   Bar,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import dayjs from "dayjs";
// import Loader from "@/utils/Loader";
// import { imageURL } from "@/redux/api/baseApi";
// import axios from "axios";

// const FinancialCharts = () => {
//   const currentYear = new Date().getFullYear();
//   const [selectedYear, setSelectedYear] = useState(currentYear);
//   const [financialData, setFinancialData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const isMobile = useMediaQuery("(max-width: 600px)");

//   // Fetch financial data based on the selected year
//   const fetchFinancialData = async (year: any) => {
//     setLoading(true);
//     try {
//       const url = `${imageURL}/statics/financial-analytics`;
//       const response = await axios.get(url, {
//         params: { year },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       });

//       if (response && response.data && response.data.data) {
//         const fetchedData = response.data.data;

//         // Map API response to a format compatible with recharts
//         const dataMap = new Map(
//           fetchedData.map((item: any) => [item.month, item.amount])
//         );

//         const months = Array.from({ length: 12 }, (_, index) => {
//           const monthName = dayjs().month(index).format("MMMM");
//           return {
//             month: monthName,
//             revenue: dataMap.get(monthName) || 0,
//           };
//         });
//         //@ts-ignore
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
//     <Box>
//       <Paper
//         sx={{
//           padding: isMobile ? 2 : 4,
//           backgroundColor: "#ffffff",
//           color: "#333333",
//           boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//           borderRadius: "16px",
//         }}
//       >
//         <Box
//           display="flex"
//           flexDirection={isMobile ? "column" : "row"}
//           justifyContent="space-between"
//           alignItems="center"
//           mb={isMobile ? 2 : 4}
//         >
//           <Typography
//             variant={isMobile ? "h6" : "h4"}
//             gutterBottom
//             sx={{ fontWeight: "bold", color: "#333333" }}
//           >
//             Financial Overview for {selectedYear}
//           </Typography>
//           <FormControl sx={{ minWidth: 120 }}>
//             <Select
//               value={selectedYear}
//               onChange={(e: any) => setSelectedYear(e.target.value)}
//               sx={{
//                 bgcolor: "#f0f0f0",
//                 color: "#333333",
//                 borderRadius: "8px",
//                 boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
//               }}
//             >
//               {Array.from({ length: 10 }, (_, index) => (
//                 <MenuItem key={currentYear - index} value={currentYear - index}>
//                   {currentYear - index}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>

//         {/* Bar Chart */}
//         <ResponsiveContainer width="100%" height={isMobile ? 300 : 500}>
//           <BarChart
//             data={financialData}
//             margin={{
//               top: 20,
//               right: 30,
//               left: 20,
//               bottom: 5,
//             }}
//             barGap={8}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend verticalAlign="top" height={36} />
//             <Bar dataKey="revenue" stackId="a" fill="#FFBB28" />
//             <Bar dataKey="revenue" stackId="a" fill="#00C49F" />
//           </BarChart>
//         </ResponsiveContainer>

//         {/* Line Chart */}
//         <Box mt={4}>
//           <ResponsiveContainer width="100%" height={isMobile ? 250 : 400}>
//             <LineChart
//               data={financialData}
//               margin={{
//                 top: 20,
//                 right: 30,
//                 left: 20,
//                 bottom: 5,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Legend verticalAlign="top" height={36} />
//               <Line
//                 type="monotone"
//                 dataKey="revenue"
//                 stroke="#8884d8"
//                 strokeWidth={3}
//                 dot={{ r: 5 }}
//                 activeDot={{ r: 8 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </Box>
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
import { imageURL } from "@/redux/api/baseApi";
import axios from "axios";
import StoreAnalytics from "./StoreAnalytics";

const FinancialCharts = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [financialData, setFinancialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const fetchFinancialData = async (year: any) => {
    setLoading(true);
    try {
      const url = `${imageURL}/statics/financial-analytics`;
      const response = await axios.get(url, {
        params: { year },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response && response.data && response.data.data) {
        const fetchedData = response.data.data;

        // Map API response to a format compatible with recharts
        const dataMap = new Map(
          fetchedData.map((item: any) => [item.month, item.amount])
        );

        const months = Array.from({ length: 12 }, (_, index) => {
          const monthName = dayjs().month(index).format("MMMM");
          return {
            month: monthName,
            revenue: dataMap.get(monthName) || 0,
          };
        });
        //@ts-ignore
        setFinancialData(months);
      }
    } catch (error) {
      console.error("Error fetching financial data:", error);
    } finally {
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
          background: "linear-gradient(135deg, #1E3C72 0%, #2A5298 100%)",
          color: "#ffffff",
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
            sx={{ fontWeight: "bold", color: "#ffffff" }}
          >
            Financial Overview for {selectedYear}
          </Typography>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              value={selectedYear}
              onChange={(e: any) => setSelectedYear(e.target.value)}
              sx={{
                bgcolor: "#ffffff",
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

        {/* Bar Chart */}
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
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
            <XAxis dataKey="month" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="revenue" stackId="a" fill="#FFBB28" />
            <Bar dataKey="revenue" stackId="a" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>

        {/* Line Chart */}
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
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff" />
              <XAxis dataKey="month" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#ffffff"
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
