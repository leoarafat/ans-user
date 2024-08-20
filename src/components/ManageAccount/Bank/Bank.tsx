import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import { useState, FormEvent } from "react";
import { bangladeshiBanks } from "@/MockData/MockData";
import {
  useAddBankAccountMutation,
  useGetMyAccountsQuery,
} from "@/redux/slices/bank/bankApi";
import toast from "react-hot-toast";

interface AccountData {
  accountName: string;
  bankName: string;
  branchName: string;
  accountNumber: string;
  phoneNumber: string;
}

const Bank = () => {
  const [accountData, setAccountData] = useState<AccountData>({
    accountName: "",
    bankName: "",
    branchName: "",
    accountNumber: "",
    phoneNumber: "",
  });

  const [addBankAccount] = useAddBankAccountMutation();
  const { data: accounts } = useGetMyAccountsQuery({});
  const alreadyHaveAccount = accounts?.data?.data?.bankAccount?._id;

  const handleAddAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await addBankAccount(accountData).unwrap();
      if (res?.success) {
        toast.success("Bank account added successfully!");
        setAccountData({
          accountName: "",
          bankName: "",
          branchName: "",
          accountNumber: "",
          phoneNumber: "",
        });
      } else {
        toast.error("Failed to add bank account. Please try again.");
      }
    } catch (error: any) {
      console.error("Failed to add bank account:", error);
      toast.error(error?.message || "An error occurred.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAccountData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleBankNameChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setAccountData((prevData) => ({
      ...prevData,
      bankName: e.target.value as string,
    }));
  };

  return (
    <Box sx={{ padding: 4, display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 600,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}
          >
            Add Bank Account
          </Typography>
          <form onSubmit={handleAddAccount}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="accountName"
                  label="Account Name"
                  variant="outlined"
                  value={accountData.accountName}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    style: { fontSize: "14px", color: "#555" },
                  }}
                  InputProps={{
                    style: { fontSize: "16px", padding: "12px" },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel
                  id="bankNameLabel"
                  sx={{ fontSize: "14px", color: "#555", mb: 1 }}
                >
                  Bank Name
                </InputLabel>
                <Select
                  fullWidth
                  labelId="bankNameLabel"
                  id="bankName"
                  variant="outlined"
                  value={accountData.bankName}
                  onChange={handleBankNameChange}
                  sx={{
                    fontSize: "16px",
                    padding: "12px",
                    backgroundColor: "#fafafa",
                    borderColor: "#ddd",
                  }}
                >
                  {bangladeshiBanks.map((bank, index) => (
                    <MenuItem key={index} value={bank}>
                      {bank}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="branchName"
                  label="Branch"
                  variant="outlined"
                  value={accountData.branchName}
                  onChange={handleInputChange}
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
                  id="accountNumber"
                  label="Account Number"
                  variant="outlined"
                  value={accountData.accountNumber}
                  onChange={handleInputChange}
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
                  id="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  value={accountData.phoneNumber}
                  onChange={handleInputChange}
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
                    padding: "10px 0",
                    fontSize: "16px",
                    textTransform: "none",
                    backgroundColor: alreadyHaveAccount ? "#ccc" : "#1976d2",
                  }}
                >
                  {alreadyHaveAccount ? "Account Exists" : "Add Account"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Bank;
