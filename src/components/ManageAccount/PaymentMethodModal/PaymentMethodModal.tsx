/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useGetMyAccountsQuery } from "@/redux/slices/bank/bankApi";
import { useRequestPaymentMutation } from "@/redux/slices/financial/financialApi";
import {
  Box,
  Button,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

const PaymentMethodModal = ({ open, onClose, currentMonthBalance }: any) => {
  const [paymentMethod, setPaymentMethod] = useState();
  const { data: accountData } = useGetMyAccountsQuery({});
  // console.log(paymentMethod);
  //@ts-ignore
  const accounts = accountData?.data?.data;
  const [requestPayment, { isLoading }] = useRequestPaymentMutation();
  const onPaymentMethodChange = (e: any) => {
    e.preventDefault();

    setPaymentMethod(e.target.value);
  };
  const handlePayment = async () => {
    try {
      const payload = {
        bankId: paymentMethod?._id,
        accountNumber: paymentMethod?.accountNumber,
        providerName: paymentMethod?.providerName,
        currentMonthBalance: currentMonthBalance && currentMonthBalance,
      };
      const res = await requestPayment(payload);

      if (res?.data?.success === true) {
        toast.success("Request Sent Successful");
        onClose();
      }
      if (res?.error) {
        //@ts-ignore
        toast.error(res?.error?.data?.message);
        onClose();
      }
    } catch (error: any) {
      console.log(error, "Error");
      toast.error(error?.message);
    }
  };
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="payment-method-modal-title"
      aria-describedby="payment-method-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="payment-method-modal-title" variant="h6" component="h2">
          Select Payment Method
        </Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="payment-method-select-label">
            Payment Method
          </InputLabel>
          <Select
            labelId="payment-method-select-label"
            id="payment-method-select"
            value={paymentMethod}
            label="Payment Method"
            onChange={onPaymentMethodChange}
          >
            <MenuItem value={accounts?.bankAccount}>Bank Transfer</MenuItem>
            <MenuItem value={accounts?.mobileBankAccountAccount}>
              Mobile Banking
            </MenuItem>
            <MenuItem value={accounts?.pioneerAccount}>Payoneer</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handlePayment}>
            {isLoading ? "Sending..." : "Confirm"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PaymentMethodModal;
