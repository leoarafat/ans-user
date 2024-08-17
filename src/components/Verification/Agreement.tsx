import { useEffect, useRef, useState } from "react";
import { Box, Typography, Paper, Grid, Button, Divider } from "@mui/material";
import SignatureCanvas from "react-signature-canvas";
import { useProfileQuery } from "@/redux/slices/admin/userApi";

import signatureImageHasan from "../../assets/sign.jpg";
import AgreementCard from "../cards/AgreementCard";

const AgreementPage = ({ data, onChange }: any) => {
  const [signature, setSignature] = useState(null);
  const sigCanvas = useRef<SignatureCanvas>(null);
  const { data: profileData } = useProfileQuery({});
  const [initialSetupDone, setInitialSetupDone] = useState(false);

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
    }
  };

  const currentDate = new Date();
  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 3, maxWidth: 800, margin: "0 auto" }}>
        <Typography variant="h4" gutterBottom>
          Music Distribution Agreement
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography
              style={{ textAlign: "center" }}
              variant="h6"
              gutterBottom
            >
              CONTRACTOR
            </Typography>
            <Box
              sx={{ border: "1px solid black", padding: 2, borderRadius: 1 }}
            >
              <Typography variant="body1">
                <strong>Name:</strong> {profileData?.data?.name}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {profileData?.data?.email}
              </Typography>
              <Typography variant="body1">
                <strong>Phone Number:</strong> {profileData?.data?.phoneNumber}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {profileData?.data?.address}
              </Typography>
              <Typography variant="body1">
                <strong>NID Number:</strong> {profileData?.data?.nidNumber}
              </Typography>
              <Typography variant="body1">
                <strong>Channel Name:</strong> {profileData?.data?.channelName}
              </Typography>
              <Typography variant="body1">
                <strong>Channel URL:</strong>{" "}
                <a
                  href={profileData?.data?.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profileData?.data?.channelUrl?.slice(0, 40)}
                </a>
              </Typography>
              <Typography variant="body1">
                <strong>Date:</strong> {currentDate.toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              style={{ textAlign: "center" }}
              variant="h6"
              gutterBottom
            >
              DISTRIBUTOR
            </Typography>
            <Box
              sx={{ border: "1px solid black", padding: 2, borderRadius: 1 }}
            >
              <Typography variant="body2" align="center">
                For and on behalf of Be Musix
              </Typography>
              <Divider />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginTop: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontFamily: "cursive", fontSize: 24 }}
                >
                  Hasan
                </Typography>
                <Divider sx={{ width: "100%", marginY: 1 }} />
                <Typography variant="body1">
                  <strong>Name:</strong> Hasanuzzaman
                </Typography>
                <Typography variant="body1">
                  <strong>Designation:</strong> Owner BE Musix
                </Typography>
                <Typography variant="body1">
                  <strong>Reg No:</strong> 15503142
                </Typography>
                <Typography variant="body1">
                  <strong>Legal Representative:</strong> Hasanuzzaman
                </Typography>
                <Typography variant="body1">
                  <strong>Contact:</strong> Email: support@bemusix.com <br />{" "}
                  Call: +8801970-698456, +447441904447
                </Typography>
                <Typography variant="body1">
                  <strong>Date:</strong> {currentDate.toLocaleDateString()}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <AgreementCard />
        <Divider sx={{ marginY: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {/* Artist Signature Box */}
            <Box
              sx={{
                border: "1px solid black",
                padding: 2,
                borderRadius: 1,
                textAlign: "center",
              }}
            >
              <Typography variant="body2" gutterBottom>
                For and on behalf of {profileData?.data?.name}
              </Typography>
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: "sigCanvas",
                }}
                onEnd={handleSignatureChange}
              />
              <Button
                variant="outlined"
                color="secondary"
                onClick={clearSignature}
              >
                Clear
              </Button>
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
                <strong>Date:</strong> {currentDate.toLocaleString()}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                border: "1px solid black",
                padding: 2,
                borderRadius: 1,
                textAlign: "center",
                height: "410px",
              }}
            >
              <Typography variant="body2" gutterBottom>
                For and on behalf of BE Musix
              </Typography>
              <div className="flex justify-center items-center flex-col w-full h-[550px]">
                <img
                  src={signatureImageHasan}
                  alt="Signature"
                  style={{ width: "160px" }}
                />

                <Typography variant="body1" gutterBottom>
                  <strong>Company:</strong> Be Musix
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Designation:</strong> Owner and CEO Be Musix
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Date:</strong> {currentDate.toLocaleString()}
                </Typography>
                <br />
              </div>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: 2 }} />
        <Typography
          style={{ color: "#3572EF", fontWeight: "bold" }}
          variant="h6"
          gutterBottom
        >
          Note
        </Typography>
        <Typography variant="body1" paragraph>
          If a transfer or takedown of all songs is required before the contract
          expires, a $300 charge applies. After paying $300 you can shift to
          another distribution.
        </Typography>
      </Paper>
    </Box>
  );
};

export default AgreementPage;
