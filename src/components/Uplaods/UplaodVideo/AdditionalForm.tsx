import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";

import { Controller } from "react-hook-form";
const AdditionalForm = ({ control, classes }: any) => {
  return (
    <>
      {" "}
      <Grid item xs={6}>
        <Controller
          name="upc"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.input}
              {...field}
              label="UPC Code"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="audioIsrc"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.input}
              {...field}
              label="Audio ISRC"
              variant="outlined"
              fullWidth
              required
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="version-label">Version</InputLabel>
          <Controller
            name="version"
            control={control}
            render={({ field }) => (
              <Select
                style={{ borderRadius: "30px" }}
                {...field}
                labelId="version-label"
                label="Version"
              >
                <MenuItem value="Lyrical Video">Lyrical Video</MenuItem>
                <MenuItem value="Interview">Interview</MenuItem>
                <MenuItem value="Lyrical Video">Lyrical Video</MenuItem>
                <MenuItem value="Official">Official</MenuItem>
                <MenuItem value="Live">Live</MenuItem>
                <MenuItem value="Behind The Scenes">Behind The Scenes</MenuItem>
                <MenuItem value="Teaser">Teaser</MenuItem>
                <MenuItem value="Original Content">Original Content</MenuItem>
                <MenuItem value="Pseudo Video">Pseudo Video</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="writer"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.input}
              {...field}
              label="Writer"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="composer"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.input}
              {...field}
              label="Composer"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="producer"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.input}
              {...field}
              label="Producer"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="editor"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.input}
              {...field}
              label="Editor"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="copyright"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.input}
              {...field}
              label="Copyright©"
              variant="outlined"
              fullWidth
              // required
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="copyrightYear"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.input}
              {...field}
              label="Copyright© Year"
              variant="outlined"
              type="number"
              fullWidth
              // required
            />
          )}
        />
      </Grid>
    </>
  );
};

export default AdditionalForm;
