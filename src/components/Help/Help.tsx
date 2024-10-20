// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Box,
//   Card,
//   CardContent,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
//   Container,
//   Grid,
//   Divider,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { styled, useTheme } from "@mui/material/styles";
// import toast from "react-hot-toast";
// import { useGetFaqQuery } from "@/redux/slices/newsAndFaq/newsAndFaqApi";
// import { useSendFeedbackMutation } from "@/redux/slices/admin/adminManageApi";

// // Custom Styled Components
// const GradientBackground = styled(Box)(({ theme }) => ({
//   background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
//   borderRadius: "20px",
//   padding: "20px",
//   color: "#fff",
//   textAlign: "center",
//   boxShadow: `0px 10px 20px -10px ${theme.palette.primary.main}`,
// }));

// const CustomAccordion = styled(Accordion)(({ theme }) => ({
//   backgroundColor: theme.palette.background.paper,
//   borderRadius: "10px",
//   boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//   marginBottom: "10px",
//   transition: "transform 0.3s ease-in-out",
//   "&:hover": {
//     transform: "scale(1.02)",
//     boxShadow: `0px 10px 20px -10px ${theme.palette.primary.main}`,
//   },
// }));

// const StyledButton = styled(Button)(({ theme }) => ({
//   backgroundColor: theme.palette.secondary.main,
//   color: "#fff",
//   borderRadius: "50px",
//   padding: "10px 20px",
//   fontWeight: "bold",
//   boxShadow: `0px 10px 20px -10px ${theme.palette.secondary.main}`,
//   transition: "background-color 0.3s ease, transform 0.3s ease",
//   "&:hover": {
//     backgroundColor: theme.palette.secondary.dark,
//     transform: "scale(1.05)",
//   },
// }));

// const HelpPage = () => {
//   const theme = useTheme();
//   const [feedbackFormOpen, setFeedbackFormOpen] = useState(false);
//   const [feedbackMessage, setFeedbackMessage] = useState("");
//   const [sendFeedback, { isLoading: feedBackLoading }] =
//     useSendFeedbackMutation();

//   const { data: faqData } = useGetFaqQuery({});

//   const handleOpenFeedbackForm = () => {
//     setFeedbackFormOpen(true);
//   };

//   const handleCloseFeedbackForm = () => {
//     setFeedbackFormOpen(false);
//   };

//   const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setFeedbackMessage(event.target.value);
//   };

//   useEffect(() => {
//     localStorage.removeItem("releaseFormData");
//     localStorage.removeItem("tracksInformation");
//   }, []);

//   const handleSendFeedback = async () => {
//     try {
//       const data = {
//         description: feedbackMessage,
//       };
//       const res = await sendFeedback(data);
//       if (res?.data?.success === true) {
//         toast.success("Message Sent Successfully");
//         handleCloseFeedbackForm();
//       } else {
//         handleCloseFeedbackForm();
//       }
//     } catch (error: any) {
//       toast.error(error?.message);
//     }
//   };

//   return (
//     <Container sx={{ mt: 8, mb: 4 }}>
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={8}>
//           <GradientBackground>
//             <Typography
//               variant="h4"
//               gutterBottom
//               sx={{ fontWeight: "bold", letterSpacing: "1.5px" }}
//             >
//               Welcome to the Music Dashboard Help
//             </Typography>
//             <Typography
//               variant="body1"
//               sx={{ mb: 4, letterSpacing: "0.5px", opacity: 0.8 }}
//             >
//               Find the answers you need or reach out to us for help. Explore our
//               FAQs or send a message to get started.
//             </Typography>
//           </GradientBackground>

//           <Box sx={{ mt: 6 }}>
//             {faqData?.map((faq: any, index: number) => (
//               <CustomAccordion key={index}>
//                 <AccordionSummary
//                   expandIcon={<ExpandMoreIcon />}
//                   aria-controls={`faq-content-${index}`}
//                   id={`faq-header-${index}`}
//                   sx={{
//                     "& .MuiAccordionSummary-content": {
//                       alignItems: "center",
//                       display: "flex",
//                     },
//                   }}
//                 >
//                   <Typography
//                     variant="subtitle1"
//                     sx={{ fontWeight: "bold", flex: 1 }}
//                   >
//                     {faq.question}
//                   </Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Typography variant="body2" color="textSecondary">
//                     {faq.answer}
//                   </Typography>
//                 </AccordionDetails>
//               </CustomAccordion>
//             ))}
//           </Box>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Box sx={{ position: "sticky", top: 20 }}>
//             <Card
//               sx={{
//                 p: 4,
//                 borderRadius: 3,
//                 boxShadow: 6,
//                 bgcolor: theme.palette.grey[900],
//                 color: "#fff",
//               }}
//             >
//               <CardContent>
//                 <Typography
//                   variant="h5"
//                   gutterBottom
//                   sx={{ fontWeight: "bold", textAlign: "center" }}
//                 >
//                   Need More Help?
//                 </Typography>
//                 <Divider sx={{ my: 2, bgcolor: theme.palette.primary.light }} />
//                 <Typography
//                   variant="body1"
//                   color="inherit"
//                   sx={{ mb: 4, textAlign: "center", letterSpacing: "0.5px" }}
//                 >
//                   If you can't find the answers you're looking for, feel free to
//                   send us a message. We're here to help!
//                 </Typography>
//                 <StyledButton
//                   variant="contained"
//                   color="primary"
//                   fullWidth
//                   onClick={handleOpenFeedbackForm}
//                 >
//                   Send Message
//                 </StyledButton>
//               </CardContent>
//             </Card>
//           </Box>
//         </Grid>
//       </Grid>

