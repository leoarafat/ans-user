import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { Link, useNavigate } from "react-router-dom";
import { storeUserInfo } from "@/redux/services/auth.service";
import toast from "react-hot-toast";
import loginImage from "../../assets/signup.jpg";
import logo from "../../assets/ANS Music limited's logo.png";
import { useUserLoginMutation } from "@/redux/slices/admin/userApi";
import { Visibility, VisibilityOff } from "@material-ui/icons";

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
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
    maxWidth: 400,
    margin: "auto",
    backgroundColor: "#ffffff",
    zIndex: 2,
    position: "relative",
  },
  form: {
    marginTop: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(2),
    height: 50,
  },
  eyeIcon: {
    cursor: "pointer",
  },
  logo: {
    width: 30,
  },
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [userLogin, { isLoading, data, isSuccess, error }] =
    useUserLoginMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem("rememberedEmail");
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Login Successful");
      storeUserInfo({ accessToken: data?.data?.accessToken });
      navigate("/");
      window.location.reload();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [isSuccess, data, error, navigate]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      await userLogin({ email: email.value, password: password.value });
    } catch (err: any) {
      toast.error(err.message);
    }
    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email.value);
    } else {
      localStorage.removeItem("rememberedEmail");
    }
  };

  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>
          <div className="flex justify-center items-center">
            <img src={logo} alt="Company Logo" className={classes.logo} />
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              className="pt-3 font-semibold"
            >
              Login
            </Typography>
          </div>
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
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
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
              color="primary"
              disabled={isLoading}
              className={classes.button}
            >
              {isLoading ? "Loading..." : "Sign In"}
            </Button>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                <Link to="/auth/forget-password">Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to="/auth/register">
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
// import React, { useState, useEffect } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Grid,
//   IconButton,
//   InputAdornment,
//   Paper,
//   TextField,
//   Typography,
// } from "@material-ui/core";
// import { Link, useNavigate } from "react-router-dom";
// import { storeUserInfo } from "@/redux/services/auth.service";
// import toast from "react-hot-toast";
// import loginImage from "../../assets/login.jpg";
// import logo from "../../assets/1.jpg";
// import { useUserLoginMutation } from "@/redux/slices/admin/userApi";
// import { Visibility, VisibilityOff } from "@material-ui/icons";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     minHeight: "100vh",
//     backgroundImage: `url(${loginImage})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundColor: "#f0f0f0",
//     position: "relative",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     "&:before": {
//       content: '""',
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//     },
//   },
//   paper: {
//     padding: theme.spacing(4),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//     maxWidth: 400,
//     margin: theme.spacing(2),
//     backgroundColor: "#ffffff",
//     zIndex: 2,
//     position: "relative",
//     [theme.breakpoints.down("xs")]: {
//       padding: theme.spacing(3),
//     },
//   },
//   form: {
//     marginTop: theme.spacing(3),
//   },
//   button: {
//     marginTop: theme.spacing(2),
//     height: 50,
//   },
//   eyeIcon: {
//     cursor: "pointer",
//   },
//   logo: {
//     width: 30,
//   },
// }));

// const Login = () => {
//   const classes = useStyles();
//   const navigate = useNavigate();

//   const [userLogin, { isLoading, data, isSuccess, error }] =
//     useUserLoginMutation();

//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);

//   useEffect(() => {
//     const storedEmail = localStorage.getItem("rememberedEmail");
//     if (storedEmail) {
//       setEmail(storedEmail);
//       setRememberMe(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (isSuccess && data) {
//       toast.success("Login Successful");
//       storeUserInfo({ accessToken: data?.data?.accessToken });
//       navigate("/");
//       window.location.reload();
//     }
//     if (error) {
//       if ("data" in error) {
//         const errorData = error as any;
//         toast.error(errorData.data.message);
//       } else {
//         console.error("Login error:", error);
//       }
//     }
//   }, [isSuccess, data, error, navigate]);

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     const { email, password } = e.target.elements;
//     try {
//       await userLogin({ email: email.value, password: password.value });
//     } catch (err: any) {
//       toast.error(err.message);
//     }
//     if (rememberMe) {
//       localStorage.setItem("rememberedEmail", email.value);
//     } else {
//       localStorage.removeItem("rememberedEmail");
//     }
//   };

//   return (
//     <Grid container className={classes.root}>
//       <Grid item xs={11} sm={8} md={6} lg={4}>
//         <Paper className={classes.paper}>
//           <div className="flex justify-center items-center">
//             <img src={logo} alt="Company Logo" className={classes.logo} />
//             <Typography
//               variant="h5"
//               component="h2"
//               gutterBottom
//               className="pt-3 font-semibold"
//             >
//               Login
//             </Typography>
//           </div>
//           <form className={classes.form} onSubmit={handleSubmit}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="password"
//               label="Password"
//               name="password"
//               type={showPassword ? "text" : "password"}
//               autoComplete="current-password"
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={() => setShowPassword(!showPassword)}>
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   color="primary"
//                 />
//               }
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               disabled={isLoading}
//               className={classes.button}
//             >
//               {isLoading ? "Loading..." : "Sign In"}
//             </Button>
//             <Grid container direction="column" alignItems="center">
//               <Grid item>
//                 <Link to="/auth/forget-password">Forgot password?</Link>
//               </Grid>
//               <Grid item>
//                 <Link to="/auth/register">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
//           </form>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default Login;
