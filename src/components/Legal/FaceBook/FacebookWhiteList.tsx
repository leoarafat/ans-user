import { useProfileQuery } from "@/redux/slices/admin/userApi";
import { useAddFacebookWhitelistRequestMutation } from "@/redux/slices/claims/claimsApi";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Snackbar,
  Paper,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";

const FacebookWhiteList = () => {
  const { data: profileData, isLoading, isError } = useProfileQuery({});
  const [addFacebookWhitelistRequest] =
    useAddFacebookWhitelistRequestMutation();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const theme = useTheme();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const res = await addFacebookWhitelistRequest({
        user: profileData?.data?._id,
        email: formData.get("email") as string,
        labelName: formData.get("label") as string,
        url: formData.get("url") as string,
      });
      if (res?.data?.success) {
        setOpenSuccess(true);
      } else {
        setOpenError(true);
      }
    } catch (error) {
      console.error("Failed to submit Facebook whitelist request:", error);
      setOpenError(true);
    }
  };

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            my: 4,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            my: 4,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: theme.palette.error.light,
          }}
        >
          <Typography variant="h6" color="error">
            Failed to load profile data.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          my: 4,
          p: 4,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `url('https://images.unsplash.com/photo-1543269851-5c7b1f2d56e4?fit=crop&w=800&h=800') no-repeat center center`,
            backgroundSize: "cover",
            opacity: 0.1,
            zIndex: -1,
          }}
        />

        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: theme.palette.text.secondary,
            textAlign: "center",
            mb: 4,
          }}
        >
          Enter the information to make a{" "}
          <span style={{ color: "#1877F2", fontWeight: "bold" }}>
            Facebook Whitelist request
          </span>
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="label"
                  name="label"
                  label="Label Name"
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="url"
                  name="url"
                  label="Facebook Page URL"
                  variant="outlined"
                  size="medium"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    py: 1.5,
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  Submit Request
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Snackbar
          open={openSuccess}
          autoHideDuration={6000}
          onClose={handleSuccessClose}
        >
          <MuiAlert
            onClose={handleSuccessClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Facebook whitelist request submitted successfully!
          </MuiAlert>
        </Snackbar>

        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleErrorClose}
        >
          <MuiAlert
            onClose={handleErrorClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Failed to submit Facebook whitelist request. Please try again later.
          </MuiAlert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default FacebookWhiteList;
