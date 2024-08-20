// import { useState, useEffect } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";
// import {
//   Box,
//   Typography,
//   Paper,
//   IconButton,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { PictureAsPdf, Description } from "@mui/icons-material";
// import Stack from "@mui/material/Stack";
// import { HighlightItemData } from "@mui/x-charts/context";
// import { BarChart as XBarChart, BarChartProps } from "@mui/x-charts/BarChart";
// import { PieChart, PieChartProps } from "@mui/x-charts/PieChart";
// import {
//   ResponsiveContainer,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   Bar,
//   BarChart,
// } from "recharts";
// import { years } from "@/utils/languages";
// import Loader from "@/utils/Loader";
// import AnalyticsByTitlePage from "./TitleAnalyticsPage";
// import { imageURL } from "../../redux/api/baseApi";

// const AnalyticsPage = () => {
//   const [analyticsData, setAnalyticsData] = useState({
//     monthly: [],
//     yearly: [],
//   });

//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() - 1);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [highlightedItem, setHighlightedItem] =
//     useState<HighlightItemData | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAnalyticsData(selectedMonth, selectedYear);
//   }, [selectedMonth, selectedYear]);
//   useEffect(() => {
//     localStorage.removeItem("releaseFormData");
//     localStorage.removeItem("tracksInformation");
//   }, []);
//   const fetchAnalyticsData = async (month, year) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${imageURL}/statics/analytics?month=${month}&year=${year}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );
//       setAnalyticsData({
//         monthly: response.data.data.monthly,
//         yearly: response.data.data.yearly,
//       });
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching analytics data:", error);
//       setLoading(false);
//     }
//   };

//   const handleMonthChange = (event) => {
//     setSelectedMonth(event.target.value);
//   };

//   const handleYearChange = (event) => {
//     setSelectedYear(event.target.value);
//   };

//   const handlePDFDownload = () => {
//     const currentChartData = analyticsData.monthly;

//     // Create a new jsPDF instance
//     const pdf = new jsPDF();
//     let y = 20;

//     // Header
//     pdf.setFontSize(30);
//     pdf.setFont("helvetica", "bold");
//     pdf.text("ANS Music.", 10, y);
//     y += 10;

//     pdf.setFontSize(14);
//     pdf.setFont("helvetica", "normal");
//     pdf.text("Distribution services", 10, y);
//     y += 20;

//     // Date
//     const selectedMonthName = new Date(
//       selectedYear,
//       selectedMonth - 1
//     ).toLocaleString("default", { month: "long" });
//     pdf.setFontSize(12);
//     pdf.text(`${selectedMonthName} ${selectedYear}`, 10, y);
//     y += 10;

//     // Partner greeting
//     pdf.text("Dear partner,", 10, y);
//     y += 10;

//     pdf.text(
//       "Here is the total amount of royalties credited on your account (ANS Music) regarding",
//       10,
//       y
//     );
//     y += 10;
//     pdf.text("the selected filters:", 10, y);
//     y += 20;

//     // Table header
//     pdf.setFont("helvetica", "bold");
//     pdf.text("Store", 10, y);
//     pdf.text("Total", 150, y);
//     y += 10;

//     pdf.setFont("helvetica", "normal");

//     // Data rows
//     currentChartData.forEach((item) => {
//       pdf.text(item.name, 10, y);
//       pdf.text(String(item.value), 150, y);
//       y += 10;
//     });

//     y += 10;

//     // Net revenue
//     pdf.text("NET REVENUE", 10, y);
//     pdf.text(
//       String(currentChartData.reduce((acc, item) => acc + item.value, 0)),
//       150,
//       y
//     );
//     y += 20;

//     // Footer
//     pdf.text(
//       "For any requests, please contact your local support team.",
//       10,
//       y
//     );
//     y += 10;

//     pdf.text("Very best regards,", 10, y);
//     y += 10;
//     pdf.text("Royalty Accounting Team", 10, y);
//     y += 10;
//     pdf.text("ANS Music", 10, y);

//     // Save the PDF with a specific filename
//     pdf.save("analytics_report.pdf");
//   };

//   const handleCSVDownload = () => {
//     // Implement CSV download logic
//     const currentChartData = analyticsData.monthly;

//     // Prepend column headers
//     const csvContent = `Store,Total\n${currentChartData
//       .map((item) => `${item.name},${item.value}`)
//       .join("\n")}`;

