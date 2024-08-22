import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Avatar,
} from "@mui/material";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { Link } from "react-router-dom";
import LatestVideo from "./LatestVideo";
import Loader from "@/utils/Loader";
import { imageURL } from "@/redux/api/baseApi";

// Mock data
const mockSongsData = {
  latestSingleTrack: [
    {
      releaseDate: "2024-07-01",
      image: "https://via.placeholder.com/90x60",
      title: "Track One",
      label: { labelName: "Label One" },
    },
    {
      releaseDate: "2024-07-10",
      image: "https://via.placeholder.com/90x60",
      title: "Track Two",
      label: { labelName: "Label Two" },
    },
    {
      releaseDate: "2024-07-15",
      image: "https://via.placeholder.com/90x60",
      title: "Track Three",
      label: { labelName: "Label Three" },
    },
    {
      releaseDate: "2024-07-20",
      image: "https://via.placeholder.com/90x60",
      title: "Track Four",
      label: { labelName: "Label Four" },
    },
    {
      releaseDate: "2024-07-25",
      image: "https://via.placeholder.com/90x60",
      title: "Track Five",
      label: { labelName: "Label Five" },
    },
    {
      releaseDate: "2024-08-01",
      image: "https://via.placeholder.com/90x60",
      title: "Track Six",
      label: { labelName: "Label Six" },
    },
  ],
};

const LastSixApproved = () => {
  const { data: songsData, isLoading } = {
    data: mockSongsData,
    isLoading: false,
  }; // Use mock data

  if (isLoading) {
    return <Loader />;
  }

  const audioData = songsData?.latestSingleTrack || [];

  return (
    <Grid container spacing={3} sx={{ marginTop: 1 }}>
      <Grid item xs={12} md={6}>
        {/* Create Audio Release */}
        <Box mb={2}>
          <Link to={"/upload"}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 3,
                border: "1px dashed #ddd",
                borderRadius: 3,
                backgroundColor: "#f5f5f5",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                  borderColor: "#ccc",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                },
              }}
            >
              <AudiotrackIcon sx={{ fontSize: 60, color: "#00796b" }} />
              <Typography variant="h6" mt={1}>
                Create Audio Release
              </Typography>
            </Paper>
          </Link>
        </Box>
        {/* Last 6 Approved Tracks */}
        <Paper
          sx={{
            padding: 2,
            borderRadius: 3,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h6"
            mb={2}
            sx={{ textAlign: "center", fontWeight: "bold", color: "#00796b" }}
          >
            Latest Songs
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    Release Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Cover Image</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Song Title</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Label Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {audioData.map((track, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:hover": { backgroundColor: "#fafafa" } }}
                  >
                    <TableCell>
                      {new Date(track.releaseDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Avatar
                        src={
                          track?.image || "https://via.placeholder.com/90x60"
                        }
                        alt="Cover"
                        sx={{ width: 90, height: 60 }}
                      />
                    </TableCell>
                    <TableCell>{track.title}</TableCell>
                    <TableCell>{track?.label?.labelName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>
      {/* Last 6 Approved Video */}
      <Grid item xs={12} md={6}>
        <LatestVideo />
      </Grid>
    </Grid>
  );
};

export default LastSixApproved;
