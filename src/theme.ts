// src/theme.js

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4F46E5", // Indigo
    },
    secondary: {
      main: "#10B981", // Green
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
