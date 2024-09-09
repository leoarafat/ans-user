/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Grid,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import dayjs from "dayjs";
import PaymentMethodModal from "../PaymentMethodModal/PaymentMethodModal";
import { useGetMyBalanceQuery } from "@/redux/slices/financial/financialApi";

const PaymentOperations = () => {
  const [currentMonthBalance, setCurrentMonthBalance] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { data: myBalance } = useGetMyBalanceQuery({});
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
      sx={{
        width: "100%",
        minHeight: "100vh",
        // backgroundColor: "#1b1b1b",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Grid container spacing={4} maxWidth="lg">
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              padding: 4,
              backgroundColor: "#2c2c2c",
              borderRadius: 2,
              boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
            }}
          >
            <Box display="flex" alignItems="center" mb={3}>
              <AccountBalanceWalletIcon
                sx={{ fontSize: 40, color: "#ff6f61", mr: 2 }}
              />
              <Typography variant="h4" fontWeight="bold">
                Available Balance
              </Typography>
            </Box>
            <Typography
              variant="h3"
              fontWeight="bold"
              color="primary"
              gutterBottom
            >
              {currentMonthBalance !== null ? (
                //@ts-ignore
                currentMonthBalance.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
              ) : (
                <CircularProgress color="primary" />
              )}
            </Typography>
            <Typography variant="subtitle1" color="#bdbdbd" gutterBottom>
              Available balance on {dayjs().format("DD MMMM YYYY")}
            </Typography>
            <Divider sx={{ my: 3, backgroundColor: "#404040" }} />
            <Typography variant="h6" gutterBottom>
              Please review your payout details. If everything is correct,
              request the payment.
            </Typography>
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                //@ts-ignore
                disabled={currentMonthBalance < 50}
                onClick={handleRequestPayment}
                fullWidth
                sx={{
                  padding: 1.5,
                  fontSize: 18,
                  backgroundColor: "#ff6f61",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#ff4c3b",
                  },
                }}
              >
                Request Payment
              </Button>

              {
                //@ts-ignore
                currentMonthBalance < 50 && (
                  <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                    <strong>Payment not available:</strong> Your balance must
                    exceed the threshold of $50.00.
                  </Typography>
                )
              }
            </Box>
            <Divider sx={{ my: 3, backgroundColor: "#404040" }} />
            <Box textAlign="center">
              <Typography variant="body1">
                <Button
                  href="/transaction-history"
                  variant="outlined"
                  color="primary"
                  sx={{
                    borderColor: "#ff6f61",
                    color: "#ff6f61",
                    "&:hover": {
                      borderColor: "#ff4c3b",
                      color: "#ff4c3b",
                    },
                    padding: 1,
                    fontSize: 16,
                  }}
                >
                  View Transaction History & Invoices
                </Button>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <PaymentMethodModal
        open={modalOpen}
        onClose={handleCloseModal}
        currentMonthBalance={currentMonthBalance}
      />
    </Box>
  );
};

export default PaymentOperations;
