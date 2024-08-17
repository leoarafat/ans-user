// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import { useState } from "react";
// import { Box, Typography, TextField, IconButton } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import SearchIcon from "@mui/icons-material/Search";
// import PublicIcon from "@mui/icons-material/Public";
// import StoreIcon from "@mui/icons-material/Store"; // Added StoreIcon import
// import { rows } from "@/MockData/MockData";
// import StoreModal from "../Modal/StoreModal";
// import CountryModal from "../Modal/CountryModal";
// import BasicPagination from "../BasicPagination";

// function SuccessRelease() {
//   const [searchText, setSearchText] = useState("");
//   const [filteredRows, setFilteredRows] = useState(rows);
//   const [selectedAlbum, setSelectedAlbum] = useState(null);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [countryOpen, setCountryOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const pageSize = 10;
//   const totalPages = Math.ceil(filteredRows.length / pageSize);
//   const handleSearch = () => {
//     const filteredData = rows.filter(
//       (row) =>
//         row.title.toLowerCase().includes(searchText.toLowerCase()) ||
//         row.artist.toLowerCase().includes(searchText.toLowerCase()) ||
//         row.label.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setCurrentPage(0);
//     setFilteredRows(filteredData);
//   };
//   const handleStoreModal = async (payload: any) => {
//     setOpen(true);
//     setSelectedAlbum(payload);
//   };
//   const handleCountryModal = async (payload: any) => {
//     setCountryOpen(true);
//     setSelectedCountry(payload);
//   };
//   const handlePageChange = (page: any) => {
//     setCurrentPage(page - 1);
//   };
//   const columns = [
//     {
//       field: "cover",
//       headerName: "",
//       width: 80,
//       renderCell: (params: any) => (
//         <img
//           src={params.value}
//           alt="cover"
//           style={{ width: "50px", height: "50px", borderRadius: "4px" }}
//         />
//       ),
//     },
//     {
//       field: "title",
//       headerName: "Title",
//       width: 300,
//       renderCell: (params: any) => (
//         <div>
//           <Typography style={{ fontWeight: "bold", color: "#007BFF" }}>
//             {params.value}
//           </Typography>
//           <Typography>{params.row.artist}</Typography>
//         </div>
//       ),
//     },
//     { field: "label", headerName: "Label", width: 150 },
//     { field: "releaseDate", headerName: "Release Date", width: 150 },
//     { field: "upc", headerName: "UPC", width: 200 },
//     { field: "isrc", headerName: "ISRC", width: 100 },
//     { field: "tracks", headerName: "Tracks", width: 100 },

//     {
//       field: "territories",
//       headerName: "Territories",
//       width: 230,
//       renderCell: (params: any) => (
//         <div
//           onClick={() => handleCountryModal(params.row)}
//           className="cursor-pointer"
//         >
//           <Box display="flex" alignItems="center">
//             <PublicIcon style={{ marginRight: 8 }} />
//             <Typography>{params.value}</Typography>
//           </Box>
//         </div>
//       ),
//     },
//     {
//       field: "stores",
//       headerName: "Stores",
//       width: 120,
//       renderCell: (params: any) => (
//         <div
//           onClick={() => handleStoreModal(params.row)}
//           className="cursor-pointer"
//         >
//           <Box display="flex" alignItems="center">
//             <StoreIcon style={{ marginRight: 8 }} />
//             <Typography>{params.value}</Typography>
//           </Box>
//         </div>
//       ),
//     },
//   ];
//   return (
//     <>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={3}
//         mt={3}
//       >
//         <Typography variant="h4" fontWeight="bold">
//           Success Release
//         </Typography>
//         <Box display="flex" alignItems="center">
//           <TextField
//             variant="outlined"
//             size="small"
//             placeholder="Search..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             style={{ marginRight: 10 }}
//           />
//           <IconButton onClick={handleSearch}>
//             <SearchIcon />
//           </IconButton>
//         </Box>
//       </Box>
//       <div style={{ height: 600, width: "100%" }} className="mb-12">
//         <DataGrid
//           rows={filteredRows.slice(
//             currentPage * pageSize,
//             (currentPage + 1) * pageSize
//           )}
//           columns={columns}
//           //@ts-ignore
//           pageSize={10}
//           rowsPerPageOptions={[10, 20, 50]}
//           autoHeight
//           disableSelectionOnClick
//           checkboxSelection={false}
//           pagination
//           hideFooterPagination
//         />
//       </div>
//       {/* Pagination */}
//       <Box mt={3} display="flex" justifyContent="center">
//         <BasicPagination
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </Box>
//       <StoreModal open={open} setOpen={setOpen} selectedAlbum={selectedAlbum} />
//       <CountryModal
//         open={countryOpen}
//         setOpen={setCountryOpen}
//         selectedCountry={selectedCountry}
//       />
//     </>
//   );
// }

// export default SuccessRelease;
// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import { useState } from "react";
// import { Box, Typography, TextField, IconButton } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import SearchIcon from "@mui/icons-material/Search";
// import PublicIcon from "@mui/icons-material/Public";
// import StoreIcon from "@mui/icons-material/Store"; // Added StoreIcon import
// import { rows } from "@/MockData/MockData";
// import StoreModal from "../Modal/StoreModal";
// import CountryModal from "../Modal/CountryModal";
// import BasicPagination from "../BasicPagination";

