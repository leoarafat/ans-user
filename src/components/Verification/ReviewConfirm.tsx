import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
} from "@material-ui/core";
import { useProfileQuery } from "@/redux/slices/admin/userApi";
import { imageURL } from "@/redux/api/baseApi";
import Loader from "@/utils/Loader";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 200,
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  media: {
    height: 140,
  },
}));

const ReviewConfirm = () => {
  const classes = useStyles();
  const { data: profileData, isLoading } = useProfileQuery({});

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Account Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Name:</strong> {profileData?.data?.name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Email:</strong> {profileData?.data?.email}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Phone:</strong> {profileData?.data?.phoneNumber}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Address:</strong> {profileData?.data?.address}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>City:</strong> {profileData?.data?.city}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>State:</strong> {profileData?.data?.state}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Country:</strong> {profileData?.data?.country}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography>
            <strong>Post Code:</strong> {profileData?.data?.postCode}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom>
        Images
      </Typography>
      <Grid container spacing={1}>
        {" "}
        {/* Decreased spacing */}
        {profileData && (
          <>
            <Grid item xs={12} sm={2}>
              {" "}
              {/* Reduced sm value */}
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={`${imageURL}${profileData?.data?.image}`}
                  title="Profile Image"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    Profile Image
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={2}>
              {" "}
              {/* Reduced sm value */}
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={`${imageURL}${profileData?.data?.nidFront}`}
                  title="NID Front Image"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    NID Front Image
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={2}>
              {" "}
              {/* Reduced sm value */}
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={`${imageURL}${profileData?.data?.nidBack}`}
                  title="NID Back Image"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    NID Back Image
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={2}>
              {" "}
              {/* Reduced sm value */}
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={`${imageURL}${profileData?.data?.dashboardScreenShot}`}
                  title="Dashboard Image"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    Dashboard Image
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={2}>
              {" "}
              {/* Reduced sm value */}
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={`${imageURL}${profileData?.data?.copyrightNoticeImage}`}
                  title="Copy Right Image"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    Copy Right Image
                  </Typography>
                </CardContent>
              </Card>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={`${imageURL}${profileData?.data?.signature}`}
                  title="Signature"
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    Signature
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default ReviewConfirm;
