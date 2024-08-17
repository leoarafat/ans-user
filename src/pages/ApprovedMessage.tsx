import useApproved from "@/utils/isApproved";
import {
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: "#f5f5f5",
  padding: "32px",
};

const paperStyle = {
  padding: "48px",
  textAlign: "center",
  maxWidth: 800,
  margin: "auto",
  backgroundColor: "#ffffff",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
};

const titleStyle = {
  marginBottom: "24px",
  fontWeight: "bold",
  color: "#1a237e", // Dark blue color
};

const messageStyle = {
  marginBottom: "24px",
  fontSize: "1.1rem",
};

const circularProgressStyle = {
  marginTop: "24px",
  color: "#1a237e", // Dark blue color
};

const footerStyle = {
  marginTop: "16px",
  //   color: "#757575", // Gray color
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
      <Paper sx={paperStyle} elevation={3}>
        <Box component="div">
          <Typography variant="h4" sx={titleStyle}>
            Approval Pending
          </Typography>
          <Typography variant="body1" sx={messageStyle}>
            Your account is currently awaiting approval from our admin team.
            Please be patient as we review your submission.
          </Typography>
          <Typography variant="body1">
            Meanwhile, feel free to explore our platform and learn more about
            music distribution. Our service offers seamless distribution to
            various music platforms, ensuring your music reaches a global
            audience.
          </Typography>
          <CircularProgress sx={circularProgressStyle} size={60} />
          <Typography variant="body2" sx={footerStyle}>
            Thank you for your patience and understanding.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PendingApprovalMessage;
