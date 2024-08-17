import React from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const notifications = [
  {
    id: 1,
    date: "June 1, 2024",
    title: "New Feature Released",
    description:
      "We have released a new feature that allows you to manage your playlists more efficiently.",
  },
  {
    id: 2,
    date: "May 28, 2024",
    title: "Scheduled Maintenance",
    description:
      "Our platform will be undergoing scheduled maintenance on June 5, 2024, from 12:00 AM to 4:00 AM.",
  },
  {
    id: 3,
    date: "May 25, 2024",
    title: "Bug Fixes",
    description:
      "We have fixed several bugs in the app, including the issue with track uploads.",
  },
  {
    id: 4,
    date: "May 20, 2024",
    title: "Performance Improvements",
    description:
      "We have made performance improvements to enhance the user experience.",
  },
];

const NotificationList = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      <Paper sx={{ padding: 2 }}>
        <List>
          {notifications.map((notification) => (
            <React.Fragment key={notification.id}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={notification.title}
                  secondary={
                    <>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {notification.date}
                      </Typography>
                      {" — " + notification.description}
                    </>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default NotificationList;
