import React from "react";
import { useNewsQuery } from "@/redux/slices/newsAndFaq/newsAndFaqApi";
import { formatDate } from "@/utils/formatedDate";
import Loader from "@/utils/Loader";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

// Mock data
const mockNewsData = [
  {
    title: "Breaking News: Major Event Happening Now",
    createdAt: "2024-08-15T00:00:00Z",
    description:
      "Details about the major event that is happening right now. This description provides insights into the event and its implications.",
    source: "News Agency",
    image: "https://via.placeholder.com/600x400",
  },
  {
    title: "Update: Recent Developments in Technology",
    createdAt: "2024-08-14T00:00:00Z",
    description:
      "An update on recent developments in technology, including new innovations and industry trends.",
    source: "Tech News",
    image: "https://via.placeholder.com/600x400",
  },
  {
    title: "Health Alert: New Guidelines Released",
    createdAt: "2024-08-13T00:00:00Z",
    description:
      "New health guidelines have been released, providing updated information on health practices and recommendations.",
    source: "Health Authority",
    image: "https://via.placeholder.com/600x400",
  },
];

const News = () => {
  // Simulating API data with mock data
  const { data: news, isLoading } = {
    data: { data: mockNewsData },
    isLoading: false,
  };

  if (isLoading) {
    return <Loader />;
  }

  // @ts-ignore
  const newsData = news?.data ?? [];

  return (
    <Grid container spacing={3}>
      {newsData.map((newsItem: any, index: number) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
            <CardMedia
              component="img"
              height="140"
              image={newsItem.image || "https://via.placeholder.com/600x400"}
              alt={newsItem.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {newsItem.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatDate(newsItem.createdAt)}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                {newsItem.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary" align="right">
                Regards, {newsItem.source}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default News;
