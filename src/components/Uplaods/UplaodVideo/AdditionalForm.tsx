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
              variant="filled"
              sx={{
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
              }}
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
              variant="filled"
              sx={{
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
              }}
              fullWidth
              required
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl
          fullWidth
          variant="filled"
          sx={{
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
          }}
        >
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
              variant="filled"
              sx={{
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
              }}
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
              variant="filled"
              sx={{
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
              }}
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
              variant="filled"
              sx={{
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
              }}
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
              variant="filled"
              sx={{
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
              }}
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
              variant="filled"
              sx={{
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
              }}
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
              variant="filled"
              sx={{
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
              }}
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
