/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Typography,
  LinearProgress,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import VideoCountry from "./CountriesPage";

const DistributorForm = ({ classes, control, uploadProgress }: any) => {
  const [selectCountry, setSelectCountry] = useState(false);
  console.log(selectCountry);
  return (
    <>
      {" "}
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel required id="visibility-label">
            Visibility
          </InputLabel>
          <Controller
            name="visibility"
            control={control}
            render={({ field }) => (
              <Select
                style={{ borderRadius: "30px" }}
                {...field}
                labelId="visibility-label"
                label="Visibility"
              >
                <MenuItem value="Default">Default</MenuItem>
                <MenuItem value="Unlisted on YouTube">
                  Unlisted on YouTube
                </MenuItem>
                <MenuItem value="Unlisted on Video">Unlisted on Video</MenuItem>
                <MenuItem value="Unlisted on YouTube/Vevo">
                  Unlisted on YouTube/Vevo
                </MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="storeReleaseDate"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.input}
              {...field}
              label="Store Release Date"
              variant="outlined"
              fullWidth
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="territoryPolicy?-label">Territory Policy</InputLabel>
          <Controller
            name="territoryPolicy"
            control={control}
            render={({ field }) => (
              <Select
                style={{ borderRadius: "30px" }}
                {...field}
                labelId="territoryPolicy?-label"
                label="territoryPolicy"
              >
                <MenuItem
                  onClick={() => setSelectCountry(false)}
                  value="Monetize Worldwide"
                >
                  Monetize Worldwide
                </MenuItem>
                <MenuItem
                  onClick={() => setSelectCountry(true)}
                  value="Select Country"
                >
                  Select Country
                </MenuItem>
                <MenuItem
                  onClick={() => setSelectCountry(false)}
                  value="Block Worldwide"
                >
                  Block Worldwide
                </MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Grid>
      <Grid>{selectCountry && <VideoCountry />}</Grid>
      <Grid item xs={12}>
        <Box>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="body2" color="textSecondary">
            {uploadProgress}%
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          //@ts-ignore
          disabled={uploadProgress}
        >
          {uploadProgress ? "Uploading..." : "Upload Video"}
        </Button>
      </Grid>
    </>
  );
};

export default DistributorForm;
