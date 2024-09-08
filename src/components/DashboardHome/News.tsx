/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useState } from "react";
import { useNewsQuery } from "@/redux/slices/newsAndFaq/newsAndFaqApi";
import { formatDate } from "@/utils/formatedDate";
import Loader from "@/utils/Loader";
import {
  Typography,
  Grid,
  Divider,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const News = () => {
  // Simulating API data with mock data
  const { data: news, isLoading } = useNewsQuery({});

  if (isLoading) {
    return <Loader />;
  }

  // @ts-ignore
  const newsData = news?.data?.data ?? [];

  return (
    <Grid container spacing={3}>
      {newsData.map((newsItem: any, index: number) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <NewsCard newsItem={newsItem} />
        </Grid>
      ))}
    </Grid>
  );
};

interface NewsCardProps {
  newsItem: any;
}

const NewsCard = ({ newsItem }: NewsCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  const isLongDescription = newsItem.description?.length > 200;
  const displayDescription = expanded
    ? newsItem.description
    : `${newsItem.description?.slice(0, 200)}${isLongDescription ? "..." : ""}`;

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={newsItem.image || "https://via.placeholder.com/600x400"}
        alt={newsItem.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {newsItem.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatDate(newsItem.createdAt)}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {displayDescription}
          {isLongDescription && (
            <Typography
              component="span"
              onClick={toggleExpand}
              sx={{ color: "primary.main", cursor: "pointer", ml: 1 }}
            >
              {expanded ? "Show less" : "Read more"}
            </Typography>
          )}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary" align="right">
          Regards, {newsItem.source}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default News;
