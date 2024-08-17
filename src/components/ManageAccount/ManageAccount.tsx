import { useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";

import Bank from "./Bank/Bank";
import MobileBanking from "./MobileBanking/MobileBanking";
import PayoneerPage from "./PayoneerPage/PayoneerPage";

const ManageAccount = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };
  useEffect(() => {
    localStorage.removeItem("releaseFormData");
    localStorage.removeItem("tracksInformation");
  }, []);
  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab label="Bank Transfer" />
          <Tab label="Mobile Banking" />
          <Tab label="Payoneer" />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        {tabValue === 0 && <Bank />}
        {tabValue === 1 && <MobileBanking />}
        {tabValue === 2 && <PayoneerPage />}
      </Box>
    </Box>
  );
};

export default ManageAccount;
