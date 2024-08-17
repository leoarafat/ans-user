import React, { useState } from "react";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import toast from "react-hot-toast";
import AuthWrapper from "@/components/share/AuthWrapper";
import Title from "@/components/share/Title";
import { useForgetPasswordMutation } from "@/redux/slices/admin/settingApi";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      localStorage.setItem("email", email);
      const res = await forgetPassword({ email });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <AuthWrapper>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Title>Forget Password</Title>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Please enter your email and click send
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={handleEmailChange}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isLoading}
            sx={{ height: 50, fontSize: 16 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Send"
            )}
          </Button>
        </Box>
      </Container>
    </AuthWrapper>
  );
};

export default ForgetPassword;
