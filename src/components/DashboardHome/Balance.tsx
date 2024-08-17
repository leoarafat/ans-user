import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Button,
} from "@mui/material";
const Balance = () => {
  return (
    <Grid item xs={12} md={6}>
      {/* Balance */}
      <Paper sx={{ padding: 2, textAlign: "center" }}>
        <Typography variant="h6">Balance</Typography>
        <Box sx={{ marginY: 2 }}>
          <CircularProgress
            variant="determinate"
            value={100}
            size={100}
            sx={{ color: "green" }}
          />
          <Typography variant="h4" sx={{ position: "relative", top: -75 }}>
            ₿100
          </Typography>
        </Box>
        <Button variant="contained" color="primary">
          My Balance
        </Button>
      </Paper>
    </Grid>
  );
};

export default Balance;
