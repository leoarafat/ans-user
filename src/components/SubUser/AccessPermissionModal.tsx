import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Checkbox,
  Button,
  FormGroup,
  FormControlLabel,
  Grid,
  Divider,
} from "@mui/material";

interface PermissionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: string | null;
  name: string | null;
  onSubmit: (selectedPermissions: string[]) => void;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  outline: "none", // Removes the outline around the modal
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "16px",
  borderRadius: "20px",
};

const permissionsList = [
  { category: "News", permissions: ["News"] },
  {
    category: "New Release",
    permissions: ["New Release", "One release", "Multiple releases"],
  },
  {
    category: "Catalog",
    permissions: ["All Releases", "Drafts", "Correction Requested"],
  },
  {
    category: "Analytics",
    permissions: [
      "Daily Trends",
      "Playlists & Charts",
      "Short-form videos",
      "Video Trends",
      "Catalog optimization",
    ],
  },
  {
    category: "Promotion",
    permissions: ["All Products (for all artists, labels, channels)"],
  },
  { category: "Financial", permissions: ["Financial reports"] },
];

const PermissionModal: React.FC<PermissionModalProps> = ({
  open,
  setOpen,
  userId,
  name,
  onSubmit,
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const handleCheckboxChange = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedPermissions);
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          align="center"
          fontWeight="bold"
        >
          Assign Permissions
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          align="center"
          color="textSecondary"
        >
          Select permissions for <strong>User {name}</strong>
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Grid container spacing={2}>
          {permissionsList.map((group) => (
            <Grid item xs={12} sm={6} key={group.category}>
              <Typography variant="h6" gutterBottom>
                {group.category}
              </Typography>
              <FormGroup>
                {group.permissions.map((permission) => (
                  <FormControlLabel
                    key={permission}
                    control={
                      <Checkbox
                        checked={selectedPermissions.includes(permission)}
                        onChange={() => handleCheckboxChange(permission)}
                      />
                    }
                    label={permission}
                  />
                ))}
              </FormGroup>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          sx={buttonStyle}
          onClick={handleSubmit}
        >
          Save Permissions
        </Button>
      </Box>
    </Modal>
  );
};

export default PermissionModal;
