import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  List,
  ListItem,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";
import { imageURL } from "@/redux/api/baseApi";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    maxWidth: 800,
    maxHeight: "80vh",
    overflowY: "auto",
  },
  coverImage: {
    position: "relative",
    height: 300,
    borderRadius: theme.shape.borderRadius,
  },
  downloadButton: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  },
  audioPlayer: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    backgroundColor: theme.palette.background.default,
  },
  listItem: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  cardContent: {
    paddingBottom: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  previewImage: {
    width: "100%",
    height: "auto",
  },
}));

const AlbumDetailsModal = ({ open, onClose, audioDetails }: any) => {
  const classes = useStyles();
  const [previewOpen, setPreviewOpen] = useState(false);

  if (!audioDetails) return null;

  const handleClose = () => {
    onClose();
  };

  const handleDownload = async (image: string) => {
    const response = await fetch(`${imageURL}/${image}`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = image;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImageClick = () => {
    setPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  return (
    <>
      <Modal
        aria-labelledby="audio-details-modal"
        aria-describedby="audio-details"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Card className={classes.coverImage}>
              <CardMedia
                component="img"
                alt="Cover Image"
                height="100%"
                image={`${imageURL}/${audioDetails.image}`}
                onClick={handleImageClick}
              />
              <IconButton
                className={classes.downloadButton}
                onClick={() => handleDownload(audioDetails.image)}
              >
                <GetAppIcon />
              </IconButton>
            </Card>
            {audioDetails?.audio?.map((audio: any, index: any) => (
              <div key={audio._id}>
                <Typography variant="h5" gutterBottom>
                  Audio Details - Track {index + 1}
                </Typography>
                <CardContent className={classes.cardContent}>
                  <List>
                    <ListItem className={classes.listItem}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            <strong>Release Title:</strong> {audio.releaseTitle}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Subtitle:</strong> {audio.subtitle}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Primary Artists:</strong>{" "}
                            {audio.primaryArtist.join(", ")}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Format:</strong> {audio.format}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Label:</strong> {audio.label}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Writer(s):</strong>{" "}
                            {audio.writer.join(", ")}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body2">
                            <strong>Composer(s):</strong>{" "}
                            {audio.composer.join(", ")}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Featuring:</strong>{" "}
                            {audio.featuring.join(", ")}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Genre:</strong> {audio.genre}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Subgenre:</strong> {audio.subGenre}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Original Release Date:</strong>{" "}
                            {audio.originalReleaseDate}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Production Year:</strong>{" "}
                            {audio.productionYear}
                          </Typography>
                          <Typography variant="body2">
                            <strong>YouTube Link:</strong> {audio.youtube}
                          </Typography>
                          <Typography variant="body2">
                            <strong>ISRC:</strong> {audio.isrc}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  </List>
                </CardContent>
                <div className={classes.audioPlayer}>
                  <audio controls>
                    <source
                      src={`${imageURL}${audio.audioFileName}`}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                {index < audioDetails.audio.length - 1 && (
                  <Divider className={classes.divider} />
                )}
              </div>
            ))}
          </div>
        </Fade>
      </Modal>

      <Dialog
        open={previewOpen}
        onClose={handlePreviewClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          <img
            src={`${imageURL}/${audioDetails.image}`}
            alt="Preview"
            className={classes.previewImage}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AlbumDetailsModal;
