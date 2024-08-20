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
            Add Mobile Banking Account
          </Typography>
          <form onSubmit={handleAddMobileBanking}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="accountName"
                  label="Name"
                  variant="outlined"
                  value={mobileBankingData.accountName}
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
                  name="accountNumber"
                  label="Phone Number"
                  variant="outlined"
                  value={mobileBankingData.accountNumber}
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
                <InputLabel
                  id="providerNameLabel"
                  sx={{ fontSize: "14px", color: "#555", mb: 1 }}
                >
                  Mobile Banking Method
                </InputLabel>
                <Select
                  fullWidth
                  name="providerName"
                  label="Mobile Banking Provider"
                  variant="outlined"
                  value={mobileBankingData.providerName}
                  onChange={handleChange}
                  sx={{
                    fontSize: "16px",
                    padding: "12px",
                    backgroundColor: "#fafafa",
                    borderColor: "#ddd",
                  }}
                >
                  {mobileBankingProviders.map((provider, index) => (
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
                  sx={{
                    padding: "10px 0",
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
                    : "Add Mobile Banking Account"}
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
