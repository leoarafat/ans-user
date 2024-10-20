// import { useProfileQuery } from "@/redux/slices/admin/userApi";
// import { useAddWhitelistRequestMutation } from "@/redux/slices/claims/claimsApi";
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

// const WhiteListRequestForm = () => {
//   const { data: profileData, isLoading, isError } = useProfileQuery({});
//   const [addWhiteList] = useAddWhitelistRequestMutation();
//   const [whitelistUrl, setWhitelistUrl] = useState("");
//   const theme = useTheme();

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setWhitelistUrl(event.target.value);
//   };

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     try {
//       const res = await addWhiteList({
//         user: profileData?.data?._id,
//         url: whitelistUrl,
//       });

//       if (res?.data?.success === true) {
//         toast.success("Whitelist request submitted successfully!");
//         setWhitelistUrl(""); // Clear input on success
//       } else {
//         toast.error("Failed to submit whitelist request. Please try again.");
//       }
//     } catch (error: any) {
//       console.error("Failed to submit whitelist request:", error);
//       toast.error("An unexpected error occurred. Please try again.");
//     }
//   };

//   if (isLoading) {
//     return (
//       <Container maxWidth="sm">
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
//       <Container maxWidth="sm">
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
//     <Container maxWidth="sm" sx={{ mt: 4 }}>
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
//           sx={{ color: theme.palette.text.secondary }}
//         >
//           Enter the URL to request whitelisting
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 required
//                 fullWidth
//                 id="whitelist-url"
//                 label="Whitelist URL"
//                 variant="outlined"
//                 value={whitelistUrl}
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

// export default WhiteListRequestForm;
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
  Paper,
} from "@mui/material";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

// Custom Styled Components
const PageContainer = styled(Box)(() => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #000000 0%, #4CAF50 100%)", // Green and black gradient for Whitelist Request
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
  background: "linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)", // Green gradient overlay for background
  clipPath: "polygon(0 0, 100% 0, 100% 75%, 0 100%)",
  zIndex: 1,
}));

const CustomButton = styled(Button)(() => ({
  backgroundColor: "#4CAF50", // Green button for Whitelist Request
  color: "#fff",
  padding: "12px 20px",
  fontWeight: "bold",
  borderRadius: "30px",
  boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "#388E3C", // Darker hover effect
    transform: "translateY(-3px)",
    boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.3)",
  },
}));

const FormTitle = styled(Typography)(() => ({
  color: "#4CAF50", // Green color for the form title
  fontWeight: "bold",
  marginBottom: "20px",
}));

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
        <FormTitle variant="h4">Whitelist Request</FormTitle>
        <Typography variant="body2" sx={{ marginBottom: "20px" }}>
          Enter the URL to request whitelisting.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
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

export default WhiteListRequestForm;
