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
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";
import { useGetLatestSongsQuery } from "@/redux/slices/myUploads/myUploadsApi";
import Loader from "@/utils/Loader";
import { imageURL } from "@/redux/api/baseApi";

const LatestVideo = () => {
  const { data: songsData, isLoading } = useGetLatestSongsQuery({});
  if (isLoading) {
    return <Loader />;
  }
  const videoData = songsData?.data?.latestVideo || [];
  console.log(videoData);
  return (
    <Grid item xs={12} md={6}>
      <label
        htmlFor="music"
        style={{ display: "block", margin: "4px 0" }}
        className="p-3 border "
      >
        <Link to={"/release-video"}>
          {" "}
          <div className="flex justify-center flex-col items-center w-full h-full border-dashed border border-black py-10 cursor-pointer">
            <YouTubeIcon sx={{ fontSize: 60, color: "#FF0000" }} />
            <p>Create Video Release</p>
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
          <Typography variant="h6">Lates Videos</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 2,
            position: "relative",
          }}
        >
          <p></p>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Store Release Date</TableCell>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Video Name</TableCell>
                <TableCell>Label Name</TableCell>

                {/* <TableCell align="right">Actions</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {videoData?.map((track: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>
                    {new Date(track.storeReleaseDate).toLocaleDateString()}
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
  );
};

export default LatestVideo;
