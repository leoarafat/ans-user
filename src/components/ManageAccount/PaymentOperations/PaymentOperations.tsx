import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import PaymentMethodModal from "../PaymentMethodModal/PaymentMethodModal";
import { useGetMyBalanceQuery } from "@/redux/slices/financial/financialApi";

const PaymentOperations = () => {
  const [currentMonthBalance, setCurrentMonthBalance] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { data: myBalance, isLoading } = useGetMyBalanceQuery({});
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
      alignItems="center"
      width="100%"
    >
      <Paper
        sx={{
          padding: 3,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Available Balance
        </Typography>
        <Typography variant="h4" color="primary" gutterBottom>
          {currentMonthBalance !== null
            ? currentMonthBalance.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
            : "$0.00"}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Available balance on {dayjs().format("DD MMMM YYYY")}
        </Typography>
        <Divider sx={{ width: "100%", my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Please cross check your payout details.If everything is OK, send the
          Payment Request.
        </Typography>

        {currentMonthBalance === null ? (
          <CircularProgress />
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              disabled={currentMonthBalance < 50}
              onClick={handleRequestPayment}
              sx={{ mt: 2, width: "50%" }}
            >
              Request Payment
            </Button>
            {currentMonthBalance < 50 && (
              <Typography
                variant="body2"
                color="error"
                sx={{ mt: 2, textAlign: "center" }}
              >
                <span className="font-bold">Payment not available:</span>Your
                balance must exceed the contractual threshold of 50.00 $.
              </Typography>
            )}
          </>
        )}
        <Divider sx={{ width: "100%", my: 2 }} />
        <Link
          to="/transaction-history"
          className="hover:text-blue-600 mt-2 text-blue-800"
        >
          Transaction history & invoices
        </Link>
      </Paper>
      <PaymentMethodModal open={modalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default PaymentOperations;
