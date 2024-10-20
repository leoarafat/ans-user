// import { useProfileQuery } from "@/redux/slices/admin/userApi";
// import { useAddYoutubeManualClaimMutation } from "@/redux/slices/claims/claimsApi";
// import {
//   Container,
//   Grid,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   CircularProgress,
//   Paper,
//   Autocomplete,
// } from "@mui/material";
// import toast from "react-hot-toast";
// import { useTheme } from "@mui/material/styles";
// import { useState } from "react";
// import { useDebounced } from "@/utils/utils";
// import { useMyAllSongQuery } from "@/redux/slices/myUploads/myUploadsApi";

// const YouTubeManualClaim = () => {
//   const { data: profileData, isLoading, isError } = useProfileQuery({});
//   const [addYoutubeManualClaim, { isLoading: isAddLoading }] =
//     useAddYoutubeManualClaimMutation();
//   const theme = useTheme();
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [selectedSong, setSelectedSong] = useState<any>(null);

//   const query: Record<string, any> = {};
//   const debouncedSearchTerm = useDebounced({
//     searchQuery: searchTerm,
//     delay: 600,
//   });

//   if (debouncedSearchTerm) {
//     query["searchTerm"] = debouncedSearchTerm;
//   }

//   const { data: songs } = useMyAllSongQuery({ ...query });
//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);

//     try {
//       const res = await addYoutubeManualClaim({
//         user: profileData?.data?._id,
//         email: profileData?.data?.email as string,

//         songTitle: selectedSong?.title || (formData.get("song") as string),

//         url: formData.get("url") as string,
//       });
//       if (res?.data?.success === true) {
//         toast.success("Success");
//       }
//     } catch (error: any) {
//       console.error("Failed to submit YouTube manual claim request:", error);
//       toast.error(error?.message);
//     }
//   };

//   if (isLoading) {
//     return (
//       <Container maxWidth="md">
//         <Box
//           sx={{
//             my: 4,
//             p: 3,
//             boxShadow: 3,
//             borderRadius: 2,
//             textAlign: "center",
//             backgroundColor: theme.palette.background.paper,
//           }}
//         >
//           <CircularProgress color="primary" />
//         </Box>
//       </Container>
//     );
//   }

//   if (isError) {
//     return (
//       <Container maxWidth="md">
//         <Box
//           sx={{
//             my: 4,
//             p: 3,
//             boxShadow: 3,
//             borderRadius: 2,
//             textAlign: "center",
//             backgroundColor: theme.palette.error.light,
//           }}
//         >
//           <Typography variant="h6" color="error">
//             Failed to load profile data.
//           </Typography>
//         </Box>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="md">
//       <Box
//         sx={{
//           my: 4,
//           p: 4,
//           borderRadius: 2,
//           backgroundColor: "#f9f9f9",
//           boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
//           position: "relative",
//           overflow: "hidden",
//         }}
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             background: `url('https://images.unsplash.com/photo-1543269851-5c7b1f2d56e4?fit=crop&w=800&h=800') no-repeat center center`,
//             backgroundSize: "cover",
//             opacity: 0.1,
//             zIndex: -1,
//           }}
//         />

//         <Typography
//           variant="subtitle1"
//           gutterBottom
//           sx={{
//             color: theme.palette.text.secondary,
//             textAlign: "center",
//             mb: 4,
//           }}
//         >
//           Enter the information to make a{" "}
//           <span style={{ color: "#FF0000", fontWeight: "bold" }}>
//             YouTube Manual Claim
//           </span>
//         </Typography>

