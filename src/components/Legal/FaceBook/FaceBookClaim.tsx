import { useProfileQuery } from "@/redux/slices/admin/userApi";
import { useAddFacebookClaimRequestMutation } from "@/redux/slices/claims/claimsApi";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  useTheme,
  Paper,
  Autocomplete,
} from "@mui/material";
import toast from "react-hot-toast";
import { styled } from "@mui/system";
import { useState } from "react";
import { useDebounced } from "@/utils/utils";
import { useMyAllSongQuery } from "@/redux/slices/myUploads/myUploadsApi";
// Custom Styled Components
const PageContainer = styled(Box)(() => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #000000 0%, #3b5998 100%)", // Facebook-inspired gradient
  padding: "40px",
  position: "relative",
}));

const FloatingCard = styled(Paper)(() => ({
  background: "rgba(255, 255, 255, 0.9)",
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
  background: "linear-gradient(135deg, #3b5998 0%, #8b9dc3 100%)", // Secondary gradient inspired by Facebook's blue tones
  clipPath: "polygon(0 0, 100% 0, 100% 75%, 0 100%)",
  zIndex: 1,
}));

const CustomButton = styled(Button)(() => ({
  backgroundColor: "#3b5998", // Facebook blue for the button
  color: "#fff",
  padding: "12px 20px",
  fontWeight: "bold",
  borderRadius: "30px",
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "#2d4373", // Darker hover effect
    transform: "translateY(-3px)",
    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
  },
}));

const FormTitle = styled(Typography)(() => ({
  color: "#3b5998", // Facebook blue for title
  fontWeight: "bold",
  marginBottom: "20px",
}));

const FacebookClaim = () => {
  const { data: profileData, isLoading, isError } = useProfileQuery({});
  const [addFacebookClaim, { isLoading: isAddLoading }] =
    useAddFacebookClaimRequestMutation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSong, setSelectedSong] = useState<any>(null);
  const query: Record<string, any> = {};

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data: songs } = useMyAllSongQuery({ ...query });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      const res = await addFacebookClaim({
        user: profileData?.data?._id,
        email: profileData?.data?.email as string,
        songTitle: selectedSong?.title || "",
        url: formData.get("url") as string,
      });
      if (res?.data?.success === true) {
        toast.success("Success");
      }
    } catch (error: any) {
      console.error("Failed to submit Facebook claim request:", error);
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
        <FormTitle variant="h4">Facebook Claim Request</FormTitle>
        <Typography variant="body2" sx={{ marginBottom: "20px" }}>
          Please provide the necessary information to submit a Facebook claim
          request.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Autocomplete
                options={songs?.data || []}
                getOptionLabel={(option: any) =>
                  `${option.title} (ISRC: ${option.isrc})`
                }
                onInputChange={(event: any, newValue) =>
                  setSearchTerm(newValue)
                }
                onChange={(event, newValue) => setSelectedSong(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Release Title"
                    variant="outlined"
                    placeholder="Search by Title or ISRC"
                    fullWidth
                    required
                    sx={{ backgroundColor: "#fff" }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                variant="outlined"
                disabled
                value={profileData?.data?.email}
                sx={{ backgroundColor: "#f9f9f9", borderRadius: "8px" }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="url"
                name="url"
                label="FB Video Link"
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

export default FacebookClaim;
