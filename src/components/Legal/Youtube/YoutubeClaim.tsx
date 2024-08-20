import { useProfileQuery } from "@/redux/slices/admin/userApi";
import { useAddYoutubeClaimRequestMutation } from "@/redux/slices/claims/claimsApi";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
} from "@mui/material";
import toast from "react-hot-toast";
import { useTheme } from "@mui/material/styles";

const YoutubeClaim = () => {
  const { data: profileData, isLoading, isError } = useProfileQuery({});
  const [addYoutubeClaim, { isLoading: isAddLoading }] =
    useAddYoutubeClaimRequestMutation();
  const theme = useTheme();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const res = await addYoutubeClaim({
        user: profileData?.data?._id,
        email: formData.get("email") as string,
        labelName: formData.get("label") as string,
        songTitle: formData.get("song") as string,
        upc: formData.get("upc") as string,
        url: formData.get("url") as string,
      });
      if (res?.data?.success === true) {
        toast.success("Success");
      }
    } catch (error: any) {
      console.error("Failed to submit YouTube claim request:", error);
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
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: theme.palette.primary.light,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
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
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: theme.palette.error.light,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
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
          backgroundColor: "#f9f9f9",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "60%",
            height: "100%",
            background: `url('https://images.unsplash.com/photo-1576517007806-d6798dd6a89c?fit=crop&w=800&h=800') no-repeat center center`,
            backgroundSize: "cover",
            opacity: 0.1,
            zIndex: -1,
          }}
        />
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: theme.palette.primary.main,
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
          <span style={{ color: "#FF0000", fontWeight: "bold" }}>
            YouTube claim request
          </span>
        </Typography>

        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: "#fff",
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
                  sx={{ backgroundColor: "#fff" }}
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
                  sx={{ backgroundColor: "#fff" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="song"
                  name="song"
                  label="Song Title"
                  variant="outlined"
                  size="medium"
                  sx={{ backgroundColor: "#fff" }}
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
                  sx={{ backgroundColor: "#fff" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="url"
                  name="url"
                  label="YouTube Video URL"
                  variant="outlined"
                  size="medium"
                  sx={{ backgroundColor: "#fff" }}
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
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
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

export default YoutubeClaim;
