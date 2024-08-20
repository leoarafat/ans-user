import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography, Paper } from "@mui/material";
import LabelManage from "./Label/LabelPage";
import ArtistManage from "./Artist/ArtistPage";

const ArtistLabelManagement = () => {
  const [activeTab, setActiveTab] = useState("one");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    localStorage.removeItem("releaseFormData");
    localStorage.removeItem("tracksInformation");
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
      <Paper
        sx={{
          borderRadius: "8px",
          padding: "16px",
          backgroundColor: "#fafafa",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "24px",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ marginBottom: "16px", fontWeight: "bold" }}
        >
          Artist & Label Management
        </Typography>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            borderBottom: "1px solid #ddd",
            marginBottom: "24px",
          }}
        >
          <Tab
            value="one"
            label="Manage Labels"
            sx={{
              fontWeight: "bold",
              color: "#333",
              "&.Mui-selected": {
                color: "#1976d2",
                borderBottom: "2px solid #1976d2",
              },
            }}
          />
          <Tab
            value="two"
            label="Manage Artists"
            sx={{
              fontWeight: "bold",
              color: "#333",
              "&.Mui-selected": {
                color: "#1976d2",
                borderBottom: "2px solid #1976d2",
              },
            }}
          />
        </Tabs>
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {activeTab === "one" && <LabelManage />}
          {activeTab === "two" && <ArtistManage />}
        </Box>
      </Paper>
    </Box>
  );
};

export default ArtistLabelManagement;
