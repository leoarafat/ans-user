import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Email, AccountCircle } from "@mui/icons-material";
import { useGetMyAccountsQuery } from "@/redux/slices/bank/bankApi";

const PayoneerCard = () => {
  const { data: accounts } = useGetMyAccountsQuery({});
  const alreadyHaveAccount = accounts?.data?.data?.pioneerAccount;

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Payoneer Account Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <AccountCircle fontSize="large" />
              <Typography variant="body1" sx={{ marginLeft: 1 }}>
                AccountNumber: {alreadyHaveAccount?.accountNumber}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Email fontSize="large" />
              <Typography variant="body1" sx={{ marginLeft: 1 }}>
                Email: {alreadyHaveAccount?.email}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PayoneerCard;
