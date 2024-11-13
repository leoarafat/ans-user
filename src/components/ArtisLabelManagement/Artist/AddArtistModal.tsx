// import React, { useState } from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
// } from "@mui/material";
// import { useAddArtistMutation } from "@/redux/slices/ArtistAndLabel/artistLabelApi";
// import toast from "react-hot-toast";

// interface AddArtistModalProps {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const AddArtistModal: React.FC<AddArtistModalProps> = ({ open, setOpen }) => {
//   const [artistName, setArtistName] = useState("");
//   const [instagramId, setInstagramId] = useState("");
//   const [spotifyId, setSpotifyId] = useState("");
//   const [appleId, setAppleId] = useState("");
//   const [facebookUrl, setFacebookUrl] = useState("");
//   const [addArtist, { isLoading }] = useAddArtistMutation();

//   const handleSave = async () => {
//     try {
//       const payload = {
//         primaryArtistName: artistName,
//         primaryArtistInstagramId: instagramId,
//         primaryArtistSpotifyId: spotifyId,
//         primaryArtistAppleId: appleId,
//         primaryArtistFacebookId: facebookUrl,
//       };
//       const res = await addArtist(payload);

//       if (res?.data?.success === true) {
//         toast.success("Artist Add Successful");
//         setOpen(false);
//       }
//     } catch (error: any) {
//       toast.error(error?.message);
//     }
//   };

//   const handleCancel = () => {
//     setOpen(false);
//   };

//   return (
//     <div>
//       <Dialog
//         open={open}
//         onClose={handleCancel}
//         aria-labelledby="form-dialog-title"
//       >
//         <DialogTitle id="form-dialog-title">Add Artist</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             required
//             margin="dense"
//             id="artist-name"
//             label="Name"
//             type="text"
//             fullWidth
//             value={artistName}
//             onChange={(e) => setArtistName(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             id="instagram-id"
//             label="Instagram ID(Optional)"
//             type="url"
//             placeholder="https://instagram.com/artistprofile"
//             fullWidth
//             value={instagramId}
//             onChange={(e) => setInstagramId(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             id="spotify-id"
//             label="Spotify ID(Optional)"
//             type="url"
//             placeholder="1v29IzN3meA82GM9qJXpQM"
//             fullWidth
//             value={spotifyId}
//             onChange={(e) => setSpotifyId(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             id="apple-id"
//             label="Apple ID(Optional)"
//             type="url"
//             placeholder="1636818369"
//             fullWidth
//             value={appleId}
//             onChange={(e) => setAppleId(e.target.value)}
//           />
//           <TextField
//             margin="dense"
//             id="facebook-url"
//             label="Facebook URL(Optional)"
//             type="url"
//             placeholder="https://facebook.com/artistprofile"
//             fullWidth
//             value={facebookUrl}
//             onChange={(e) => setFacebookUrl(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCancel} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSave} color="primary" disabled={isLoading}>
//             {isLoading ? "Saving.." : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default AddArtistModal;
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useAddArtistMutation } from "@/redux/slices/ArtistAndLabel/artistLabelApi";
import toast from "react-hot-toast";

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
  const [addArtist, { isLoading }] = useAddArtistMutation();

  // Error state variables
  const [appleIdError, setAppleIdError] = useState("");
  const [spotifyIdError, setSpotifyIdError] = useState("");

  const validate = (): boolean => {
    let isValid = true;

    // Validate Apple ID: exactly 10 digits
    const appleIdPattern = /^\d{10}$/;
    if (appleId && !appleIdPattern.test(appleId)) {
      setAppleIdError("Apple ID must be exactly 10 digits.");
      isValid = false;
    } else {
      setAppleIdError("");
    }

    // Validate Spotify ID: exactly 22 characters
    const spotifyIdPattern = /^.{22}$/;
    if (spotifyId && !spotifyIdPattern.test(spotifyId)) {
      setSpotifyIdError("Spotify ID must be exactly 22 characters.");
      isValid = false;
    } else {
      setSpotifyIdError("");
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
        // Reset form fields
        setArtistName("");
        setInstagramId("");
        setSpotifyId("");
        setAppleId("");
        setFacebookUrl("");
        setOpen(false);
      } else {
        // Handle API errors
        toast.error(res?.data?.message || "Failed to add artist.");
      }
    } catch (error: any) {
      toast.error(error?.message || "An unexpected error occurred.");
    }
  };

  const handleCancel = () => {
    // Optionally reset form and errors on cancel
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
        <DialogTitle id="form-dialog-title">Add Artist</DialogTitle>
        <DialogContent>
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
          <TextField
            margin="dense"
            id="instagram-id"
            label="Instagram ID (Optional)"
            type="url"
            placeholder="https://instagram.com/artistprofile"
            fullWidth
            value={instagramId}
            onChange={(e) => setInstagramId(e.target.value)}
          />
          <TextField
            margin="dense"
            id="spotify-id"
            label="Spotify ID (Optional)"
            type="text"
            placeholder="1v29IzN3meA82GM9qJXpQM"
            fullWidth
            value={spotifyId}
            onChange={(e) => setSpotifyId(e.target.value)}
            error={!!spotifyIdError}
            helperText={spotifyIdError}
            inputProps={{ maxLength: 22 }}
          />
          <TextField
            margin="dense"
            id="apple-id"
            label="Apple ID (Optional)"
            type="text"
            placeholder="1636818369"
            fullWidth
            value={appleId}
            onChange={(e) => setAppleId(e.target.value)}
            error={!!appleIdError}
            helperText={appleIdError}
            inputProps={{ maxLength: 10 }}
          />
          <TextField
            margin="dense"
            id="facebook-url"
            label="Facebook URL (Optional)"
            type="url"
            placeholder="https://facebook.com/artistprofile"
            fullWidth
            value={facebookUrl}
            onChange={(e) => setFacebookUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddArtistModal;
