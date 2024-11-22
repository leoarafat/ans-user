// src/pages/PromoPage.jsx

import React from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, Container, Typography } from "@mui/material";
import PromoCard from "./PromoCard";
import layoutTemplates from "./layoutTemplates";

const PromoPage = () => {
  const [searchParams] = useSearchParams();
  const banner = searchParams.get("banner");
  const title = searchParams.get("title");

  // Shuffle the layoutTemplates to ensure randomness
  const shuffledTemplates = [...layoutTemplates].sort(
    () => 0.5 - Math.random()
  );

  return (
    <Container sx={{ marginTop: 4, marginBottom: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        {title} Promotions
      </Typography>
      <Grid container spacing={4}>
        {shuffledTemplates.slice(0, 10).map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template.id}>
            <PromoCard banner={banner} title={title} template={template} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PromoPage;
