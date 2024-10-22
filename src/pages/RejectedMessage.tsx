import { Container, Box, Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MusicOffIcon from "@mui/icons-material/MusicOff";
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #2c3e50, #ff4e50)", // Dark to red gradient
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
  color: "#ff4e50", // Bright red color for the title
  letterSpacing: "2px",
};

const messageStyle = {
  marginBottom: "24px",
  fontSize: "1.2rem",
  color: "#333",
  lineHeight: "1.6",
};

const footerStyle = {
  marginTop: "24px",
  color: "#555",
  fontSize: "0.9rem",
};

const retryButtonStyle = {
  marginTop: "32px",
  padding: "12px 28px",
  backgroundColor: "#ff4e50",
  color: "#ffffff",
  borderRadius: "30px",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: "bold",
  boxShadow: "0px 8px 20px rgba(255, 78, 80, 0.4)",
  "&:hover": {
    backgroundColor: "#e84548",
    boxShadow: "0px 10px 25px rgba(232, 69, 72, 0.5)",
  },
};

const musicOffIconStyle = {
  fontSize: "5rem",
  color: "#ff4e50",
  animation: "musicOffBounce 2s infinite", // Custom music-off animation
};

const contactInfoStyle = {
  marginTop: "16px",
  fontSize: "1rem",
  color: "#333",
  lineHeight: "1.5",
};

const RejectedMessage = () => {
  const navigate = useNavigate();

  return (
    <Container sx={containerStyle}>
      <Paper sx={paperStyle} elevation={6}>
        <Box component="div">
          <MusicOffIcon sx={musicOffIconStyle} />
          <Typography variant="h3" sx={titleStyle}>
            Approval Rejected
          </Typography>
          <Typography variant="body1" sx={messageStyle}>
            Unfortunately, your account approval request has been rejected. We
            regret to inform you that you won’t be able to access certain
            features on our platform at this time.
          </Typography>
          <Typography variant="body1" sx={messageStyle}>
            If you believe this was an error, please contact our support team
            for further assistance. We’re here to help you with any questions or
            clarifications.
          </Typography>
          <Button
            sx={retryButtonStyle}
            onClick={() => navigate("/auth/register")}
          >
            Retry Submission
          </Button>
          <Typography variant="body2" sx={footerStyle}>
            Thank you for your understanding.
          </Typography>
          <Typography variant="body1" sx={contactInfoStyle}>
            For further assistance, please contact us at:
            <br />
            <strong>Email:</strong> support@ansmusiclimited.com
            <br />
            <Typography
              onClick={() => window.open("https://wa.me/ansmusic/", "_blank")}
              className="cursor-pointer"
            >
              <strong>Whatsapp:</strong>
              <u>+13072042560</u>
            </Typography>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default RejectedMessage;
