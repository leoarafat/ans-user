import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Avatar,
  Paper,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useProfileQuery } from "@/redux/slices/admin/userApi";
import { imageURL } from "@/redux/api/baseApi";
import Loader from "@/utils/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: "#f4f6f8",
    borderRadius: theme.spacing(2),
  },
  sectionTitle: {
    marginBottom: theme.spacing(2),
    fontWeight: 600,
  },
  profileContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(3),
  },
  detailsContainer: {
    padding: theme.spacing(2),
    backgroundColor: "#fff",
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[1],
  },
  imageContainer: {
    marginTop: theme.spacing(4),
  },
  card: {
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[2],
    overflow: "hidden",
    cursor: "pointer",
  },
  media: {
    height: 160,
  },
  cardContent: {
    textAlign: "center",
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
}));

const ReviewConfirm = () => {
  const classes = useStyles();
  const { data: profileData, isLoading } = useProfileQuery({});

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleClickOpen = (image: string) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage("");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.sectionTitle}>
        Account Details
      </Typography>

      <Paper className={classes.detailsContainer}>
        <div className={classes.profileContainer}>
          <Avatar
            className={classes.avatar}
            src={`${imageURL}${profileData?.data?.image}`}
            alt="Profile"
          />
          <div>
            <Typography variant="h6">{profileData?.data?.name}</Typography>
            <Typography color="textSecondary">
              {profileData?.data?.email}
            </Typography>
          </div>
        </div>

        <Grid container spacing={2}>
          {[
            { label: "Phone", value: profileData?.data?.phoneNumber },
            { label: "Address", value: profileData?.data?.address },
            { label: "City", value: profileData?.data?.city },
            { label: "State", value: profileData?.data?.state },
            { label: "Country", value: profileData?.data?.country },
            { label: "Post Code", value: profileData?.data?.postCode },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Typography variant="subtitle1">
                <strong>{item.label}:</strong> {item.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Divider className={classes.divider} />

      <Typography variant="h4" className={classes.sectionTitle}>
        Uploaded Documents
      </Typography>

      <Grid container spacing={3} className={classes.imageContainer}>
        {[
          {
            label: "NID Front",
            image: profileData?.data?.nidFront,
          },
          {
            label: "NID Back",
            image: profileData?.data?.nidBack,
          },
          {
            label: "Dashboard",
            image: profileData?.data?.dashboardScreenShot,
          },
          {
            label: "Copyright Notice",
            image: profileData?.data?.copyrightNoticeImage,
          },
          {
            label: "Signature",
            image: profileData?.data?.signature,
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={4} md={2} key={index}>
            <Card
              className={classes.card}
              onClick={() => handleClickOpen(item.image)}
            >
              <CardMedia
                className={classes.media}
                image={`${imageURL}${item.image}`}
                title={item.label}
              />
              <CardContent className={classes.cardContent}>
                <Typography variant="body2" color="textSecondary">
                  {item.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ style: { borderRadius: 10 } }}
      >
        <DialogTitle>
          Image Preview
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <img
            src={`${imageURL}${selectedImage}`}
            alt="Preview"
            style={{ width: "100%", borderRadius: 8 }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewConfirm;
