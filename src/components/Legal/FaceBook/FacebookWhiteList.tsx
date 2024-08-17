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
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";

const FacebookWhiteList = () => {
  const { data: profileData, isLoading, isError } = useProfileQuery({});
  const [addFacebookWhitelistRequest] =
    useAddFacebookWhitelistRequestMutation();
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const res = await addFacebookWhitelistRequest({
        user: profileData?.data?._id,
        email: formData.get("email"),
        labelName: formData.get("label"),
        url: formData.get("url"),
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
          }}
        >
          <CircularProgress />
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
      <Box sx={{ my: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom style={{ color: "#000" }}>
          Hello, {profileData?.data?.name}!
        </Typography>
        <Typography variant="subtitle1" gutterBottom style={{ color: "#000" }}>
          Enter the Information to make a{" "}
          <span className="text-[#1877F2] font-bold">
            Facebook Whitelist request
          </span>
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="label"
                name="label"
                label="Label Name"
                variant="outlined"
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
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit Request
              </Button>
            </Grid>
          </Grid>
        </form>

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
