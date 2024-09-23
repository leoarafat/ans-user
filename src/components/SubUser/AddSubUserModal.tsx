/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import toast from "react-hot-toast";
import { useMakeUserMutation } from "@/redux/slices/admin/userApi";

interface AddSubUserModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddSubUserModal: React.FC<AddSubUserModalProps> = ({ open, setOpen }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [makeSubUser, { isLoading }] = useMakeUserMutation();
  const handleCancel = () => {
    setOpen(false);

    setName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
  };

  const handleSave = async () => {
    try {
      const data = {
        name,
        email,
        password,
        phoneNumber,
        role: "sub-user",
      };
      const res = await makeSubUser(data);
      if (res?.data?.success === true) {
        toast.success("Sub User Create successful");
        setOpen(false);
      }
      if (res?.error) {
        //@ts-ignore
        toast.error(res?.error?.data?.message);
      }
    } catch (error) {
      console.error("Sub User creation failed", error);
      setOpen(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: { width: "450px" },
      }}
    >
      <DialogTitle id="form-dialog-title">Add Sub User</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            id="phone-number"
            label="Phone Number (Optional)"
            type="text"
            fullWidth
            variant="outlined"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          {isLoading ? "Adding.." : "Add Sub User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSubUserModal;
