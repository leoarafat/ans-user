import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";

import Bank from "./Bank/Bank";
import MobileBanking from "./MobileBanking/MobileBanking";
import PayoneerPage from "./PayoneerPage/PayoneerPage";

// Styled Components
const Container = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: 800,
  margin: "0 auto",
  backgroundColor: "#1c1c1e",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
}));

const TabContainer = styled(Box)(({ theme }) => ({
  borderBottom: "1px solid #444",
  backgroundColor: "#2c2c2e",
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  ".MuiTabs-indicator": {
    backgroundColor: "#00b0ff",
    height: "4px",
  },
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  color: "#cfd8dc",
  "&.Mui-selected": {
    color: "#00b0ff",
  },
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "1rem",
}));

const ContentContainer = styled(CardContent)(({ theme }) => ({
  // backgroundColor: "#1c1c1e",
  color: "#e0e0e0",
}));

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
    <Container>
      <TabContainer>
        <StyledTabs value={tabValue} onChange={handleTabChange} centered>
          <StyledTab label="Bank Transfer" />
          <StyledTab label="Mobile Banking" />
          <StyledTab label="Payoneer" />
        </StyledTabs>
      </TabContainer>
      <Card sx={{ borderRadius: 0 }}>
        <ContentContainer>
          {tabValue === 0 && <Bank />}
          {tabValue === 1 && <MobileBanking />}
          {tabValue === 2 && <PayoneerPage />}
        </ContentContainer>
      </Card>
    </Container>
  );
};

export default ManageAccount;
