import React, { useEffect } from "react";
import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

const ReleasePlatform = ({ data, onChange }: any) => {
  const [value, setValue] = React.useState(() => {
    const savedPlatform = localStorage.getItem("platform");
    return savedPlatform ? JSON.parse(savedPlatform) : "AllPlatformWithYouTube";
  });

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    localStorage.setItem("platform", JSON.stringify(value));
    onChange("platform", value);
  }, [value]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="linear-gradient(135deg, #f0f4ff, #d4d8e8)"
      padding={3}
    >
      <Card
        elevation={10}
        sx={{
          minWidth: 850,
          backdropFilter: "blur(8px)",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          background: "linear-gradient(135deg, #d9e4f5 0%, #f3eaf7 100%)",
        }}
      >
        <CardContent sx={{ padding: "32px 24px" }}>
          <Typography
            variant="h4"
            color="primary"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Select Release Platforms
          </Typography>

          <Divider sx={{ my: 2 }} />

          <RadioGroup
            value={value}
            onChange={handleChange}
            sx={{ marginBottom: "24px" }}
          >
            <FormControlLabel
              value="AllPlatformNotOnYouTube"
              control={<Radio sx={{ "&.Mui-checked": { color: "#3f51b5" } }} />}
              label="All Platforms excluding YouTube"
              sx={{ marginBottom: "12px" }}
            />
            <FormControlLabel
              value="AllPlatformWithYouTube"
              control={<Radio sx={{ "&.Mui-checked": { color: "#3f51b5" } }} />}
              label="All Platforms including YouTube"
              sx={{ marginBottom: "12px" }}
            />
            <FormControlLabel
              value="OnlyYouTube"
              control={<Radio sx={{ "&.Mui-checked": { color: "#3f51b5" } }} />}
              label="Only on YouTube"
              sx={{ marginBottom: "12px" }}
            />
          </RadioGroup>

          <Divider sx={{ my: 2 }} />

          <Typography
            variant="body2"
            color="textSecondary"
            mt={2}
            align="center"
            sx={{ fontStyle: "italic" }}
          >
            Please select a platform and go next.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ReleasePlatform;
