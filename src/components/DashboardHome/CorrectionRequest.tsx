/* eslint-disable @typescript-eslint/ban-ts-comment */
import { imageURL } from "@/redux/api/baseApi";
import { useGetCorrectionSingleSongQuery } from "@/redux/slices/myUploads/myUploadsApi";
import Loader from "@/utils/Loader";
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
import { useState } from "react";
import CorrectionMessageModal from "../MyUploads/CorrectionMusic/CorrectionMessageModa";
import { ShieldAlert } from "lucide-react";

const CorrectionRequest = () => {
  const [correctionMessage, setCorrectionMessage] = useState([]);
  const { data: songsData, isLoading } = useGetCorrectionSingleSongQuery({});
  const [open, setOpen] = useState(false);
  const handleClickOpen = (corrections: []) => {
    setOpen(true);
    setCorrectionMessage(corrections);
  };
  if (isLoading) {
    return <Loader />;
  }
  //@ts-ignore
  const songData = songsData?.data?.data;

  return (
    <Grid item xs={12} md={12}>
      {/* Correction Requested Songs */}
      <Paper sx={{ padding: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h6">Correction Requested Songs</Typography>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cover</TableCell>
                <TableCell>ReleaseID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Release Title</TableCell>
                <TableCell>Label</TableCell>
                <TableCell>Release Date</TableCell>
                <TableCell>UPC</TableCell>

                <TableCell>Catalog Number</TableCell>
                <TableCell>Correction Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {songData?.map((row: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      className="w-[70px] h-[40px] rounded-md "
                      src={`${imageURL}/${row?.image}`}
                      alt=""
                    />
                  </TableCell>
                  <TableCell>{row.releaseId}</TableCell>
                  <TableCell>{row.songType}</TableCell>
                  <TableCell>{row.releaseTitle}</TableCell>
                  <TableCell>{row.label?.labelName}</TableCell>
                  <TableCell>{row.releaseDate}</TableCell>
                  <TableCell>{row.upc ? row.upc : "-"}</TableCell>

                  <TableCell>
                    {row.catalogNumber ? row.catalogNumber : "-"}
                  </TableCell>
                  <TableCell>
                    <ShieldAlert
                      size={30}
                      className="text-center cursor-pointer w-full"
                      onClick={() => handleClickOpen(row._id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <CorrectionMessageModal
        open={open}
        setOpen={setOpen}
        data={correctionMessage}
      />
    </Grid>
  );
};

export default CorrectionRequest;
