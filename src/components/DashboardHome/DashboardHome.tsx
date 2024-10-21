/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Grid } from "@mui/material";
import FinancialCharts from "../Financial/FinancialCharts";

import LastSixApproved from "./LastSixApproved";
import News from "./News";

import { useNavigate } from "react-router-dom";
import useVerification from "@/utils/isVerified";
import { useEffect } from "react";
import TotalSong from "../TotalCard/TotalSong";
import useApproved from "@/utils/isApproved";

const DashboardHome = () => {
  const navigate = useNavigate();
  const { isVerified } = useVerification();
  const userVerifiedInfo = useApproved();

  const isApproved = userVerifiedInfo?.isApproved;
  useEffect(() => {
    if (!isVerified) {
      navigate("/verify");
    }
  }, [isVerified, navigate]);
  useEffect(() => {
    localStorage.removeItem("releaseFormData");
    localStorage.removeItem("tracksInformation");
  }, []);
  return (
    <Box sx={{ padding: 3 }}>
      <TotalSong />
      {/* <RevenueComponent /> */}
      <FinancialCharts />
      {isApproved && <LastSixApproved />}
      {/* <CorrectionRequest /> */}
      <Grid sx={{ marginTop: 3, width: "100%" }}>
        <News />
      </Grid>
    </Box>
  );
};

export default DashboardHome;
