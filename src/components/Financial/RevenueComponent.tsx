import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
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

  const [currentMonthBalance, setCurrentMonthBalance] = useState(null);

  return (
    <Box
      m={3}
      display="flex"
      justifyContent="space-around"
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
          padding: 2,
          width: {
            xs: "100%",
            sm: "45%",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: 2,
          marginBottom: {
            xs: 2,
            sm: 0,
          },
        }}
      >
        <Typography variant="h5" gutterBottom>
          Revenue of All Time
        </Typography>
        <Typography variant="h3" color="primary" gutterBottom>
          {`$ ${myAllTimeBalance?.data?.clientTotalBalance?.toFixed(2)}`}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Earned since joined
        </Typography>
      </Paper>
      <Paper
        sx={{
          padding: 2,
          width: {
            xs: "100%",
            sm: "45%",
          },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: 2,
          marginTop: {
            xs: 2,
            sm: 0,
          },
        }}
      >
        <Typography variant="h6" gutterBottom>
          Current Balance
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography
              variant="h4"
              color={currentMonthBalance >= 50 ? "success.main" : "error.main"}
              gutterBottom
            >
              {currentMonthBalance === null
                ? "0.00"
                : currentMonthBalance.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              disabled={currentMonthBalance < 50}
              onClick={handleRequestPayment}
              sx={{ mt: 2, width: "60%" }}
            >
              Request Payment
            </Button>
            {currentMonthBalance !== null && currentMonthBalance < 50 && (
              <Typography sx={{ mt: 2, width: "60%" }}>
                <span className="font-bold">Payment not available:</span> Your
                balance must exceed the contractual threshold of 50.00 $.
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
