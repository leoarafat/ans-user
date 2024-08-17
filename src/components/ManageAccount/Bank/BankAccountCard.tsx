import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import { AccountBalance, Phone, AccountCircle } from "@mui/icons-material";
import { useGetMyAccountsQuery } from "@/redux/slices/bank/bankApi";

const BankAccountCard = () => {
  const { data: accounts } = useGetMyAccountsQuery({});
  const alreadyHaveAccount = accounts?.data?.data?.bankAccount;
  console.log(alreadyHaveAccount);

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Bank Account Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <AccountBalance fontSize="large" />
              <Typography variant="body1" sx={{ marginLeft: 1 }}>
                Bank: {alreadyHaveAccount?.bankName}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <AccountBalance fontSize="large" />
              <Typography variant="body1" sx={{ marginLeft: 1 }}>
                Branch: {alreadyHaveAccount?.branchName}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <AccountCircle fontSize="large" />
              <Typography variant="body1" sx={{ marginLeft: 1 }}>
                Account Name: {alreadyHaveAccount?.accountName}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Phone fontSize="large" />
              <Typography variant="body1" sx={{ marginLeft: 1 }}>
                Phone Number: {alreadyHaveAccount?.phoneNumber}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Phone fontSize="large" />
              <Typography variant="body1" sx={{ marginLeft: 1 }}>
                Account Number: {alreadyHaveAccount?.accountNumber}
              </Typography>
            </Box>
          </Grid>
          {/* Add more fields/icons if needed */}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BankAccountCard;