//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "chart_data.csv";

//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);

//     window.URL.revokeObjectURL(url);
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   const currentData = analyticsData.monthly || [];
//   const currentLabels = currentData.map((d) => d.name);

//   const barChartsProps: BarChartProps = {
//     series: [
//       {
//         data: currentData.map((d) => d.totalStreams),
//         id: "sync",
//         highlightScope: { highlighted: "item", faded: "global" },
//       },
//     ],
//     xAxis: [{ scaleType: "band", data: currentLabels }],
//     height: 300,
//     slotProps: {
//       legend: {
//         hidden: true,
//       },
//     },
//   };

//   const pieChartProps: PieChartProps = {
//     series: [
//       {
//         id: "sync",
//         data: currentData.map((d) => ({
//           value: d.value,
//           label: d.name,
//           id: d.name,
//         })),
//         highlightScope: { highlighted: "item", faded: "global" },
//       },
//     ],
//     height: 300,
//     slotProps: {
//       legend: {
//         hidden: true,
//       },
//     },
//   };

//   return (
//     <>
//       <Box sx={{ padding: 3 }}>
//         <Paper sx={{ padding: 2, marginBottom: 3 }}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography variant="h6">Analytics Visual</Typography>
//             <Stack direction="row" spacing={1}>
//               <Select value={selectedMonth} onChange={handleMonthChange}>
//                 <MenuItem value={1}>January</MenuItem>
//                 <MenuItem value={2}>February</MenuItem>
//                 <MenuItem value={3}>March</MenuItem>
//                 <MenuItem value={4}>April</MenuItem>
//                 <MenuItem value={5}>May</MenuItem>
//                 <MenuItem value={6}>June</MenuItem>
//                 <MenuItem value={7}>July</MenuItem>
//                 <MenuItem value={8}>August</MenuItem>
//                 <MenuItem value={9}>September</MenuItem>
//                 <MenuItem value={10}>October</MenuItem>
//                 <MenuItem value={11}>November</MenuItem>
//                 <MenuItem value={12}>December</MenuItem>
//               </Select>
//               <Select value={selectedYear} onChange={handleYearChange}>
//                 {years?.map((year) => (
//                   <MenuItem key={year} value={year}>
//                     {year}
//                   </MenuItem>
//                 ))}
//               </Select>
//               <IconButton onClick={handlePDFDownload}>
//                 <PictureAsPdf />
//               </IconButton>
//               <IconButton onClick={handleCSVDownload}>
//                 <Description />
//               </IconButton>
//             </Stack>
//           </Box>
//           <Typography variant="body2">
//             Total Improvements | {selectedMonth}/1
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <Typography variant="h4">Total</Typography>
//           </Box>
//           <Stack
//             direction={{ xs: "column", xl: "row" }}
//             spacing={1}
//             sx={{ width: "100%" }}
//           >
//             <XBarChart
//               {...barChartsProps}
//               highlightedItem={highlightedItem}
//               onHighlightChange={setHighlightedItem}
//             />
//             <PieChart
//               {...pieChartProps}
//               highlightedItem={highlightedItem}
//               onHighlightChange={setHighlightedItem}
//             />
//           </Stack>
//         </Paper>

//         <Paper sx={{ padding: 2, marginBottom: 3 }}>
//           <Typography variant="h6">Total Stream and Revenue</Typography>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart
//               data={currentData.map((item) => ({
//                 name: item.name,
//                 stream: item.totalStreams,
//                 revenue: `$ ${item.value?.toFixed(0, 6)}`,
//               }))}
//               margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />

//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="stream" fill="#8884d8" />
//               <Bar dataKey="revenue" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </Paper>
//       </Box>
//       <AnalyticsByTitlePage />
//     </>
//   );
// };

// export default AnalyticsPage;
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
  CircularProgress,
  Tooltip,
  Divider,
} from "@mui/material";
import { PictureAsPdf, Description } from "@mui/icons-material";
import {
  BarChart as XBarChart,
  PieChart as XPieChart,
  LineChart as XLineChart,
} from "@mui/x-charts";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  Bar,
  Line,
  Pie,
  BarChart,
  PieChart,
} from "recharts";
import { years } from "@/utils/languages";
import AnalyticsByTitlePage from "./TitleAnalyticsPage";

