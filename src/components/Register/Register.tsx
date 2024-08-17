// import { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
//   IconButton,
// } from "@material-ui/core";
// import { Visibility, VisibilityOff } from "@material-ui/icons";
// import { Link, useNavigate } from "react-router-dom";
// import newImg from "../../assets/register.jpg";
// import logoImg from "../../assets/1.jpg";
// import { useRegisterMutation } from "@/redux/slices/admin/userApi";
// import toast from "react-hot-toast";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: "100vh",
//     backgroundImage: `url(${newImg})`,
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
//     margin: "auto",
//     backgroundColor: "#ffffff",
//     zIndex: 2,
//     position: "relative",
//   },
//   form: {
//     marginTop: theme.spacing(3),
//   },
//   button: {
//     marginTop: theme.spacing(2),
//     height: 50,
//   },
//   logo: {
//     width: 30,
//   },
// }));

// const Register = () => {
//   const classes = useStyles();

//   const [formData, setFormData] = useState({
//     name: "",
//     phoneNumber: "",
//     email: "",
//     password: "",
//     acceptTerms: false,
//     showPassword: false,
//   });

//   const navigate = useNavigate();
//   const [register, { isLoading, data, isSuccess, error }] =
//     useRegisterMutation();

//   useEffect(() => {
//     if (isSuccess && data) {
//       localStorage.setItem("activationToken", data?.activationToken);
//       navigate("/auth/verify");
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

//   const handleChange = (e: any) => {
//     const { name, value, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: name === "acceptTerms" ? checked : value,
//     }));
//   };

//   const handlePasswordVisibility = () => {
//     setFormData((prevData) => ({
//       ...prevData,
//       showPassword: !prevData.showPassword,
//     }));
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();
//     const data = {
//       name: formData?.name,
//       phoneNumber: formData?.phoneNumber,
//       email: formData?.email,
//       password: formData?.password,
//     };
//     try {
//       await register(data);
//     } catch (error: any) {
//       toast.error(error?.message);
//     }
//   };

//   return (
//     <Grid
//       container
//       className={classes.root}
//       justify="center"
//       alignItems="center"
//     >
//       <Grid item xs={10} sm={8} md={6}>
//         <Paper className={classes.paper}>
//           <div className="flex justify-center items-center">
//             <img src={logoImg} alt="Company Logo" className={classes.logo} />
//             <Typography
//               variant="h5"
//               component="h2"
//               gutterBottom
//               className="pt-3"
//             >
//               Register
//             </Typography>
//           </div>
//           <form className={classes.form} onSubmit={handleSubmit}>
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="name"
//               label="Name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="phoneNumber"
//               label="Phone Number"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type={formData.showPassword ? "text" : "password"}
//               id="password"
//               value={formData.password}
//               onChange={handleChange}
//               InputProps={{
//                 endAdornment: (
//                   <IconButton onClick={handlePasswordVisibility}>
//                     {formData.showPassword ? <Visibility /> : <VisibilityOff />}
//                   </IconButton>
//                 ),
//               }}
//             />
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   color="primary"
//                   checked={formData.acceptTerms}
//                   onChange={handleChange}
//                   name="acceptTerms"
//                 />
//               }
//               label="I accept the Terms and Conditions"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               className={classes.button}
//               disabled={!formData.acceptTerms} // Disable button if terms not accepted
//             >
//               {isLoading ? "Please wait..." : "Register"}
//             </Button>
//             <Typography variant="body2" style={{ marginTop: 10 }}>
//               Already have an account? <Link to="/auth/login">Login</Link>
//             </Typography>
//           </form>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// export default Register;
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import newImg from "../../assets/register.jpg";
import logoImg from "../../assets/1.jpg";
import { useRegisterMutation } from "@/redux/slices/admin/userApi";
import toast from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${newImg})`,
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
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2),
      maxWidth: "90%",
    },
  },
  form: {
    marginTop: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(2),
    height: 50,
  },
  logo: {
    width: 30,
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
          <div className="flex justify-center items-center">
            <img src={logoImg} alt="Company Logo" className={classes.logo} />
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              className="pt-3"
            >
              Register
            </Typography>
          </div>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phoneNumber"
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={formData.showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handlePasswordVisibility}>
                    {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
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
              label="I accept the Terms and Conditions"
            />
            <span className="text-green-600">
              <Link to={"/auth/terms-conditions"}>See Terms & Conditions</Link>
            </span>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={!formData.acceptTerms} // Disable button if terms not accepted
            >
              {isLoading ? "Please wait..." : "Register"}
            </Button>
            <Typography variant="body2" style={{ marginTop: 10 }}>
              Already have an account? <Link to="/auth/login">Login</Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Register;
