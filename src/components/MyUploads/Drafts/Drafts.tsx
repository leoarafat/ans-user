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
import DraftsSongsTable from "./DraftsTable";

const Drafts = () => {
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
                Pending Songs
              </Typography>
              <TextField
                variant="outlined"
                placeholder="Search…"
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
          <DraftsSongsTable />
        </Paper>
      </Box>
    </>
  );
};

export default Drafts;
