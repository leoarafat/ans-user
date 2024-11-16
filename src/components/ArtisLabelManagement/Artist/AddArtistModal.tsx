import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import { useAddArtistMutation } from "@/redux/slices/ArtistAndLabel/artistLabelApi";
import toast from "react-hot-toast";
import { extractAppleId, extractSpotifyId } from "../artist.utils";

interface AddArtistModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddArtistModal: React.FC<AddArtistModalProps> = ({ open, setOpen }) => {
  const [artistName, setArtistName] = useState("");
  const [instagramId, setInstagramId] = useState("");
  const [spotifyId, setSpotifyId] = useState("");
  const [appleId, setAppleId] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");

  const [appleIdError, setAppleIdError] = useState("");
  const [spotifyIdError, setSpotifyIdError] = useState("");
  const [instagramError, setInstagramError] = useState("");
  const [facebookError, setFacebookError] = useState("");

  const [addArtist, { isLoading }] = useAddArtistMutation();

  const validateInstagramUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      const validHostnames = [
        "www.instagram.com",
        "instagram.com",
        "m.instagram.com",
      ];
      return validHostnames.includes(parsedUrl.hostname);
    } catch {
      return false;
    }
  };

  const validateFacebookUrl = (url: string): boolean => {
    try {
      const parsedUrl = new URL(url);
      const validHostnames = [
        "www.facebook.com",
        "facebook.com",
        "m.facebook.com",
      ];
      return validHostnames.includes(parsedUrl.hostname);
    } catch {
      return false;
    }
  };

  const validate = (): boolean => {
    let isValid = true;

    const appleIdPattern = /^\d{10}$/;
    if (appleId && !appleIdPattern.test(appleId)) {
      setAppleIdError("Apple ID must be exactly 10 digits.");
      isValid = false;
    } else {
      setAppleIdError("");
    }

    const spotifyIdPattern = /^[A-Za-z0-9]{22}$/;
    if (spotifyId && !spotifyIdPattern.test(spotifyId)) {
      setSpotifyIdError(
        "Spotify ID must be exactly 22 alphanumeric characters."
      );
      isValid = false;
    } else {
      setSpotifyIdError("");
    }

    if (instagramId && !validateInstagramUrl(instagramId)) {
      setInstagramError("Please enter a valid Instagram URL.");
      isValid = false;
    } else {
      setInstagramError("");
    }

    if (facebookUrl && !validateFacebookUrl(facebookUrl)) {
      setFacebookError("Please enter a valid Facebook URL.");
      isValid = false;
    } else {
      setFacebookError("");
    }

    return isValid;
  };

  const handleSave = async () => {
    if (!validate()) {
      toast.error("Please fix the errors before saving.");
      return;
    }

    try {
      const payload = {
        primaryArtistName: artistName,
        primaryArtistInstagramId: instagramId,
        primaryArtistSpotifyId: spotifyId,
        primaryArtistAppleId: appleId,
        primaryArtistFacebookId: facebookUrl,
      };
      const res = await addArtist(payload);

      if (res?.data?.success === true) {
        toast.success("Artist Added Successfully");

        setArtistName("");
        setInstagramId("");
        setSpotifyId("");
        setAppleId("");
        setFacebookUrl("");
        setAppleIdError("");
        setSpotifyIdError("");
        setInstagramError("");
        setFacebookError("");
        setOpen(false);
      } else {
        toast.error(res?.data?.message || "Failed to add artist.");
      }
    } catch (error: any) {
      toast.error(error?.message || "An unexpected error occurred.");
    }
  };

  const handleCancel = () => {
    setArtistName("");
    setInstagramId("");
    setSpotifyId("");
    setAppleId("");
    setFacebookUrl("");
    setAppleIdError("");
    setSpotifyIdError("");
    setInstagramError("");
    setFacebookError("");
    setOpen(false);
  };

  const handleAppleIdPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");
    const extractedId = extractAppleId(pastedData);
    setAppleId(extractedId);
  };

  const handleAppleIdBlur = () => {
    const processedAppleId = extractAppleId(appleId);
    setAppleId(processedAppleId);
  };

  const handleSpotifyIdPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("Text");
    const extractedId = extractSpotifyId(pastedData);
    setSpotifyId(extractedId);
  };

  const handleSpotifyIdBlur = () => {
    const processedSpotifyId = extractSpotifyId(spotifyId);
    setSpotifyId(processedSpotifyId);
  };

  const handleSpotifyIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setSpotifyId(input);

    const spotifyIdPattern = /^[A-Za-z0-9]{22}$/;
    if (input) {
      if (spotifyIdPattern.test(input)) {
        setSpotifyIdError("");
      } else {
        setSpotifyIdError(
          "Spotify ID must be exactly 22 alphanumeric characters."
        );
      }
    } else {
      setSpotifyIdError("");
    }
  };

  const handleInstagramIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInstagramId(input);

    if (input) {
      if (validateInstagramUrl(input)) {
        setInstagramError("");
      } else {
        setInstagramError("Please enter a valid Instagram URL.");
      }
    } else {
      setInstagramError("");
    }
  };

  const handleInstagramBlur = () => {
    if (instagramId) {
      if (validateInstagramUrl(instagramId)) {
        setInstagramError("");
      } else {
        setInstagramError("Please enter a valid Instagram URL.");
      }
    } else {
      setInstagramError("");
    }
  };

  const handleFacebookUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setFacebookUrl(input);

    if (input) {
      if (validateFacebookUrl(input)) {
        setFacebookError("");
      } else {
        setFacebookError("Please enter a valid Facebook URL.");
      }
    } else {
      setFacebookError("");
    }
  };

  const handleFacebookBlur = () => {
    if (facebookUrl) {
      if (validateFacebookUrl(facebookUrl)) {
        setFacebookError("");
      } else {
        setFacebookError("Please enter a valid Facebook URL.");
      }
    } else {
      setFacebookError("");
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Artist</DialogTitle>
        <DialogContent className="w-[450px]">
          <Box mb={2}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="artist-name"
              label="Name"
              type="text"
              fullWidth
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            />
          </Box>
          <Box mb={2}>
            <TextField
              margin="dense"
              id="instagram-id"
              label="Instagram URL (Optional)"
              type="url"
              placeholder="https://instagram.com/artistprofile"
              fullWidth
              value={instagramId}
              onChange={handleInstagramIdChange}
              onBlur={handleInstagramBlur}
              error={!!instagramError}
              helperText={instagramError}
            />
          </Box>
          <Box mb={2}>
            <TextField
              margin="dense"
              id="spotify-id"
              label="Spotify ID (Optional)"
              type="text"
              placeholder="1v29IzN3meA82GM9qJXpQM or https://open.spotify.com/artist/1v29IzN3meA82GM9qJXpQM"
              fullWidth
              value={spotifyId}
              onChange={handleSpotifyIdChange} // **Ensure this handler is defined**
              onPaste={handleSpotifyIdPaste}
              onBlur={handleSpotifyIdBlur}
              error={!!spotifyIdError}
              helperText={spotifyIdError}
              inputProps={{ maxLength: 22 }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              margin="dense"
              id="apple-id"
              label="Apple ID (Optional)"
              type="text"
              placeholder="1636818369 or https://music.apple.com/us/artist/akash-sarker/1636818369"
              fullWidth
              value={appleId}
              onChange={(e) => setAppleId(e.target.value)}
              onPaste={handleAppleIdPaste}
              onBlur={handleAppleIdBlur}
              error={!!appleIdError}
              helperText={appleIdError}
              inputProps={{ maxLength: 10 }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              margin="dense"
              id="facebook-url"
              label="Facebook URL (Optional)"
              type="url"
              placeholder="https://facebook.com/artistprofile"
              fullWidth
              value={facebookUrl}
              onChange={handleFacebookUrlChange} // Updated handler
              onBlur={handleFacebookBlur} // Added onBlur handler
              error={!!facebookError}
              helperText={facebookError}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary" disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddArtistModal;
