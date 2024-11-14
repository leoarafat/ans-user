export const inputStyles = {
  backgroundColor: "rgba(255, 255, 255, 0.85)",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  "& .MuiFilledInput-root": {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    "&.Mui-focused": {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
  },
  "& .MuiFormLabel-root": {
    color: "#333",
  },
  "& .MuiInputBase-input": {
    color: "#333",
  },
};
