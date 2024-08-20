// import { useEffect, useState } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Button,
//   CircularProgress,
//   Divider,
// } from "@mui/material";
// import dayjs from "dayjs";
// import { Link } from "react-router-dom";
// import PaymentMethodModal from "../PaymentMethodModal/PaymentMethodModal";
// import { useGetMyBalanceQuery } from "@/redux/slices/financial/financialApi";

// const PaymentOperations = () => {
//   const [currentMonthBalance, setCurrentMonthBalance] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   const { data: myBalance, isLoading } = useGetMyBalanceQuery({});
//   useEffect(() => {
//     if (myBalance) {
//       setCurrentMonthBalance(myBalance.data?.clientTotalBalance);
//     }
//   }, [myBalance]);
//   const handleRequestPayment = () => {
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };
//   return (
//     <Box
//       m={3}
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       width="100%"
//     >
//       <Paper
//         sx={{
//           padding: 3,
//           width: "100%",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           boxShadow: 3,
//           borderRadius: 2,
//           backgroundColor: "#f9f9f9",
//         }}
//       >
//         <Typography variant="h5" gutterBottom>
//           Available Balance
//         </Typography>
//         <Typography variant="h4" color="primary" gutterBottom>
//           {currentMonthBalance !== null
//             ? currentMonthBalance.toLocaleString("en-US", {
//                 style: "currency",
//                 currency: "USD",
//               })
//             : "$0.00"}
//         </Typography>
//         <Typography variant="subtitle1" color="textSecondary" gutterBottom>
//           Available balance on {dayjs().format("DD MMMM YYYY")}
//         </Typography>
//         <Divider sx={{ width: "100%", my: 2 }} />
//         <Typography variant="h6" gutterBottom>
//           Please cross check your payout details.If everything is OK, send the
//           Payment Request.
//         </Typography>

//         {currentMonthBalance === null ? (
//           <CircularProgress />
//         ) : (
//           <>
//             <Button
//               variant="contained"
//               color="primary"
//               disabled={currentMonthBalance < 50}
//               onClick={handleRequestPayment}
//               sx={{ mt: 2, width: "50%" }}
//             >
//               Request Payment
//             </Button>
//             {currentMonthBalance < 50 && (
//               <Typography
//                 variant="body2"
//                 color="error"
//                 sx={{ mt: 2, textAlign: "center" }}
//               >
//                 <span className="font-bold">Payment not available:</span>Your
//                 balance must exceed the contractual threshold of 50.00 $.
//               </Typography>
//             )}
//           </>
//         )}
//         <Divider sx={{ width: "100%", my: 2 }} />
//         <Link
//           to="/transaction-history"
//           className="hover:text-blue-600 mt-2 text-blue-800"
//         >
//           Transaction history & invoices
//         </Link>
//       </Paper>
//       <PaymentMethodModal open={modalOpen} onClose={handleCloseModal} />
//     </Box>
//   );
// };

// export default PaymentOperations;
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import dayjs from "dayjs";
import PaymentMethodModal from "../PaymentMethodModal/PaymentMethodModal";

// Mock data
const mockBalance = 120; // Mock balance for demonstration

const PaymentOperations = () => {
  const [currentMonthBalance, setCurrentMonthBalance] = useState<number | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);

  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setCurrentMonthBalance(mockBalance);
    }, 1000);
  }, []);

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
        backgroundColor: "#1b1b1b",
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
                disabled={currentMonthBalance < 50}
                onClick={handleRequestPayment}
                fullWidth
                sx={{
                  padding: 1.5,
                  fontSize: 18,
                  backgroundColor: "#ff6f61",
                  "&:hover": {
                    backgroundColor: "#ff4c3b",
                  },
                }}
              >
                Request Payment
              </Button>
              {currentMonthBalance < 50 && (
                <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                  <strong>Payment not available:</strong> Your balance must
                  exceed the threshold of $50.00.
                </Typography>
              )}
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
      <PaymentMethodModal open={modalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default PaymentOperations;
