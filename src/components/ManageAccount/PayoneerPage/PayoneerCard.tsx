import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { Email, AccountCircle } from "@mui/icons-material";
import { useGetMyAccountsQuery } from "@/redux/slices/bank/bankApi";

const PayoneerCard = () => {
  const { data: accounts } = useGetMyAccountsQuery({});
  const alreadyHaveAccount = accounts?.data?.data?.pioneerAccount;

  return (
    <Card elevation={5} sx={{ borderRadius: 2, backgroundColor: "grey.100" }}>
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Payoneer Account Information
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
                boxShadow: 2,
              }}
            >
              <AccountCircle
                fontSize="large"
                sx={{ color: "primary.main", marginRight: 2 }}
              />
              <Typography variant="body1">
                <strong>Account Number:</strong>{" "}
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
                boxShadow: 2,
              }}
            >
              <Email
                fontSize="large"
                sx={{ color: "primary.main", marginRight: 2 }}
              />
              <Typography variant="body1">
                <strong>Email:</strong> {alreadyHaveAccount?.email || "N/A"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PayoneerCard;
