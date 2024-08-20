// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Grid,
//   Paper,
//   Typography,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   IconButton,
// } from "@mui/material";
// import { Pagination } from "@mui/material";
// import {
//   PictureAsPdf as PdfIcon,
//   Description as CsvIcon,
//   AttachMoney as DollarIcon,
//   ArrowDownward as ArrowDownwardIcon,
//   ArrowUpward as ArrowUpwardIcon,
// } from "@mui/icons-material";
// import { CSVLink } from "react-csv";

// import { useGetMyFilesQuery } from "@/redux/slices/financial/financialApi";
// import Loader from "@/utils/Loader";
// import jsPDF from "jspdf";

// const FinancialReports = () => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortedColumn, setSortedColumn] = useState("date");
//   const [sortDirection, setSortDirection] = useState("asc");

//   const { data: filesData, isLoading } = useGetMyFilesQuery({});
//   const handleChangePage = (event: any, newPage: any) => {
//     setPage(newPage);
//   };

//   if (isLoading) {
//     return <Loader />;
//   }

//   const handleSearch = (event: any) => {
//     setSearchQuery(event.target.value);
//     setPage(0);
//   };

//   const handleSort = (column: any) => {
//     if (sortedColumn === column) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortedColumn(column);
//       setSortDirection("asc");
//     }
//   };

//   const filteredHistory = filesData?.data?.filter((row: any) =>
//     Object.values(row).some(
//       (value) =>
//         typeof value === "string" &&
//         value.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   const sortedHistory = filteredHistory?.sort((a: any, b: any) => {
//     //@ts-ignore
//     const aValue = a[sortedColumn];
//     //@ts-ignore
//     const bValue = b[sortedColumn];

//     if (typeof aValue === "string" && typeof bValue === "string") {
//       return sortDirection === "asc"
//         ? aValue.localeCompare(bValue)
//         : bValue.localeCompare(aValue);
//     }

//     return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
//   });

//   const handleCSVDownload = (row: any) => {
//     const csvData = row?.data?.map((entry: any) => ({
//       upc: entry.upc,
//       isrc: entry.isrc,
//       labelName: entry.labelName,
//       artistName: entry.artistName,
//       album: entry.album,
//       trackTitle: entry.trackTitle,
//       stream_quantity: entry.stream_quantity,
//       revenue: entry.revenue,
//       currency: "USD",
//       country: entry.country,
//       releaseTitle: entry.releaseTitle,
//       reportingMonth: entry.reportingMonth,
//       salesMonth: entry.salesMonth,
//       platForm: entry.platForm,
//       // clientShareRate: entry.clientShareRate,
//     }));

//     const headers = [
//       { label: "UPC", key: "upc" },
//       { label: "ISRC", key: "isrc" },
//       { label: "Label Name", key: "labelName" },
//       { label: "Artist Name", key: "artistName" },
//       { label: "Album", key: "album" },
//       { label: "Track Title", key: "trackTitle" },
//       { label: "Stream Quantity", key: "stream_quantity" },
//       { label: "Revenue", key: "revenue" },
//       { label: "Currency", key: "currency" },
//       { label: "Country", key: "country" },
//       { label: "Release Title", key: "releaseTitle" },
//       { label: "Reporting Month", key: "reportingMonth" },
//       { label: "Sales Month", key: "salesMonth" },
//       { label: "Platform", key: "platForm" },
//       // { label: "Client Share Rate", key: "clientShareRate" },
//     ];

//     return (
//       <CSVLink
//         data={csvData}
//         headers={headers}
//         filename={"financial_data.csv"}
//         className="btn btn-primary"
//         target="_blank"
//       >
//         <CsvIcon />
//       </CSVLink>
//     );
//   };
//   const handlePDFDownload = (row: any) => {
//     console.log(row);
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
//     pdf.setFontSize(12);
//     pdf.text(`Date: ${row.createdAt}`, 10, y);
//     y += 10;
//     // Partner greeting
//     pdf.text("Dear partner,", 10, y);
//     y += 10;
//     pdf.text(
//       "Here is the total amount of royalties credited on your account.",
//       10,
//       y
//     );

