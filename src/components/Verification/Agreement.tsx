import { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Divider,
  useTheme,
  IconButton,
} from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import { useProfileQuery } from "@/redux/slices/admin/userApi";
import {
  Clear as ClearIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";

import AgreementCard from "../cards/AgreementCard";

const AgreementPage = ({ data, onChange }: any) => {
  const [signature, setSignature] = useState<string | null>(null);
  const sigCanvas = useRef<SignatureCanvas>(null);
  const { data: profileData } = useProfileQuery({});
  const [initialSetupDone, setInitialSetupDone] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (profileData?.data && !initialSetupDone) {
      const initialProfileData = {
        signature: profileData.data.signature || null,
      };

      onChange("agreement", initialProfileData);
      setSignature(profileData.data.signature || null);

      setInitialSetupDone(true);
    }
  }, [profileData, initialSetupDone, onChange]);

  const clearSignature = () => {
    sigCanvas.current?.clear();
    setSignature(null);
  };

  const handleSignatureChange = async () => {
    if (sigCanvas.current) {
      const signatureDataUrl = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      const blob = await (await fetch(signatureDataUrl)).blob();
      onChange("agreement", { ...data?.agreement, signature: blob });
      setSignature(signatureDataUrl);
    }
  };

  const downloadSignature = () => {
    if (signature) {
      const link = document.createElement("a");
      link.href = signature;
      link.download = "signature.png";
      link.click();
    }
  };

  const currentDate = new Date();

  return (
    <Box sx={{ padding: 4, backgroundColor: theme.palette.background.default }}>
      <Paper
        sx={{
          padding: 4,
          maxWidth: 1200,
          margin: "0 auto",
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Music Distribution Agreement
        </Typography>
        <Divider sx={{ marginY: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              gutterBottom
            >
              CONTRACTOR
            </Typography>
            <Paper
              sx={{
                padding: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                boxShadow: 2,
              }}
            >
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {profileData?.data?.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {profileData?.data?.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Phone Number:</strong> {profileData?.data?.phoneNumber}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Address:</strong> {profileData?.data?.address}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>NID Number:</strong> {profileData?.data?.nidNumber}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Channel Name:</strong> {profileData?.data?.channelName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Channel URL:</strong>{" "}
                <a
                  href={profileData?.data?.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: theme.palette.primary.main }}
                >
                  {profileData?.data?.channelUrl?.slice(0, 40)}...
                </a>
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Date:</strong> {currentDate.toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              gutterBottom
            >
              DISTRIBUTOR
            </Typography>
            <Paper
              sx={{
                padding: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                boxShadow: 2,
              }}
            >
              <Typography
                variant="h6"
                align="center"
                sx={{
                  fontFamily: "cursive",
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 2,
                }}
              >
                ANS Enterprise LLC
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="body1" gutterBottom>
                <strong>Company Name:</strong> ANS Enterprise LLC
              </Typography>
              {/* <Typography variant="body1" gutterBottom>
                <strong>Designation:</strong> Owner ANS Music
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Reg No:</strong> 15503142
              </Typography> */}
              <Typography variant="body1" gutterBottom>
                <strong>Registered office at:</strong> 30 N Gould St Ste R
                Sheridan WY 82801 USA
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> support@ansmusiclimited.com
                <br />
                <strong>Phone:</strong> +1(307) 204 2560
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Date:</strong> {currentDate.toLocaleDateString()}
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        <AgreementCard />

        <Divider sx={{ marginY: 3 }} />

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                padding: 4,
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Artist Signature
              </Typography>
              <Box
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  overflow: "hidden",
                  width: "100%",
                  maxWidth: 500,
                  height: 200,
                  mb: 2,
                  position: "relative",
                }}
              >
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor={theme.palette.text.primary}
                  canvasProps={{
                    width: 500,
                    height: 200,
                    className: "sigCanvas",
                  }}
                  onEnd={handleSignatureChange}
                />
              </Box>
              {signature && (
                <div className="py-2">
                  {" "}
                  <IconButton
                    color="error"
                    onClick={clearSignature}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: theme.palette.background.paper,
                      boxShadow: `0 2px 4px ${theme.palette.divider}`,
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
              )}
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {profileData?.data?.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Designation:</strong> Owner
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Label:</strong> {profileData?.data?.channelName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Date:</strong> {currentDate.toLocaleDateString()}
              </Typography>
              {signature && (
                <Box sx={{ marginTop: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={downloadSignature}
                    startIcon={<DownloadIcon />}
                  >
                    Download Signature
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                padding: 4,
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Distributor Signature
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Representative:</strong> Akash Sarker
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Company:</strong> ANS Enterprise LLC
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Designation:</strong> CEO
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> akash.sarker@ansmusiclimited.com
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Date:</strong> {currentDate.toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 3 }} />

        <Typography variant="h6" color="primary" gutterBottom>
          Important Note
        </Typography>
        <Typography variant="body1">
          If a transfer or takedown of all songs is required before the contract
          expires, a $300 charge applies. After paying $300, you can shift to
          another distribution service.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AgreementPage;
