import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { styled } from "@mui/system";

import toast from "react-hot-toast";
import { useEditBannerAudioMutation } from "@/redux/slices/uploadVideoAudio/uploadVideoAudioApi";

const ModalBox = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#FFF",
  color: "#333",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
});

const PreviewContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "150px",
  marginBottom: "10px",
  backgroundColor: "#F7F7F7",
  borderRadius: "8px",
  position: "relative",
  border: "1px dashed #ccc",
});

const PreviewImage = styled("img")({
  maxHeight: "100%",
  maxWidth: "100%",
  objectFit: "contain",
  borderRadius: "8px",
});

const PreviewAudio = styled("audio")({
  width: "100%",
  borderRadius: "4px",
});

const FileInput = styled("input")({
  display: "none",
});

const UploadModal = ({ open, onClose, id }: any) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [updateBanner, { isLoading }] = useEditBannerAudioMutation();
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      setImageFile(file);
    } else if (file.type.startsWith("audio/")) {
      setAudioFile(file);
    }
  };

  const removeFile = (fileType: "image" | "audio") => {
    if (fileType === "image") setImageFile(null);
    if (fileType === "audio") setAudioFile(null);
  };

  const handleUpdate = async () => {
    const formData = new FormData();

    try {
      if (imageFile) {
        formData.append("image", imageFile);
      }
      if (audioFile) {
        formData.append("audio", audioFile);
      }

      const res = await updateBanner({ id, data: formData }).unwrap();

      if (res?.success === true) {
        toast.success("Update Successful");
        window.location.reload();
        onClose();
      }
    } catch (error) {
      console.error("Error updating banner:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" gutterBottom>
            Upload Files
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Grid container spacing={2}>
          {/* Image Upload Section */}
          <Grid item xs={12}>
            <Paper elevation={0} style={{ padding: "10px" }}>
              <PreviewContainer>
                {imageFile ? (
                  <>
                    <PreviewImage
                      src={URL.createObjectURL(imageFile)}
                      alt="Preview"
                    />
                    <IconButton
                      onClick={() => removeFile("image")}
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        color: "#FFF",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      }}
                      size="small"
                    >
                      <CloseIcon />
                    </IconButton>
                  </>
                ) : (
                  <label htmlFor="image-upload">
                    <UploadFileIcon
                      style={{
                        color: "#666",
                        fontSize: "50px",
                        cursor: "pointer",
                      }}
                    />
                    <FileInput
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                    />
                    <Typography
                      variant="body2"
                      style={{ color: "#666", cursor: "pointer" }}
                    >
                      Upload Image
                    </Typography>
                  </label>
                )}
              </PreviewContainer>
            </Paper>
          </Grid>

          {/* Audio Upload Section */}
          <Grid item xs={12}>
            <Paper elevation={0} style={{ padding: "10px" }}>
              <PreviewContainer>
                {audioFile ? (
                  <>
                    <PreviewAudio
                      controls
                      src={URL.createObjectURL(audioFile)}
                    />
                    <IconButton
                      onClick={() => removeFile("audio")}
                      style={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        color: "#FFF",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                      }}
                      size="small"
                    >
                      <CloseIcon />
                    </IconButton>
                  </>
                ) : (
                  <label htmlFor="audio-upload">
                    <UploadFileIcon
                      style={{
                        color: "#666",
                        fontSize: "50px",
                        cursor: "pointer",
                      }}
                    />
                    <FileInput
                      id="audio-upload"
                      type="file"
                      accept="audio/*"
                      onChange={handleFileUpload}
                      style={{ cursor: "pointer" }}
                    />
                    <Typography
                      variant="body2"
                      style={{ color: "#666", cursor: "pointer" }}
                    >
                      Upload Audio
                    </Typography>
                  </label>
                )}
              </PreviewContainer>
            </Paper>
          </Grid>
        </Grid>
        <Box mt={2} textAlign="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            fullWidth
            style={{ borderRadius: "8px" }}
          >
            {isLoading ? "Uploading.." : "Update"}
          </Button>
        </Box>
      </ModalBox>
    </Modal>
  );
};

export default UploadModal;
