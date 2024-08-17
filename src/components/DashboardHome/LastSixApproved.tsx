/* eslint-disable @typescript-eslint/ban-ts-comment */
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
} from "@mui/material";

import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { Link } from "react-router-dom";
import LatestVideo from "./LatestVideo";
import { useGetLatestSongsQuery } from "@/redux/slices/myUploads/myUploadsApi";
import Loader from "@/utils/Loader";
import { imageURL } from "@/redux/api/baseApi";
const LastSixApproved = () => {
  const { data: songsData, isLoading } = useGetLatestSongsQuery({});
  if (isLoading) {
    return <Loader />;
  }
  const audioData = songsData?.data?.latestSingleTrack || [];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        {/* Last 6 Approved Tracks */}

        <label
          htmlFor="music"
          style={{ display: "block", margin: "4px 0" }}
          className="p-3 border "
        >
          <Link to={"/upload"}>
            {" "}
            <div className="flex justify-center flex-col items-center w-full h-full border-dashed border border-black py-10 cursor-pointer">
              <AudiotrackIcon sx={{ fontSize: 60, color: "#03008D" }} />
              <p>Create Audio Release</p>
            </div>
            <div className="hidden">
              <p
                id="music"
                style={{
                  border: "1px solid #E0E4EC",
                  height: "52px",
                  background: "white",
                  borderRadius: "8px",
                  outline: "none",
                  cursor: "pointer",
                }}
              />
            </div>
          </Link>
        </label>
        <Paper sx={{ padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6">Last Tracks</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 2,
              position: "relative",
            }}
          ></Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Release Date</TableCell>
                  <TableCell>Cover Image</TableCell>
                  <TableCell>Song Title</TableCell>
                  <TableCell>Label Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {audioData?.map((track: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>
                      {new Date(track.releaseDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <img
                        className="w-[90px] h-[60px] rounded-md"
                        src={
                          `${imageURL}/${track?.image}` ||
                          "https://via.placeholder.com/90x60"
                        }
                        alt="Album"
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
      <LatestVideo />
    </Grid>
  );
};

export default LastSixApproved;
