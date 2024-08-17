import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

const UserDetails: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name="user"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="User ID"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
      />
    </div>
  );
};

export default UserDetails;
