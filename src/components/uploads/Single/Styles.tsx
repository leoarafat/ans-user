import { makeStyles } from "@material-ui/core/styles";

export const useCustomStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(4),
  },
  input: {
    // marginBottom: theme.spacing(3),
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
    },
  },
  button: {
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
