import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import TikTokClaim from "@/components/Legal/TikTok/TikTokClaim";
import YoutubeClaim from "@/components/Legal/Youtube/YoutubeClaim";
import FacebookClaim from "@/components/Legal/FaceBook/FaceBookClaim";
import YoutubeTakeDown from "@/components/Legal/Youtube/YouTubeTakeDown";
import YouTubeManualClaim from "@/components/Legal/Youtube/YouTubeManualClaim";
import FacebookWhiteList from "@/components/Legal/FaceBook/FacebookWhiteList";
import ArtistChannelRequest from "../ArtistChannelRequest/ArtistChannelRequest";
import WhiteListRequest from "../WhiteListRequest/WhiteListRequest";
import { services } from "@/MockData/MockData";

const DigitalRightsManagementPage = () => {
  const [claimType, setClaimType] = useState("tiktok");
  useEffect(() => {
    localStorage.removeItem("releaseFormData");
    localStorage.removeItem("tracksInformation");
  }, []);
  return (
    <Box sx={{ minHeight: "100vh", padding: "2rem 0", color: "#000" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{ marginBottom: "2rem", fontWeight: "bold" }}
        >
          ANS Music Rights Manager
        </Typography>
        <Grid container spacing={2}>
          {services?.map((service, index) => (
            <Grid
              onClick={() => setClaimType(service.type)}
              item
              xs={12}
              sm={6}
              md={3}
              key={index}
            >
              <Card
                sx={{
                  height: "120px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#f9f9f9",
                  cursor: "pointer",
                  color: "#000",
                  boxShadow: 3,
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s",
                  },
                }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  {service.icon}
                  <Typography variant="h6" component="div" gutterBottom>
                    {service.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box mt={4}>
          {claimType === "tiktok" && <TikTokClaim />}
          {claimType === "facebook" && <FacebookClaim />}
          {claimType === "youtube" && <YoutubeClaim />}
          {claimType === "youtube-takedown" && <YoutubeTakeDown />}
          {claimType === "youtube-manual" && <YouTubeManualClaim />}
          {claimType === "facebook-whitelist" && <FacebookWhiteList />}
          {claimType === "artist-channel-request" && <ArtistChannelRequest />}
          {claimType === "white-list-request" && <WhiteListRequest />}
        </Box>
      </Container>
    </Box>
  );
};

export default DigitalRightsManagementPage;
