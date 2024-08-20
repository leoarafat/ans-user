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
  Fade,
  useTheme,
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

  const theme = useTheme(); // Use theme for consistency

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Password changed successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      } else {
        console.error("Change password error:", error);
      }
    }
  }, [data, error, isSuccess]);

  const onFinish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const oldPassword = formData.get("oldPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

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
  const handleMouseDownPassword = (event: React.MouseEvent) =>
    event.preventDefault();

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 8,
        px: 2,
        height: "100vh",
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
          boxShadow: 5,
          width: "100%",
          bgcolor: "background.paper",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 10,
          },
        }}
      >
        <Fade in={true} timeout={500}>
          <Typography
            variant="h4"
            component="h1"
            color="text.primary"
            gutterBottom
            sx={{ mb: 3 }}
          >
            Change Password
          </Typography>
        </Fade>
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
            sx: {
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              "&:focus-within": {
                borderColor: theme.palette.primary.main,
                boxShadow: `0 0 0 3px ${theme.palette.primary.light}`,
              },
            },
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
            sx: {
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              "&:focus-within": {
                borderColor: theme.palette.primary.main,
                boxShadow: `0 0 0 3px ${theme.palette.primary.light}`,
              },
            },
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
            sx: {
              transition: "border-color 0.3s ease, box-shadow 0.3s ease",
              "&:focus-within": {
                borderColor: theme.palette.primary.main,
                boxShadow: `0 0 0 3px ${theme.palette.primary.light}`,
              },
            },
          }}
        />
        <Box sx={{ mt: 3 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={24} /> : null}
            fullWidth
            sx={{
              transition: "background-color 0.3s ease, transform 0.3s ease",
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
                transform: "scale(1.05)",
              },
            }}
          >
            {isLoading ? "Changing..." : "Update Password"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePassword;