//         <Paper
//           elevation={3}
//           sx={{
//             p: 4,
//             borderRadius: 2,
//             backgroundColor: "#ffffff",
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//           }}
//         >
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   disabled
//                   value={profileData?.data?.email}
//                   fullWidth
//                   id="email"
//                   name="email"
//                   variant="outlined"
//                   size="medium"
//                   sx={{ backgroundColor: "#ffffff" }}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="url"
//                   name="url"
//                   label="YouTube Video URL"
//                   variant="outlined"
//                   size="medium"
//                   sx={{ backgroundColor: "#ffffff" }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={12}>
//                 <Autocomplete
//                   options={songs?.data || []}
//                   getOptionLabel={(option: any) =>
//                     `${option.title} (ISRC: ${option.isrc})`
//                   }
//                   onInputChange={(event, newValue) => setSearchTerm(newValue)}
//                   onChange={(event, newValue) => setSelectedSong(newValue)}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Song Title"
//                       variant="outlined"
//                       placeholder="Search by Title or ISRC"
//                       fullWidth
//                       required
//                       sx={{ backgroundColor: "#fff" }}
//                     />
//                   )}
//                 />
//               </Grid>

//               <Grid item xs={12}>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   fullWidth
//                   disabled={isAddLoading}
//                   sx={{
//                     py: 1.5,
//                     backgroundColor: theme.palette.primary.main,
//                     "&:hover": {
//                       backgroundColor: theme.palette.primary.dark,
//                     },
//                   }}
//                 >
//                   {isAddLoading ? (
//                     <CircularProgress size={24} color="inherit" />
//                   ) : (
//                     "Submit Request"
//                   )}
//                 </Button>
//               </Grid>
//             </Grid>
//           </form>
//         </Paper>
//       </Box>
//     </Container>
//   );
// };

// export default YouTubeManualClaim;
import { useProfileQuery } from "@/redux/slices/admin/userApi";
import { useAddYoutubeManualClaimMutation } from "@/redux/slices/claims/claimsApi";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Autocomplete,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import toast from "react-hot-toast";
import { useState } from "react";
import { useDebounced } from "@/utils/utils";
import { useMyAllSongQuery } from "@/redux/slices/myUploads/myUploadsApi";

// Custom Styled Components
const PageContainer = styled(Box)(() => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #000000 0%, #FF0000 100%)", // YouTube-inspired gradient
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
  background: "linear-gradient(135deg, #FF0000 0%, #9C0000 100%)", // YouTube gradient overlay
  clipPath: "polygon(0 0, 100% 0, 100% 75%, 0 100%)",
  zIndex: 1,
}));

const CustomButton = styled(Button)(() => ({
  backgroundColor: "#FF0000", // YouTube red for the button
  color: "#fff",
  padding: "12px 20px",
  fontWeight: "bold",
  borderRadius: "30px",
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "#E50000", // Darker hover effect
    transform: "translateY(-3px)",
    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
  },
}));

const FormTitle = styled(Typography)(() => ({
  color: "#FF0000", // YouTube red for title
  fontWeight: "bold",
  marginBottom: "20px",
}));

const YouTubeManualClaim = () => {
  const { data: profileData, isLoading, isError } = useProfileQuery({});
  const [addYoutubeManualClaim, { isLoading: isAddLoading }] =
    useAddYoutubeManualClaimMutation();
  const theme = useTheme();
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
      const res = await addYoutubeManualClaim({
        user: profileData?.data?._id,
        email: profileData?.data?.email as string,
        songTitle: selectedSong?.title || (formData.get("song") as string),
        url: formData.get("url") as string,
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
        <FormTitle variant="h4">YouTube Manual Claim Request</FormTitle>
        <Typography variant="body2" sx={{ marginBottom: "20px" }}>
          Please provide the necessary information to submit a YouTube Manual
          Claim request.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                disabled
                value={profileData?.data?.email}
                fullWidth
                id="email"
                name="email"
                variant="outlined"
                size="medium"
                sx={{ backgroundColor: "#fff" }}
              />
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={12} sm={12}>
              <Autocomplete
                options={songs?.data || []}
                getOptionLabel={(option: any) =>
                  `${option.title} (ISRC: ${option.isrc})`
                }
                onInputChange={(event, newValue) => setSearchTerm(newValue)}
                onChange={(event, newValue) => setSelectedSong(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Song Title"
                    variant="outlined"
                    placeholder="Search by Title or ISRC"
                    fullWidth
                    required
                    sx={{ backgroundColor: "#fff" }}
                  />
                )}
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

export default YouTubeManualClaim;
