// import { useProfileQuery } from "@/redux/slices/admin/userApi";
// import { useAddArtistChannelRequestMutation } from "@/redux/slices/claims/claimsApi";
// import {
//   Container,
//   Grid,
//   TextField,
//   Button,
//   Box,
//   Typography,
//   CircularProgress,
// } from "@mui/material";
// import { FormEvent, useState } from "react";
// import toast from "react-hot-toast";
// import { useTheme } from "@mui/material/styles";

// interface FormData {
//   channelLink: string;
//   topicLink: string;
//   upc1: string;
//   upc2: string;
//   upc3: string;
// }

// const ArtistChannelRequestForm = () => {
//   const { data: profileData, isLoading, isError } = useProfileQuery({});
//   const [addArtistChannel] = useAddArtistChannelRequestMutation();
//   const [formData, setFormData] = useState<FormData>({
//     channelLink: "",
//     topicLink: "",
//     upc1: "",
//     upc2: "",
//     upc3: "",
//   });
//   const theme = useTheme();

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       const res = await addArtistChannel({
//         user: profileData?.data?._id,
//         channel_link: formData.channelLink,
//         topic_link: formData.topicLink,
//         upc_1: formData.upc1,
//         upc_2: formData.upc2,
//         upc_3: formData.upc3,
//       });

//       if (res?.data?.success === true) {
//         toast.success("Request submitted successfully!");
//       } else {
//         toast.error("Failed to submit request. Please try again.");
//       }
//     } catch (error: any) {
//       console.error("Failed to submit artist channel request:", error);
//       toast.error("An unexpected error occurred. Please try again.");
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
//           p: 3,
//           boxShadow: 3,
//           borderRadius: 2,
//           backgroundColor: theme.palette.background.paper,
//         }}
//       >
//         <Typography
//           variant="subtitle1"
//           gutterBottom
//           sx={{ color: theme.palette.text.secondary, mb: 3 }}
//         >
//           Enter the information to make an artist channel request.
//         </Typography>

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 required
//                 fullWidth
//                 id="channelLink"
//                 label="Channel Link"
//                 variant="outlined"
//                 value={formData.channelLink}
//                 onChange={handleChange}
//                 size="medium"
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 required
//                 fullWidth
//                 id="topicLink"
//                 label="Topic Link"
//                 variant="outlined"
//                 value={formData.topicLink}
//                 onChange={handleChange}
//                 size="medium"
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 required
//                 fullWidth
//                 id="upc1"
//                 label="UPC1"
//                 variant="outlined"
//                 value={formData.upc1}
//                 onChange={handleChange}
//                 size="medium"
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 required
//                 fullWidth
//                 id="upc2"
//                 label="UPC2"
//                 variant="outlined"
//                 value={formData.upc2}
//                 onChange={handleChange}
//                 size="medium"
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField
//                 required
//                 fullWidth
//                 id="upc3"
//                 label="UPC3"
//                 variant="outlined"
//                 value={formData.upc3}
//                 onChange={handleChange}
//                 size="medium"
//                 sx={{ mb: 2 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//                 sx={{
//                   py: 1.5,
//                   backgroundColor: theme.palette.primary.main,
//                   "&:hover": {
//                     backgroundColor: theme.palette.primary.dark,
//                   },
//                 }}
//               >
//                 Submit
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default ArtistChannelRequestForm;
import { useProfileQuery } from "@/redux/slices/admin/userApi";
import { useAddArtistChannelRequestMutation } from "@/redux/slices/claims/claimsApi";
import {
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { styled, useTheme } from "@mui/material/styles";

// Custom Styled Components
const PageContainer = styled(Box)(() => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #000000 0%, #1DB954 100%)", // Green and black gradient inspired by music platforms
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
  background: "linear-gradient(135deg, #1DB954 0%, #1A1A1A 100%)", // Green and dark grey gradient overlay
  clipPath: "polygon(0 0, 100% 0, 100% 75%, 0 100%)",
  zIndex: 1,
}));

const CustomButton = styled(Button)(() => ({
  backgroundColor: "#1DB954", // Green color for the button
  color: "#fff",
  padding: "12px 20px",
  fontWeight: "bold",
  borderRadius: "30px",
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "#1AA34F", // Darker hover effect
    transform: "translateY(-3px)",
    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
  },
}));

const FormTitle = styled(Typography)(() => ({
  color: "#1DB954", // Green color for title
  fontWeight: "bold",
  marginBottom: "20px",
}));

const ArtistChannelRequestForm = () => {
  const { data: profileData, isLoading, isError } = useProfileQuery({});
  const [addArtistChannel] = useAddArtistChannelRequestMutation();
  const [formData, setFormData] = useState({
    channelLink: "",
    topicLink: "",
    upc1: "",
    upc2: "",
    upc3: "",
  });
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await addArtistChannel({
        user: profileData?.data?._id,
        channel_link: formData.channelLink,
        topic_link: formData.topicLink,
        upc_1: formData.upc1,
        upc_2: formData.upc2,
        upc_3: formData.upc3,
      });

      if (res?.data?.success === true) {
        toast.success("Request submitted successfully!");
      } else {
        toast.error("Failed to submit request. Please try again.");
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred. Please try again.");
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
        <FormTitle variant="h4">Artist Channel Request</FormTitle>
        <Typography variant="body2" sx={{ marginBottom: "20px" }}>
          Enter the necessary information to submit an artist channel request.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="channelLink"
                label="Channel Link"
                variant="outlined"
                value={formData.channelLink}
                onChange={handleChange}
                size="medium"
                sx={{ backgroundColor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="topicLink"
                label="Topic Link"
                variant="outlined"
                value={formData.topicLink}
                onChange={handleChange}
                size="medium"
                sx={{ backgroundColor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="upc1"
                label="UPC1"
                variant="outlined"
                value={formData.upc1}
                onChange={handleChange}
                size="medium"
                sx={{ backgroundColor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="upc2"
                label="UPC2"
                variant="outlined"
                value={formData.upc2}
                onChange={handleChange}
                size="medium"
                sx={{ backgroundColor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="upc3"
                label="UPC3"
                variant="outlined"
                value={formData.upc3}
                onChange={handleChange}
                size="medium"
                sx={{ backgroundColor: "#fff" }}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomButton type="submit" fullWidth>
                Submit
              </CustomButton>
            </Grid>
          </Grid>
        </form>
      </FloatingCard>
    </PageContainer>
  );
};

export default ArtistChannelRequestForm;
