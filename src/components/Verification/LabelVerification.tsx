import { imageURL } from "@/redux/api/baseApi";
import { useProfileQuery } from "@/redux/slices/admin/userApi";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const LabelVerification = ({ data, onChange }: any) => {
  const [dashboardImage, setDashboardImage] = useState<File | null>(null);
  const [copyRightImage, setCopyRightImage] = useState<File | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { data: profileData } = useProfileQuery({});
  const [initialSetupDone, setInitialSetupDone] = useState(false);

  useEffect(() => {
    if (profileData?.data && !initialSetupDone) {
      const initialProfileData = {
        // videosCount: profileData.data.videosCount || "",
        // subscribeCount: profileData.data.subscribeCount || "",
        currentDistributor: profileData.data.currentDistributor || "",
        channelName: profileData.data.channelName || "",
        channelUrl: profileData.data.channelUrl || "",
        copyRightImage: profileData.data.copyrightNoticeImage || null,
        dashboardImage: profileData.data.dashboardScreenShot || null,
      };

      onChange("label", initialProfileData);
      setDashboardImage(profileData.data.dashboardScreenShot || null);
      setCopyRightImage(profileData.data.copyrightNoticeImage || null);

      setInitialSetupDone(true);
    }
  }, [profileData, initialSetupDone, onChange]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      onChange("label", { ...data.label, [name]: value });
    },
    [onChange, data.label]
  );

  const handleImageUpload =
    (setter: React.Dispatch<React.SetStateAction<File | null>>, name: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      setter(file);
      onChange("label", { ...data.label, [name]: file });
    };

  const handleRemoveImage =
    (setter: React.Dispatch<React.SetStateAction<File | null>>, name: string) =>
    () => {
      setter(null);
      onChange("label", { ...data.label, [name]: null });
    };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const distributorData: string[] = [
    "DistroKid",
    "Gallery Vision",
    "Tunecore",
    "The Orchard Music",
    "RouteNote",
    "Ditto",
    "United Masters",
    "CD Baby",
    "ST Digital",
    "Symphonic",
    "Haven't worked with any distributor yet",
    "Google",
    "Facebook",
    "Instagram",
    "LinkedIn",
    "TikTok",
    "Twitter (X)",
    "ANS Music Employee",
    "Other",
  ];
  return (
    <form>
      <Grid container spacing={3}>
        {/* Dashboard Image Uploader */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              border: "1px dashed #ccc",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Upload Youtube Dashboard Image{" "}
              <span>
                <Button
                  onClick={handleOpenDialog}
                  variant="outlined"
                  color="primary"
                >
                  (Click For Example)
                </Button>
              </span>
            </Typography>
            {dashboardImage || profileData?.data?.dashboardScreenShot ? (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "350px",
                  height: "200px",
                  mb: 2,
                }}
              >
                {typeof dashboardImage === "object" ? (
                  <img
                    src={
                      dashboardImage
                        ? URL.createObjectURL(dashboardImage)
                        : `${profileData?.data?.dashboardScreenShot}`
                    }
                    alt="Dashboard"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <img
                    src={`${profileData?.data?.dashboardScreenShot}`}
                    alt="Copyright Image"
                    // className="w-[350px] h-[200px]"
                  />
                )}
                <IconButton
                  onClick={handleRemoveImage(
                    setDashboardImage,
                    "dashboardImage"
                  )}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                  }}
                >
                  <MdClose color="red" />
                </IconButton>
              </Box>
            ) : (
              <label
                htmlFor="dashboard_upload"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "2px dashed #007bff",
                }}
              >
                <Input
                  id="dashboard_upload"
                  type="file"
                  accept="image/*"
                  name="dashboardImage"
                  style={{ display: "none" }}
                  onChange={handleImageUpload(
                    setDashboardImage,
                    "dashboardImage"
                  )}
                />
                <BsCloudUpload size={48} color="#007bff" />
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  Click or Drag to upload
                </Typography>
              </label>
            )}
          </Box>
        </Grid>

        {/* Copyright Image Uploader */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              border: "1px dashed #ccc",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Upload Youtube Copyright Image(Optional)
            </Typography>
            {copyRightImage || profileData?.data?.copyrightNoticeImage ? (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "350px",
                  height: "200px",
                  mb: 2,
                }}
              >
                {typeof copyRightImage === "object" ? (
                  <img
                    src={
                      copyRightImage
                        ? URL.createObjectURL(copyRightImage)
                        : `${profileData?.data?.copyrightNoticeImage}`
                    }
                    alt="Dashboard"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <img
                    src={`${profileData?.data?.copyrightNoticeImage}`}
                    alt="Copyright Image"
                    // className="w-[350px] h-[200px]"
                  />
                )}
                <IconButton
                  onClick={handleRemoveImage(
                    setCopyRightImage,
                    "copyRightImage"
                  )}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                  }}
                >
                  <MdClose color="red" />
                </IconButton>
              </Box>
            ) : (
              <label
                htmlFor="copyright_upload"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "2px dashed #007bff",
                }}
              >
                <Input
                  id="copyright_upload"
                  type="file"
                  accept="image/*"
                  name="copyRightImage"
                  style={{ display: "none" }}
                  onChange={handleImageUpload(
                    setCopyRightImage,
                    "copyRightImage"
                  )}
                />
                <BsCloudUpload size={48} color="#007bff" />
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  Click or Drag to upload
                </Typography>
              </label>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            name="channelName"
            label="Account Name / Label Name"
            variant="outlined"
            fullWidth
            value={data?.label?.channelName || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            name="channelUrl"
            label="Channel URL"
            variant="outlined"
            fullWidth
            required
            value={data?.label?.channelUrl || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
            <InputLabel>Current Distributor</InputLabel>
            <Select
              value={data?.label.currentDistributor || ""}
              onChange={handleChange}
              name="currentDistributor"
              label="Current Distributor"
            >
              {distributorData?.map((data: any, index: number) => (
                <MenuItem key={index} value={data}>
                  {data}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Select Options</FormHelperText>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <TextField
            name="subscribeCount"
            label="Subscribe Count"
            variant="outlined"
            type="number"
            fullWidth
            value={data?.label?.subscribeCount || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            name="videosCount"
            label="Videos Count"
            variant="outlined"
            type="number"
            fullWidth
            value={data?.label?.videosCount || ""}
            onChange={handleChange}
          />
        </Grid> */}
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent>
          <img
            src="https://res.cloudinary.com/arafatleo/image/upload/v1726555422/Dashboard_bco0oy.jpg"
            alt="Dashboard Example"
            style={{ width: "100%", height: "auto" }}
          />
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default LabelVerification;