//     y += 20;
//     // Filter information
//     pdf.text("Transaction Details", 10, y);
//     y += 10;
//     // Table header
//     pdf.setFont("helvetica", "bold");
//     // pdf.text("Store", 10, y);
//     pdf.text("Total", 150, y);
//     y += 10;
//     pdf.setFont("helvetica", "normal");
//     // Data row
//     // pdf.text(row.description, 10, y);
//     // pdf.text(String(currentMonthBalance), 150, y);
//     y += 10;
//     y += 10;

//     // Net revenue
//     pdf.text("NET REVENUE", 10, y);
//     pdf.text(String(row.totalAmount), 150, y);
//     y += 20;
//     pdf.text("REVENUE MONTH", 10, y);
//     pdf.text(String(row.reportingMonth), 150, y);
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
//     pdf.save(`transaction_${row._id?.slice(0, 6)}.pdf`);
//   };

//   return (
//     <Container>
//       <Typography variant="h4" align="center" gutterBottom>
//         Financial Reports
//       </Typography>

//       <Grid container spacing={4}>
//         <Grid item xs={12}></Grid>
//         <Grid item xs={12}>
//           <Paper sx={{ padding: 2 }}>
//             <TextField
//               label="Search"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//               onChange={handleSearch}
//             />
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell onClick={() => handleSort("createdAt")}>
//                       Date{" "}
//                       {sortedColumn === "createdAt" &&
//                         (sortDirection === "asc" ? (
//                           <ArrowDownwardIcon />
//                         ) : (
//                           <ArrowUpwardIcon />
//                         ))}
//                     </TableCell>
//                     <TableCell onClick={() => handleSort("filename")}>
//                       File Name{" "}
//                       {sortedColumn === "filename" &&
//                         (sortDirection === "asc" ? (
//                           <ArrowDownwardIcon />
//                         ) : (
//                           <ArrowUpwardIcon />
//                         ))}
//                     </TableCell>
//                     <TableCell
//                       align="right"
//                       onClick={() => handleSort("totalAmount")}
//                     >
//                       Amount ($){" "}
//                       {sortedColumn === "totalAmount" &&
//                         (sortDirection === "asc" ? (
//                           <ArrowDownwardIcon />
//                         ) : (
//                           <ArrowUpwardIcon />
//                         ))}
//                     </TableCell>
//                     {/* <TableCell>Client Share Rate</TableCell> */}
//                     <TableCell>Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {sortedHistory
//                     ?.slice(
//                       page * rowsPerPage,
//                       page * rowsPerPage + rowsPerPage
//                     )
//                     ?.map((row: any) => (
//                       <TableRow key={row._id}>
//                         <TableCell>
//                           {new Date(row.createdAt).toLocaleString("en-US", {
//                             year: "numeric",
//                             month: "long",
//                             day: "numeric",
//                             hour: "2-digit",
//                             minute: "2-digit",
//                           })}
//                         </TableCell>

//                         <TableCell>{row.filename}</TableCell>
//                         <TableCell align="right">
//                           <strong> {row.totalAmount?.toFixed(2)}</strong>
//                         </TableCell>
//                         {/* <TableCell>
//                           <strong className="pl-8">
//                             {row?.clientShareRate?.slice(0, 4)}%
//                           </strong>
//                         </TableCell> */}
//                         <TableCell>
//                           <IconButton onClick={() => handlePDFDownload(row)}>
//                             <PdfIcon />
//                           </IconButton>
//                           {handleCSVDownload(row)}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
//               <Pagination
//                 count={Math.ceil(sortedHistory?.length / rowsPerPage)}
//                 page={page}
//                 onChange={handleChangePage}
//                 variant="outlined"
//                 shape="rounded"
//               />
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default FinancialReports;
import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Pagination,
  Button,
  InputAdornment,
  styled,
} from "@mui/material";
import {
  PictureAsPdf as PdfIcon,
  Description as CsvIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import Logo from "../../assets/ANS Music limited's logo.png"; // Import your logo image

// Mock Data
const mockData = Array.from({ length: 50 }, (_, index) => ({
  _id: `id-${index}`,
  createdAt: new Date().toISOString(),
  filename: `File ${index + 1}.csv`,
  totalAmount: (Math.random() * 1000).toFixed(2),
}));

// Styled Components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontWeight: 600,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  borderRadius: 12,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  flex: 1,
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    "& fieldset": {
      borderColor: "transparent", // Remove border color
    },
    "&:hover fieldset": {
      borderColor: "transparent", // Remove border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent", // Remove border color on focus
    },
  },
  "& .MuiInputBase-input": {
    padding: "12px 14px",
  },
}));

const SearchButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  marginLeft: theme.spacing(1),
  height: "100%",
  padding: "12px 16px",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const CustomPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    borderRadius: 8,
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary,
  },
  "& .Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: "none",
  },
  "& .MuiPaginationItem-ellipsis": {
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const FinancialReports = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedColumn, setSortedColumn] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState("asc");

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleSearch = () => {
    setPage(1);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (column: string) => {
    setSortedColumn(column);
    setSortDirection(
      sortedColumn === column && sortDirection === "asc" ? "desc" : "asc"
    );
  };

  const filteredHistory = mockData.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedHistory = filteredHistory.sort((a, b) => {
    const aValue = a[sortedColumn];
    const bValue = b[sortedColumn];
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return sortDirection === "asc"
      ? Number(aValue) - Number(bValue)
      : Number(bValue) - Number(aValue);
  });

  const handleCSVDownload = (row: any) => {
    const csvData = [row];
    const headers = [
      { label: "Date", key: "createdAt" },
      { label: "File Name", key: "filename" },
      { label: "Amount", key: "totalAmount" },
    ];
    return (
      <CSVLink
        data={csvData}
        headers={headers}
        filename={`financial_data_${row._id}.csv`}
        className="btn btn-primary"
        target="_blank"
      >
        <CsvIcon />
      </CSVLink>
    );
  };

  const handlePDFDownload = (row: any) => {
    const pdf = new jsPDF();
    let y = 20;
    pdf.setFontSize(24);
    pdf.text("Financial Report", 20, y);
    y += 20;
    pdf.setFontSize(12);
    pdf.text(`Date: ${new Date(row.createdAt).toLocaleDateString()}`, 20, y);
    y += 10;
    pdf.text(`File Name: ${row.filename}`, 20, y);
    y += 10;
    pdf.text(`Amount: $${row.totalAmount}`, 20, y);
    pdf.save(`report_${row._id}.pdf`);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Financial Reports
      </Typography>

      <SearchContainer>
        <SearchInput
          placeholder="Search reports..."
          variant="outlined"
          onChange={handleSearchInputChange}
          value={searchQuery}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <img src={Logo} alt="Logo" style={{ width: 24, height: 24 }} />
              </InputAdornment>
            ),
          }}
        />
        <SearchButton onClick={handleSearch}>
          <SearchIcon />
        </SearchButton>
      </SearchContainer>

      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell onClick={() => handleSort("createdAt")}>
                    Date{" "}
                    {sortedColumn === "createdAt" &&
                      (sortDirection === "asc" ? (
                        <ArrowDownwardIcon />
                      ) : (
                        <ArrowUpwardIcon />
                      ))}
                  </StyledTableCell>
                  <StyledTableCell onClick={() => handleSort("filename")}>
                    File Name{" "}
                    {sortedColumn === "filename" &&
                      (sortDirection === "asc" ? (
                        <ArrowDownwardIcon />
                      ) : (
                        <ArrowUpwardIcon />
                      ))}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    onClick={() => handleSort("totalAmount")}
                  >
                    Amount ($){" "}
                    {sortedColumn === "totalAmount" &&
                      (sortDirection === "asc" ? (
                        <ArrowDownwardIcon />
                      ) : (
                        <ArrowUpwardIcon />
                      ))}
                  </StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedHistory
                  .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row._id}>
                      <TableCell>
                        {new Date(row.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{row.filename}</TableCell>
                      <TableCell align="right">
                        <strong>${row.totalAmount}</strong>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handlePDFDownload(row)}>
                          <PdfIcon />
                        </IconButton>
                        {handleCSVDownload(row)}
                      </TableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2} display="flex" justifyContent="center">
            <CustomPagination
              count={Math.ceil(filteredHistory.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
              color="primary"
            />
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FinancialReports;
