import { useState, FormEvent, ChangeEvent } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { mobileBankingProviders } from "@/MockData/MockData";
import {
  useAddMobileBankAccountMutation,
  useGetMyAccountsQuery,
} from "@/redux/slices/bank/bankApi";
import toast from "react-hot-toast";

interface MobileBankingData {
  accountName: string;
  accountNumber: string;
  providerName: string;
}

const MobileBanking = () => {
  const [mobileBankingData, setMobileBankingData] = useState<MobileBankingData>(
    {
      accountName: "",
      accountNumber: "",
      providerName: "",
    }
  );

  const [addMobileBank] = useAddMobileBankAccountMutation();
  const { data: accounts } = useGetMyAccountsQuery({});
  const alreadyHaveAccount =
    accounts?.data?.data?.mobileBankAccountAccount?._id;
  const handleAddMobileBanking = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await addMobileBank(mobileBankingData).unwrap();
      if (res?.success) {
        toast.success("Mobile banking account added successfully!");
        setMobileBankingData({
          accountName: "",
          accountNumber: "",
          providerName: "",
        });
      } else {
        toast.error("Failed to add mobile banking account. Please try again.");
      }
    } catch (error: any) {
      console.error("Failed to add mobile banking account:", error);
      toast.error(error?.message || "An error occurred.");
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setMobileBankingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Add Mobile Banking Account
          </Typography>
          <form onSubmit={handleAddMobileBanking}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="accountName"
                  name="accountName"
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  value={mobileBankingData.accountName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="accountNumber"
                  name="accountNumber"
                  label="Phone Number"
                  variant="outlined"
                  margin="normal"
                  value={mobileBankingData.accountNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="bankNameLabel">Method</InputLabel>
                <Select
                  fullWidth
                  id="providerName"
                  name="providerName"
                  label="Mobile Banking Name"
                  variant="outlined"
                  value={mobileBankingData.providerName}
                  onChange={handleChange}
                >
                  {mobileBankingProviders?.map((provider, index) => (
                    <MenuItem key={index} value={provider}>
                      {provider}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={alreadyHaveAccount}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add Mobile Banking Account
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MobileBanking;
