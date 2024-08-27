import { imageURL } from "@/redux/api/baseApi";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardMedia,
  IconButton,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { DownloadIcon } from "lucide-react";
import { useState } from "react";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 1000,
  maxHeight: "90%",
  overflowY: "auto",
  bgcolor: "#f9f9f9",
  color: "#333",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
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

const sectionTitleStyle = {
  color: "#007acc",
  fontSize: "1.2rem",
  fontWeight: 600,
  marginBottom: "10px",
  textTransform: "uppercase",
};

const contentTextStyle = {
  color: "#555",
  fontSize: "1rem",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
};

const imageCardStyle = {
  height: 250,
  backgroundSize: "cover",
  backgroundPosition: "center",
  cursor: "pointer",
};

const MusicDetailsModal = ({ open, handleClose, data }: any) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handleDownload = async (image: any) => {
    const response = await fetch(`${image}`);
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
    setPreviewImage(`${image}`);
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
          <Typography
            variant="h4"
            component="h2"
            mb={3}
            sx={{ color: "#333", fontWeight: 700 }}
          >
            Music Details
          </Typography>

          <Card sx={cardStyle}>
            <CardMedia
              sx={{
                ...imageCardStyle,
                backgroundImage: `url(${data?.image})`,
              }}
              title="Track Image"
              onClick={() => handleImageClick(data?.image)}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                }}
                onClick={() => handleDownload(data?.image)}
              >
                <DownloadIcon />
              </IconButton>
            </CardMedia>
            <CardContent>
              <audio style={{ width: "100%" }} controls>
                <source src={`${data?.audio}`} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </CardContent>
          </Card>

          <Divider sx={{ my: 3, backgroundColor: "#ddd" }} />

          <Grid container spacing={4}>
            {[
              {
                title: "Primary Artist",
                content: data?.primaryArtist
                  ?.map((artist: any) => artist.primaryArtistName)
                  .join(", "),
              },
              { title: "Writer", content: data?.writer?.join(", ") },
              { title: "Composer", content: data?.composer },
              {
                title: "Music Director",
                content: data?.musicDirector?.join(", "),
              },
              { title: "Producer", content: data?.producer },
              { title: "Label", content: data?.label?.labelName },
              { title: "Subtitle", content: data?.subtitle },
              { title: "P Line", content: data?.pLine },
              { title: "C Line", content: data?.cLine },
              { title: "Primary Track Type", content: data?.primaryTrackType },
              { title: "Is Release", content: data?.isRelease ? "Yes" : "No" },
              {
                title: "Instrumental",
                content: data?.instrumental ? "Yes" : "No",
              },
              {
                title: "Secondary Track Type",
                content: data?.secondaryTrackType,
              },
              { title: "Parental Advisory", content: data?.parentalAdvisory },
              { title: "UPC EAN", content: data?.upc },
              {
                title: "Producer Catalog Number",
                content: data?.catalogNumber,
              },
              { title: "Production Year", content: data?.productionYear },
              { title: "Catalog Number", content: data?.catalogNumber },
              { title: "Genre", content: data?.genre },
              { title: "Sub Genre", content: data?.subGenre },
              { title: "Track Language", content: data?.trackLanguage },
              { title: "Lyrics Language", content: data?.lyricsLanguage },
              { title: "Release Date", content: data?.releaseDate },
              {
                title: "Advance Purchase Date",
                content: data?.advancePurchaseDate,
              },
              { title: "Lyrics", content: data?.lyrics },
            ].map(({ title, content }, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Typography sx={sectionTitleStyle}>{title}</Typography>
                <Typography sx={contentTextStyle}>
                  {content || "N/A"}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#007acc",
                "&:hover": { backgroundColor: "#005fa3" },
              }}
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Preview Image Modal */}
      <Modal
        open={previewOpen}
        onClose={handlePreviewClose}
        aria-labelledby="preview-modal-title"
        aria-describedby="preview-modal-description"
      >
        <Box sx={previewModalStyle}>
          <img
            src={previewImage}
            alt="Preview"
            style={{ maxWidth: "100%", borderRadius: "8px" }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default MusicDetailsModal;
