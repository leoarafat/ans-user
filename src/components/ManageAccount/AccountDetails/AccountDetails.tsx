import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import BankAccountCard from "../Bank/BankAccountCard";
import MobileBankingCard from "../MobileBanking/MobileBankingCard";
import PayoneerCard from "../PayoneerPage/PayoneerCard";

const AccountDetails = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };

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
        {tabValue === 0 && <BankAccountCard />}
        {tabValue === 1 && <MobileBankingCard />}
        {tabValue === 2 && <PayoneerCard />}
      </Box>
    </Box>
  );
};

export default AccountDetails;
