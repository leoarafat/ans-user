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
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import toast from "react-hot-toast";

// Custom Styled Components
const PageContainer = styled(Box)(() => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)", // Custom gradient
  padding: "40px",
  position: "relative",
}));

const FloatingCard = styled(Paper)(() => ({
  background: "rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(10px)",
  borderRadius: "20px",
  padding: "40px",
  boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.1)",
  maxWidth: "900px",
  width: "100%",
  zIndex: 2,
}));

const GradientBackground = styled(Box)(() => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "linear-gradient(135deg, #FAACA8 0%, #DDD6F3 100%)", // Another custom gradient
  clipPath: "polygon(0 0, 100% 0, 100% 75%, 0 100%)",
  zIndex: 1,
}));

const CustomButton = styled(Button)(() => ({
  backgroundColor: "#FF6B6B", // Custom button color
  color: "#fff",
  padding: "12px 20px",
  fontWeight: "bold",
  borderRadius: "30px",
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "#FF4A4A", // Darker hover color
    transform: "translateY(-3px)",
    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
  },
}));

const FormTitle = styled(Typography)(() => ({
  color: "#3C3C3C", // Custom text color
  fontWeight: "bold",
  marginBottom: "20px",
}));

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
        email: profileData?.data?.email as string,
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
      toast.error(error?.message);
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <CircularProgress color="inherit" />
      </PageContainer>
    );
  }

  if (isError) {
    return (
      <PageContainer>
        <Typography variant="h5" color="error">
          Failed to load profile data.
        </Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <GradientBackground />
      <FloatingCard>
        <FormTitle variant="h4">TikTok Claim Request</FormTitle>
        <Typography variant="body2" sx={{ marginBottom: "20px" }}>
          Please provide the necessary information to submit a TikTok claim
          request.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                disabled
                value={profileData?.data?.email}
                variant="outlined"
                sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
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
                sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
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
                sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
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
                sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="url"
                name="url"
                label="TikTok Video URL"
                variant="outlined"
                sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="time"
                name="time"
                label="Time (Part of Song)"
                variant="outlined"
                sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButton type="submit" fullWidth disabled={isAddLoading}>
                {isAddLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Submit Request"
                )}
              </CustomButton>
            </Grid>
          </Grid>
        </form>
      </FloatingCard>
    </PageContainer>
  );
};

export default TikTokClaim;
