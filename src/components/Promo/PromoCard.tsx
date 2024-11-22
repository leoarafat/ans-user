/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useRef } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { Download as DownloadIcon } from "@mui/icons-material";
import { toPng } from "html-to-image";
import ColorPicker from "./ColorPicker";
import ShareButton from "./ShareButton";

const PromoCard = ({ banner, title, template }: any) => {
  const [open, setOpen] = useState(false);
  const [design, setDesign] = useState({
    backgroundColor: template.styles.backgroundColor,
    textColor: template.styles.textColor,
    borderRadius: template.styles.borderRadius,
    boxShadow: template.styles.boxShadow,
    imageHeight: "140px",
    imageWidth: template.structure === "image-left" ? "100px" : undefined,
  });
  const cardRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownload = () => {
    if (cardRef.current === null) {
      return;
    }

    toPng(cardRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${title}-${template.structure}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("Failed to download image", err);
      });
  };

  const updateDesign = (property: any, value: any) => {
    setDesign((prev) => ({ ...prev, [property]: value }));
  };

  const renderLayout = () => {
    switch (template.structure) {
      case "classic-top":
        return (
          <>
            <CardMedia
              component="img"
              image={banner}
              alt={title}
              sx={{
                height: design.imageHeight,
                borderTopLeftRadius: design.borderRadius,
                borderTopRightRadius: design.borderRadius,
                objectFit: "cover",
              }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Exclusive offers available now! Grab them before they're gone.
              </Typography>
            </CardContent>
          </>
        );

      default:
        return (
          <>
            <CardMedia
              component="img"
              image={banner}
              alt={title}
              sx={{
                height: design.imageHeight,
                borderRadius: design.borderRadius,
                objectFit: "cover",
              }}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Don't miss our exclusive deals!
              </Typography>
            </CardContent>
          </>
        );
    }
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor: design.backgroundColor,
          color: design.textColor,
          borderRadius: design.borderRadius,
          boxShadow: design.boxShadow,
          transition: "transform 0.2s",
          "&:hover": { transform: "scale(1.02)" },
        }}
      >
        <CardActionArea onClick={handleClickOpen}>
          {renderLayout()}
        </CardActionArea>
      </Card>

      {/* Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {/* Preview of the Card */}
          <Box
            ref={cardRef}
            sx={{
              backgroundColor: design.backgroundColor,
              color: design.textColor,
              borderRadius: design.borderRadius,
              boxShadow: design.boxShadow,
              padding: 2,
              marginBottom: 4,
            }}
          >
            {renderLayout()}
          </Box>

          {/* Customization Options */}
          <Typography variant="h6" gutterBottom>
            Customize Design
          </Typography>
          <ColorPicker
            label="Background Color"
            color={design.backgroundColor}
            onChange={(color: any) => updateDesign("backgroundColor", color)}
          />
          <ColorPicker
            label="Text Color"
            color={design.textColor}
            onChange={(color: any) => updateDesign("textColor", color)}
          />
          <Box sx={{ marginTop: 2 }}>
            <Typography gutterBottom>Image Height (px):</Typography>
            <input
              type="range"
              min="100"
              max="300"
              value={parseInt(design.imageHeight) || 140}
              onChange={(e) =>
                updateDesign("imageHeight", `${e.target.value}px`)
              }
              style={{ width: "100%" }}
            />
            <Typography variant="caption">
              {design.imageHeight || "140px"}
            </Typography>
          </Box>
          {template.structure === "image-left" && (
            <Box sx={{ marginTop: 2 }}>
              <Typography gutterBottom>Image Width (px):</Typography>
              <input
                type="range"
                min="100"
                max="200"
                value={
                  //@ts-ignore
                  parseInt(design.imageWidth) || 100
                }
                onChange={(e) =>
                  updateDesign("imageWidth", `${e.target.value}px`)
                }
                style={{ width: "100%" }}
              />
              <Typography variant="caption">
                {design.imageWidth || "100px"}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDownload}
            startIcon={<DownloadIcon />}
            variant="contained"
            color="primary"
          >
            Download
          </Button>
          <ShareButton url={window.location.href} title={title} />
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PromoCard;
