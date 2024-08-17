import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardMedia,
  IconButton,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DownloadIcon } from "lucide-react";
import { formatDate } from "@/utils/formatedDate";
import { imageURL } from "@/redux/api/baseApi";

const useStyles = makeStyles({
  form: {
    width: "100%",
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
  },
  media: {
    height: 200,
    position: "relative",
  },
  downloadButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
  },
  videoContainer: {
    position: "relative",
    paddingBottom: "56.25%", // 16:9 aspect ratio (change as needed)
    paddingTop: 25,
    height: 0,
    overflow: "hidden",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
});

const VideoDetailsModal = ({ open, handleClose, data }: any) => {
  const classes = useStyles();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          ...modalStyle,
          ...{ width: "90%", maxWidth: 1000, maxHeight: "90%" },
        }}
      >
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" mb={2}>
            All Details
          </Typography>
          <Card>
            <CardMedia
              className={classes.media}
              component="img"
              image={`${imageURL}/${data?.image}`}
              title="Track Image"
            />
          </Card>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Title
              </Typography>
              <Typography variant="body1">{data?.title}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1">{data?.description}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Genre
              </Typography>
              <Typography variant="body1">{data?.genre}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Subgenre
              </Typography>
              <Typography variant="body1">{data?.subGenre}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Language
              </Typography>
              <Typography variant="body1">{data?.language}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                UPC
              </Typography>
              <Typography variant="body1">{data?.upc}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                ISRC
              </Typography>
              <Typography variant="body1">{data?.isrc}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Label
              </Typography>
              <Typography variant="body1">{data?.label?.labelName}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Primary Artist
              </Typography>
              <Typography variant="body1">
                {data?.primaryArtist[0]?.primaryArtistName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom>
                Created At
              </Typography>
              <Typography variant="body1">
                {formatDate(data?.createdAt)}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Video
              </Typography>
              <div className={classes.videoContainer}>
                <video className={classes.video} controls>
                  <source src={`${imageURL}/${data?.video}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Modal>
  );
};

export default VideoDetailsModal;

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 1000,
  maxHeight: "90%",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
