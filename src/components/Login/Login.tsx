/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { storeUserInfo } from "@/redux/services/auth.service";
import toast from "react-hot-toast";
import loginImage from "../../assets/signup.jpg";
import logo from "../../assets/ANS Music limited's logo.png";
import { useUserLoginMutation } from "@/redux/slices/admin/userApi";
interface ServerError {
  field?: string;
  message?: string;
}
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${loginImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "#f0f0f0",
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
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.primary,
    maxWidth: 420,
    margin: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    zIndex: 2,
    borderRadius: "15px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
  },
  form: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(3),
    height: 50,
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      background: "linear-gradient(45deg, #FE6B8B 60%, #FF8E53 100%)",
    },
  },
  logo: {
    width: 100,
    margin: "0 auto",
    display: "block",
    marginBottom: theme.spacing(2),
  },
  inputField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FF8E53",
      },
      "&:hover fieldset": {
        borderColor: "#FE6B8B",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#FF8E53",
      },
    },
  },
  link: {
    color: "#FF8E53",
    fontWeight: "bold",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  eyeIcon: {
    color: "#FF8E53",
  },
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [userLogin, { isLoading, data, isSuccess, error }] =
    useUserLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    const storedPassword = localStorage.getItem("rememberedPassword");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
    if (storedPassword) {
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await userLogin({ email, password }).unwrap();
      toast.success("Login Successful");

      storeUserInfo({ accessToken: result.data.accessToken });
      localStorage.setItem("id", result.data.id);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
      window.location.href = "/";
    } catch (err: any) {
      if (!err.response && err instanceof TypeError) {
        toast.error(
          "CORS error: Unable to connect to the server. Please check your network settings or contact support."
        );
      } else if (err.name === "NetworkError" || !err.status) {
        toast.error("Network error. Please check your internet connection.");
      } else if (err.status === 400) {
        const serverErrors = err.data?.errors;
        if (serverErrors && Array.isArray(serverErrors)) {
          const formattedErrors: { email?: string; password?: string } = {};
          serverErrors.forEach((error: ServerError) => {
            if (error.field && error.message) {
              //@ts-ignore
              formattedErrors[error.field] = error.message;
            }
          });

          toast.error("Please fix the highlighted errors.");
        } else {
          toast.error(err.data?.message || "Invalid credentials.");
        }
      } else if (err.status >= 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error(
          err?.data?.message || "Login failed. Please try again later."
        );
      }
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper className={classes.paper}>
          <img src={logo} alt="Company Logo" className={classes.logo} />
          <Typography variant="h5" component="h2" gutterBottom>
            Welcome Back!
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              className={classes.inputField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className={classes.inputField}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      className={classes.eyeIcon}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              className={classes.button}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
            <Grid
              container
              direction="column"
              alignItems="center"
              style={{ marginTop: "20px" }}
            >
              <Grid item>
                <Link to="/auth/forget-password" className={classes.link}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/auth/register" className={classes.link}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Login;
