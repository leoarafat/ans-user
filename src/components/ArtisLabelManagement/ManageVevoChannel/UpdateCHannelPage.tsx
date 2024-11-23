/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Modal,
  IconButton,
  Fade,
  Backdrop,
  Alert,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  Chip,
  Snackbar,
  TextField,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import YouTubeIcon from "@mui/icons-material/YouTube"; // Import YouTube Icon
import { predefinedKeywords } from "./Keywords";
import {
  useEditRequestMutation,
  useSingleChannelQuery,
} from "@/redux/slices/ArtistAndLabel/artistLabelApi";
import { useParams } from "react-router-dom";

const ChannelPage = () => {
  const { id } = useParams();

  // Fetch channel data
  const {
    data: channelData,
    isLoading: isChannelLoading,
    error: channelError,
  } = useSingleChannelQuery(id);

  // State variables
  const [avatar, setAvatar] = useState<string | null>(null);
  const [banner, setBanner] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [isForKids, setIsForKids] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState<string>(""); // New state for YouTube link
  const [errorMessage, setErrorMessage] = useState("");
  const [activeModal, setActiveModal] = useState<"avatar" | "banner" | null>(
    null
  );

  // State for Snackbar alerts
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
  }>({ open: false, message: "", severity: "success" });

  // Redux mutation
  const [editRequest, { isLoading }] = useEditRequestMutation();

  // Effect to initialize state based on channelData
  useEffect(() => {
    if (channelData?.success && channelData.data) {
      const {
        isEditApproved,
        avatar,
        banner,
        keywords,
        description,
        isKids,
        youtubeLink, // Destructure youtubeLink from data
      } = channelData.data;

      if (isEditApproved === "approved") {
        // Set state with fetched data
        setAvatar(avatar);
        setBanner(banner);
        setKeywords(keywords);
        setDescription(description);
        setIsForKids(isKids);
        setYoutubeLink(youtubeLink || ""); // Initialize youtubeLink
      }
      // If pending or rejected, retain initial empty states for editing
    }
  }, [channelData]);

  // Handlers
  const handleModalClose = () => {
    setActiveModal(null);
    setErrorMessage("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > 6 * 1024 * 1024) {
      setErrorMessage("File size must be less than 6MB.");
    } else {
      setErrorMessage("");

      const previewUrl = URL.createObjectURL(file);
      if (activeModal === "avatar") {
        setAvatar(previewUrl);
        setAvatarFile(file);
      }
      if (activeModal === "banner") {
        setBanner(previewUrl);
        setBannerFile(file);
      }

      // Show success snackbar
      setSnackbar({
        open: true,
        message: "Image uploaded successfully!",
        severity: "success",
      });

      // Close the modal automatically
      setActiveModal(null);
    }
  };

  const handleRemove = (type: "avatar" | "banner") => {
    if (type === "avatar") {
      setAvatar(null);
      setAvatarFile(null);
    }
    if (type === "banner") {
      setBanner(null);
      setBannerFile(null);
    }
    setSnackbar({
      open: true,
      message: `${type.charAt(0).toUpperCase() + type.slice(1)} removed.`,
      severity: "info",
    });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }
      if (bannerFile) {
        formData.append("banner", bannerFile);
      }
      if (keywords.length > 0) {
        formData.append("keywords", JSON.stringify(keywords));
      }
      if (description.trim() !== "") {
        formData.append("description", description);
      }
      // Convert isForKids to boolean explicitly
      formData.append("isForKids", String(isForKids));
      formData.append("youtubeLink", youtubeLink); // Append youtubeLink
      if (id) {
        formData.append("id", id);
      }

      const res = await editRequest(formData).unwrap();

      if (res?.success === true) {
        setSnackbar({
          open: true,
          message: "Data saved successfully!",
          severity: "success",
        });
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to save data. Please try again.",
        severity: "error",
      });
      console.error("Error:", error);
    }
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Determine if the current channel is approved
  const isApproved = channelData?.data?.isEditApproved === "approved";
  const isPending = channelData?.data?.isEditApproved === "pending";
  const isRejected = channelData?.data?.isEditApproved === "rejected";

  // Loading or error state
  if (isChannelLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (channelError || !channelData?.success) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h6" color="error">
          Failed to load channel data.
        </Typography>
      </Box>
    );
  }

  // Function to get color based on status
  const getStatusColor = () => {
    switch (channelData.data.isEditApproved) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "900px",
        margin: "auto",
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        borderRadius: "16px",
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      }}
    >
      {/* Approve Status Display */}
      <Box display="flex" justifyContent="flex-end">
        <Chip
          label={channelData?.data?.isEditApproved?.toUpperCase()}
          color={getStatusColor()}
          variant="outlined"
        />
      </Box>

      {/* Banner Section */}
      <Box
        sx={{
          position: "relative",
          height: "250px",
          width: "100%",
          backgroundColor: banner ? "transparent" : "#E0E0E0",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: isApproved ? "default" : "pointer",
          overflow: "hidden",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          "&:hover": isApproved ? {} : { transform: "scale(1.02)" },
          transition: "transform 0.3s",
        }}
        onClick={() => {
          if (!isApproved) setActiveModal("banner");
        }}
      >
        {banner ? (
          <>
            <img
              src={banner}
              alt="Banner Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            {!isApproved && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove("banner");
                }}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            )}
          </>
        ) : (
          !isApproved && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#757575",
              }}
            >
              <UploadIcon fontSize="large" />
              <Typography variant="h6">Click to upload banner</Typography>
            </Box>
          )
        )}
      </Box>

      {/* Avatar Section */}
      <Box display="flex" justifyContent="center" position="relative">
        {isApproved ? (
          <Avatar
            sx={{
              width: "140px",
              height: "140px",
              border: "4px solid #3f51b5",
            }}
            src={avatar || undefined}
          >
            {!avatar && "A"}
          </Avatar>
        ) : (
          <>
            <Avatar
              sx={{
                width: "140px",
                height: "140px",
                border: "4px solid #3f51b5",
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
              src={avatar || undefined}
              onClick={() => setActiveModal("avatar")}
            >
              {!avatar && "A"}
            </Avatar>
            {avatar && (
              <IconButton
                onClick={() => handleRemove("avatar")}
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: "calc(50% - 70px)",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 1)" },
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            )}
          </>
        )}
      </Box>

      {/* About Section */}
      <Box>
        <Typography variant="h5" gutterBottom color="#3f51b5">
          About Your Channel
        </Typography>

        {/* YouTube Link Button */}
        {youtubeLink && (
          <Box mb={2}>
            <Button
              variant="contained"
              color="error"
              startIcon={<YouTubeIcon />}
              onClick={() => window.open(youtubeLink, "_blank")}
              sx={{
                textTransform: "none",
                fontSize: "16px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                "&:hover": { backgroundColor: "#c4302b" },
              }}
            >
              Visit YouTube Channel
            </Button>
          </Box>
        )}

        {/* Keywords Section with Autocomplete */}
        {isApproved ? (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Keywords:
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {keywords.map((keyword, index) => (
                <Chip key={index} label={keyword} variant="outlined" />
              ))}
            </Box>
          </Box>
        ) : (
          <Autocomplete
            multiple
            freeSolo
            options={predefinedKeywords}
            value={keywords}
            onChange={(event, newValue) => {
              setKeywords(newValue);
            }}
            renderTags={(value: string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                  key={option + index}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Keywords (Press Enter for comma-separated)"
                placeholder="Add keyword"
                margin="normal"
                sx={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
              />
            )}
          />
        )}

        {/* Description Label */}
        {isApproved ? (
          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              Description:
            </Typography>
            <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
              {description}
            </Typography>
          </Box>
        ) : (
          <>
            <Typography variant="body1" gutterBottom>
              Description
            </Typography>

            {/* Resizable Description Textarea */}
            <Box
              component="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter your channel description here..."
              aria-label="Channel Description"
              sx={{
                width: "100%",
                minHeight: "100px",
                maxHeight: "500px",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid #ced4da",
                backgroundColor: "#ffffff",
                resize: "vertical",
                fontFamily: "Roboto, sans-serif",
                fontSize: "1rem",
                "&:focus": {
                  outline: "none",
                  borderColor: "#3f51b5",
                  boxShadow: "0 0 0 3px rgba(63, 81, 181, 0.2)",
                },
              }}
            />
          </>
        )}

        {/* Made for Kids Checkbox */}
        {isApproved ? (
          <Box mt={2}>
            <Typography variant="subtitle1">Made for kids:</Typography>
            <Typography variant="body1">{isForKids ? "Yes" : "No"}</Typography>
          </Box>
        ) : (
          <FormControlLabel
            control={
              <Checkbox
                checked={isForKids}
                onChange={(e) => setIsForKids(e.target.checked)}
                color="primary"
              />
            }
            label="Made for kids"
          />
        )}

        {/* YouTube Link Input Field for Editing */}
        {!isApproved && (
          <Box mt={3}>
            <TextField
              label="YouTube Link"
              variant="outlined"
              fullWidth
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="https://www.youtube.com/channel/yourchannel"
              sx={{ backgroundColor: "#ffffff", borderRadius: "8px" }}
            />
          </Box>
        )}
      </Box>

      {/* Save Button */}
      {!isApproved && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={isLoading}
            sx={{
              padding: "12px 48px",
              borderRadius: "8px",
              fontSize: "16px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              "&:hover": { backgroundColor: "#303f9f" },
            }}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </Box>
      )}

      {/* File Upload Modal */}
      {!isApproved && (
        <Modal
          open={!!activeModal}
          onClose={handleModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={!!activeModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "#ffffff",
                padding: "32px",
                borderRadius: "12px",
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
                border: "1px solid #ccc",
                width: 500,
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  color: "#666",
                }}
                onClick={handleModalClose}
              >
                <CloseIcon />
              </IconButton>

              <Typography variant="h6" fontWeight="bold" marginBottom="24px">
                Upload Image
              </Typography>

              <Box
                sx={{
                  border: "2px dashed #cccccc",
                  borderRadius: "8px",
                  padding: "40px",
                  background: "#f9f9f9",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
                onClick={() =>
                  document
                    .querySelector<HTMLInputElement>("#file-upload-input")
                    ?.click()
                }
              >
                <UploadIcon sx={{ fontSize: 50, color: "#666" }} />
                <Typography variant="body1" color="textSecondary">
                  Drag file here
                </Typography>
                <Typography variant="body2" color="textSecondary" mt={1}>
                  Or{" "}
                  <span
                    style={{
                      color: "#1976d2",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    select file
                  </span>
                </Typography>
              </Box>

              <input
                id="file-upload-input"
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />

              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginTop: "16px" }}
              >
                Recommended size:{" "}
                {activeModal === "avatar" ? "800x800px" : "2048x1152px"}
              </Typography>
              <Typography variant="caption" color="textSecondary" mt={1}>
                Max file size: 6MB
              </Typography>

              {/* Display error message if any */}
              {errorMessage && (
                <Alert
                  severity="error"
                  sx={{ marginTop: "16px" }}
                  variant="filled"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setErrorMessage("")}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {errorMessage}
                </Alert>
              )}
            </Box>
          </Fade>
        </Modal>
      )}

      {/* Snackbar for global alerts */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChannelPage;
