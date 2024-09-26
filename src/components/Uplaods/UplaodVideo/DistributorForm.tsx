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

const DistributorForm = ({
  classes,
  control,
  uploadProgress,
  loading,
}: any) => {
  const [selectCountry, setSelectCountry] = useState(false);
  const [selectDate, setSelectDate] = useState(false);
  const [selectPremier, setSelectPremier] = useState(false);

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
        <FormControl fullWidth variant="outlined">
          <InputLabel required id="storeReleaseDate-label">
            Release start date
          </InputLabel>
          <Controller
            name="storeReleaseDate"
            control={control}
            render={({ field }) => (
              <Select
                style={{ borderRadius: "30px" }}
                {...field}
                labelId="storeReleaseDate-label"
                label="Release start date"
              >
                <MenuItem
                  onClick={() => setSelectDate(false)}
                  value="As soon as possible"
                >
                  As soon as possible
                </MenuItem>
                <MenuItem
                  onClick={() => setSelectDate(true)}
                  value="On a specific date"
                >
                  On a specific date
                </MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Grid>
      {selectDate && (
        <>
          {" "}
          <Grid item xs={12}>
            <Controller
              name="releaseDate"
              control={control}
              render={({ field }) => (
                <TextField
                  className={classes.input}
                  {...field}
                  label="Date / Time"
                  variant="outlined"
                  fullWidth
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel required id="youtubePremiere-label">
                Create a YouTube Premiere?
              </InputLabel>
              <Controller
                name="youtubePremiere"
                control={control}
                render={({ field }) => (
                  <Select
                    style={{ borderRadius: "30px" }}
                    {...field}
                    labelId="youtubePremiere-label"
                    label="Create a YouTube Premiere?"
                  >
                    <MenuItem
                      onClick={() => setSelectPremier(true)}
                      value="Yes"
                    >
                      Yes
                    </MenuItem>
                    <MenuItem
                      onClick={() => setSelectPremier(false)}
                      value="No"
                    >
                      No
                    </MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        </>
      )}
      {selectPremier && (
        <>
          {" "}
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel required id="countdownTheme-label">
                Countdown theme
              </InputLabel>
              <Controller
                name="countdownTheme"
                control={control}
                render={({ field }) => (
                  <Select
                    style={{ borderRadius: "30px" }}
                    {...field}
                    labelId="countdownTheme-label"
                    label="Countdown theme"
                  >
                    <MenuItem value="Default">Default</MenuItem>
                    <MenuItem value="Alternative">Alternative</MenuItem>
                    <MenuItem value="Ambient">Ambient</MenuItem>
                    <MenuItem value="Bright">Bright</MenuItem>
                    <MenuItem value="Calm">Calm</MenuItem>
                    <MenuItem value="Cinematic">Cinematic</MenuItem>
                    <MenuItem value="Contemporary">Contemporary</MenuItem>
                    <MenuItem value="Dramatic">Dramatic</MenuItem>
                    <MenuItem value="Funky">Funky</MenuItem>
                    <MenuItem value="Gentle">Gentle</MenuItem>
                    <MenuItem value="Happy">Happy</MenuItem>
                    <MenuItem value="Inspirational">Inspirational</MenuItem>
                    <MenuItem value="Kids">Kids</MenuItem>
                    <MenuItem value="Sports">Sports</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel required id="countdownLength-label">
                Countdown length
              </InputLabel>
              <Controller
                name="countdownLength"
                control={control}
                render={({ field }) => (
                  <Select
                    style={{ borderRadius: "30px" }}
                    {...field}
                    labelId="countdownLength-label"
                    label="Countdown length"
                  >
                    <MenuItem value="1 Minute">1 Minute</MenuItem>
                    <MenuItem value="2 Minutes">2 Minutes</MenuItem>
                    <MenuItem value="3 Minutes">3 Minutes</MenuItem>
                    <MenuItem value="4 Minutes">4 Minutes</MenuItem>
                    <MenuItem value="5 Minutes">5 Minutes</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        </>
      )}
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
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Video"}
        </Button>
      </Grid>
    </>
  );
};

export default DistributorForm;
