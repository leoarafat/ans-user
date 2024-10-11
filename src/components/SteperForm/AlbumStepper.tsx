/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import {
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Grid,
} from "@material-ui/core";

import { useNavigate } from "react-router-dom";

import AlbumAudioDetails from "../uploads/Album/AlbumAudioDetails";
import AlbumReleaseInformation from "../uploads/Album/AlbumReleaseInformation";
import AlbumAudioReview from "../uploads/Album/AlbumAudioReview";
import { useUploadAlbumMutation } from "@/redux/slices/uploadVideoAudio/uploadVideoAudioApi";
import toast from "react-hot-toast";
interface FormData {
  releaseInformation: {
    releaseTitle: string;
    version: string;
    primaryArtists: string[];
    label: string;
    productionYear: string;
    physicalReleaseDate: string;
    storeReleaseDate: string;
    pLine: string;
    cLine: string;
    catalogNumber: string;
  };
  audios: {
    file: File;
    title: string;
    version: string;
    primaryArtists: string[];
    label: string;
    writers: string[];
    composers: string[];
    producers: string[];
    featuringArtists: string[];
    genre: string;
    subgenre: string;
    upc: string;
    format: string;
    originalReleaseDate: string;
    releaseDate: string;
    productionYear: string;
    youtube: string;
    lyrics: string;
    isrc: string;
    language: string;
  }[];
  coverImage: {
    coverImage: File;
  };
}
const steps = [
  { title: "Release Information", component: AlbumReleaseInformation },
  { title: "Audio & Cover", component: AlbumAudioDetails },
  { title: "Review Details", component: AlbumAudioReview },
];

const AlbumStepperForm = () => {
  // const [activeStep, setActiveStep] = useState(0);
  // const [formData, setFormData] = useState({
  //   releaseInformation: {},
  //   audios: {},
  //   previewPage: {},
  //   coverImage: {},
  // });
  const [activeStep, setActiveStep] = useState<number>(0);
  const [formData, setFormData] = useState<FormData>({
    releaseInformation: {
      releaseTitle: "",
      version: "",
      primaryArtists: [],
      label: "",
      productionYear: "",
      physicalReleaseDate: "",
      storeReleaseDate: "",
      pLine: "",
      cLine: "",
      catalogNumber: "",
    },
    audios: [],
    coverImage: {
      //@ts-ignore
      coverImage: null,
    },
  });
  const [uploadAlbum, { isLoading }] = useUploadAlbumMutation();

  const navigate = useNavigate();

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDataChange = (step: any, data: any) => {
    const updatedFormData = { ...formData, [step]: data };
    setFormData(updatedFormData);
  };

  const handleSubmit = async () => {
    try {
      const formDataToSend = new FormData();

      formDataToSend.append("image", formData?.coverImage?.coverImage);
      formDataToSend.append(
        "releaseTitle",
        formData.releaseInformation.releaseTitle
      );
      formDataToSend.append("subtitle", formData.releaseInformation.version);
      formDataToSend.append(
        "primaryArtist",
        //@ts-ignore
        formData.releaseInformation.primaryArtists
      );
      formDataToSend.append("label", formData.releaseInformation.label);
      formDataToSend.append(
        "productionYear",
        formData.releaseInformation.productionYear
      );
      formDataToSend.append(
        "physicalReleaseDate",
        formData.releaseInformation.physicalReleaseDate
      );
      formDataToSend.append(
        "storeReleaseDate",
        formData.releaseInformation.storeReleaseDate
      );
      formDataToSend.append("pLine", formData.releaseInformation.pLine);
      formDataToSend.append("cLine", formData.releaseInformation.cLine);
      formDataToSend.append(
        "catalogNumber",
        formData.releaseInformation.catalogNumber
      );

      formData.audios.forEach((audio, index) => {
        console.log(audio);
        formDataToSend.append("audio", audio.file);
        formDataToSend.append(`audio[${index}][title]`, audio.title);
        formDataToSend.append(`audio[${index}][subtitle]`, audio.version);
        formDataToSend.append(
          `audio[${index}][primaryArtists]`,
          audio.primaryArtists.join(",")
        );
        formDataToSend.append(`audio[${index}][label]`, audio.label);
        formDataToSend.append(
          `audio[${index}][writers]`,
          audio.writers.join(",")
        );
        formDataToSend.append(
          `audio[${index}][composers]`,
          audio.composers.join(",")
        );
        formDataToSend.append(
          `audio[${index}][producers]`,
          audio.producers.join(",")
        );
        formDataToSend.append(
          `audio[${index}][featuringArtists]`,
          audio.featuringArtists.join(",")
        );
        formDataToSend.append(`audio[${index}][genre]`, audio.genre);
        formDataToSend.append(`audio[${index}][subGenre]`, audio.subgenre);
        formDataToSend.append(`audio[${index}][upcEan]`, audio.upc);
        formDataToSend.append(`audio[${index}][format]`, audio.format);
        formDataToSend.append(
          `audio[${index}][originalReleaseDate]`,
          audio.releaseDate
        );
        formDataToSend.append(
          `audio[${index}][productionYear]`,
          audio.productionYear
        );
        formDataToSend.append(`audio[${index}][youtube]`, audio.youtube);
        formDataToSend.append(`audio[${index}][lyrics]`, audio.lyrics);
        formDataToSend.append(`audio[${index}][isrc]`, audio.isrc);
        formDataToSend.append(`audio[${index}][language]`, audio.language);
      });

      const res = await uploadAlbum(formDataToSend);
      console.log(res);
      if (res?.data?.success === true) {
        toast.success("Album Upload Successful");
        localStorage.removeItem("releaseInformationData");
        navigate("/my-uploads/pending-track");
      }
    } catch (error: any) {
      console.error("Error uploading album:", error.message);
      toast.error(error.message);
    }
  };

  const StepComponent = steps[activeStep].component;

  return (
    <Grid container direction="column">
      <Typography variant="h4" align="center" gutterBottom>
        Let's Distribute Your Music With ANS Music
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((step) => (
          <Step key={step.title}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div style={{ flexGrow: 1, marginBottom: 20 }}>
        <StepComponent data={formData} onChange={handleDataChange} />
      </div>
      <div style={{ textAlign: "right" }}>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep < steps.length - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            style={{ marginLeft: 10 }}
          >
            Save & Go Next
          </Button>
        )}
        {activeStep === steps.length - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginLeft: 10 }}
          >
            {isLoading ? "Uploading..." : "Let's Upload"}
          </Button>
        )}
      </div>
    </Grid>
  );
};

export default AlbumStepperForm;
