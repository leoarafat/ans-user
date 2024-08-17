import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useChangePasswordMutation } from "@/redux/slices/admin/settingApi";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const [changePassword, { isLoading, data, isSuccess, error }] =
    useChangePasswordMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Password changed successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [data, error, isSuccess]);

  const onFinish = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const oldPassword = formData.get("oldPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    try {
      await changePassword({ oldPassword, newPassword, confirmPassword });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleMouseDownPassword = (event: any) => event.preventDefault();

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 8,
      }}
    >
      <Box
        component="form"
        onSubmit={onFinish}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
        }}
      >
        <Typography variant="h4" component="h1" color="black" gutterBottom>
          Change Password
        </Typography>
        <TextField
          label="Current Password"
          name="oldPassword"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="New Password"
          name="newPassword"
          type={showNewPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          variant="outlined"
          margin="normal"
          fullWidth
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={24} /> : null}
            fullWidth
          >
            {isLoading ? "Changing..." : "Update Password"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePassword;
