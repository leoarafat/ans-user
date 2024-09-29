/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Card,
  CardContent,
  Box,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";

import toast from "react-hot-toast";
import { useUpdateVideoMutation } from "@/redux/slices/myUploads/myUploadsApi";

// Styling for preview image
const PreviewImage = styled("img")({
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "8px",
  border: "2px solid #ccc",
});

// Styling for video preview
const PreviewVideo = styled("video")({
  width: "100%",
  height: "220px",
  objectFit: "cover",
  borderRadius: "8px",
  border: "2px solid #ccc",
});

// Custom styled Card for upload
const StyledCard = styled(Card)(({ theme }) => ({
  border: "1px solid #ddd",
  borderRadius: "8px",
  position: "relative",
  boxShadow: theme.shadows[2],
}));

// Custom Button for Delete
const StyledDeleteButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: 8,
  right: 8,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
}));

// Component to handle file upload
const MediaUploader = ({
  label,
  media,
  onDrop,
  onRemove,
  accept,
  mediaType, // Indicates whether it's "image" or "video"
}: {
  label: string;
  media: string | null;
  onDrop: (acceptedFiles: File[]) => void;
  onRemove: () => void;
  accept: string;
  mediaType: "image" | "video";
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    //@ts-ignore
    accept,
    maxFiles: 1,
  });

  return (
    <Grid item xs={12} sm={6}>
      <StyledCard>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>
            {label}
          </Typography>
          {media ? (
            <Box position="relative">
              {mediaType === "image" ? (
                <PreviewImage src={media} alt={label} />
              ) : (
                <PreviewVideo controls src={media} />
              )}
              <StyledDeleteButton onClick={onRemove}>
                <DeleteIcon />
              </StyledDeleteButton>
            </Box>
          ) : (
            <div
              {...getRootProps()}
              style={{
                height: "220px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed #ccc",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <input {...getInputProps()} />
              <Typography variant="body2" color="textSecondary">
                Drag 'n' drop or click to upload
              </Typography>
            </div>
          )}
        </CardContent>
      </StyledCard>
    </Grid>
  );
};

// Main component for modal
const VideoUpdateModal = ({ open, handleClose, id }: any) => {
  const [formData, setFormData] = useState({
    video: null,
    image: null,
  });

  const [mediaFiles, setMediaFiles] = useState({
    video: null,
    image: null,
  });

  const [editVideo, { isLoading }] = useUpdateVideoMutation();

  const handleMediaUpload = (key: string) => (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const previewUrl = URL.createObjectURL(file);
    setFormData((prevData) => ({
      ...prevData,
      [key]: previewUrl,
    }));
    setMediaFiles((prevFiles) => ({
      ...prevFiles,
      [key]: file,
    }));
  };

  const handleRemoveMedia = (key: string) => () => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: null,
    }));
    setMediaFiles((prevFiles) => ({
      ...prevFiles,
      [key]: null,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("id", id);

      if (mediaFiles.video) formDataToSend.append("video", mediaFiles.video);
      if (mediaFiles.image) formDataToSend.append("image", mediaFiles.image);

      const res = await editVideo(formDataToSend).unwrap();

      if (res?.success) {
        toast.success("Update Successful");
        handleClose();
      } else {
        toast.error("Edit Failed");
        handleClose();
      }
    } catch (error) {
      console.error("Error updating video:", error);
      toast.error("An error occurred during upload");
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Upload Video & Cover</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <MediaUploader
            label="Video"
            media={formData.video}
            onDrop={handleMediaUpload("video")}
            onRemove={handleRemoveMedia("video")}
            accept="video/*" // Only accept video files
            mediaType="video" // Preview as video
          />
          <MediaUploader
            label="Cover Image"
            media={formData.image}
            onDrop={handleMediaUpload("image")}
            onRemove={handleRemoveMedia("image")}
            accept="image/*" // Only accept image files
            mediaType="image" // Preview as image
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VideoUpdateModal;
