import { Controller } from "react-hook-form";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Card,
  CardContent,
  IconButton,
  Autocomplete,
  Typography,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import { PhotoCamera, RemoveCircle, AddCircle } from "@mui/icons-material";
import { MdClose } from "react-icons/md";
import { genres } from "@/MockData/MockData";

import { allLanguage } from "@/utils/languages";

const DetailsForm = ({
  videoFile,
  handleVideoUpload,
  handleVideoRemove,
  thumbnail,
  handleThumbnailUpload,
  handleThumbnailRemoveImage,
  thumbnailError,
  control,
  classes,
  isrc,
  showArtistModal,
  primaryArtists,
  artistOptions,
  haveVideo,
  setHaveVideo,
  showChannelModal,
  channelOptions,
  haveChannel,
  setHaveChannel,
  showModal,
  setValue,
  labelOptions,
  handleSubgenreChange,
  selectedSubgenre,
  handleGenreChange,
  selectedGenre,
  setPrimaryArtists,
  handleRemovePrimaryArtist,
  handleAddPrimaryArtist,
  featureArtists,
  setFeatureArtists,
  handleRemoveFeatureArtist,
  handleAddFeatureArtist,
  getSubgenres,
}: any) => {
  return (
    <>
      {" "}
      {/* Details Step STart  */}
      <Grid item xs={6}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Video File
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px dashed #ccc",
                  borderRadius: 2,
                  padding: 2,
                  backgroundColor: "#f9f9f9",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<PhotoCamera />}
                  sx={{
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#303f9f",
                    },
                  }}
                >
                  {videoFile ? "Change Video" : "Upload Video"}
                  <input
                    type="file"
                    hidden
                    accept="video/*"
                    onChange={handleVideoUpload}
                  />
                </Button>
                {videoFile && (
                  <Box mt={2} width="100%">
                    <video width="100%" controls>
                      <source src={URL.createObjectURL(videoFile)} />
                      Your browser does not support the video tag.
                    </video>
                    <IconButton
                      color="error"
                      onClick={handleVideoRemove}
                      sx={{ marginTop: 2, alignSelf: "center" }}
                    >
                      <MdClose />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Thumbnail Image
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px dashed #ccc",
                  borderRadius: 2,
                  padding: 2,
                  backgroundColor: "#f9f9f9",
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<PhotoCamera />}
                  sx={{
                    backgroundColor: "#3f51b5",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#303f9f",
                    },
                  }}
                >
                  {thumbnail ? "Change Thumbnail" : "Upload Thumbnail"}
                  <input
                    type="file"
                    hidden
                    accept="image/jpeg"
                    onChange={handleThumbnailUpload}
                  />
                </Button>
                {thumbnail && (
                  <Box mt={2} width="100%">
                    <Avatar
                      variant="rounded"
                      src={URL.createObjectURL(thumbnail)}
                      sx={{
                        width: "100%",
                        height: 200,
                      }}
                    />
                    <IconButton
                      color="error"
                      onClick={handleThumbnailRemoveImage}
                      sx={{ marginTop: 2, alignSelf: "center" }}
                    >
                      <MdClose />
                    </IconButton>
                  </Box>
                )}
                {thumbnailError && (
                  <Typography color="error" textAlign="center">
                    {thumbnailError}
                  </Typography>
                )}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="isrc"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.input}
              {...field}
              label="ISRC Code"
              variant="outlined"
              fullWidth
              required
              value={isrc}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Video Title"
              variant="outlined"
              fullWidth
              required
              className={classes.input}
            />
          )}
        />
      </Grid>
      {/* Primary Artists Section */}
      <Grid item xs={12}>
        <Button onClick={showArtistModal}>Create Artist</Button>
        {primaryArtists.map((artist: any, index: any) => (
          <Grid key={index}>
            <Grid item xs={12}>
              <Autocomplete
                options={artistOptions}
                getOptionLabel={(option) => option.label}
                value={
                  artistOptions.find((opt: any) => opt.value === artist._id) ||
                  null
                }
                onChange={(event, newValue) => {
                  const updatedPrimaryArtists = [...primaryArtists];
                  updatedPrimaryArtists[index] = {
                    name: newValue ? newValue.label : "",
                    _id: newValue ? newValue.value : "",
                  };
                  setPrimaryArtists(updatedPrimaryArtists);
                }}
                renderInput={(params) => (
                  <TextField
                    className={classes.input}
                    {...params}
                    label="Select Primary Artist"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
            <div>
              {primaryArtists.length > 1 && (
                <IconButton onClick={() => handleRemovePrimaryArtist(index)}>
                  <RemoveCircle />
                </IconButton>
              )}
            </div>
          </Grid>
        ))}
        <IconButton onClick={handleAddPrimaryArtist}>
          <AddCircle />
        </IconButton>
      </Grid>
      {/* Feature Artists Section */}
      <Grid item xs={12}>
        {featureArtists.map((artist: any, index: number) => (
          <Grid key={index}>
            <Grid item xs={12}>
              <Autocomplete
                options={artistOptions}
                getOptionLabel={(option) => option.label}
                value={
                  artistOptions.find((opt: any) => opt.value === artist._id) ||
                  null
                }
                onChange={(event, newValue) => {
                  const updatedFeatureArtists = [...featureArtists];
                  updatedFeatureArtists[index] = {
                    name: newValue ? newValue.label : "",
                    _id: newValue ? newValue.value : "",
                  };
                  setFeatureArtists(updatedFeatureArtists);
                }}
                renderInput={(params) => (
                  <TextField
                    className={classes.input}
                    {...params}
                    label="Select Feature Artist"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />
            </Grid>
            <div>
              {featureArtists.length > 1 && (
                <IconButton onClick={() => handleRemoveFeatureArtist(index)}>
                  <RemoveCircle />
                </IconButton>
              )}
            </div>
          </Grid>
        ))}
        <IconButton onClick={handleAddFeatureArtist}>
          <AddCircle />
        </IconButton>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <Autocomplete
            value={selectedGenre}
            onChange={handleGenreChange}
            options={genres.map((genre) => genre.name)}
            renderInput={(params) => (
              <TextField
                className={classes.input}
                {...params}
                label="Genre"
                variant="outlined"
                fullWidth
                required
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <Autocomplete
            value={selectedSubgenre}
            onChange={handleSubgenreChange}
            options={getSubgenres()}
            renderInput={(params) => (
              <TextField
                className={classes.input}
                {...params}
                label="Subgenre"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="language"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.input}
              {...field}
              fullWidth
              select
              variant="outlined"
              label="Language"
              InputLabelProps={{ shrink: true }}
            >
              {!field.value && <MenuItem value="">Select a language</MenuItem>}
              {allLanguage.map((language) => (
                <MenuItem key={language} value={language}>
                  {language}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel required id="explicit-label">
            Explicit
          </InputLabel>
          <Controller
            name="explicit"
            control={control}
            render={({ field }) => (
              <Select
                style={{ borderRadius: "30px" }}
                {...field}
                labelId="explicit-label"
                label="Explicit"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="repertoireOwner"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.input}
              {...field}
              label="Repertoire Owner"
              variant="outlined"
              fullWidth
              required
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Controller
          name="label"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              options={labelOptions}
              getOptionLabel={(option) => option.label || ""}
              value={
                labelOptions.find(
                  (option: any, value: any) => option.value === value.label
                ) || null
              }
              onChange={(event, value) => {
                field.onChange(value?.label || "");
                setValue("label", value?.value || null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className={classes.input}
                  fullWidth
                  label="Label"
                  variant="outlined"
                  margin="normal"
                />
              )}
              freeSolo
            />
          )}
        />

        <Button onClick={showModal}>Create Label</Button>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth variant="outlined">
          <InputLabel required id="alreadyHaveAnVevoChannel-label">
            Already have VEVO Channel?
          </InputLabel>
          <Controller
            name="alreadyHaveAnVevoChannel"
            control={control}
            render={({ field }) => (
              <Select
                style={{ borderRadius: "30px" }}
                {...field}
                labelId="alreadyHaveAnVevoChannel-label"
                label="alreadyHaveAnVevoChannel"
              >
                <MenuItem onClick={() => setHaveChannel(true)} value="Yes">
                  Yes
                </MenuItem>
                <MenuItem onClick={() => setHaveChannel(false)} value="No">
                  No
                </MenuItem>
              </Select>
            )}
          />
        </FormControl>
        {!haveChannel && (
          <Button onClick={showChannelModal}>Create Channel</Button>
        )}
      </Grid>
      {haveChannel && (
        <Grid item xs={12}>
          <Controller
            name="vevoChannel"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={channelOptions}
                getOptionLabel={(option) => option.label || ""}
                value={
                  channelOptions.find(
                    (option: any, value: any) => option.value === value.label
                  ) || null
                }
                onChange={(event, value) => {
                  field.onChange(value?.label || "");
                  setValue("vevoChannel", value?.value || null);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className={classes.input}
                    fullWidth
                    label="VEVO CHannel"
                    variant="outlined"
                    margin="normal"
                    required
                  />
                )}
                freeSolo
              />
            )}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.input}
              {...field}
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <Controller
          name="keywords"
          control={control}
          render={({ field }) => (
            <TextField
              className={classes.input}
              {...field}
              label="Keywords"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel required id="isKids-label">
            Kids Video?
          </InputLabel>
          <Controller
            name="isKids"
            control={control}
            render={({ field }) => (
              <Select
                style={{ borderRadius: "30px" }}
                {...field}
                labelId="isKids-label"
                label="Kids Video?"
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel required id="videoAlreadyExistOnYoutube-label">
            Video already exists on YouTube?
          </InputLabel>
          <Controller
            name="videoAlreadyExistOnYoutube"
            control={control}
            render={({ field }) => (
              <Select
                style={{ borderRadius: "30px" }}
                {...field}
                labelId="videoAlreadyExistOnYoutube-label"
                label="Video already exists on YouTube?"
              >
                <MenuItem onClick={() => setHaveVideo(true)} value="Yes">
                  Yes
                </MenuItem>
                <MenuItem onClick={() => setHaveVideo(false)} value="No">
                  No
                </MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Grid>
      {haveVideo && (
        <>
          <Grid item xs={6}>
            <Controller
              name="videoLink"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Video Link (Please ensure current video have minimum 500k views)"
                  variant="outlined"
                  fullWidth
                  className={classes.input}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="assetId"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Asset ID (If channel linked with CMS/MCN)"
                  variant="outlined"
                  fullWidth
                  className={classes.input}
                />
              )}
            />
          </Grid>
        </>
      )}
    </>
  );
};

export default DetailsForm;
