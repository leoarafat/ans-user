import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAddChannelMutation } from "@/redux/slices/ArtistAndLabel/artistLabelApi";
import toast from "react-hot-toast";
import { extractAppleId, extractSpotifyId } from "../artist.utils";

interface AddVevoChannelModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddVevoChannelModal: React.FC<AddVevoChannelModalProps> = ({
  open,
  setOpen,
}) => {
  const [artistName, setArtistName] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [spotifyId, setSpotifyId] = useState("");
  const [appleId, setAppleId] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");

  const [appleIdError, setAppleIdError] = useState("");
  const [spotifyIdError, setSpotifyIdError] = useState("");

  const [addArtist, { isLoading }] = useAddChannelMutation();

  const validateAppleId = (id: string): boolean => {
    const pattern = /^\d{10}$/;
    if (pattern.test(id)) {
      return true;
    }
    try {
      const parsedUrl = new URL(id);
      const validHostnames = ["music.apple.com"];
      return validHostnames.includes(parsedUrl.hostname);
    } catch {
      return false;
    }
  };

  const validateSpotifyId = (id: string): boolean => {
    const pattern = /^[A-Za-z0-9]{22}$/;
    return pattern.test(id);
  };

  // Handler for Artist Name Change
  const handleArtistNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const sanitizedInput = input.replace(/\s+/g, "");
    setArtistName(sanitizedInput);
  };

  // Handler for Spotify ID Change
  const handleSpotifyIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSpotifyId(input);

    // Instant validation
    if (input && !validateSpotifyId(input)) {
      setSpotifyIdError(
        "Spotify ID must be exactly 22 alphanumeric characters."
      );
    } else {
      setSpotifyIdError("");
    }
  };

  // Handler for Spotify ID Paste
  const handleSpotifyIdPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");
    const extractedId = extractSpotifyId(pastedData);
    setSpotifyId(extractedId);

    // Validate the extracted ID
    if (extractedId && !validateSpotifyId(extractedId)) {
      setSpotifyIdError(
        "Spotify ID must be exactly 22 alphanumeric characters."
      );
    } else {
      setSpotifyIdError("");
    }
  };

  // Handler for Spotify ID Blur
  const handleSpotifyIdBlur = () => {
    const processedSpotifyId = extractSpotifyId(spotifyId);
    setSpotifyId(processedSpotifyId);

    // Validate the processed ID
    if (processedSpotifyId && !validateSpotifyId(processedSpotifyId)) {
      setSpotifyIdError(
        "Spotify ID must be exactly 22 alphanumeric characters."
      );
    } else {
      setSpotifyIdError("");
    }
  };

  // Handler for Apple ID Change
  const handleAppleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setAppleId(input);

    // Instant validation
    if (input && !validateAppleId(input)) {
      setAppleIdError(
        "Apple ID must be exactly 10 digits or a valid Apple Music URL."
      );
    } else {
      setAppleIdError("");
    }
  };

  // Handler for Apple ID Paste
  const handleAppleIdPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");
    const extractedId = extractAppleId(pastedData);
    setAppleId(extractedId);

    // Validate the extracted ID
    if (extractedId && !validateAppleId(extractedId)) {
      setAppleIdError(
        "Apple ID must be exactly 10 digits or a valid Apple Music URL."
      );
    } else {
      setAppleIdError("");
    }
  };

  // Handler for Apple ID Blur
  const handleAppleIdBlur = () => {
    const processedAppleId = extractAppleId(appleId);
    setAppleId(processedAppleId);

    // Validate the processed ID
    if (processedAppleId && !validateAppleId(processedAppleId)) {
      setAppleIdError(
        "Apple ID must be exactly 10 digits or a valid Apple Music URL."
      );
    } else {
      setAppleIdError("");
    }
  };

  // Handler for Saving the Form
  const handleSave = async () => {
    // Final validation before saving
    const isValid =
      !appleIdError &&
      !spotifyIdError &&
      appleId.trim() !== "" &&
      spotifyId.trim() !== "";

    if (!isValid) {
      toast.error("Please fix the errors before saving.");
      return;
    }

    try {
      const channelName = artistName + "VEVO";
      const payload = {
        channelName,
        channelInstagramId: instagramId,
        channelSpotifyId: spotifyId,
        channelAppleId: appleId,
        channelFacebookId: facebookUrl,
      };
      const res = await addArtist(payload);

      if (res?.data?.success === true) {
        toast.success("Channel Added Successfully");
        // Reset all fields and errors
        setArtistName("");
        setInstagramId("");
        setSpotifyId("");
        setAppleId("");
        setFacebookUrl("");
        setAppleIdError("");
        setSpotifyIdError("");
        setOpen(false);
      } else {
        toast.error(res?.data?.message || "Failed to add channel.");
      }
    } catch (error: any) {
      toast.error(error?.message || "An unexpected error occurred.");
    }
  };

  // Handler for Canceling the Form
  const handleCancel = () => {
    // Reset all fields and errors
    setArtistName("");
    setInstagramId("");
    setSpotifyId("");
    setAppleId("");
    setFacebookUrl("");
    setAppleIdError("");
    setSpotifyIdError("");
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Channel</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="channel-name"
            label="Channel Name"
            type="text"
            fullWidth
            value={artistName}
            onChange={handleArtistNameChange}
            helperText="Channel name should not contain spaces."
          />
          <span>
            {artistName}
            {artistName && "VEVO"}
          </span>
          <TextField
            margin="dense"
            id="instagram-id"
            label="Instagram ID"
            type="text"
            fullWidth
            value={instagramId}
            onChange={(e) => setInstagramId(e.target.value)}
          />
          <TextField
            margin="dense"
            id="spotify-id"
            label="Spotify ID"
            type="text"
            fullWidth
            value={spotifyId}
            onChange={handleSpotifyIdChange} // Updated handler
            onPaste={handleSpotifyIdPaste} // Added onPaste handler
            onBlur={handleSpotifyIdBlur} // Added onBlur handler
            error={!!spotifyIdError}
            helperText={
              spotifyIdError || "Enter a valid 22-character Spotify ID."
            }
            inputProps={{ maxLength: 22 }}
          />
          <TextField
            margin="dense"
            id="apple-id"
            label="Apple ID"
            type="text"
            fullWidth
            value={appleId}
            onChange={handleAppleIdChange} // Updated handler
            onPaste={handleAppleIdPaste} // Added onPaste handler
            onBlur={handleAppleIdBlur} // Added onBlur handler
            error={!!appleIdError}
            helperText={
              appleIdError || "Enter a valid 10-digit Apple ID or URL."
            }
            inputProps={{ maxLength: 100 }} // Adjust maxLength as needed
          />
          <TextField
            margin="dense"
            id="facebook-url"
            label="Facebook URL"
            type="text"
            fullWidth
            value={facebookUrl}
            onChange={(e) => setFacebookUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" disabled={isLoading}>
            {isLoading ? "Saving.." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddVevoChannelModal;
