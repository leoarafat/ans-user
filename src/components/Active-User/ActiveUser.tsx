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
import { useAppDispatch } from "@/redux/hooks";
import { storeUserInfo } from "@/redux/services/auth.service";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: "center",
    color: theme.palette.text.secondary,
    maxWidth: 400,
    margin: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Add some transparency to the background color
    borderRadius: 10, // Add border radius for a softer look
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
    color: "#333", // Darken the title color for better readability
  },
  subTitle: {
    marginBottom: theme.spacing(4),
    color: "#555", // Adjust the color of the subtitle for better contrast
  },
  form: {
    marginTop: theme.spacing(3),
  },
  button: {
    marginTop: theme.spacing(2),
    height: 60,
  },
  input: {
    width: 60,
    marginRight: 20,
    textAlign: "center",
    fontSize: 24,
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
    <Grid container justify="center" alignItems="center">
      <Grid item xs={10} sm={8} md={6}>
        <Paper className={classes.paper}>
          <Typography variant="h5" component="h2" className={classes.title}>
            OTP Verification
          </Typography>
          <Typography variant="body1" className={classes.subTitle}>
            Thank you for registering with us. Please type the OTP as shared on
            your email.
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <div>
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
              color="primary"
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