// function SuccessVideos() {
//   const [searchText, setSearchText] = useState("");
//   const [filteredRows, setFilteredRows] = useState(rows);
//   const [selectedAlbum, setSelectedAlbum] = useState(null);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [open, setOpen] = useState(false);
//   const [countryOpen, setCountryOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const pageSize = 10;
//   const totalPages = Math.ceil(filteredRows.length / pageSize);
//   const handleSearch = () => {
//     const filteredData = rows.filter(
//       (row) =>
//         row.title.toLowerCase().includes(searchText.toLowerCase()) ||
//         row.artist.toLowerCase().includes(searchText.toLowerCase()) ||
//         row.label.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setCurrentPage(0);
//     setFilteredRows(filteredData);
//   };
//   const handleStoreModal = async (payload: any) => {
//     setOpen(true);
//     setSelectedAlbum(payload);
//   };
//   const handleCountryModal = async (payload: any) => {
//     setCountryOpen(true);
//     setSelectedCountry(payload);
//   };
//   const handlePageChange = (page: any) => {
//     setCurrentPage(page - 1); // Page index starts from 1, so decrement by 1
//   };
//   const columns = [
//     {
//       field: "cover",
//       headerName: "",
//       width: 80,
//       renderCell: (params: any) => (
//         <img
//           src={params.value}
//           alt="cover"
//           style={{ width: "50px", height: "50px", borderRadius: "4px" }}
//         />
//       ),
//     },
//     {
//       field: "title",
//       headerName: "Title",
//       width: 300,
//       renderCell: (params: any) => (
//         <div>
//           <Typography style={{ fontWeight: "bold", color: "#007BFF" }}>
//             {params.value}
//           </Typography>
//           <Typography>{params.row.artist}</Typography>
//         </div>
//       ),
//     },
//     { field: "label", headerName: "Label", width: 150 },
//     { field: "releaseDate", headerName: "Release Date", width: 150 },
//     { field: "upc", headerName: "UPC", width: 200 },
//     { field: "isrc", headerName: "ISRC", width: 100 },
//     { field: "tracks", headerName: "Tracks", width: 100 },

//     {
//       field: "territories",
//       headerName: "Territories",
//       width: 230,
//       renderCell: (params: any) => (
//         <div
//           onClick={() => handleCountryModal(params.row)}
//           className="cursor-pointer"
//         >
//           <Box display="flex" alignItems="center">
//             <PublicIcon style={{ marginRight: 8 }} />
//             <Typography>{params.value}</Typography>
//           </Box>
//         </div>
//       ),
//     },
//     {
//       field: "stores",
//       headerName: "Stores",
//       width: 120,
//       renderCell: (params: any) => (
//         <div
//           onClick={() => handleStoreModal(params.row)}
//           className="cursor-pointer"
//         >
//           <Box display="flex" alignItems="center">
//             <StoreIcon style={{ marginRight: 8 }} />
//             <Typography>{params.value}</Typography>
//           </Box>
//         </div>
//       ),
//     },
//   ];
//   return (
//     <>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={3}
//         mt={3}
//       >
//         <Typography variant="h4" fontWeight="bold">
//           Videos
//         </Typography>
//         <Box display="flex" alignItems="center">
//           <TextField
//             variant="outlined"
//             size="small"
//             placeholder="Search..."
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             style={{ marginRight: 10 }}
//           />
//           <IconButton onClick={handleSearch}>
//             <SearchIcon />
//           </IconButton>
//         </Box>
//       </Box>
//       <div style={{ height: 600, width: "100%" }} className="mb-12">
//         <DataGrid
//           rows={filteredRows.slice(
//             currentPage * pageSize,
//             (currentPage + 1) * pageSize
//           )}
//           columns={columns}
//           //@ts-ignore
//           pageSize={10}
//           rowsPerPageOptions={[10, 20, 50]}
//           autoHeight
//           disableSelectionOnClick
//           checkboxSelection={false}
//           pagination
//           hideFooterPagination
//         />
//       </div>
//       {/* Pagination */}
//       <Box mt={3} display="flex" justifyContent="center">
//         <BasicPagination
//           totalPages={totalPages}
//           onPageChange={handlePageChange}
//         />
//       </Box>
//       <StoreModal open={open} setOpen={setOpen} selectedAlbum={selectedAlbum} />
//       <CountryModal
//         open={countryOpen}
//         setOpen={setCountryOpen}
//         selectedCountry={selectedCountry}
//       />
//     </>
//   );
// }

// export default SuccessVideos;
import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Typography,
  Paper,
  Toolbar,
  TextField,
  InputAdornment,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SuccessSongsTable from "./SuccessSongsTable";

const ReleasedSongs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };
  useEffect(() => {
    localStorage.removeItem("releaseFormData");
    localStorage.removeItem("tracksInformation");
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 4 }}>
        <Paper elevation={3} sx={{ borderRadius: 2, p: 2 }}>
          <AppBar
            position="static"
            color="transparent"
            sx={{
              boxShadow: "none",
              backgroundColor: "white",
              borderRadius: 2,
            }}
          >
            <Toolbar sx={{ paddingLeft: 2, paddingRight: 2 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, fontWeight: "bold" }}
              >
                Releases Songs
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Search…"
                value={searchQuery}
                onChange={handleSearchChange}
                sx={{
                  marginLeft: 2,
                  borderRadius: 1,
                  "& .MuiOutlinedInput-root": { borderRadius: "50px" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Toolbar>
            <Divider />
          </AppBar>
        </Paper>
      </Box>
      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <Paper elevation={3} sx={{ borderRadius: 2, p: 2 }}>
          <SuccessSongsTable searchQuery={searchQuery} />
        </Paper>
      </Box>
    </>
  );
};

export default ReleasedSongs;
