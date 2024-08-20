import { useState } from "react";
import { Box, Tab, Tabs, Typography, Container, Paper } from "@mui/material";
import BankAccountCard from "../Bank/BankAccountCard";
import MobileBankingCard from "../MobileBanking/MobileBankingCard";
import PayoneerCard from "../PayoneerPage/PayoneerCard";

const AccountDetails = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container sx={{ py: 5 }}>
      <Paper elevation={4} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            backgroundColor: "grey.200",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            variant="fullWidth"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "grey.300",
            }}
          >
            <Tab
              label="Bank Transfer"
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                color: tabValue === 0 ? "primary.main" : "text.secondary",
              }}
            />
            <Tab
              label="Mobile Banking"
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                color: tabValue === 1 ? "primary.main" : "text.secondary",
              }}
            />
            <Tab
              label="Payoneer"
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                color: tabValue === 2 ? "primary.main" : "text.secondary",
              }}
            />
          </Tabs>
        </Box>
        <Box sx={{ p: 3 }}>
          {tabValue === 0 && <BankAccountCard />}
          {tabValue === 1 && <MobileBankingCard />}
          {tabValue === 2 && <PayoneerCard />}
        </Box>
      </Paper>
    </Container>
  );
};

export default AccountDetails;
