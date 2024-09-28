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
  const [addArtist, { isLoading }] = useAddChannelMutation();
  const handleArtistNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;

    const sanitizedInput = input.replace(/\s+/g, "");
    setArtistName(sanitizedInput);
  };
  const handleSave = async () => {
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
        toast.success("Channel Add Successful");
        setOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleCancel = () => {
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
            onChange={(e) => setSpotifyId(e.target.value)}
          />
          <TextField
            margin="dense"
            id="apple-id"
            label="Apple ID"
            type="text"
            fullWidth
            value={appleId}
            onChange={(e) => setAppleId(e.target.value)}
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
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {isLoading ? "Saving.." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddVevoChannelModal;