// Mock data
const mockData = {
  monthly: [
    { name: "Store A", value: 1200, totalStreams: 5000 },
    { name: "Store B", value: 1500, totalStreams: 3000 },
    { name: "Store C", value: 800, totalStreams: 2000 },
    { name: "Store D", value: 800, totalStreams: 2000 },
    { name: "Store C", value: 800, totalStreams: 2000 },
    { name: "Store C", value: 800, totalStreams: 2000 },
    { name: "Store C", value: 800, totalStreams: 2000 },
    { name: "Store C", value: 800, totalStreams: 2000 },
    { name: "Store C", value: 800, totalStreams: 2000 },
    { name: "Store C", value: 800, totalStreams: 2000 },
    { name: "Store C", value: 800, totalStreams: 2000 },
    { name: "Store C", value: 800, totalStreams: 2000 },
    { name: "Store C", value: 800, totalStreams: 2000 },
    { name: "Store C", value: 800, totalStreams: 2000 },
    { name: "Store C", value: 800, totalStreams: 2000 },
    { name: "Store C", value: 800, totalStreams: 2000 },
  ],
  yearly: [
    { name: "2023", value: 25000 },
    { name: "2022", value: 22000 },
    { name: "2021", value: 18000 },
  ],
};

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState(mockData);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnalyticsData(selectedMonth, selectedYear);
  }, [selectedMonth, selectedYear]);

  const fetchAnalyticsData = async (month, year) => {
    try {
      setLoading(true);
      // Replace with actual API call
      // const response = await axios.get(
      //   `${imageURL}/statics/analytics?month=${month}&year=${year}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //     },
      //   }
      // );
      // setAnalyticsData({
      //   monthly: response.data.data.monthly,
      //   yearly: response.data.data.yearly,
      // });
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
    const pdf = new jsPDF();
    let y = 20;

    pdf.setFontSize(30);
    pdf.setFont("helvetica", "bold");
    pdf.text("ANS Music", 10, y);
    y += 10;

    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    pdf.text("Distribution Services", 10, y);
    y += 20;

    const selectedMonthName = new Date(
      selectedYear,
      selectedMonth - 1
    ).toLocaleString("default", { month: "long" });
    pdf.setFontSize(12);
    pdf.text(`${selectedMonthName} ${selectedYear}`, 10, y);
    y += 10;

    pdf.text("Dear Partner,", 10, y);
    y += 10;
    pdf.text(
      "Here is the total amount of royalties credited on your account (ANS Music) regarding the selected filters:",
      10,
      y
    );
    y += 20;

    pdf.setFont("helvetica", "bold");
    pdf.text("Store", 10, y);
    pdf.text("Total", 150, y);
    y += 10;

    pdf.setFont("helvetica", "normal");
    currentChartData.forEach((item) => {
      pdf.text(item.name, 10, y);
      pdf.text(String(item.value), 150, y);
      y += 10;
    });

    y += 10;

    pdf.text("NET REVENUE", 10, y);
    pdf.text(
      String(currentChartData.reduce((acc, item) => acc + item.value, 0)),
      150,
      y
    );
    y += 20;

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

    pdf.save("analytics_report.pdf");
  };

  const handleCSVDownload = () => {
    const currentChartData = analyticsData.monthly;

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
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const currentData = analyticsData.monthly || [];
  const currentLabels = currentData.map((d) => d.name);

  const barChartProps = {
    series: [
      {
        data: currentData.map((d) => d.totalStreams),
        id: "sync",
        highlightScope: { highlighted: "item", faded: "global" },
      },
    ],
    xAxis: [{ scaleType: "band", data: currentLabels }],
    height: 300,
    slotProps: {
      legend: {
        hidden: true,
      },
    },
  };

  const pieChartProps = {
    series: [
      {
        id: "sync",
        data: currentData.map((d) => ({
          value: d.value,
          label: d.name,
          id: d.name,
        })),
        highlightScope: { highlighted: "item", faded: "global" },
      },
    ],
    height: 300,
    slotProps: {
      legend: {
        hidden: true,
      },
    },
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper
        sx={{ padding: 3, marginBottom: 3, borderRadius: 2, boxShadow: 3 }}
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
      {/* <AnalyticsByTitlePage /> */}
    </Box>
  );
};

export default AnalyticsPage;
