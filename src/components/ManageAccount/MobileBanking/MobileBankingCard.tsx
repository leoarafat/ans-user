import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { PhoneAndroid, AccountCircle } from "@mui/icons-material";
import { useGetMyAccountsQuery } from "@/redux/slices/bank/bankApi";

const MobileBankingCard = () => {
  const { data: accounts } = useGetMyAccountsQuery({});
  const alreadyHaveAccount = accounts?.data?.data?.mobileBankAccountAccount;

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Mobile Banking Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <AccountCircle fontSize="large" />
              <Typography variant="body1" sx={{ marginLeft: 1 }}>
                Name: {alreadyHaveAccount?.accountName}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <PhoneAndroid fontSize="large" />
              <Typography variant="body1" sx={{ marginLeft: 1 }}>
                Phone Number: {alreadyHaveAccount?.accountNumber}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <AccountCircle fontSize="large" />
              <Typography variant="body1" sx={{ marginLeft: 1 }}>
                Mobile Banking Provider Name: {alreadyHaveAccount?.providerName}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MobileBankingCard;
