/* eslint-disable @typescript-eslint/ban-ts-comment */

import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Grid,
  Paper,
  Typography,
  Input,
  Link,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useVerifyMutation } from "@/redux/slices/admin/userApi";
import toast from "react-hot-toast";
import { storeUserInfo } from "@/redux/services/auth.service";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(6),
    textAlign: "center",
    color: theme.palette.text.secondary,
    maxWidth: 400,
    margin: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.95)", // More transparency
    borderRadius: 15, // Softer corners
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: "bold",
    color: "#333",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "1.75rem",
  },
  subTitle: {
    marginBottom: theme.spacing(4),
    color: "#666",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "1rem",
  },
  form: {
    marginTop: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(4),
    height: 55,
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    borderRadius: 8,
    "&:hover": {
      background: "linear-gradient(45deg, #21CBF3 30%, #2196F3 90%)",
    },
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(4),
  },
  input: {
    width: 55,
    height: 55,
    margin: "0 8px",
    textAlign: "center",
    fontSize: "1.5rem",
    borderRadius: 8,
    border: "1px solid #ccc",
    "&:focus": {
      borderColor: "#2196F3",
    },
  },
  goBack: {
    marginTop: theme.spacing(2),
    color: "#666",
  },
}));

const Verify = () => {
  const classes = useStyles();
  const [codes, setCodes] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const activation_token = localStorage.getItem("activationToken");
  const navigate = useNavigate();
  const [verify, { isLoading, data, isSuccess, error }] = useVerifyMutation();

  useEffect(() => {
    if (isSuccess && data) {
      toast.success("Register Successful");
      storeUserInfo({ accessToken: data?.data?.accessToken });
      localStorage.removeItem("activationToken");
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

  const handleChange = (index: any, value: any) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);

    // Move focus to the next input field
    if (value !== "" && index < inputRefs.length - 1) {
      //@ts-ignore
      inputRefs[index + 1].current.focus();
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const code = codes.join("");
    const codeData = {
      activation_code: code,
      activation_token,
    };
    try {
      await verify(codeData);
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={11} sm={8} md={6} lg={4}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h2" className={classes.title}>
            OTP Verification
          </Typography>
          <Typography variant="body1" className={classes.subTitle}>
            Please enter the OTP sent to your email.
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.inputContainer}>
              {codes.map((code, index) => (
                <Input
                  type="number"
                  key={index}
                  className={classes.input}
                  inputRef={inputRefs[index]}
                  value={code}
                  onChange={(e) => handleChange(index, e.target.value)}
                  inputProps={{ maxLength: 1 }}
                />
              ))}
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.button}
              disabled={codes.some((code) => code === "")}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
            <Typography variant="body2" className={classes.goBack}>
              <Link href="/auth/register">Go back</Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Verify;
