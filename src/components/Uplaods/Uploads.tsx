import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  Paper,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { MusicNote as MusicNoteIcon } from "@mui/icons-material";

const Uploads = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
        padding: isMobile ? 2 : 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative gradient blobs for extra depth */}
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle at top left, #667eea, transparent)",
          top: -100,
          left: -100,
          borderRadius: "50%",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle at bottom right, #764ba2, transparent)",
          bottom: -150,
          right: -150,
          borderRadius: "50%",
          zIndex: 0,
        }}
      />

      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: "800px",
          borderRadius: "20px",
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.3)", // Glassmorphism effect
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          position: "relative",
          zIndex: 1, // Ensure it stays above the background elements
        }}
      >
        {/* Left Side: Text Section */}
        <Box
          sx={{
            flex: 1,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: isMobile ? 4 : 6,
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{
              fontWeight: 700,
              letterSpacing: 1.5,
              textAlign: "center",
              mb: 2,
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add depth to text
            }}
          >
            Share Your Music with the World
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", maxWidth: "300px" }}
          >
            Upload and manage your music effortlessly with our platform.
          </Typography>
        </Box>

        {/* Right Side: Options */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: isMobile ? 4 : 6,
          }}
        >
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={10}>
              <Paper
                elevation={3}
                sx={{
                  padding: isMobile ? 3 : 4,
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)",
                  color: "#333",
                  borderRadius: "12px",
                  backdropFilter: "blur(5px)", // Subtle blur for glassmorphism
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-10px) scale(1.05)",
                    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.2)",
                    background:
                      "linear-gradient(135deg, #f1f1f1 0%, #ececec 100%)",
                  },
                  cursor: "pointer",
                  zIndex: 2,
                }}
                onClick={() => navigate("/single")}
              >
                <IconButton
                  sx={{
                    backgroundColor: "#667eea",
                    color: "#fff",
                    width: 80,
                    height: 80,
                    mb: 2,
                    "&:hover": {
                      backgroundColor: "#5a67d8",
                    },
                  }}
                >
                  <MusicNoteIcon sx={{ fontSize: 48 }} />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Upload Single
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, color: "#666" }}>
                  Share your latest track with fans worldwide.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default Uploads;
