// import { useEffect, useState } from "react";
// import {
//   AppBar,
//   Box,
//   Typography,
//   Paper,
//   Toolbar,
//   TextField,
//   InputAdornment,
//   Divider,
// } from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
// import SuccessSongsTable from "./SuccessSongsTable";

// const ReleasedSongs = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleSearchChange = (event: any) => {
//     setSearchQuery(event.target.value);
//   };
//   useEffect(() => {
//     localStorage.removeItem("releaseFormData");
//     localStorage.removeItem("tracksInformation");
//   }, []);
//   return (
//     <>
//       <Box sx={{ flexGrow: 1, mt: 4 }}>
//         <Paper elevation={3} sx={{ borderRadius: 2, p: 2 }}>
//           <AppBar
//             position="static"
//             color="transparent"
//             sx={{
//               boxShadow: "none",
//               backgroundColor: "white",
//               borderRadius: 2,
//             }}
//           >
//             <Toolbar sx={{ paddingLeft: 2, paddingRight: 2 }}>
//               <Typography
//                 variant="h6"
//                 component="div"
//                 sx={{ flexGrow: 1, fontWeight: "bold" }}
//               >
//                 Releases Songs
//               </Typography>
//               <TextField
//                 variant="outlined"
//                 placeholder="Search…"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 sx={{
//                   marginLeft: 2,
//                   borderRadius: 1,
//                   "& .MuiOutlinedInput-root": { borderRadius: "50px" },
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Toolbar>
//             <Divider />
//           </AppBar>
//         </Paper>
//       </Box>
//       <Box sx={{ flexGrow: 1, mt: 2 }}>
//         <Paper elevation={3} sx={{ borderRadius: 2, p: 2 }}>
//           <SuccessSongsTable searchQuery={searchQuery} />
//         </Paper>
//       </Box>
//     </>
//   );
// };

// export default ReleasedSongs;
import { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Paper,
  TableContainer,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SuccessSongsTable from "./SuccessSongsTable";

const ReleasedSongs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={8}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Released Songs
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            variant="outlined"
            placeholder="Search…"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              width: "100%",
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
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <TableContainer component={Paper} sx={{ borderRadius: 2, p: 2 }}>
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Paper elevation={3} sx={{ borderRadius: 2, p: 2 }}>
            <SuccessSongsTable searchQuery={searchQuery} />
          </Paper>
        </Box>
      </TableContainer>
    </>
  );
};

export default ReleasedSongs;
