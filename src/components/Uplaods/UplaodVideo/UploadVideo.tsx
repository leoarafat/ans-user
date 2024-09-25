/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useEffect, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
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
import {
  Add,
  Remove,
  PhotoCamera,
  RemoveCircle,
  AddCircle,
} from "@mui/icons-material";
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
import DetailsForm from "./DetailsForm";

const UploadVideo = () => {
  const classes = useStyles();
  const [isrc, setIsrc] = useState("");
  const [primaryArtists, setPrimaryArtists] = useState([{ name: "", _id: "" }]);
  const [featureArtists, setFeatureArtists] = useState([{ name: "", _id: "" }]);
  console.log(primaryArtists, featureArtists);
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
      writer: "",
      composer: "",
      producer: "",
      editor: "",
      musicDirector: "",
      // writer: [{ writerName: "" }],
      // composer: [{ composerName: "" }],
      // producer: [{ producerName: "" }],
      // editor: [{ editorName: "" }],
      // musicDirector: [{ musicDirectorName: "" }],
      isKids: "No",
      // youtubePremiere: "No",
      // isExist: "No",
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
      // time: "",
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
  const [activeStep, setActiveStep] = useState(0);
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
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleAddPrimaryArtist = () => {
    setPrimaryArtists([...primaryArtists, { name: "", _id: "" }]);
  };

  const handleRemovePrimaryArtist = (index: number) => {
    const updatedPrimaryArtists = [...primaryArtists];
    updatedPrimaryArtists.splice(index, 1);
    setPrimaryArtists(updatedPrimaryArtists);
  };

  const handleAddFeatureArtist = () => {
    setFeatureArtists([...featureArtists, { name: "", _id: "" }]);
  };

  const handleRemoveFeatureArtist = (index: number) => {
    const updatedFeatureArtists = [...featureArtists];
    updatedFeatureArtists.splice(index, 1);
    setFeatureArtists(updatedFeatureArtists);
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

      formData.append("version", data.version && data.version);
      formData.append("title", data.title && data.title);
      formData.append("label", data.label && data.label);
      formData.append("genre", selectedGenre && selectedGenre);
      formData.append("subGenre", selectedSubgenre && selectedSubgenre);
      formData.append("language", data.language && data.language);
      formData.append("isrc", isrc && isrc);
      formData.append("upc", data.upc && data.upc);
      formData.append("description", data.description && data.description);
      formData.append(
        "storeReleaseDate",
        data.storeReleaseDate && data.storeReleaseDate
      );
      formData.append("explicit", data.explicit);
      // formData.append("youtubePremiere", data.youtubePremiere);
      // formData.append("isExist", data.isExist);
      formData.append("isKids", data.isKids);
      formData.append("audioIsrc", data.audioIsrc && data.audioIsrc);
      formData.append("vevoChannel", data.vevoChannel && data.vevoChannel);
      formData.append("keywords", data.keywords && data.keywords);
      formData.append("copyright", data.copyright && data.copyright);
      formData.append(
        "copyrightYear",
        data.copyrightYear && data.copyrightYear
      );
      formData.append(
        "territoryPolicy",
        data.territoryPolicy && data.territoryPolicy
      );
      formData.append("visibility", data.visibility && data.visibility);
      // formData.append("time", data.time);
      formData.append(
        "repertoireOwner",
        data.repertoireOwner && data.repertoireOwner
      );
      formData.append(
        "alreadyHaveAnVevoChannel",
        data.alreadyHaveAnVevoChannel && data.alreadyHaveAnVevoChannel
      );
      formData.append("videoLink", data.videoLink && data.videoLink);
      formData.append("assetId", data.assetId && data.assetId);

      const formattedPrimaryArtists = primaryArtists?.map(
        (artist) => artist._id
      );
      const formattedFeatureArtists = featureArtists?.map(
        //@ts-ignore
        (artist) => artist.name
      );

      formData.append(
        "primaryArtist",
        formattedPrimaryArtists && JSON.stringify(formattedPrimaryArtists)
      );
      formData.append(
        "featuringArtists",
        formattedFeatureArtists && JSON.stringify(formattedFeatureArtists)
      );
      formData.append("writer", data.writer && data.writer);
      formData.append("composer", data.composer && data.composer);
      formData.append("producer", data.producer && data.producer);
      formData.append("editor", data.editor && data.editor);
      formData.append(
        "musicDirector",
        data.musicDirector && data.musicDirector
      );

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

  return (
    <Container>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit(handleSubmitWithConditions)}>
            <Grid container spacing={3}>
              {activeStep === 0 && (
                <DetailsForm
                  videoFile={videoFile}
                  handleVideoUpload={handleVideoUpload}
                  handleVideoRemove={handleVideoRemove}
                  thumbnail={thumbnail}
                  handleThumbnailUpload={handleThumbnailUpload}
                  handleThumbnailRemoveImage={handleThumbnailRemoveImage}
                  thumbnailError={thumbnailError}
                  control={control}
                  classes={classes}
                  isrc={isrc}
                  showArtistModal={showArtistModal}
                  primaryArtists={primaryArtists}
                  artistOptions={artistOptions}
                  haveVideo={haveVideo}
                  setHaveVideo={setHaveVideo}
                  showChannelModal={showChannelModal}
                  channelOptions={channelOptions}
                  haveChannel={haveChannel}
                  setHaveChannel={setHaveChannel}
                  showModal={showModal}
                  setValue={setValue}
                  labelOptions={labelOptions}
                  handleSubgenreChange={handleSubgenreChange}
                  selectedSubgenre={selectedSubgenre}
                  handleGenreChange={handleGenreChange}
                  selectedGenre={selectedGenre}
                  setPrimaryArtists={setPrimaryArtists}
                  handleRemovePrimaryArtist={handleRemovePrimaryArtist}
                  handleAddPrimaryArtist={handleAddPrimaryArtist}
                  featureArtists={featureArtists}
                  setFeatureArtists={setFeatureArtists}
                  handleRemoveFeatureArtist={handleRemoveFeatureArtist}
                  handleAddFeatureArtist={handleAddFeatureArtist}
                  getSubgenres={getSubgenres}
                />
              )}
              {/* Details step end */}
              {/* Additional Step Start  */}
              {activeStep === 1 && (
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
                            <MenuItem value="Lyrical Video">
                              Lyrical Video
                            </MenuItem>
                            <MenuItem value="Interview">Interview</MenuItem>
                            <MenuItem value="Lyrical Video">
                              Lyrical Video
                            </MenuItem>
                            <MenuItem value="Official">Official</MenuItem>
                            <MenuItem value="Live">Live</MenuItem>
                            <MenuItem value="Behind The Scenes">
                              Behind The Scenes
                            </MenuItem>
                            <MenuItem value="Teaser">Teaser</MenuItem>
                            <MenuItem value="Original Content">
                              Original Content
                            </MenuItem>
                            <MenuItem value="Pseudo Video">
                              Pseudo Video
                            </MenuItem>
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
                </>
              )}
              {/* Additional Step End  */}
              {/* Distribution Step Start  */}

              {activeStep === 2 && (
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
                            <MenuItem value="Unlisted on Video">
                              Unlisted on Video
                            </MenuItem>
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
                </>
              )}
              {/* Distribution Step End */}
              <Grid item xs={12}>
                <div className="flex justify-between">
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  {activeStep < 2 && (
                    <Button
                      variant="contained"
                      color="primary"
                      className="bg-green-500 p-2 rounded-md"
                      onClick={handleNext}
                    >
                      Next
                    </Button>
                  )}
                </div>
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
