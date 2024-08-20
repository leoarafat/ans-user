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
  Avatar,
} from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
import Loader from "@/utils/Loader";
import { imageURL } from "@/redux/api/baseApi";

// Mock data for videos
const mockVideoData = [
  {
    storeReleaseDate: "2024-08-15T00:00:00Z",
    image: "https://via.placeholder.com/90x60/ff0000/ffffff?text=Video1",
    title: "Awesome Music Video 1",
    label: { labelName: "Label One" },
  },
  {
    storeReleaseDate: "2024-08-10T00:00:00Z",
    image: "https://via.placeholder.com/90x60/00ff00/ffffff?text=Video2",
    title: "Cool Music Video 2",
    label: { labelName: "Label Two" },
  },
  {
    storeReleaseDate: "2024-08-05T00:00:00Z",
    image: "https://via.placeholder.com/90x60/0000ff/ffffff?text=Video3",
    title: "Epic Music Video 3",
    label: { labelName: "Label Three" },
  },
  {
    storeReleaseDate: "2024-07-30T00:00:00Z",
    image: "https://via.placeholder.com/90x60/ffff00/ffffff?text=Video4",
    title: "Amazing Music Video 4",
    label: { labelName: "Label Four" },
  },
  {
    storeReleaseDate: "2024-07-25T00:00:00Z",
    image: "https://via.placeholder.com/90x60/ff00ff/ffffff?text=Video5",
    title: "Great Music Video 5",
    label: { labelName: "Label Five" },
  },
  {
    storeReleaseDate: "2024-07-20T00:00:00Z",
    image: "https://via.placeholder.com/90x60/00ffff/ffffff?text=Video6",
    title: "Fantastic Music Video 6",
    label: { labelName: "Label Six" },
  },
];

const LatestVideo = () => {
  // Simulating API data with mock data
  const { data: videoData, isLoading } = {
    data: { latestVideo: mockVideoData },
    isLoading: false,
  };

  if (isLoading) {
    return <Loader />;
  }

  const videos = videoData?.latestVideo || [];

  return (
    <>
      <Box mb={2}>
        <Link to={"/release-video"}>
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
            <YouTubeIcon sx={{ fontSize: 60, color: "#FF0000" }} />
            <Typography variant="h6" mt={1}>
              Create Video Release
            </Typography>
          </Paper>
        </Link>
      </Box>
      {/* Latest Videos */}
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
          sx={{ textAlign: "center", fontWeight: "bold", color: "#FF0000" }}
        >
          Latest Videos
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Release Date</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Thumbnail</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Video Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Label Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {videos.map((video: any, index: number) => (
                <TableRow
                  key={index}
                  sx={{ "&:hover": { backgroundColor: "#fafafa" } }}
                >
                  <TableCell>
                    {new Date(video.storeReleaseDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Avatar
                      src={video?.image || "https://via.placeholder.com/90x60"}
                      alt="Thumbnail"
                      sx={{ width: 90, height: 60 }}
                    />
                  </TableCell>
                  <TableCell>{video.title}</TableCell>
                  <TableCell>{video?.label?.labelName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default LatestVideo;
