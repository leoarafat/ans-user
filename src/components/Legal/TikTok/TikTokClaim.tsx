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
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import toast from "react-hot-toast";

const TikTokClaim = () => {
  const { data: profileData, isLoading, isError } = useProfileQuery({});
  const [addTikTokClaimRequest, { isLoading: isAddLoading }] =
    useAddTikTokClaimRequestMutation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            borderRadius: 4,
            textAlign: "center",
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: "#fff",
          }}
        >
          <CircularProgress color="inherit" />
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
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            borderRadius: 4,
            textAlign: "center",
            background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
            color: "#fff",
          }}
        >
          <Typography variant="h6" color="inherit">
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
          borderRadius: 4,
          background: "#f4f6f8",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `url('https://images.unsplash.com/photo-1604019650834-1fc3e84cf3a5?fit=crop&w=1920&h=1080') no-repeat center center`,
            backgroundSize: "cover",
            opacity: 0.2,
            zIndex: -1,
          }}
        />
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: theme.palette.primary.dark,
            fontWeight: "bold",
            mb: 2,
            textAlign: "center",
          }}
        >
          Hello, {profileData?.data?.name}!
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            color: theme.palette.text.secondary,
            mb: 4,
            textAlign: "center",
          }}
        >
          Enter the information to make a{" "}
          <span
            style={{ color: theme.palette.primary.main, fontWeight: "bold" }}
          >
            TikTok claim request
          </span>
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            background: "#fff",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
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
                  sx={{ backgroundColor: "#fafafa" }}
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
                  sx={{ backgroundColor: "#fafafa" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="upc"
                  name="upc"
                  label="UPC"
                  variant="outlined"
                  size="medium"
                  sx={{ backgroundColor: "#fafafa" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="isrc"
                  name="isrc"
                  label="ISRC"
                  variant="outlined"
                  size="medium"
                  sx={{ backgroundColor: "#fafafa" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="url"
                  name="url"
                  label="TikTok Video URL"
                  variant="outlined"
                  size="medium"
                  sx={{ backgroundColor: "#fafafa" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="time"
                  name="time"
                  label="Time (Mention Time Part Of Song)"
                  variant="outlined"
                  size="medium"
                  sx={{ backgroundColor: "#fafafa" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isAddLoading}
                  sx={{
                    py: 1.5,
                    background: theme.palette.primary.main,
                    "&:hover": {
                      background: theme.palette.primary.dark,
                    },
                  }}
                >
                  {isAddLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default TikTokClaim;
