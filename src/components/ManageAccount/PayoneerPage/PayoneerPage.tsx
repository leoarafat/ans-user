import { FormEvent, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import {
  useAddPioneerAccountMutation,
  useGetMyAccountsQuery,
} from "@/redux/slices/bank/bankApi";
import toast from "react-hot-toast";

const PayoneerPage = () => {
  const [payoneerData, setPayoneerData] = useState({
    accountNumber: "",
    email: "",
  });
  const [addPioneerAccount] = useAddPioneerAccountMutation();
  const { data: accounts } = useGetMyAccountsQuery({});

  const alreadyHaveAccount = accounts?.data?.data?.pioneerAccount?._id;
  const handleAddPayoneerAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await addPioneerAccount(payoneerData).unwrap();
      if (res?.success) {
        toast.success("Pioneer Account added successfully!");
        setPayoneerData({
          accountNumber: "",
          email: "",
        });
      } else {
        toast.error("Failed to add Pioneer Account. Please try again.");
      }
    } catch (error: any) {
      console.error("Failed to add Pioneer Account:", error);
      toast.error(error?.message || "An error occurred.");
    }
  };

  const handleChange = (e: any) => {
    setPayoneerData({
      ...payoneerData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add Payoneer Account
          </Typography>
          <form onSubmit={handleAddPayoneerAccount}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="accountNumber"
                  name="accountNumber"
                  label="Payoneer ID"
                  variant="outlined"
                  margin="normal"
                  value={payoneerData.accountNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Payoneer Email"
                  variant="outlined"
                  margin="normal"
                  value={payoneerData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={alreadyHaveAccount}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add Payoneer Account
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PayoneerPage;
