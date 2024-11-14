import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

const TrackDetails: React.FC = () => {
  const { control } = useFormContext();

  return (
    <div>
      <Controller
        name="trackType"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Track Type"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Controller
        name="isRelease"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Is Release"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Controller
        name="instrumental"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Instrumental"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Controller
        name="songType"
        control={control}
        defaultValue="single"
        render={({ field }) => (
          <TextField
            {...field}
            label="Song Type"
            variant="outlined"
            fullWidth
            margin="normal"
            disabled
          />
        )}
      />
    </div>
  );
};

export default TrackDetails;
