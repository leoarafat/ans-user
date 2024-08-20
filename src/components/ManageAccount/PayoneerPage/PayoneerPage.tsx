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

interface PayoneerData {
  accountNumber: string;
  email: string;
}

const PayoneerPage = () => {
  const [payoneerData, setPayoneerData] = useState<PayoneerData>({
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
        toast.success("Payoneer Account added successfully!");
        setPayoneerData({
          accountNumber: "",
          email: "",
        });
      } else {
        toast.error("Failed to add Payoneer Account. Please try again.");
      }
    } catch (error: any) {
      console.error("Failed to add Payoneer Account:", error);
      toast.error(error?.message || "An error occurred.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPayoneerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ padding: 4, display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}
          >
            Add Payoneer Account
          </Typography>
          <form onSubmit={handleAddPayoneerAccount}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="accountNumber"
                  label="Payoneer ID"
                  variant="outlined"
                  value={payoneerData.accountNumber}
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { fontSize: "14px", color: "#555" },
                  }}
                  InputProps={{
                    style: { fontSize: "16px", padding: "12px" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="email"
                  label="Payoneer Email"
                  variant="outlined"
                  value={payoneerData.email}
                  onChange={handleChange}
                  InputLabelProps={{
                    style: { fontSize: "14px", color: "#555" },
                  }}
                  InputProps={{
                    style: { fontSize: "16px", padding: "12px" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={alreadyHaveAccount}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    padding: "12px",
                    fontSize: "16px",
                    textTransform: "none",
                    backgroundColor: alreadyHaveAccount ? "#ccc" : "#1976d2",
                    "&:hover": {
                      backgroundColor: alreadyHaveAccount ? "#ccc" : "#1565c0",
                    },
                  }}
                >
                  {alreadyHaveAccount
                    ? "Account Exists"
                    : "Add Payoneer Account"}
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