//       <Dialog open={feedbackFormOpen} onClose={handleCloseFeedbackForm}>
//         <DialogTitle
//           sx={{ bgcolor: theme.palette.primary.dark, color: "#fff" }}
//         >
//           Send a Message
//         </DialogTitle>
//         <DialogContent sx={{ bgcolor: theme.palette.background.default }}>
//           <Typography variant="body1" gutterBottom>
//             Enter your message below and we'll get back to you as soon as
//             possible.
//           </Typography>
//           <TextField
//             autoFocus
//             margin="dense"
//             id="feedback-message"
//             label="Your Message"
//             type="text"
//             fullWidth
//             multiline
//             rows={4}
//             value={feedbackMessage}
//             onChange={handleFeedbackChange}
//             sx={{
//               "& .MuiOutlinedInput-root": {
//                 "& fieldset": {
//                   borderColor: theme.palette.primary.light,
//                 },
//                 "&:hover fieldset": {
//                   borderColor: theme.palette.primary.main,
//                 },
//               },
//             }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ bgcolor: theme.palette.background.default }}>
//           <Button onClick={handleCloseFeedbackForm} color="inherit">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSendFeedback}
//             color="primary"
//             disabled={feedBackLoading}
//           >
//             {feedBackLoading ? "Sending..." : "Send"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default HelpPage;
import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Container,
  Grid,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useGetFaqQuery } from "@/redux/slices/newsAndFaq/newsAndFaqApi";
import { useSendFeedbackMutation } from "@/redux/slices/admin/adminManageApi";
import toast from "react-hot-toast";

// Custom Styled Components
const HeaderSection = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#fff",
  padding: "60px 20px",
  borderRadius: "12px",
  textAlign: "center",
  marginBottom: "40px",
  boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
}));

const FaqCard = styled(Card)(({ theme }) => ({
  borderRadius: "15px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: `0px 15px 25px rgba(0,0,0,0.2)`,
  },
}));

const SidebarCard = styled(Card)(({ theme }) => ({
  borderRadius: "15px",
  padding: "20px",
  position: "sticky",
  top: "20px",
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  background: theme.palette.background.paper,
}));

const HelpPage = () => {
  const theme = useTheme();
  const [feedbackFormOpen, setFeedbackFormOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const { data: faqData } = useGetFaqQuery({});
  const [sendFeedback, { isLoading: feedBackLoading }] =
    useSendFeedbackMutation();

  const handleOpenFeedbackForm = () => setFeedbackFormOpen(true);
  const handleCloseFeedbackForm = () => setFeedbackFormOpen(false);

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackMessage(event.target.value);
  };

  useEffect(() => {
    localStorage.removeItem("releaseFormData");
    localStorage.removeItem("tracksInformation");
  }, []);

  const handleSendFeedback = async () => {
    try {
      const res = await sendFeedback({ description: feedbackMessage });
      if (res?.data?.success === true) {
        toast.success("Message Sent Successfully");
        handleCloseFeedbackForm();
      } else {
        handleCloseFeedbackForm();
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Container sx={{ mt: 8, mb: 4 }}>
      {/* Full-width Header Section */}
      <HeaderSection>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
          Welcome to the Help Center
        </Typography>
        <Typography
          variant="body1"
          sx={{ maxWidth: "600px", margin: "0 auto" }}
        >
          Get help with our platform. Browse through our FAQ or reach out for
          personalized support.
        </Typography>
      </HeaderSection>

      <Grid container spacing={4}>
        {/* FAQ Section */}
        <Grid item xs={12} md={8}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Frequently Asked Questions
          </Typography>

          <Grid container spacing={3}>
            {faqData?.map((faq: any, index: number) => (
              <Grid item xs={12} sm={6} key={index}>
                <FaqCard>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {faq.question}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 2 }}
                    >
                      {faq.answer}
                    </Typography>
                  </CardContent>
                </FaqCard>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Sidebar for Additional Support */}
        <Grid item xs={12} md={4}>
          <SidebarCard>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              Need More Help?
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ textAlign: "center", mb: 4 }}
            >
              Can't find the answers you're looking for? Send us a message for
              more personalized help.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleOpenFeedbackForm}
            >
              Send Message
            </Button>
          </SidebarCard>
        </Grid>
      </Grid>

      {/* Feedback Dialog */}
      <Dialog open={feedbackFormOpen} onClose={handleCloseFeedbackForm}>
        <DialogTitle
          sx={{ bgcolor: theme.palette.primary.dark, color: "#fff" }}
        >
          Send a Message
        </DialogTitle>
        <DialogContent sx={{ bgcolor: theme.palette.background.default }}>
          <Typography variant="body1" gutterBottom>
            Enter your message below, and we will get back to you soon.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="feedback-message"
            label="Your Message"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={feedbackMessage}
            onChange={handleFeedbackChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: theme.palette.primary.light,
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ bgcolor: theme.palette.background.default }}>
          <Button onClick={handleCloseFeedbackForm} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={handleSendFeedback}
            color="primary"
            disabled={feedBackLoading}
          >
            {feedBackLoading ? "Sending..." : "Send"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HelpPage;
