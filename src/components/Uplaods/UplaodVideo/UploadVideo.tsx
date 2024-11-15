/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Container,
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Stack,
  Alert,
  AlertTitle,
} from "@mui/material";
import { genresForVideo } from "@/MockData/MockData";
import {
  useGetArtistsQuery,
  useGetApprovedLabelsQuery,
  useGetApprovedChannelsQuery,
} from "@/redux/slices/ArtistAndLabel/artistLabelApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
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
import AdditionalForm from "./AdditionalForm";
import DistributorForm from "./DistributorForm";
import { useProfileQuery } from "@/redux/slices/admin/userApi";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PublishIcon from "@mui/icons-material/Publish";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const steps = [
  { label: "Details", icon: <VideoLibraryIcon /> },
  { label: "Additional", icon: <AddCircleIcon /> },
  { label: "Distributor", icon: <PublishIcon /> },
];

const UploadVideo = () => {
  const classes = useStyles();
  const [isrc, setIsrc] = useState("");

  const [primaryArtists, setPrimaryArtists] = useState([{ name: "", _id: "" }]);
  const [featureArtists, setFeatureArtists] = useState([{ name: "", _id: "" }]);
  const { data: profileData } = useProfileQuery({});

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
      isKids: "No",
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
      storeReleaseDate: "As soon as possible",
      releaseDate: "",
      audioIsrc: isrc,
      vevoChannel: "",
      keywords: [],
      copyright: "",
      copyrightYear: "",
      youtubePremiere: "No",
      countdownTheme: "Default",
      countdownLength: "1 Minute",
      territoryPolicy: "Monetize Worldwide",
      visibility: "Default",
      repertoireOwner: profileData?.data?.channelName,
    },
  });
  const vevoChannelValue = watch("vevoChannel");
  // console.log(control?._fields.vevoChannel?._f.value);
  const [open, setOpen] = useState(false);
  const [openArtist, setOpenArtist] = useState(false);
  const [openChannel, setOpenChannel] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
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
  const { data: channelData } = useGetApprovedChannelsQuery({});
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

  const handleBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent any default behavior
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent any default behavior
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
      const keywordsString = Array.isArray(data.keywords)
        ? data.keywords.join(", ")
        : data.keywords;

      formData.append("version", data.version || "");
      formData.append("title", data.title || "");
      formData.append("label", data.label || "");
      formData.append("genre", selectedGenre || "");
      formData.append("subGenre", selectedSubgenre || "");
      formData.append("language", data.language || "");
      formData.append("isrc", isrc || "");
      formData.append("upc", data.upc || "");
      formData.append("description", data.description || "");
      formData.append(
        "storeReleaseDate",
        data.storeReleaseDate || "As soon as possible"
      );
      formData.append("releaseDate", data.releaseDate || "");
      formData.append("explicit", data.explicit);

      formData.append("isKids", data.isKids);
      formData.append("audioIsrc", isrc || "");
      formData.append("vevoChannel", data.vevoChannel || "");
      formData.append("keywords", keywordsString || "");
      formData.append("copyright", data.copyright || "");

      formData.append("copyrightYear", data.copyrightYear || "");
      formData.append("youtubePremiere", data.youtubePremiere || "No");
      formData.append("countdownTheme", data.countdownTheme || "Default");
      formData.append("countdownLength", data.countdownLength || "1 Minute");
      formData.append(
        "territoryPolicy",
        data.territoryPolicy || "Monetize Worldwide"
      );
      formData.append("visibility", data.visibility || "Default");
      formData.append("repertoireOwner", data.repertoireOwner || "");
      formData.append(
        "alreadyHaveAnVevoChannel",
        data.alreadyHaveAnVevoChannel || "No"
      );
      formData.append("videoLink", data.videoLink || "");
      formData.append("assetId", data.assetId || "");

      const formattedPrimaryArtists = primaryArtists?.map(
        (artist) => artist._id
      );
      const formattedFeatureArtists = featureArtists?.map(
        //@ts-ignore
        (artist) => artist.name
      );

      formData.append(
        "primaryArtist",
        formattedPrimaryArtists ? JSON.stringify(formattedPrimaryArtists) : "[]"
      );
      formData.append(
        "featuringArtists",
        formattedFeatureArtists ? JSON.stringify(formattedFeatureArtists) : "[]"
      );
      formData.append("writer", data.writer || "");
      formData.append("composer", data.composer || "");
      formData.append("producer", data.producer || "");
      formData.append("editor", data.editor || "");
      formData.append("musicDirector", data.musicDirector || "");

      const res = await axios.post(`${imageURL}/video/upload`, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            //@ts-ignore
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
          setLoading(true);
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (res?.data?.success === true) {
        toast.success("Video Upload Successful");
        setLoading(false);
        navigate("/my-uploads/pending-videos");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Upload failed.");
      setLoading(false);
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

  const handleAcceptCondition =
    (condition: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
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
    const genreObj = genresForVideo?.find(
      (genre) => genre.name === selectedGenre
    );
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

  // Custom Step Icon Component
  const CustomStepIcon = ({ icon, active, completed }: any) => {
    const icons: { [key: string]: React.ReactElement } = {
      1: <VideoLibraryIcon />,
      2: <AddCircleIcon />,
      3: <PublishIcon />,
    };

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 50,
          height: 50,
          borderRadius: "50%",
          background:
            active || completed
              ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
              : "#ccc",
          color: "#fff",
        }}
      >
        {icons[String(icon)]}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, rgba(137, 247, 254, 0.8) 0%, rgba(102, 166, 255, 0.8) 50%), " +
          "linear-gradient(225deg, rgba(245, 147, 251, 0.5) 50%, rgba(245, 87, 108, 0.5) 100%)",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <Container maxWidth="md">
        <Card
          sx={{
            borderRadius: "15px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",

            background:
              "radial-gradient(at 64% 69%, hsla(199, 91%, 54%, 1) 0, hsla(199, 91%, 54%, 0) 50%)",
          }}
        >
          <CardContent>
            {/* Stepper Component */}
            <Stepper
              activeStep={activeStep}
              alternativeLabel
              sx={{
                marginBottom: "40px",
                "& .MuiStepConnector-root": {
                  top: 22,
                  left: "calc(-50% + 16px)",
                  right: "calc(50% + 16px)",
                },
                "& .MuiStepConnector-line": {
                  borderColor: activeStep > 0 ? "#FF8E53" : "#eaeaf0",
                  borderTopWidth: 3,
                  borderRadius: 1,
                },
              }}
            >
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    StepIconComponent={(props) => (
                      <CustomStepIcon
                        {...props}
                        icon={index + 1}
                        active={props.active}
                        completed={props.completed}
                      />
                    )}
                  >
                    <Typography variant="subtitle1">{step.label}</Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            {/* Form */}
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

                {activeStep === 1 && (
                  <AdditionalForm control={control} classes={classes} />
                )}

                {activeStep === 2 && (
                  <DistributorForm
                    control={control}
                    classes={classes}
                    uploadProgress={uploadProgress}
                    loading={loading}
                  />
                )}

                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "20px",
                    }}
                  >
                    {activeStep > 0 && (
                      <Button
                        variant="outlined"
                        onClick={handleBack}
                        type="button"
                        sx={{
                          padding: "10px 20px",
                          borderRadius: "8px",
                          borderColor: "#FF8E53",
                          color: "#000",
                          "&:hover": {
                            borderColor: "#FF8E53",
                            backgroundColor: "rgba(255, 142, 83, 0.1)",
                          },
                        }}
                      >
                        Back
                      </Button>
                    )}
                    {activeStep < steps.length - 1 &&
                      (haveChannel && vevoChannelValue.trim() !== "" ? (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          type="button" // Explicitly set type to button
                          sx={{
                            background:
                              "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            "&:hover": {
                              background:
                                "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
                            },
                          }}
                        >
                          Next
                        </Button>
                      ) : (
                        <Stack sx={{ width: "100%", mt: 2 }} spacing={2}>
                          <Alert
                            severity="warning"
                            icon={<AddCircleOutlineIcon fontSize="inherit" />}
                            sx={{
                              borderRadius: 2,
                              background: "#fff3cd",
                              color: "#856404",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                          >
                            <AlertTitle sx={{ fontWeight: "bold" }}>
                              Channel Required
                            </AlertTitle>
                            Please create and select a channel to proceed to the
                            next step.
                          </Alert>
                        </Stack>
                      ))}
                  </Box>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
      {/* Modals */}
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
    </Box>
  );
};

export default UploadVideo;
