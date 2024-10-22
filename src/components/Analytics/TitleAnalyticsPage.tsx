// import { useState, useEffect } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";
// import {
//   Box,
//   Typography,
//   Paper,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import { PictureAsPdf, Description } from "@mui/icons-material";

// import {
//   ResponsiveContainer,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   Bar,
//   BarChart,
//   Cell,
// } from "recharts";
// import { imageURL } from "@/redux/api/baseApi";

// const AnalyticsByTitlePage = ({ month, year }: any) => {
//   const [analyticsData, setAnalyticsData] = useState({
//     monthly: [],
//     yearly: [],
//   });

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchAnalyticsData(month, year);
//   }, [month, year]);

//   const fetchAnalyticsData = async (month: any, year: any) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${imageURL}/statics/analytics-by-tracks?month=${month}&year=${year}`,
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
//     } catch (error: any) {
//       console.error("Error fetching analytics data:", error);
//       setLoading(false);
//     }
//   };

//   const handlePDFDownload = () => {
//     const currentChartData = analyticsData.monthly;

//     const pdf = new jsPDF();
//     let y = 20;

//     pdf.setFontSize(30);
//     pdf.setFont("helvetica", "bold");
//     pdf.text("ANS Music", 10, y);
//     y += 10;

//     pdf.setFontSize(14);
//     pdf.setFont("helvetica", "normal");
//     pdf.text("Distribution Services Report", 10, y);
//     y += 20;

//     const selectedMonthName = new Date(year, month - 1).toLocaleString(
//       "default",
//       { month: "long" }
//     );
//     pdf.setFontSize(12);
//     pdf.text(`${selectedMonthName} ${year}`, 10, y);
//     y += 10;

//     pdf.text("Dear Partner,", 10, y);
//     y += 10;
//     pdf.text(
//       "Here is the total amount of royalties credited to your account:",
//       10,
//       y
//     );
//     y += 10;
//     pdf.text("For the selected filters:", 10, y);
//     y += 20;

//     pdf.setFont("helvetica", "bold");
//     pdf.text("Store", 10, y);
//     pdf.text("Total", 150, y);
//     y += 10;

//     pdf.setFont("helvetica", "normal");
//     currentChartData.forEach((item: any) => {
//       pdf.text(item.name, 10, y);
//       pdf.text(String(item.value), 150, y);
//       y += 10;
//     });

//     y += 10;
//     pdf.text("NET REVENUE", 10, y);
//     pdf.text(
//       String(
//         currentChartData.reduce((acc: any, item: any) => acc + item.value, 0)
//       ),
//       150,
//       y
//     );
//     y += 20;

//     pdf.text(
//       "For any requests, please contact your local support team.",
//       10,
//       y
//     );
//     y += 10;
//     pdf.text("Best regards,", 10, y);
//     y += 10;
//     pdf.text("Royalty Accounting Team", 10, y);
//     y += 10;
//     pdf.text("ANS Music", 10, y);

//     pdf.save("analytics_report.pdf");
//   };

//   const handleCSVDownload = () => {
//     const currentChartData = analyticsData.monthly;
//     const csvContent = `Store,Total\n${currentChartData
//       .map((item: any) => `${item.name},${item.value}`)
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
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   const currentData = analyticsData.monthly || [];

//   return (
//     <Box>
//       <Paper
//         sx={{ padding: 2, marginBottom: 3, borderRadius: 2, boxShadow: 3 }}
//       >
//         <div className="flex justify-between">
//           <div>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Total Streams and Revenue By Title
//             </Typography>
//           </div>
//           <div>
//             <IconButton onClick={handlePDFDownload} color="primary">
//               <PictureAsPdf />
//             </IconButton>
//             <IconButton onClick={handleCSVDownload} color="primary">
//               <Description />
//             </IconButton>
//           </div>
//         </div>
//         <ResponsiveContainer width="100%" height={400}>
//           <BarChart
//             data={currentData}
//             margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
//             <XAxis dataKey="name" tick={{ fill: "#666" }} />
//             <YAxis tick={{ fill: "#666" }} />
//             <Tooltip
//               contentStyle={{
//                 backgroundColor: "#fff",
//                 border: "1px solid #ddd",
//               }}
//             />
//             <Legend />
//             <Bar
//               dataKey="totalStreams"
//               fill="url(#gradient1)"
//               radius={[5, 5, 0, 0]} // Rounded corners for top-left and top-right
//               barSize={30}
//             >
//               {currentData.map((entry: any, index: any) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={entry.totalStreams > 1500 ? "#8884d8" : "#82ca9d"}
//                 />
//               ))}
//             </Bar>
//             <Bar
//               dataKey="Revenue"
//               fill="url(#gradient2)"
//               radius={[5, 5, 0, 0]} // Rounded corners for top-left and top-right
//               barSize={30}
//             >
//               {currentData.map((entry: any, index: any) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={entry.value > 3000 ? "#82ca9d" : "#8884d8"}
//                 />
//               ))}
//             </Bar>
//             <defs>
//               <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="1">
//                 <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
//                 <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
//               </linearGradient>
//               <linearGradient id="gradient2" x1="0" y1="0" x2="1" y2="1">
//                 <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
//                 <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
//               </linearGradient>
//             </defs>
//           </BarChart>
//         </ResponsiveContainer>
//       </Paper>
//     </Box>
//   );
// };

