import { Box, Typography } from "@mui/material";

const ColorPicker = ({ label, color, onChange }: any) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
      <Typography sx={{ width: "150px" }}>{label}:</Typography>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "50px",
          height: "30px",
          border: "none",
          padding: 0,
          background: "none",
        }}
      />
    </Box>
  );
};

export default ColorPicker;
