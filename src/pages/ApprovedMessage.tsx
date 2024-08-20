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

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", // Blue gradient background
  padding: "32px",
};

const paperStyle = {
  padding: "48px",
  textAlign: "center",
  maxWidth: 800,
  margin: "auto",
  backgroundColor: "#ffffff",
  boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)",
  borderRadius: "16px", // Increased border-radius for a softer look
  animation: "fadeIn 1s ease-in-out", // Simple fade-in animation
};

const titleStyle = {
  marginBottom: "24px",
  fontWeight: "bold",
  fontSize: "2.5rem",
  color: "#2a5298", // Slightly darker blue for contrast
};

const messageStyle = {
  marginBottom: "24px",
  fontSize: "1.2rem",
  color: "#555", // Medium gray for readability
};

const circularProgressStyle = {
  marginTop: "32px",
  color: "#2a5298", // Same dark blue color
  animation: "spin 1.5s linear infinite", // Spinning animation
};

const footerStyle = {
  marginTop: "32px",
  color: "#888", // Light gray for the footer text
  fontSize: "0.9rem",
};

const exploreButtonStyle = {
  marginTop: "24px",
  padding: "12px 24px",
  backgroundColor: "#2a5298",
  color: "#ffffff",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#1e3c72",
  },
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
      <Paper sx={paperStyle} elevation={5}>
        <Box component="div">
          <Typography variant="h3" sx={titleStyle}>
            Approval Pending
          </Typography>
          <Typography variant="body1" sx={messageStyle}>
            Your account is currently awaiting approval from our admin team.
            Please be patient as we review your submission.
          </Typography>
          <Typography variant="body1" sx={{ color: "#777" }}>
            Meanwhile, feel free to explore our platform and learn more about
            music distribution. Our service offers seamless distribution to
            various music platforms, ensuring your music reaches a global
            audience.
          </Typography>
          <CircularProgress sx={circularProgressStyle} size={60} />
          <Typography variant="body2" sx={footerStyle}>
            Thank you for your patience and understanding.
          </Typography>
          <Button sx={exploreButtonStyle} onClick={() => navigate("/explore")}>
            Explore Platform
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PendingApprovalMessage;
