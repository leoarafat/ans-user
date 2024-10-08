import { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Typography,
  Paper,
  Container,
  Toolbar,
  TextField,
  InputAdornment,
  Divider,
  Grid,
  TableContainer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CorrectionSongsTable from "./CorrectionMusicTable";

const CorrectionMusic = () => {
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
      <>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={8}>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Correction Songs
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
              <CorrectionSongsTable searchQuery={searchQuery} />
            </Paper>
          </Box>
        </TableContainer>
      </>
    </>
  );
};

export default CorrectionMusic;
