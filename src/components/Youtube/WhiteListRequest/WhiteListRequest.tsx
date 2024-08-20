import { useProfileQuery } from "@/redux/slices/admin/userApi";
import { useAddWhitelistRequestMutation } from "@/redux/slices/claims/claimsApi";
import {
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const WhiteListRequestForm = () => {
  const { data: profileData, isLoading, isError } = useProfileQuery({});
  const [addWhiteList] = useAddWhitelistRequestMutation();

  const [whitelistUrl, setWhitelistUrl] = useState("");

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
      } else {
        toast.error("Failed to submit whitelist request. Please try again.");
      }
    } catch (error: any) {
      console.error("Failed to submit whitelist request:", error);
      toast.error(error?.message);
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
          }}
        >
          Loading...
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
      <Box sx={{ my: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Whitelist Request
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
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
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
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
