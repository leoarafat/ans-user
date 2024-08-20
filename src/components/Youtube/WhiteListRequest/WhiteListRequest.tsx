import { useProfileQuery } from "@/redux/slices/admin/userApi";
import { useAddWhitelistRequestMutation } from "@/redux/slices/claims/claimsApi";
import {
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useTheme } from "@mui/material/styles";

const WhiteListRequestForm = () => {
  const { data: profileData, isLoading, isError } = useProfileQuery({});
  const [addWhiteList] = useAddWhitelistRequestMutation();
  const [whitelistUrl, setWhitelistUrl] = useState("");
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWhitelistUrl(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await addWhiteList({
        user: profileData?.data?._id,
        url: whitelistUrl,
      });

      if (res?.data?.success === true) {
        toast.success("Whitelist request submitted successfully!");
        setWhitelistUrl(""); // Clear input on success
      } else {
        toast.error("Failed to submit whitelist request. Please try again.");
      }
    } catch (error: any) {
      console.error("Failed to submit whitelist request:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="sm">
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
      <Container maxWidth="sm">
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
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box
        sx={{
          my: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ color: theme.palette.text.secondary }}
        >
          Enter the URL to request whitelisting
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="whitelist-url"
                label="Whitelist URL"
                variant="outlined"
                value={whitelistUrl}
                onChange={handleChange}
                size="medium"
                sx={{ mb: 2 }}
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
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default WhiteListRequestForm;
