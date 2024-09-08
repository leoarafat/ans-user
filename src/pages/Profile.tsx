import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Collapse,
  TextField,
  Grid,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { useMyProfileQuery } from "@/redux/slices/admin/settingApi";
import { imageURL } from "@/redux/api/baseApi";
import { useEditProfilePictureMutation } from "@/redux/slices/admin/userApi";
import toast from "react-hot-toast";
import { Edit2 } from "lucide-react";

const Profile = () => {
  const [expanded, setExpanded] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const {
    data: profileData,

    refetch,
  } = useMyProfileQuery({});
  const [editProfilePicture, { isLoading, isSuccess, error }] =
    useEditProfilePictureMutation();

  useEffect(() => {
    if (error) {
      toast.error("Error updating profile picture.");
    }
    if (isSuccess) {
      refetch();
      toast.success("Profile image updated successfully!");
    }
  }, [error, isSuccess, refetch]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const src = profileData?.data?.image?.startsWith("https")
    ? profileData?.data?.image
    : `${profileData?.data?.image}`;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);

      const formData = new FormData();
      formData.append("image", file);

      editProfilePicture(formData);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 300,
          backgroundImage:
            "url(https://res.cloudinary.com/arafatleo/image/upload/v1724142235/signup_aiqgj5.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 2,
          marginBottom: 4,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "50%",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
          }}
        >
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "90%",
              maxWidth: 400,
              backgroundColor: "background.paper",
              boxShadow: 3,
              borderRadius: 2,
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                padding: 1,
                border: "2px solid #ff5722",
                cursor: "pointer",
                zIndex: 10,
              }}
            >
              <label htmlFor="profile-image-upload">
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <Edit2 className="cursor-pointer" color="#ff5722" size={24} />
              </label>
            </Box>
            <CardContent sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  position: "relative",
                  mb: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={imagePreview || src}
                  sx={{ width: 120, height: 120, border: "5px solid #ffffff" }}
                />
              </Box>
              <Typography variant="h6" gutterBottom>
                {profileData?.data?.name || "User Name"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {profileData?.data?.email || "user@example.com"}
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? "Save" : "Edit"}
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
      {/* Main Content */}
      <Card sx={{ boxShadow: 3, borderRadius: 2, mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Profile Details
          </Typography>
          <Box sx={{ marginBottom: 2 }}>
            <Button
              variant="outlined"
              onClick={handleExpandClick}
              endIcon={<ExpandMore />}
              sx={{ display: "flex", alignItems: "center" }}
            >
              {expanded ? "Collapse Details" : "Expand Details"}
            </Button>
            <Collapse in={expanded}>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Name"
                    defaultValue={profileData?.data?.name}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    defaultValue={profileData?.data?.email}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Phone"
                    defaultValue={profileData?.data?.phoneNumber}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Address"
                    defaultValue={profileData?.data?.address}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Country"
                    defaultValue={profileData?.data?.country}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="State"
                    defaultValue={profileData?.data?.state}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    defaultValue={profileData?.data?.city}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Post Code"
                    defaultValue={profileData?.data?.postCode}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Channel Name"
                    defaultValue={profileData?.data?.channelName}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Channel URL"
                    defaultValue={profileData?.data?.channelUrl}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Subscribe Count"
                    defaultValue={profileData?.data?.subscribeCount}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Videos Count"
                    defaultValue={profileData?.data?.videosCount}
                    fullWidth
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                {/* Add more fields as needed */}
              </Grid>
            </Collapse>
          </Box>
        </CardContent>
      </Card>
      {/* Images Section */}

      <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User Images
          </Typography>
          <Grid container spacing={2}>
            {/* Profile Image */}
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ borderRadius: 2 }}>
                <img
                  src={src}
                  alt="Profile"
                  style={{ width: "100%", height: "auto", borderRadius: 2 }}
                />
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    Profile Picture
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Cover Photo */}
            {profileData?.data?.nidFront && (
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ borderRadius: 2 }}>
                  <img
                    src={`${imageURL}/${profileData?.data?.nidFront}`}
                    alt="Cover"
                    style={{ width: "100%", height: "auto", borderRadius: 2 }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Nid Front
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {profileData?.data?.nidBack && (
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ borderRadius: 2 }}>
                  <img
                    src={`${imageURL}/${profileData?.data?.nidBack}`}
                    alt="Cover"
                    style={{ width: "100%", height: "auto", borderRadius: 2 }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Nid Back
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {profileData?.data?.copyrightNoticeImage && (
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ borderRadius: 2 }}>
                  <img
                    src={`${imageURL}/${profileData?.data?.copyrightNoticeImage}`}
                    alt="Cover"
                    style={{ width: "100%", height: "auto", borderRadius: 2 }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Copyright
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
            {profileData?.data?.dashboardScreenShot && (
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ borderRadius: 2 }}>
                  <img
                    src={`${imageURL}/${profileData?.data?.dashboardScreenShot}`}
                    alt="Cover"
                    style={{ width: "100%", height: "auto", borderRadius: 2 }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      Dashboard
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
