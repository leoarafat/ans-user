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
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { Link } from "react-router-dom";
import LatestVideo from "./LatestVideo";
import Loader from "@/utils/Loader";
import { useGetLatestSongsQuery } from "@/redux/slices/myUploads/myUploadsApi";

const LastSixApproved = () => {
  const { data: songsData, isLoading } = useGetLatestSongsQuery({});

  if (isLoading) {
    return <Loader />;
  }

  const audioData = songsData?.data?.latestSingleTrack || [];

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
                background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",

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
              <AudiotrackIcon sx={{ fontSize: 60, color: "#ffffff" }} />
              <Typography sx={{ color: "#ffffff" }} variant="h6" mt={1}>
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
                {audioData.map((track: any, index: number) => (
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
