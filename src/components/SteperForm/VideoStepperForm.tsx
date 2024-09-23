/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import AudioDetails from "../uploads/Single/AudioDetails";
import ReleaseInformation from "../uploads/Single/ReleaseInformation";
import TracksInformation from "../uploads/Single/TracksInformation";
import Countries from "../uploads/Single/Countries";
import SingleReviewPage from "../uploads/Single/SingleReviewPage";
import {
  useUploadDraftAudioMutation,
  useUploadSingleAudioMutation,
} from "@/redux/slices/uploadVideoAudio/uploadVideoAudioApi";
import toast from "react-hot-toast";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import { imageURL } from "@/redux/api/baseApi";
import DetailsForm from "../Uplaods/UplaodVideo/DetailsForm";
import AdditionalForm from "../Uplaods/UplaodVideo/AdditionalForm";
import DistributorForm from "../Uplaods/UplaodVideo/DistributorForm";
import CountriesPage from "../Uplaods/UplaodVideo/CountriesPage";
import VideoReviewPage from "../Uplaods/UplaodVideo/VideoReviewPage";

interface IDetails {
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
  audioIsrc: string;
  vevoChannel: string;
}

interface IAdditional {
  keywords: string;
  copyright: string;
  copyrightYear: string;
  territoryPolicy: string;
  visibility: string;
  time: string;
  repertoireOwner: string;
}

interface VideoDetails {
  videoFile: File;
  thumbnail: File;
}
interface IDistributor {
  upc: string;
  description: string;
  storeReleaseDate: string;
  explicit: string;
  youtubePremiere: string;
  isExist: string;
  isKids: string;
}
function generateISRC() {
  const prefix = "BDA1U24";
  const randomNumber = Math.floor(Math.random() * 99999) + 1;
  const paddedNumber = randomNumber.toString().padStart(5, "0");
  return `${prefix}${paddedNumber}`;
}
const steps = [
  { title: "Details", component: DetailsForm },
  { title: "Additional", component: AdditionalForm },
  { title: "Distributor", component: DistributorForm },
  { title: "Countries", component: CountriesPage },
  { title: "Review Details", component: VideoReviewPage },
];

const VideoUploaderStepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isrc, setIsrc] = useState("");
  const [formData, setFormData] = useState({
    video: { videoFile: new File([], ""), thumbnail: new File([], "") },
    details: {
      video: "",
      thumbnail: "",
      title: "",
      isrc: isrc,
      primaryArtist: [{ primaryArtistName: "", _id: "" }],
      featuringArtists: [{ featuringArtistName: "" }],
      genre: "",
      subGenre: "",
      language: "",
      explicit: "No",
      repertoireOwner: "",
      label: "",
      vevoChannel: "",
      keywords: "",
      description: "",
      isKids: "No",
      isExist: "No",
    },
    additional: {
      upc: "",
      audioIsrc: "",
      version: "",
      writer: [{ writerName: "" }],
      composer: [{ composerName: "" }],
      producer: [{ producerName: "" }],
      editor: [{ editorName: "" }],
      musicDirector: [{ musicDirectorName: "" }],
      copyright: "",
      copyrightYear: "",
    },
    distributor: {
      territoryPolicy: "Monetize Worldwide",
      visibility: "",
      time: "",
      storeReleaseDate: "",
    },
    countries: [],
    previewPage: {},
  });
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadAudio, { isLoading }] = useUploadSingleAudioMutation();

  const [openModal, setOpenModal] = useState(false);
  const [conditionsAccepted, setConditionsAccepted] = useState({
    condition1: false,
    condition2: false,
    condition3: false,
  });
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDataChange = (step: any, data: any) => {
    const updatedFormData = { ...formData, [step]: data };
    setFormData(updatedFormData);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
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
  //!
  const handleSubmit = async () => {
    setOpenModal(false);
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("cLine", formData.releaseInformation.cLine);
      formDataToSend.append("subtitle", formData.releaseInformation.version);
      formDataToSend.append(
        "catalogNumber",
        formData.releaseInformation.catalogNumber
      );
      formDataToSend.append(
        "featuringArtists",
        formData.releaseInformation.featuringArtists.join(",")
      );
      formDataToSend.append("format", formData.releaseInformation.format);
      formDataToSend.append("genre", formData.releaseInformation.genre);
      formDataToSend.append("label", formData.releaseInformation.label);
      formDataToSend.append("pLine", formData.releaseInformation.pLine);
      formDataToSend.append(
        "primaryArtist",
        formData.releaseInformation.primaryArtists.join(",")
      );
      formDataToSend.append(
        "productionYear",
        formData.releaseInformation.productionYear
      );
      formDataToSend.append(
        "releaseDate",
        formData.releaseInformation.releaseDate
      );
      formDataToSend.append(
        "releaseTitle",
        formData.releaseInformation.releaseTitle
      );
      formDataToSend.append("subGenre", formData.releaseInformation.subgenre);
      formDataToSend.append("upc", formData.releaseInformation.upc);
      formDataToSend.append(
        "variousArtists",
        formData.releaseInformation.variousArtists
      );

      // Append trackDetails fields
      formDataToSend.append("arranger", formData.trackDetails.arranger);
      formDataToSend.append(
        "askToGenerateISRC",
        formData.trackDetails.askToGenerateISRC
      );
      formDataToSend.append("author", formData.trackDetails.author);
      formDataToSend.append("composer", formData.trackDetails.composer);
      formDataToSend.append("contentType", formData.trackDetails.contentType);
      formDataToSend.append("instrumental", formData.trackDetails.instrumental);
      formDataToSend.append("isrc", formData.trackDetails.isrc);
      formDataToSend.append("lyrics", formData.trackDetails.lyrics);
      formDataToSend.append(
        "lyricsLanguage",
        formData.trackDetails.lyricsLanguage
      );
      formDataToSend.append(
        "parentalAdvisory",
        formData.trackDetails.parentalAdvisory
      );
      formDataToSend.append("previewStart", formData.trackDetails.previewStart);
      formDataToSend.append("price", formData.trackDetails.price);
      formDataToSend.append(
        "primaryTrackType",
        formData.trackDetails.primaryTrackType
      );
      formDataToSend.append("producer", formData.trackDetails.producer);
      formDataToSend.append("publisher", formData.trackDetails.publisher);
      formDataToSend.append("remixer", formData.trackDetails.remixer);
      formDataToSend.append(
        "secondaryTrackType",
        formData.trackDetails.secondaryTrackType
      );
      formDataToSend.append("title", formData.trackDetails.title);
      formDataToSend.append(
        "trackTitleLanguage",
        formData.trackDetails.trackTitleLanguage
      );

      formDataToSend.append("audio", formData.audio.audioFile);
      formDataToSend.append("image", formData.audio.coverImage);

      formDataToSend.append("countries", formData.countries.join(","));

      await axios
        .post(`${imageURL}/single-music/upload`, formDataToSend, {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then(({ data }) => {
          if (data?.success === true) {
            localStorage.removeItem("releaseFormData");
            localStorage.removeItem("tracksInformation");
            toast.success("Song Upload Successful");
            navigate("/my-uploads/pending-track");
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    } catch (error: any) {
      console.error("Error in handleSubmit:", error?.message);
      toast.error(error?.message);
    }
  };
  //!
  useEffect(() => {
    const newIsrc = generateISRC();
    setIsrc(newIsrc);
  }, []);
  const StepComponent = steps[activeStep].component;

  return (
    <Container
      maxWidth="lg"
      sx={{
        position: "relative",
        // backgroundImage: `url(https://res.cloudinary.com/arafatleo/image/upload/v1724142235/signup_aiqgj5.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "20px",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <Box
        textAlign="center"
        mb={4}
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay for text readability
          zIndex: -1,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Distribute Your Music with ANS Music
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Follow the steps below to complete your video.
        </Typography>
      </Box>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.title}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box mt={4}>
        <StepComponent data={formData} onChange={handleDataChange} />
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
      >
        <Button
          variant="contained"
          color="secondary"
          onClick={handleBack}
          disabled={activeStep === 0}
          style={{ flexGrow: 1, marginRight: 10 }}
        >
          Back
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            style={{ flexGrow: 1, marginLeft: 10 }}
          >
            Next
          </Button>
        ) : (
          <>
            <LinearProgress
              className="py-2 my-2"
              variant="determinate"
              value={uploadProgress}
              style={{ width: "100%", marginTop: 10 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
              style={{ flexGrow: 1, marginLeft: 10 }}
            >
              Upload
            </Button>
          </>
        )}
      </Box>
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
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={
              !conditionsAccepted.condition1 ||
              !conditionsAccepted.condition2 ||
              !conditionsAccepted.condition3 ||
              isLoading
            }
          >
            {isLoading ? "Uploading..." : "Agree and Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default VideoUploaderStepperForm;
