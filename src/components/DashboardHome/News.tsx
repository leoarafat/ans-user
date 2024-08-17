/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useNewsQuery } from "@/redux/slices/newsAndFaq/newsAndFaqApi";
import { formatDate } from "@/utils/formatedDate";
import Loader from "@/utils/Loader";
import { Box, Typography, Paper, Grid, Divider } from "@mui/material";

const News = () => {
  const { data: news, isLoading } = useNewsQuery({});

  if (isLoading) {
    return <Loader />;
  }
  //@ts-ignore
  const newsData = news?.data?.data ?? [];

  return (
    <Grid item xs={12} md={12}>
      {/* News */}
      <Paper sx={{ padding: 2 }}>
        {newsData?.map((newsItem: any, index: number) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Typography variant="h6">{newsItem?.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {formatDate(newsItem.createdAt)}
            </Typography>
            <Typography variant="body2">{newsItem.description}</Typography>
            <Divider sx={{ marginY: 1 }} />
            <Typography variant="body2" align="right">
              Regards, {newsItem.source}
            </Typography>
          </Box>
        ))}
      </Paper>
    </Grid>
  );
};

export default News;
