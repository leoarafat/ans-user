/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// /* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  SubmitHandler,
} from "react-hook-form";
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
  Container,
  Autocomplete,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  FormControlLabel,
  Checkbox,
  DialogActions,
  LinearProgress,
  Box,
  Avatar,
  Stack,
} from "@mui/material";
import { Add, Remove, PhotoCamera } from "@mui/icons-material";
import { MdClose } from "react-icons/md";
import { genres } from "@/MockData/MockData";
import {
  useGetArtistsQuery,
  useGetApprovedLabelsQuery,
} from "@/redux/slices/ArtistAndLabel/artistLabelApi";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { allLanguage } from "@/utils/languages";
import axios from "axios";
import { imageURL } from "@/redux/api/baseApi";
import { makeStyles } from "@material-ui/core/styles";
import AddLabelModal from "@/components/ArtisLabelManagement/Label/AddLabelModa";
import AddArtistModal from "@/components/ArtisLabelManagement/Artist/AddArtistModal";

interface IFormInput {
  video: File | null;
  thumbnail: File | null;
  version: string;
  title: string;
  primaryArtist: { primaryArtistName: string; _id: string }[];
  featuringArtists: { featuringArtistName: string }[];
  writer: { writerName: string }[];
  composer: { composerName: string }[];
  producer: { producerName: string }[];
  editor: { editorName: string }[];
  musicDirector: { musicDirectorName: string }[];
  label: string;
  genre: string;
  subGenre: string;
  language: string;
  isrc: string;
  upc: string;
  description: string;
  storeReleaseDate: string;
  explicit: string;
  youtubePremiere: string;
  isExist: string;
  isKids: string;
}
const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(4),
  },
  input: {
    // marginBottom: theme.spacing(3),
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
    },
  },
  button: {
    padding: "12px 0",
    borderRadius: "30px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  terms: {
    display: "flex",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
const UploadVideo = () => {
  const classes = useStyles();
  const { control, handleSubmit, watch, setValue } = useForm<IFormInput>({
    defaultValues: {
      video: null,
      thumbnail: null,
      version: "",
      title: "",
      primaryArtist: [{ primaryArtistName: "", _id: "" }],
      featuringArtists: [{ featuringArtistName: "" }],
      writer: [{ writerName: "" }],
      composer: [{ composerName: "" }],
      producer: [{ producerName: "" }],
      editor: [{ editorName: "" }],
      musicDirector: [{ musicDirectorName: "" }],
      isKids: "No",
      youtubePremiere: "No",
      isExist: "No",
      explicit: "No",
      label: "",
      genre: "",
      subGenre: "",
      language: "",
      isrc: "",
      upc: "",
      description: "",
      storeReleaseDate: "",
    },
  });
  const [open, setOpen] = useState(false);
  const [openArtist, setOpenArtist] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [conditionsAccepted, setConditionsAccepted] = useState({
    condition1: false,
    condition2: false,
    condition3: false,
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailError, setThumbnailError] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedSubgenre, setSelectedSubgenre] = useState<string>("");
  const navigate = useNavigate();

  const { data: labelData } = useGetApprovedLabelsQuery({});
  const { data: artistData } = useGetArtistsQuery({});

  const artistOptions =
    //@ts-ignore
    artistData?.data?.data?.map((artist: any) => ({
      label: artist.primaryArtistName,
      value: artist._id,
    })) || [];

  const labelOptions =
    //@ts-ignore
    labelData?.data?.data?.map((label: any) => ({
      label: label.labelName,
      value: label._id,
    })) || [];

  useEffect(() => {
    localStorage.removeItem("releaseFormData");
    localStorage.removeItem("tracksInformation");
  }, []);

  const handleSubmitWithConditions: SubmitHandler<IFormInput> = (data) => {
    if (
      conditionsAccepted.condition1 &&
      conditionsAccepted.condition2 &&
      conditionsAccepted.condition3
    ) {
      onSubmit(data);
    } else {
      setOpenModal(true);
    }
  };

  const onSubmit = async (data: IFormInput) => {
    if (
      !conditionsAccepted.condition1 ||
      !conditionsAccepted.condition2 ||
      !conditionsAccepted.condition3
    ) {
      setOpenModal(true);
      return;
    }
    setOpenModal(false);

    try {
      const formData = new FormData();
      if (videoFile) {
        formData.append("video", videoFile);
      }
      if (thumbnail) {
        formData.append("image", thumbnail);
      }

      formData.append("version", data.version);
      formData.append("title", data.title);
      formData.append("label", data.label);
      formData.append("genre", selectedGenre);
      formData.append("subGenre", selectedSubgenre);
      formData.append("language", data.language);
      formData.append("isrc", data.isrc);
      formData.append("upc", data.upc);
      formData.append("description", data.description);
      formData.append("storeReleaseDate", data.storeReleaseDate);
      formData.append("explicit", data.explicit);
      formData.append("youtubePremiere", data.youtubePremiere);
      formData.append("isExist", data.isExist);
      formData.append("isKids", data.isKids);

      const formattedPrimaryArtists = data.primaryArtist.map(
        (artist) => artist._id
      );
      const formattedFeatureArtists = data.featuringArtists.map(
        //@ts-ignore
        (artist) => artist.primaryArtistName
      );
      const formattedWriter = data.writer.map(
        //@ts-ignore
        (artist) => artist.primaryArtistName
      );
      const formattedComposer = data.composer.map(
        //@ts-ignore
        (artist) => artist.primaryArtistName
      );
      const formattedProducer = data.producer.map(
        //@ts-ignore
        (artist) => artist.primaryArtistName
      );
      const formattedEditor = data.editor.map(
        //@ts-ignore
        (artist) => artist.primaryArtistName
      );
      const formattedDirector = data.musicDirector.map(
        //@ts-ignore
        (artist) => artist.primaryArtistName
      );

      formData.append("primaryArtist", JSON.stringify(formattedPrimaryArtists));
      formData.append(
        "featuringArtists",
        JSON.stringify(formattedFeatureArtists)
      );
      formData.append("writer", JSON.stringify(formattedWriter));
      formData.append("composer", JSON.stringify(formattedComposer));
      formData.append("producer", JSON.stringify(formattedProducer));
      formData.append("editor", JSON.stringify(formattedEditor));
      formData.append("musicDirector", JSON.stringify(formattedDirector));

      const res = await axios.post(`${imageURL}/video/upload`, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            //@ts-ignore
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (res?.data?.success === true) {
        toast.success("Video Upload Successful");
        navigate("/my-uploads/pending-videos");
      }
    } catch (error: any) {
      toast.error("Video Upload Failed");
    }
  };
  const showModal = () => {
    setOpen(true);
  };
  const showArtistModal = () => {
    setOpenArtist(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAcceptCondition = (condition: string) => (event: any) => {
    setConditionsAccepted({
      ...conditionsAccepted,
      [condition]: event.target.checked,
    });
  };

  const handleGenreChange = (event: any, value: any) => {
    setSelectedGenre(value);
    setSelectedSubgenre("");
  };

  const handleSubgenreChange = (event: any, value: any) => {
    setSelectedSubgenre(value);
  };

  const getSubgenres = () => {
    const genreObj = genres.find((genre) => genre.name === selectedGenre);
    return genreObj ? genreObj.subgenres : [];
  };

  const handleThumbnailUpload = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type !== "image/jpeg") {
        setThumbnailError("Please upload a JPG image.");
        return;
      }

      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        if (img.width === 1920 && img.height === 1080) {
          setValue("thumbnail", file);
          setThumbnail(file);
          setThumbnailError("");
        } else {
          setThumbnailError("Image must be 1920x1080 pixels.");
        }

        URL.revokeObjectURL(objectUrl);
      };

      img.onerror = () => {
        setThumbnailError("Invalid image file.");
      };

      img.src = objectUrl;
    }
  };

  const handleVideoUpload = (event: any) => {
    const file = event.target.files[0];
    setValue("video", file);
    setVideoFile(file);
  };

  const handleThumbnailRemoveImage = () => {
    setThumbnail(null);
    setThumbnailError("");
  };

  const handleVideoRemove = () => {
    setVideoFile(null);
  };

  const renderArrayFields = (
    fieldArrayName: keyof IFormInput,
    label: string,
    name: string,
    isAutocomplete = false
  ) => {
    const { fields, append, remove } = useFieldArray({
      control,
      //@ts-ignore
      name: fieldArrayName,
    });

    return (
      <Stack spacing={2}>
        {fields.map((field, index) => (
          <Grid container spacing={2} alignItems="center" key={field.id}>
            <Grid item xs={10}>
              <Controller
                //@ts-ignore
                name={`${fieldArrayName}[${index}].primaryArtistName` as const}
                control={control}
                render={({ field }) =>
                  isAutocomplete ? (
                    //@ts-ignore
                    <Autocomplete
                      {...field}
                      options={artistOptions.map((option: any) => option.label)}
                      getOptionLabel={(option) => option || ""}
                      isOptionEqualToValue={(option, value) => option === value}
                      onChange={(event, value) => {
                        field.onChange(value);
                        const selectedArtist = artistOptions.find(
                          (artist: any) => artist.label === value
                        );
                        setValue(
                          //@ts-ignore
                          `${fieldArrayName}[${index}]._id` as const,
                          selectedArtist?.value || null
                        );
                      }}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          fullWidth
                          label={label}
                          variant="outlined"
                          className={classes.input}
                        />
                      )}
                    />
                  ) : (
                    <TextField
                      {...field}
                      label={label}
                      variant="outlined"
                      className={classes.input}
                      fullWidth
                    />
                  )
                }
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={() => remove(index)}
                aria-label="remove"
                color="error"
              >
                <Remove />
              </IconButton>
              <Button
                // variant="outlined"
                color="primary"
                startIcon={<Add />}
                //@ts-ignore
                onClick={() => append({ [name]: "" })}
              ></Button>
            </Grid>
          </Grid>
        ))}
        {/* <div className="w-[300px] text-center">
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Add />}
            //@ts-ignore
            onClick={() => append({ [name]: "" })}
          >
            
          </Button>
        </div> */}
      </Stack>
    );
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(handleSubmitWithConditions)}>
            <Grid container spacing={3}>
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
                        <MenuItem value="Behind The Scenes">
                          Behind The Scenes
                        </MenuItem>
                        <MenuItem value="Teaser">Teaser</MenuItem>
                        <MenuItem value="Original Content">
                          Original Content
                        </MenuItem>
                        <MenuItem value="Pseudo Video">Pseudo Video</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
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
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="explicit-label">Explicit</InputLabel>
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
                <FormControl fullWidth>
                  <InputLabel id="isExist-label">
                    Already Have In Youtube?
                  </InputLabel>
                  <Controller
                    name="isExist"
                    control={control}
                    render={({ field }) => (
                      <Select
                        style={{ borderRadius: "30px" }}
                        {...field}
                        labelId="isExist-label"
                        label="isExist"
                      >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="isKids-label">Kids Video?</InputLabel>
                  <Controller
                    name="isKids"
                    control={control}
                    render={({ field }) => (
                      <Select
                        style={{ borderRadius: "30px" }}
                        {...field}
                        labelId="isKids-label"
                        label="isKids"
                      >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="youtubePremiere?-label">
                    Create a YouTube Premiere?
                  </InputLabel>
                  <Controller
                    name="youtubePremiere"
                    control={control}
                    render={({ field }) => (
                      <Select
                        style={{ borderRadius: "30px" }}
                        {...field}
                        labelId="youtubePremiere?-label"
                        label="youtubePremiere"
                      >
                        <MenuItem value="Yes">Yes</MenuItem>
                        <MenuItem value="No">No</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
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
                          (option: any, value: any) =>
                            option.value === value.label
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
                          required
                        />
                      )}
                      freeSolo
                    />
                  )}
                />

                <Button onClick={showModal}>Create Label</Button>
              </Grid>

              <Grid item xs={6}>
                {renderArrayFields(
                  "primaryArtist",
                  "Primary Artist",
                  "primaryArtistName",
                  true
                )}
                <Button onClick={showArtistModal}>Create Artist</Button>
              </Grid>

              <Grid item xs={6}>
                {renderArrayFields(
                  "featuringArtists",
                  "Feature Artist",
                  "featuringArtistName"
                )}
              </Grid>
              <Grid item xs={6}>
                {renderArrayFields("writer", "Writer", "writerName")}
              </Grid>

              <Grid item xs={6}>
                {renderArrayFields("composer", "Composer", "composerName")}
              </Grid>
              <Grid item xs={6}>
                {renderArrayFields("producer", "Producer", "producerName")}
              </Grid>
              <Grid item xs={6}>
                {renderArrayFields("editor", "Editor", "editorName")}
              </Grid>

              <Grid item xs={6}>
                {renderArrayFields(
                  "musicDirector",
                  "Music Director",
                  "musicDirectorName"
                )}
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
                      required
                      variant="outlined"
                      label="Language"
                      InputLabelProps={{ shrink: true }}
                    >
                      {!field.value && (
                        <MenuItem value="">Select a language</MenuItem>
                      )}
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
                    />
                  )}
                />
              </Grid>

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
                      required
                    />
                  )}
                />
              </Grid>

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
                <Box>
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                  />
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
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Terms and Conditions Modal */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">Terms & Conditions</Typography>
          <Typography variant="subtitle1">
            Please confirm that you have understood and that you agree to the
            following Terms & Conditions, and delivery guidelines.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                checked={conditionsAccepted.condition1}
                onChange={handleAcceptCondition("condition1")}
                color="primary"
              />
            }
            label={
              <Typography variant="body1">
                I understand and agree to the ISRC Terms & Conditions.
                <Typography variant="body2">
                  If you asked ANS Music to generate your ISRC codes, you hereby
                  agree to{" "}
                  <Link
                    className="text-blue-600 underline"
                    to="https://ansmusiclimited.com/"
                    target="_blank"
                  >
                    ANS Music's conditions for generating ISRCs.
                  </Link>
                </Typography>
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={conditionsAccepted.condition2}
                onChange={handleAcceptCondition("condition2")}
                color="primary"
              />
            }
            label={
              <Typography variant="body1">
                I understand and agree to the Youtube Content Guidelines.
                <Typography variant="body2">
                  Some content cannot be safely distributed and monetized on the
                  platform. Please be sure you have read and follow the{" "}
                  <Link
                    className="text-blue-600 underline"
                    to="https://ansmusiclimited.com/"
                    target="_blank"
                  >
                    Youtube Content Guidelines.
                  </Link>
                </Typography>
              </Typography>
            }
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={conditionsAccepted.condition3}
                onChange={handleAcceptCondition("condition3")}
                color="primary"
              />
            }
            label={
              <Typography variant="body1">
                I understand and agree to the ANS Music Content Delivery
                Guidelines for Audio Stores.
                <Typography variant="body2">
                  Some content is not eligible to be distributed on Apple Music,
                  Spotify, and Youtube Audio Fingerprint. Please be sure you
                  have read and understand the{" "}
                  <Link
                    className="text-blue-600 underline"
                    to="https://ansmusiclimited.com/"
                    target="_blank"
                  >
                    ANS Music Content Delivery Guidelines for Audio Stores.
                  </Link>
                </Typography>
              </Typography>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit(handleSubmitWithConditions)}
            color="primary"
            variant="contained"
            //@ts-ignore
            disabled={
              uploadProgress ||
              !conditionsAccepted.condition1 ||
              !conditionsAccepted.condition2 ||
              !conditionsAccepted.condition3 ||
              uploadProgress
            }
          >
            {uploadProgress ? "Uploading..." : "Agree and Submit"}
          </Button>
        </DialogActions>
      </Dialog>
      <AddLabelModal open={open} setOpen={setOpen} />
      <AddArtistModal open={openArtist} setOpen={setOpenArtist} />
    </Container>
  );
};

export default UploadVideo;
