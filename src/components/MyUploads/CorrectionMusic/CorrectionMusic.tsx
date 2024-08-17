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
                Correction Lists
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
          <CorrectionSongsTable searchQuery={searchQuery} />
        </Paper>
      </Box>
    </>
  );
};

export default CorrectionMusic;
