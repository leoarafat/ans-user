import { useProfileQuery } from "@/redux/slices/admin/userApi";
import { useAddTikTokClaimRequestMutation } from "@/redux/slices/claims/claimsApi";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import toast from "react-hot-toast";

const TikTokClaim = () => {
  const { data: profileData, isLoading, isError } = useProfileQuery({});

  const [addTikTokClaimRequest, { isLoading: isAddLoading }] =
    useAddTikTokClaimRequestMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const res = await addTikTokClaimRequest({
        user: profileData?.data?._id,
        email: formData.get("email") as string,
        labelName: formData.get("label") as string,
        upc: formData.get("upc") as string,
        isrc: formData.get("isrc") as string,
        url: formData.get("url") as string,
        time: formData.get("time") as string,
      });
      if (res?.data?.success === true) {
        toast.success("Success");
      }
    } catch (error: any) {
      console.error("Failed to submit TikTok claim request:", error);
      toast.error(error?.message);
    }
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
          <span className="text-[#FE2C55] font-bold">TikTok claim request</span>
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
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="upc"
                name="upc"
                label="UPC"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="isrc"
                name="isrc"
                label="ISRC"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="url"
                name="url"
                label="Tiktok Video URL"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="time"
                name="time"
                label="Time (Mention Time Part Of Song)"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isAddLoading}
              >
                {isAddLoading ? (
                  <CircularProgress size={24} />
                ) : (
                  "Submit Request"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default TikTokClaim;
