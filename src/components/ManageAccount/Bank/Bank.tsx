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
    <Box sx={{ padding: 3 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add Account
          </Typography>
          <form onSubmit={handleAddAccount}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="accountName"
                  label="Account Name"
                  variant="outlined"
                  margin="normal"
                  value={accountData.accountName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="bankNameLabel">Bank Name</InputLabel>
                <Select
                  fullWidth
                  labelId="bankNameLabel"
                  id="bankName"
                  variant="outlined"
                  value={accountData.bankName}
                  onChange={handleBankNameChange}
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
                  margin="normal"
                  value={accountData.branchName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="accountNumber"
                  label="Account Number"
                  variant="outlined"
                  margin="normal"
                  value={accountData.accountNumber}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  variant="outlined"
                  margin="normal"
                  value={accountData.phoneNumber}
                  onChange={handleInputChange}
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
                  Add Account
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
