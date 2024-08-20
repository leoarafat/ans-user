import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import PaymentMethodModal from "../ManageAccount/PaymentMethodModal/PaymentMethodModal";
import {
  useGetMyAllTimeBalanceQuery,
  useGetMyBalanceQuery,
} from "@/redux/slices/financial/financialApi";

const RevenueComponent = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: myBalance, isLoading } = useGetMyBalanceQuery({});
  const { data: myAllTimeBalance } = useGetMyAllTimeBalanceQuery({});

  const [currentMonthBalance, setCurrentMonthBalance] = useState(null);

  useEffect(() => {
    if (myBalance) {
      setCurrentMonthBalance(myBalance.data?.clientTotalBalance);
    }
  }, [myBalance]);

  const handleRequestPayment = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Box
      m={3}
      display="flex"
      justifyContent="center"
      alignItems="stretch"
      width="100%"
      sx={{
        flexDirection: {
          xs: "column",
          sm: "row",
        },
      }}
    >
      <Paper
        sx={{
          padding: 4,
          width: {
            xs: "100%",
            sm: "60%",
            md: "50%",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 5,
          borderRadius: 4,
          marginTop: {
            xs: 2,
            sm: 0,
          },

          background: "linear-gradient(135deg, #f5f5f5, #ffffff)",
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          Current Balance
        </Typography>
        <Divider sx={{ width: "80%", marginBottom: 2 }} />
        {isLoading ? (
          <CircularProgress sx={{ color: "#1976d2" }} />
        ) : (
          <>
            <Typography
              variant="h4"
              color={currentMonthBalance >= 50 ? "success.main" : "error.main"}
              gutterBottom
              sx={{ fontWeight: "bold" }}
            >
              {currentMonthBalance === null
                ? "$0.00"
                : currentMonthBalance.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Earned this month
            </Typography>
            <Button
              variant="contained"
              color="primary"
              disabled={currentMonthBalance < 50}
              onClick={handleRequestPayment}
              sx={{
                mt: 2,
                width: "60%",
                padding: "10px 20px",
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: "20px",
                boxShadow: "0px 4px 10px rgba(25, 118, 210, 0.2)",
              }}
            >
              Request Payment
            </Button>
            {currentMonthBalance !== null && currentMonthBalance < 50 && (
              <Typography
                sx={{
                  mt: 2,
                  width: "100%",
                  textAlign: "center",
                  color: "error.main",
                }}
              >
                <strong>Payment not available:</strong> Your balance must exceed
                the contractual threshold of $50.00.
              </Typography>
            )}
          </>
        )}
      </Paper>
      <PaymentMethodModal
        open={modalOpen}
        onClose={handleCloseModal}
        currentMonthBalance={currentMonthBalance}
      />
    </Box>
  );
};

export default RevenueComponent;
