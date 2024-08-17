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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import YoutubeTakeDownRequestTable from "./Table/YoutubeTakeDownTable";

const YoutubeTakeDown = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [statusFilter, setStatusFilter] = useState("");
  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };
  const handleStatusChange = (event: any) => {
    setStatusFilter(event.target.value);
  };
  useEffect(() => {
    localStorage.removeItem("releaseFormData");
    localStorage.removeItem("tracksInformation");
  }, []);
  return (
    <Container maxWidth="lg">
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
                Manage Youtube TakeDown Request
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
              <FormControl
                variant="outlined"
                sx={{ marginLeft: 2, minWidth: 120 }}
              >
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  onChange={handleStatusChange}
                  label="Status"
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="approved">Approved</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                </Select>
              </FormControl>
            </Toolbar>
            <Divider />
          </AppBar>
        </Paper>
      </Box>
      <Box sx={{ flexGrow: 1, mt: 2 }}>
        <Paper elevation={3} sx={{ borderRadius: 2, p: 2 }}>
          <YoutubeTakeDownRequestTable
            searchQuery={searchQuery}
            statusFilter={statusFilter}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default YoutubeTakeDown;
