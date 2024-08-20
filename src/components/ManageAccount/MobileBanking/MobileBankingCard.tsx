import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { PhoneAndroid, AccountCircle, Info } from "@mui/icons-material";
import { useGetMyAccountsQuery } from "@/redux/slices/bank/bankApi";

const MobileBankingCard = () => {
  const { data: accounts } = useGetMyAccountsQuery({});
  const alreadyHaveAccount = accounts?.data?.data?.mobileBankAccountAccount;

  return (
    <Card elevation={5} sx={{ borderRadius: 2, backgroundColor: "grey.100" }}>
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Mobile Banking Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                backgroundColor: "white",
                padding: 2,
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <AccountCircle
                fontSize="large"
                sx={{ color: "primary.main", marginRight: 2 }}
              />
              <Typography variant="body1">
                <strong>Name:</strong>{" "}
                {alreadyHaveAccount?.accountName || "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                backgroundColor: "white",
                padding: 2,
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <PhoneAndroid
                fontSize="large"
                sx={{ color: "primary.main", marginRight: 2 }}
              />
              <Typography variant="body1">
                <strong>Phone Number:</strong>{" "}
                {alreadyHaveAccount?.accountNumber || "N/A"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              alignItems="center"
              sx={{
                backgroundColor: "white",
                padding: 2,
                borderRadius: 1,
                boxShadow: 1,
              }}
            >
              <Info
                fontSize="large"
                sx={{ color: "primary.main", marginRight: 2 }}
              />
              <Typography variant="body1">
                <strong>Provider Name:</strong>{" "}
                {alreadyHaveAccount?.providerName || "N/A"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MobileBankingCard;
