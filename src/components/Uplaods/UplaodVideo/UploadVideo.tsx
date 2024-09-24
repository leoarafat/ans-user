/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-ts-comment */

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
  useGetChannelsQuery,
} from "@/redux/slices/ArtistAndLabel/artistLabelApi";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { allLanguage } from "@/utils/languages";
import axios from "axios";
import { imageURL } from "@/redux/api/baseApi";
import AddLabelModal from "@/components/ArtisLabelManagement/Label/AddLabelModa";
import AddArtistModal from "@/components/ArtisLabelManagement/Artist/AddArtistModal";
import AddVevoChannelModal from "@/components/ArtisLabelManagement/ManageVevoChannel/ManageVevoChannelModal";
import { IVideoFormInput } from "./interface";
import { useStyles } from "./styles";
import { generateISRC } from "@/utils/utils";
import TermsConditions from "./TermsConditions";

const UploadVideo = () => {
  const classes = useStyles();
  const [isrc, setIsrc] = useState("");
  const { control, handleSubmit, watch, setValue } = useForm<IVideoFormInput>({
    defaultValues: {
      video: null,
      thumbnail: null,
      version: "",
      title: "",
      videoLink: "",
      assetId: "",
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
      alreadyHaveAnVevoChannel: "No",
      videoAlreadyExistOnYoutube: "No",
      label: "",
      genre: "",
      subGenre: "",
      language: "",
      isrc: isrc,
      upc: "",
      description: "",
      storeReleaseDate: "",
      audioIsrc: "",
      vevoChannel: "",
      keywords: "",
      copyright: "",
      copyrightYear: "",
      territoryPolicy: "Monetize Worldwide",
      visibility: "",
      time: "",
      repertoireOwner: "",
    },
  });

  const [open, setOpen] = useState(false);
  const [openArtist, setOpenArtist] = useState(false);
  const [openChannel, setOpenChannel] = useState(false);
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
  const [haveChannel, setHaveChannel] = useState(false);
  const [haveVideo, setHaveVideo] = useState(false);
  const navigate = useNavigate();

  const { data: labelData } = useGetApprovedLabelsQuery({});
  const { data: artistData } = useGetArtistsQuery({});
  const { data: channelData, isLoading } = useGetChannelsQuery({});
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
  const channelOptions =
    //@ts-ignore
    channelData?.data?.data?.map((label: any) => ({
      label: label.channelName,
      value: label.channelName,
    })) || [];
  useEffect(() => {
    const newIsrc = generateISRC();
    setIsrc(newIsrc);
  }, []);

  const handleSubmitWithConditions: SubmitHandler<IVideoFormInput> = (data) => {
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

  const onSubmit = async (data: IVideoFormInput) => {
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
      formData.append("audioIsrc", data.audioIsrc);
      formData.append("vevoChannel", data.vevoChannel);
      formData.append("keywords", data.keywords);
      formData.append("copyright", data.copyright);
      formData.append("copyrightYear", data.copyrightYear);
      formData.append("territoryPolicy", data.territoryPolicy);
      formData.append("visibility", data.visibility);
      formData.append("time", data.time);
      formData.append("repertoireOwner", data.repertoireOwner);
      formData.append(
        "alreadyHaveAnVevoChannel",
        data.alreadyHaveAnVevoChannel
      );
      formData.append("videoLink", data.videoLink);
      formData.append("assetId", data.assetId);

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
  const showChannelModal = () => {
    setOpenChannel(true);
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
    fieldArrayName: keyof IVideoFormInput,
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
                <FormControl fullWidth>
                  <InputLabel required id="isExist-label">
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
                  <InputLabel id="youtubePremiere-label">
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
                <FormControl fullWidth>
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
                        <MenuItem
                          onClick={() => setHaveChannel(true)}
                          value="Yes"
                        >
                          Yes
                        </MenuItem>
                        <MenuItem
                          onClick={() => setHaveChannel(false)}
                          value="No"
                        >
                          No
                        </MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
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
                            (option: any, value: any) =>
                              option.value === value.label
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

                  <Button onClick={showChannelModal}>Create Channel</Button>
                </Grid>
              )}
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
                        label="videoAlreadyExistOnYoutube"
                      >
                        <MenuItem
                          onClick={() => setHaveVideo(true)}
                          value="Yes"
                        >
                          Yes
                        </MenuItem>
                        <MenuItem
                          onClick={() => setHaveVideo(false)}
                          value="No"
                        >
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
                          required
                          className={classes.input}
                        />
                      )}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="territoryPolicy?-label">
                    Territory Policy
                  </InputLabel>
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
                        <MenuItem value="Monetize Worldwide">
                          Monetize Worldwide
                        </MenuItem>
                        <MenuItem value="Select Country">
                          Select Country
                        </MenuItem>
                        <MenuItem value="Block Worldwide">
                          Block Worldwide
                        </MenuItem>
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
                      value={isrc}
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

                      // required
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <Controller
                  name="visibility"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      className={classes.input}
                      {...field}
                      label="Visibility"
                      variant="outlined"
                      fullWidth
                      // required
                    />
                  )}
                />
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
              <Grid item xs={12}>
                <Controller
                  name="time"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      className={classes.input}
                      {...field}
                      label="Time"
                      variant="outlined"
                      fullWidth
                      // required
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
      <TermsConditions
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        conditionsAccepted={conditionsAccepted}
        handleAcceptCondition={handleAcceptCondition}
        handleSubmit={handleSubmit}
        handleSubmitWithConditions={handleSubmitWithConditions}
        uploadProgress={uploadProgress}
      />

      <AddLabelModal open={open} setOpen={setOpen} />
      <AddArtistModal open={openArtist} setOpen={setOpenArtist} />
      <AddVevoChannelModal open={openChannel} setOpen={setOpenChannel} />
    </Container>
  );
};

export default UploadVideo;
