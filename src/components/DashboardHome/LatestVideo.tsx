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
import { useGetLatestSongsQuery } from "@/redux/slices/myUploads/myUploadsApi";

const LatestVideo = () => {
  // Simulating API data with mock data
  const { data: videoData, isLoading } = useGetLatestSongsQuery({});

  if (isLoading) {
    return <Loader />;
  }

  const videos = videoData?.data?.latestVideo || [];

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
