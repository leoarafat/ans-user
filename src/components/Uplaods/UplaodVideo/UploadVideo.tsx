/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Grid, Card, CardContent, Container } from "@mui/material";
import { genres } from "@/MockData/MockData";
import {
  useGetArtistsQuery,
  useGetApprovedLabelsQuery,
  useGetApprovedChannelsQuery,
} from "@/redux/slices/ArtistAndLabel/artistLabelApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
      keywords: "",
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
      formData.append("releaseDate", data.releaseDate && data.releaseDate);
      formData.append("explicit", data.explicit);

      formData.append("isKids", data.isKids);
      formData.append("audioIsrc", isrc && isrc);
      formData.append("vevoChannel", data.vevoChannel && data.vevoChannel);
      formData.append("keywords", data.keywords && data.keywords);
      formData.append("copyright", data.copyright && data.copyright);

      formData.append(
        "copyrightYear",
        data.copyrightYear && data.copyrightYear
      );
      formData.append(
        "youtubePremiere",
        data.youtubePremiere && data.youtubePremiere
      );
      formData.append(
        "countdownTheme",
        data.countdownTheme && data.countdownTheme
      );
      formData.append(
        "countdownLength",
        data.countdownLength && data.countdownLength
      );
      formData.append(
        "territoryPolicy",
        data.territoryPolicy && data.territoryPolicy
      );
      formData.append("visibility", data.visibility && data.visibility);
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
      toast.error(error?.response?.data?.message);
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
