import { useProfileQuery } from "@/redux/slices/admin/userApi";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
const ClaimRelease = () => {
  const { data: profileData } = useProfileQuery({});
  return (
    <div>
      <Container maxWidth="md">
        <Box sx={{ my: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            Hello, {profileData?.data?.name}!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Enter the URL to make a YouTube request
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="url"
                label="URL"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default ClaimRelease;
