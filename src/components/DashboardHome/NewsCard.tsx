import React, { useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Box,
} from "@mui/material";
import { formatDate } from "@/utils/formatedDate";

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
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={newsItem.image || "https://via.placeholder.com/600x400"}
        alt={newsItem.title}
        sx={{
          objectFit: "cover",
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: 600 }}
        >
          {newsItem.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {formatDate(newsItem.createdAt)}
        </Typography>
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          {displayDescription}
          {isLongDescription && (
            <Typography
              component="span"
              onClick={toggleExpand}
              sx={{
                color: "primary.main",
                cursor: "pointer",
                ml: 1,
                fontWeight: 500,
              }}
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

export default NewsCard;
