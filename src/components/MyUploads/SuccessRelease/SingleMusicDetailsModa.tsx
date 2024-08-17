import { imageURL } from "@/redux/api/baseApi";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Grid,
  Paper,
  Card,
  CardMedia,
  IconButton,
  CardContent,
  Divider,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/system";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";

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
  previewImage: {
    width: "100%",
    height: "auto",
  },
  audio: {
    width: "100%",
  },
});

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    marginBottom: theme.spacing(2),
    "& input": {
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#d3d3d3",
  },
}));

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

const previewModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const MusicDetailsModal = ({ open, handleClose, data }: any) => {
  const classes = useStyles();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleDownload = async (image: any) => {
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

  const handleImageClick = (image: any) => {
    setPreviewImage(`${imageURL}/${image}`);
    setPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h5" component="h2" mb={2}>
              All Details
            </Typography>
            <Card>
              <CardMedia
                className={classes.media}
                image={`${imageURL}/${data?.image}`}
                title="Track Image"
                onClick={() => handleImageClick(data?.image)}
              >
                <IconButton
                  className={classes.downloadButton}
                  onClick={() => handleDownload(data?.image)}
                >
                  <DownloadIcon />
                </IconButton>
              </CardMedia>
              <CardContent>
                <audio className={classes.audio} controls>
                  <source src={`${imageURL}/${data?.audio}`} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </CardContent>
            </Card>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={3}>
              {/* Primary Artist */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Primary Artist
                </Typography>
                {data?.primaryArtist?.map((artist: any, index: any) => (
                  <CustomTextField
                    key={index}
                    value={artist?.primaryArtistName}
                    disabled
                    fullWidth
                    variant="outlined"
                  />
                ))}
              </Grid>
              {data?.writer?.length > 0 && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Writer
                  </Typography>
                  {data?.writer?.map((writer: any, index: any) => (
                    <CustomTextField
                      key={index}
                      value={writer}
                      disabled
                      fullWidth
                      variant="outlined"
                    />
                  ))}
                </Grid>
              )}
              {/* Composer */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Composer
                </Typography>
                <CustomTextField
                  value={data?.composer}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* Music Director */}
              {data?.musicDirector?.length > 0 && (
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Music Director
                  </Typography>
                  {data?.musicDirector?.map((director: any, index: any) => (
                    <CustomTextField
                      key={index}
                      value={director}
                      disabled
                      fullWidth
                      variant="outlined"
                    />
                  ))}
                </Grid>
              )}
              {/* Producer */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Producer
                </Typography>
                <CustomTextField
                  value={data?.producer}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* Label */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Label
                </Typography>
                <CustomTextField
                  value={data?.label?.labelName}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* Subtitle */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Subtitle
                </Typography>
                <CustomTextField
                  value={data?.subtitle}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* P Line */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  P Line
                </Typography>
                <CustomTextField
                  value={data?.pLine}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* C Line */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  C Line
                </Typography>
                <CustomTextField
                  value={data?.cLine}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* Primary Track Type */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Primary Track Type
                </Typography>
                <CustomTextField
                  value={data?.primaryTrackType}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* Is Release */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Is Release
                </Typography>
                <CustomTextField
                  value={data?.isRelease}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* Instrumental */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Instrumental
                </Typography>
                <CustomTextField
                  value={data?.instrumental}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* Secondary Track Type */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Secondary Track Type
                </Typography>
                <CustomTextField
                  value={data?.secondaryTrackType}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* Parental Advisory */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Parental Advisory
                </Typography>
                <CustomTextField
                  value={data?.parentalAdvisory}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* UPC EAN */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  UPC EAN
                </Typography>
                <CustomTextField
                  value={data?.upc}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* Producer Catalog Number */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Producer Catalog Number
                </Typography>
                <CustomTextField
                  value={data?.catalogNumber}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* Production Year */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Production Year
                </Typography>
                <CustomTextField
                  value={data?.productionYear}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* Catalog Number */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Catalog Number
                </Typography>
                <CustomTextField
                  value={data?.catalogNumber}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* Genre */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Genre
                </Typography>
                <CustomTextField
                  value={data?.genre}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* Sub Genre */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Sub Genre
                </Typography>
                <CustomTextField
                  value={data?.subGenre}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* Track Language */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Track Language
                </Typography>
                <CustomTextField
                  value={data?.trackTitleLanguage}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              {/* Lyrics Language */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Lyrics Language
                </Typography>
                <CustomTextField
                  value={data?.lyricsLanguage}
                  disabled
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Modal>

      <Modal
        open={previewOpen}
        onClose={handlePreviewClose}
        aria-labelledby="preview-modal-title"
        aria-describedby="preview-modal-description"
      >
        <Box sx={previewModalStyle}>
          <img
            src={previewImage}
            alt="Full-size preview"
            className={classes.previewImage}
          />
        </Box>
      </Modal>
    </>
  );
};

export default MusicDetailsModal;
