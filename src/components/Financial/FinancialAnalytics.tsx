import { Box } from "@mui/material";
import FinancialCharts from "./FinancialCharts";
import StoreAnalytics from "./StoreAnalytics";

const FinancialAnalytics = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <FinancialCharts />
      <StoreAnalytics />
    </Box>
  );
};

export default FinancialAnalytics;
