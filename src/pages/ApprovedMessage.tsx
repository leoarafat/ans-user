import useApproved from "@/utils/isApproved";
import {
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #2c3e50, #fd746c)", // Dark to soft gradient
  padding: "32px",
};

const paperStyle = {
  padding: "40px",
  textAlign: "center",
  maxWidth: 800,
  margin: "auto",
  backgroundColor: "rgba(255, 255, 255, 0.85)", // Slight transparency for the background
  boxShadow: "0px 20px 30px rgba(0, 0, 0, 0.2)",
  borderRadius: "15px",
  backdropFilter: "blur(10px)", // Blur effect for a glassmorphism style
};

const titleStyle = {
  marginBottom: "16px",
  fontWeight: "bold",
  fontSize: "2.8rem",
  color: "#fd746c", // Bright and warm color for the title
  letterSpacing: "2px",
};

const messageStyle = {
  marginBottom: "24px",
  fontSize: "1.2rem",
  color: "#333",
  lineHeight: "1.6",
};

const circularProgressStyle = {
  marginTop: "32px",
  color: "#fd746c",
};

const footerStyle = {
  marginTop: "24px",
  color: "#555",
  fontSize: "0.9rem",
};

const exploreButtonStyle = {
  marginTop: "32px",
  padding: "12px 28px",
  backgroundColor: "#fd746c",
  color: "#ffffff",
  borderRadius: "30px",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: "bold",
  boxShadow: "0px 8px 20px rgba(253, 116, 108, 0.4)",
  "&:hover": {
    backgroundColor: "#e85a58",
    boxShadow: "0px 10px 25px rgba(232, 90, 88, 0.5)",
  },
};

const musicIconStyle = {
  fontSize: "5rem",
  color: "#fd746c",
  animation: "musicBounce 2s infinite", // Custom music animation
};

const PendingApprovalMessage = () => {
  const navigate = useNavigate();
  const userVerifiedInfo = useApproved();
  const isApproved = userVerifiedInfo?.isApproved;

  useEffect(() => {
    if (isApproved) {
      navigate("/");
    }
  }, [isApproved, navigate]);

  return (
    <Container sx={containerStyle}>
      <Paper sx={paperStyle} elevation={6}>
        <Box component="div">
          <MusicNoteIcon sx={musicIconStyle} />
          <Typography variant="h3" sx={titleStyle}>
            Approval Pending
          </Typography>
          <Typography variant="body1" sx={messageStyle}>
            We're reviewing your account and approval is pending. Hang tight as
            we ensure everything is set up for your musical journey.
          </Typography>
          <Typography variant="body1" sx={messageStyle}>
            While you wait, feel free to explore our platform, discover new
            opportunities, and get ready to make some noise in the music
            industry!
          </Typography>
          <CircularProgress sx={circularProgressStyle} size={60} />
          <br />
          <Button sx={exploreButtonStyle} onClick={() => navigate("/explore")}>
            Explore Platform
          </Button>
          <Typography variant="body2" sx={footerStyle}>
            Thank you for your patience and understanding.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PendingApprovalMessage;
