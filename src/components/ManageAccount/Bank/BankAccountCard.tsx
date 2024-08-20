import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { AccountBalance, Phone, AccountCircle } from "@mui/icons-material";
import { useGetMyAccountsQuery } from "@/redux/slices/bank/bankApi";

const BankAccountCard = () => {
  const { data: accounts } = useGetMyAccountsQuery({});
  const alreadyHaveAccount = accounts?.data?.data?.bankAccount;

  return (
    <Card
      elevation={6}
      sx={{
        // maxWidth: 700,
        margin: "auto",
        borderRadius: 2,
        backgroundColor: "background.paper",
        boxShadow: 6,
      }}
    >
      <CardContent>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "primary.main", mb: 2 }}
        >
          Bank Account Information
        </Typography>
        <Divider sx={{ marginY: 2, borderColor: "divider" }} />
        <Grid container spacing={3}>
          {alreadyHaveAccount ? (
            <>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    padding: 2,
                    borderRadius: 1,
                    boxShadow: 1,
                    gap: 2,
                  }}
                >
                  <AccountBalance
                    fontSize="large"
                    sx={{ color: "primary.main" }}
                  />
                  <Typography variant="body1">
                    <strong>Bank:</strong>{" "}
                    {alreadyHaveAccount.bankName || "N/A"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    padding: 2,
                    borderRadius: 1,
                    boxShadow: 1,
                    gap: 2,
                  }}
                >
                  <AccountBalance
                    fontSize="large"
                    sx={{ color: "primary.main" }}
                  />
                  <Typography variant="body1">
                    <strong>Branch:</strong>{" "}
                    {alreadyHaveAccount.branchName || "N/A"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    padding: 2,
                    borderRadius: 1,
                    boxShadow: 1,
                    gap: 2,
                  }}
                >
                  <AccountCircle
                    fontSize="large"
                    sx={{ color: "primary.main" }}
                  />
                  <Typography variant="body1">
                    <strong>Account Name:</strong>{" "}
                    {alreadyHaveAccount.accountName || "N/A"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    padding: 2,
                    borderRadius: 1,
                    boxShadow: 1,
                    gap: 2,
                  }}
                >
                  <Phone fontSize="large" sx={{ color: "primary.main" }} />
                  <Typography variant="body1">
                    <strong>Phone Number:</strong>{" "}
                    {alreadyHaveAccount.phoneNumber || "N/A"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    padding: 2,
                    borderRadius: 1,
                    boxShadow: 1,
                    gap: 2,
                  }}
                >
                  <Phone fontSize="large" sx={{ color: "primary.main" }} />
                  <Typography variant="body1">
                    <strong>Account Number:</strong>{" "}
                    {alreadyHaveAccount.accountNumber || "N/A"}
                  </Typography>
                </Box>
              </Grid>
            </>
          ) : (
            <Grid item xs={12}>
              <Typography variant="body1" color="textSecondary">
                No bank account information available.
              </Typography>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BankAccountCard;
