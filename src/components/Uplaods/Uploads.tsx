import { useNavigate } from "react-router-dom";
import { Box, Grid, Paper, Typography, IconButton } from "@mui/material";
import {
  MusicNote as MusicNoteIcon,
  Album as AlbumIcon,
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";

const Uploads = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        padding: isMobile ? 2 : 5,
        color: "#f0f0f0",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#1c1c1c",
          borderRadius: "20px",
          overflow: "hidden",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          boxShadow: "0px 0px 40px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Left Side: Icon Section */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2e2e2e",
            padding: isMobile ? 2 : 5,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              letterSpacing: 1.5,
              marginBottom: 2,
            }}
          >
            Your Music, Your Way
          </Typography>
          <Typography variant="body2" sx={{ color: "#9e9e9e" }}>
            Upload and manage your music with ease.
          </Typography>
        </Box>

        {/* Right Side: Options */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#1c1c1c",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: isMobile ? 2 : 5,
          }}
        >
          <Grid container spacing={isMobile ? 2 : 4}>
            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  padding: isMobile ? 3 : 4,
                  textAlign: "center",
                  backgroundColor: "#292929",
                  color: "#f0f0f0",
                  borderRadius: "8px",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "#3a3a3a",
                  },
                  cursor: "pointer",
                  border: "2px solid #ff6f61",
                }}
                onClick={() => navigate("/single")}
              >
                <IconButton
                  sx={{
                    backgroundColor: "#ff6f61",
                    color: "#fff",
                    width: 80,
                    height: 80,
                    marginBottom: 2,
                    "&:hover": {
                      backgroundColor: "#ff8a75",
                    },
                  }}
                >
                  <MusicNoteIcon sx={{ fontSize: 50 }} />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Upload Single
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper
                sx={{
                  padding: isMobile ? 3 : 4,
                  textAlign: "center",
                  backgroundColor: "#292929",
                  color: "#f0f0f0",
                  borderRadius: "8px",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                    backgroundColor: "#3a3a3a",
                  },
                  cursor: "pointer",
                  border: "2px solid #ffd700",
                }}
                onClick={() => navigate("/album")}
              >
                <IconButton
                  sx={{
                    backgroundColor: "#ffd700",
                    color: "#fff",
                    width: 80,
                    height: 80,
                    marginBottom: 2,
                    "&:hover": {
                      backgroundColor: "#ffdf32",
                    },
                  }}
                >
                  <AlbumIcon sx={{ fontSize: 50 }} />
                </IconButton>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Upload Album
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Uploads;
