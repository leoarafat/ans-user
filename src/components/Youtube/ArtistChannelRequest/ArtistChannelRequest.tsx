import { useProfileQuery } from "@/redux/slices/admin/userApi";
import { useAddArtistChannelRequestMutation } from "@/redux/slices/claims/claimsApi";
import {
  Container,
  Grid,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface FormData {
  channelLink: string;
  topicLink: string;
  upc1: string;
  upc2: string;
  upc3: string;
}

const ArtistChannelRequestForm = () => {
  const { data: profileData, isLoading, isError } = useProfileQuery({});
  const [addArtistChannel] = useAddArtistChannelRequestMutation();

  const [formData, setFormData] = useState<FormData>({
    channelLink: "",
    topicLink: "",
    upc1: "",
    upc2: "",
    upc3: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const res = await addArtistChannel({
        user: profileData?.data?._id,
        channel_link: formData.channelLink,
        topic_link: formData.topicLink,
        upc_1: formData.upc1,
        upc_2: formData.upc2,
        upc_3: formData.upc3,
      });

      if (res?.data?.success === true) {
        toast.success("Request submitted successfully!");
      } else {
        toast.error("Failed to submit request. Please try again.");
      }
    } catch (error: any) {
      console.error("Failed to submit artist channel request:", error);
      toast.error(error?.message);
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            my: 4,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          Loading...
        </Box>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="md">
        <Box
          sx={{
            my: 4,
            p: 3,
            boxShadow: 3,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" color="error">
            Failed to load profile data.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom style={{ color: "#000" }}>
          Hello, {profileData?.data?.name}!
        </Typography>
        <Typography variant="subtitle1" gutterBottom style={{ color: "#000" }}>
          Enter the Information to make an artist channel request.
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="channelLink"
                label="Channel Link"
                variant="outlined"
                value={formData.channelLink}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="topicLink"
                label="Topic Link"
                variant="outlined"
                value={formData.topicLink}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="upc1"
                label="UPC1"
                variant="outlined"
                value={formData.upc1}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="upc2"
                label="UPC2"
                variant="outlined"
                value={formData.upc2}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="upc3"
                label="UPC3"
                variant="outlined"
                value={formData.upc3}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default ArtistChannelRequestForm;
