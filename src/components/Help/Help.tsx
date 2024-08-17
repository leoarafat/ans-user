import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useGetFaqQuery } from "@/redux/slices/newsAndFaq/newsAndFaqApi";
import Loader from "@/utils/Loader";
import { useSendFeedbackMutation } from "@/redux/slices/admin/adminManageApi";
import toast from "react-hot-toast";

const HelpPage = () => {
  const { data: faqData, isLoading } = useGetFaqQuery({});
  const [feedbackFormOpen, setFeedbackFormOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [sendFeedback, { isLoading: feedBackLoading }] =
    useSendFeedbackMutation();

  const handleOpenFeedbackForm = () => {
    setFeedbackFormOpen(true);
  };

  const handleCloseFeedbackForm = () => {
    setFeedbackFormOpen(false);
  };

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackMessage(event.target.value);
  };
  useEffect(() => {
    localStorage.removeItem("releaseFormData");
    localStorage.removeItem("tracksInformation");
  }, []);
  const handleSendFeedback = async () => {
    try {
      const data = {
        description: feedbackMessage,
      };
      const res = await sendFeedback(data);
      if (res?.data?.success === true) {
        toast.success("Message Sent Successfully");
        handleCloseFeedbackForm();
      } else {
        handleCloseFeedbackForm();
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const faqs = faqData ?? [];

  return (
    <>
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom>
          Music Dashboard Help
        </Typography>
        <Typography variant="body1" color="textSecondary" mb={6}>
          Welcome to the Music Dashboard Help page! Here, you can find
          information and assistance on using our music dashboard.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <div>
          <Typography variant="h5" gutterBottom>
            Getting Started
          </Typography>
          <List sx={{ pl: 2 }}>
            <ListItem disablePadding>
              <ListItemText
                primary="Step 1: Sign up or log in to your account."
                primaryTypographyProps={{ variant: "body1" }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary="Step 2: Navigate to the dashboard page."
                primaryTypographyProps={{ variant: "body1" }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary="Step 3: Explore your music library and playlists."
                primaryTypographyProps={{ variant: "body1" }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary="Step 4: Customize your dashboard settings."
                primaryTypographyProps={{ variant: "body1" }}
              />
            </ListItem>
          </List>
        </div>

        <Divider sx={{ my: 4 }} />

        <div>
          <Typography variant="h5" gutterBottom>
            FAQs
          </Typography>
          {faqs.map((faq: any, index: number) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`faq-content-${index}`}
                id={`faq-header-${index}`}
              >
                <Typography variant="subtitle1" fontWeight="bold">
                  Q: {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>

        <Divider sx={{ my: 4 }} />

        <Button variant="contained" onClick={handleOpenFeedbackForm}>
          Send Message
        </Button>

        <Dialog
          open={feedbackFormOpen}
          onClose={handleCloseFeedbackForm}
          // maxWidth="md"
          // fullWidth
        >
          <DialogTitle>Send Message to Admin</DialogTitle>
          <DialogContent>
            <Typography variant="body1" gutterBottom>
              Please enter your message below:
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="feedback-message"
              label="Your Message"
              type="text"
              fullWidth
              multiline
              rows={6}
              value={feedbackMessage}
              onChange={handleFeedbackChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseFeedbackForm} color="primary">
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
      </Paper>
    </>
  );
};

export default HelpPage;