// export default AnalyticsByTitlePage;
import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { PictureAsPdf, Description } from "@mui/icons-material";

import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
  ComposedChart,
  Cell,
} from "recharts";
import { imageURL } from "@/redux/api/baseApi";

const AnalyticsByTitlePage = ({ month, year }: any) => {
  const [analyticsData, setAnalyticsData] = useState({
    monthly: [],
    yearly: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData(month, year);
  }, [month, year]);

  const fetchAnalyticsData = async (month: any, year: any) => {
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
    pdf.text("Distribution Services Report", 10, y);
    y += 20;

    const selectedMonthName = new Date(year, month - 1).toLocaleString(
      "default",
      { month: "long" }
    );
    pdf.setFontSize(12);
    pdf.text(`${selectedMonthName} ${year}`, 10, y);
    y += 10;

    pdf.text("Dear Partner,", 10, y);
    y += 10;
    pdf.text(
      "Here is the total amount of royalties credited to your account:",
      10,
      y
    );
    y += 10;
    pdf.text("For the selected filters:", 10, y);
    y += 20;

    pdf.setFont("helvetica", "bold");
    pdf.text("Store", 10, y);
    pdf.text("Total", 150, y);
    y += 10;

    pdf.setFont("helvetica", "normal");
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

    pdf.text(
      "For any requests, please contact your local support team.",
      10,
      y
    );
    y += 10;
    pdf.text("Best regards,", 10, y);
    y += 10;
    pdf.text("Royalty Accounting Team", 10, y);
    y += 10;
    pdf.text("ANS Music", 10, y);

    pdf.save("analytics_report.pdf");
  };

  const handleCSVDownload = () => {
    const currentChartData = analyticsData.monthly;
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

  return (
    <Box>
      <Paper
        sx={{
          padding: 3,
          marginBottom: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          background: "#ffffff",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Total Streams and Revenue By Title
          </Typography>
          <div>
            <IconButton onClick={handlePDFDownload} color="primary">
              <PictureAsPdf />
            </IconButton>
            <IconButton onClick={handleCSVDownload} color="primary">
              <Description />
            </IconButton>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart
            data={currentData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorStreams" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
              </linearGradient>
              <linearGradient id="colorAverage" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff7300" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#ff7300" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#555", fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: "#555", fontSize: 12 }}
              label={{
                value: "Streams",
                angle: -90,
                position: "insideLeft",
                fill: "#555",
                fontSize: 12,
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "#555", fontSize: 12 }}
              label={{
                value: "Revenue ($)",
                angle: 90,
                position: "insideRight",
                fill: "#555",
                fontSize: 12,
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#f5f5f5",
                border: "1px solid #ccc",
                borderRadius: "5px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
              labelStyle={{ color: "#333", fontWeight: "bold" }}
              itemStyle={{ color: "#555" }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ paddingBottom: 20 }}
            />
            <Bar
              yAxisId="left"
              dataKey="totalStreams"
              name="Total Streams"
              fill="url(#colorStreams)"
              barSize={25}
              radius={[10, 10, 0, 0]}
            >
              {currentData.map((entry: any, index) => (
                <Cell
                  key={`cell-streams-${index}`}
                  fill={entry.totalStreams > 1500 ? "#6a51a3" : "#9e9ac8"}
                />
              ))}
            </Bar>
            <Bar
              yAxisId="right"
              dataKey="Revenue"
              name="Revenue ($)"
              fill="url(#colorRevenue)"
              barSize={25}
              radius={[10, 10, 0, 0]}
            >
              {currentData.map((entry: any, index) => (
                <Cell
                  key={`cell-revenue-${index}`}
                  fill={entry.value > 3000 ? "#31a354" : "#74c476"}
                />
              ))}
            </Bar>
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="averageRevenue"
              name="Average Revenue"
              stroke="url(#colorAverage)"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default AnalyticsByTitlePage;
