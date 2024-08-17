import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
  Link as MuiLink,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import newImg from "../../assets/signup.jpg";
import logoImg from "../../assets/ANS Music limited's logo.png";
import { useRegisterMutation } from "@/redux/slices/admin/userApi";
import toast from "react-hot-toast";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${newImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  },
  paper: {
    padding: theme.spacing(6),
    textAlign: "center",
    backgroundColor: "#ffffff",
    borderRadius: "15px",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
    position: "relative",
    zIndex: 2,
    maxWidth: 420,
  },
  logo: {
    width: 50,
    marginBottom: theme.spacing(2),
  },
  form: {
    marginTop: theme.spacing(4),
  },
  input: {
    marginBottom: theme.spacing(3),
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
    },
  },
  button: {
    marginTop: theme.spacing(4),
    padding: "12px 0",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  terms: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

const Register = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    acceptTerms: false,
    showPassword: false,
  });

  const navigate = useNavigate();
  const [register, { isLoading, data, isSuccess, error }] =
    useRegisterMutation();

  useEffect(() => {
    if (isSuccess && data) {
      localStorage.setItem("activationToken", data?.activationToken);
      navigate("/auth/verify");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      } else {
        console.error("Register error:", error);
      }
    }
  }, [isSuccess, data, error, navigate]);

  const handleChange = (e: any) => {
    const { name, value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "acceptTerms" ? checked : value,
    }));
  };

  const handlePasswordVisibility = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      password: formData.password,
    };
    try {
      await register(data);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Grid
      container
      className={classes.root}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={11} sm={8} md={6} lg={4}>
        <Paper className={classes.paper}>
          {/* <img src={logoImg} alt="Company Logo" className={classes.logo} /> */}
          <Typography variant="h4" component="h1" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Get started with your free account
          </Typography>
          <Divider style={{ margin: "20px 0" }} />
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={classes.input}
            />
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={classes.input}
            />
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={classes.input}
            />
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Password"
              name="password"
              type={formData.showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className={classes.input}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handlePasswordVisibility}>
                      {formData.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  name="acceptTerms"
                />
              }
              label={
                <Typography variant="body2">
                  I accept the{" "}
                  <MuiLink
                    component={Link}
                    to="/auth/terms-conditions"
                    className={classes.link}
                  >
                    Terms and Conditions
                  </MuiLink>
                </Typography>
              }
              className={classes.terms}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={!formData.acceptTerms || isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
          <Typography variant="body2" style={{ marginTop: 20 }}>
            Already have an account?{" "}
            <MuiLink component={Link} to="/auth/login" className={classes.link}>
              Login
            </MuiLink>
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
