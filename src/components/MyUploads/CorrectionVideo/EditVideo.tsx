/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Box, TextField, Typography, Autocomplete } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "@/utils/Loader";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { genres } from "@/MockData/MockData";

import {
  useEditVideoMutation,
  useGetVideoDetailsQuery,
} from "@/redux/slices/myUploads/myUploadsApi";
import {
  useGetApprovedLabelsQuery,
  useGetArtistsQuery,
  useGetChannelsQuery,
} from "@/redux/slices/ArtistAndLabel/artistLabelApi";
import { allLanguage, years } from "@/utils/languages";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { EditIcon } from "lucide-react";

import { FormValues } from "../CorrectionMusic/FormValues";
import VideoUpdateModal from "./EditVideoBanner";

const useStyles = makeStyles({
  form: {
    width: "100%",
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
  },
  media: {
    height: 200,
    position: "relative",
  },
  downloadButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 1)",
    },
  },

  video: {
    width: "100%",
    height: "100%",
  },
});

const EditVideo = () => {
  const classes = useStyles();
  const [formValues, setFormValues] = useState<FormValues>({
    primaryArtist: [],
    label: "",
    version: "",
    explicit: "",
    title: "",
    writer: "",
    composer: "",
    musicDirector: "",
    producer: "",
    editor: "",
    genre: "",
    subGenre: "",
    language: "",
    upc: "",
    isrc: "",
    audioIsrc: "",
    storeReleaseDate: "",
    releaseDate: "",
    vevoChannel: "",
    repertoireOwner: "",
    time: "",
    visibility: "",
    keywords: "",
    videoLink: "",
    assetId: "",
    copyright: "",
    copyrightYear: "",
    territoryPolicy: "",
    isKids: "",
    isExist: "",
    videoAlreadyExistOnYoutube: "",
    alreadyHaveAnVevoChannel: "",
    youtubePremiere: "",
    countdownTheme: "",
    countdownLength: "",
    description: "",
    image: "",
    video: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: labelData } = useGetApprovedLabelsQuery({});
  const { data: artistData } = useGetArtistsQuery({});
  const { data: channelData } = useGetChannelsQuery({});
  const { id } = useParams();
  const { data: songs, isLoading } = useGetVideoDetailsQuery(id);
  const [haveChannel, setHaveChannel] = useState(false);
  const [haveVideo, setHaveVideo] = useState(false);
  const [openChannel, setOpenChannel] = useState(false);
  const navigate = useNavigate();

  const [editVideo] = useEditVideoMutation();
  const songsData = songs;

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
    if (songsData?.data) {
      const { primaryArtist } = songsData.data;

      //@ts-ignore
      setFormValues({
        //@ts-ignore
        ...songsData.data,
        primaryArtist: primaryArtist || [],
      });
    }
  }, [songsData]);
  useEffect(() => {
    if (
      songsData?.data?.alreadyHaveAnVevoChannel &&
      songsData?.data?.alreadyHaveAnVevoChannel === "Yes"
    ) {
      setHaveChannel(false);
    } else {
      setHaveChannel(true);
    }
  }, [songsData]);
  useEffect(() => {
    if (
      songsData?.data?.videoAlreadyExistOnYoutube &&
      songsData?.data?.videoAlreadyExistOnYoutube === "Yes"
    ) {
      setHaveVideo(true);
    } else {
      setHaveVideo(false);
    }
  }, [songsData]);
  const handleSave = async () => {
    const confirmResult = await Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "Do you want to edit the video?",
      showCancelButton: true,
      confirmButtonText: "Yes, edit it!",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await editVideo({ id, data: formValues });
        if (res?.data?.success === true) {
          toast.success("Video Edit successfully");
          //@ts-ignore
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Video edit successfully.",
            confirmButtonText: "OK",
            timer: 3000,
            timerProgressBar: true,
          });
          navigate("/my-uploads/correction-videos");
        }
      } catch (error) {
        toast.error("Failed to update video");
        console.error(error);

        // Show error SweetAlert
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to update video.",
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn btn-danger",
          },
        });
      }
    } else {
      // Handle cancel action (optional)
      Swal.fire({
        icon: "info",
        title: "Cancelled",
        text: "Video distribution cancelled.",
        confirmButtonText: "OK",
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handlePrimaryArtistChange = (
    event: React.ChangeEvent<object>,
    value: { label: string; value: string }[]
  ) => {
    setFormValues({
      ...formValues,
      primaryArtist: value,
    });
  };

  const handleGenreChange = (
    event: React.ChangeEvent<object>,
    value: string | null
  ) => {
    setFormValues((prevData: any) => ({
      ...prevData,
      genre: value || "",
      subgenre: "",
    }));
  };

  const handleSubgenreChange = (
    event: React.ChangeEvent<object>,
    value: string | null
  ) => {
    setFormValues((prevData: any) => ({
      ...prevData,
      subGenre: value || "",
    }));
  };

  const getSubgenres = () => {
    const genreObj = genres?.find(
      (genre: any) => genre.name === formValues.genre
    );
    return genreObj ? genreObj.subgenres : [];
  };
  const handleChange = (event: any) => {
    const value = event.target.value;
    setFormValues((prevData) => ({
      ...prevData,
      alreadyHaveAnVevoChannel: value,
    }));

    // Set additional state based on the selection
    if (value === "Yes") {
      setHaveChannel(true);
    } else {
      setHaveChannel(false);
    }
  };
  const handleVideoChange = (event: any) => {
    const value = event.target.value;
    setFormValues((prevData) => ({
      ...prevData,
      videoAlreadyExistOnYoutube: value,
    }));

    // Set additional state based on the selection
    if (value === "Yes") {
      setHaveVideo(true);
    } else {
      setHaveVideo(false);
    }
  };

  const handleBannerModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box className={classes.form}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h4" gutterBottom style={{ flexGrow: 1 }}>
            Edit Thumbnail & Video
          </Typography>

          <IconButton
            style={{
              backgroundColor: "#4A4A4A",
              color: "#FFF",
              marginLeft: "8px",
            }} // Industrial colors
          >
            <EditIcon onClick={handleBannerModalOpen} />
          </IconButton>
        </div>
        {/* <Card>
          <CardMedia
            className={classes.media}
            image={`${formValues.image}`}
            title="Track Image"
          ></CardMedia>
          <CardContent>
            <video className={classes.video} controls>
              <source src={`${formValues.video}`} type="video/mp4" />
              Your browser does not support the video element.
            </video>
          </CardContent>
        </Card> */}
        <form noValidate autoComplete="off">
          <TextField
            fullWidth
            margin="normal"
            label="ISRC"
            name="isrc"
            value={formValues.isrc}
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Release Title"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            variant="outlined"
          />
          <Autocomplete
            multiple
            options={artistOptions}
            value={formValues.primaryArtist.map((artist: any) => ({
              label: artist.label || artist.primaryArtistName,
              value: artist.value || artist._id,
            }))}
            getOptionLabel={(option) => option.label}
            onChange={handlePrimaryArtistChange}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Primary Artists"
                placeholder="Select primary artists"
                name="primaryArtist"
              />
            )}
          />

          <div className="my-2">
            <Autocomplete
              options={genres?.map((genre: any) => genre.name) || []}
              value={formValues.genre}
              onChange={handleGenreChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Genre"
                  variant="outlined"
                  name="genre"
                />
              )}
              freeSolo
            />
          </div>
          <Autocomplete
            options={getSubgenres()}
            value={formValues.subGenre}
            onChange={handleSubgenreChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="SubGenre"
                variant="outlined"
                name="subGenre"
              />
            )}
            freeSolo
          />
          <div className="my-2">
            {" "}
            <Autocomplete
              fullWidth
              options={allLanguage}
              value={formValues.language}
              onChange={(e, value) =>
                setFormValues((prevData) => ({
                  ...prevData,
                  language: value || "",
                }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Language"
                  variant="outlined"
                  name="language"
                />
              )}
            />
          </div>
          <Autocomplete
            fullWidth
            options={["Yes", "No"]}
            value={formValues.explicit}
            onChange={(e, value) =>
              setFormValues((prevData) => ({
                ...prevData,
                explicit: value || "",
              }))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Explicit"
                variant="outlined"
                name="explicit"
              />
            )}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Repertoire Owner"
            name="repertoireOwner"
            value={formValues.repertoireOwner}
            onChange={handleInputChange}
            variant="outlined"
          />
          <Autocomplete
            options={labelOptions}
            getOptionLabel={(option) => option.label}
            value={
              labelOptions.find(
                (option: any) => option.value === formValues.label?._id
              ) || null
            }
            onChange={(event, newValue) => {
              setFormValues((prevValues) => ({
                ...prevValues,
                label: newValue?.value || "",
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Label"
                variant="outlined"
                margin="normal"
              />
            )}
          />
          {/* <div className="flex">
            {" "}
            <FormControl fullWidth variant="outlined">
              <InputLabel>Already Have An Vevo Channel</InputLabel>
              <Select
                label="Already Have An Vevo Channel"
                value={formValues.alreadyHaveAnVevoChannel}
                onChange={handleChange}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
            {!haveChannel && (
              <Button
                // variant="contained"
                color="primary"
                onClick={showChannelModal}
              >
                Create Channel
              </Button>
            )}
          </div>
          {haveChannel && (
            <Autocomplete
              options={channelOptions}
              getOptionLabel={(option) => option.label}
              value={
                channelOptions.find(
                  (option: any) => option.value === formValues.vevoChannel
                ) || null
              }
              onChange={(event, newValue) => {
                setFormValues((prevValues) => ({
                  ...prevValues,
                  vevoChannel: newValue?.value || "",
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Vevo CHannel"
                  variant="outlined"
                  margin="normal"
                />
              )}
            />
          )} */}
          <div className="mt-2">
            {" "}
            <TextField
              fullWidth
              type="date"
              label="Date / Time"
              variant="outlined"
              name="releaseDate"
              value={formValues.releaseDate}
              onChange={handleInputChange}
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Keywords"
            name="keywords"
            value={formValues.keywords}
            onChange={handleInputChange}
            variant="outlined"
          />

          <div className="mb-3">
            {" "}
            <Autocomplete
              fullWidth
              options={["Yes", "No"]}
              value={formValues.isKids}
              onChange={(e, value) =>
                setFormValues((prevData) => ({
                  ...prevData,
                  isKids: value || "",
                }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Kids Video?"
                  variant="outlined"
                  name="isKids"
                />
              )}
            />
          </div>

          <FormControl fullWidth variant="outlined">
            <InputLabel>Video Already Exist On Youtube?</InputLabel>
            <Select
              label="Video Already Exist On Youtube?"
              value={formValues.videoAlreadyExistOnYoutube}
              onChange={handleVideoChange}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </FormControl>

          {haveVideo && (
            <>
              {" "}
              <TextField
                fullWidth
                margin="normal"
                label="Video Link"
                name="videoLink"
                value={formValues.videoLink}
                onChange={handleInputChange}
                variant="outlined"
              />
              <TextField
                fullWidth
                margin="normal"
                label="Asset Id"
                name="assetId"
                value={formValues.assetId}
                onChange={handleInputChange}
                variant="outlined"
              />
            </>
          )}
          <TextField
            fullWidth
            margin="normal"
            label="UPC"
            name="upc"
            value={formValues.upc}
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Audio ISRC"
            name="audioIsrc"
            value={formValues.audioIsrc}
            onChange={handleInputChange}
            variant="outlined"
          />
          <Autocomplete
            options={[
              "Lyrical Video",
              "Interview",
              "Official",
              "Live",
              "Behind The Scenes",
              "Teaser",
              "Original Content",
              "Pseudo Video",
            ]}
            // getOptionLabel={(option) => option.label}
            value={formValues.version}
            onChange={(event, newValue) => {
              setFormValues((prevValues) => ({
                ...prevValues,
                version: newValue || "",
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Version"
                variant="outlined"
                margin="normal"
              />
            )}
          />
          <TextField
            fullWidth
            value={formValues.writer}
            onChange={handleInputChange}
            variant="outlined"
            label="Writer"
            name="writer"
          />
          <div className="my-2">
            {" "}
            <TextField
              fullWidth
              value={formValues.composer}
              onChange={handleInputChange}
              variant="outlined"
              label="Composer"
              name="composer"
            />
          </div>
          <TextField
            fullWidth
            value={formValues.producer}
            onChange={handleInputChange}
            variant="outlined"
            label="Producer"
            name="producer"
          />
          <div className="my-2">
            {" "}
            <TextField
              fullWidth
              value={formValues.editor}
              onChange={handleInputChange}
              variant="outlined"
              label="Editor"
              name="editor"
            />
          </div>
          <div className="my-2">
            {" "}
            <TextField
              fullWidth
              value={formValues.copyright}
              onChange={handleInputChange}
              variant="outlined"
              label="Copyright"
              name="copyright"
            />
          </div>
          <TextField
            fullWidth
            value={formValues.copyrightYear}
            onChange={handleInputChange}
            variant="outlined"
            label="Copyright Year"
            name="copyrightYear"
          />

          <Autocomplete
            options={[
              "Default",
              "Unlisted on YouTube",
              "Unlisted on Video",
              "Unlisted on YouTube/Vevo",
            ]}
            // getOptionLabel={(option) => option.label}
            value={formValues.visibility}
            onChange={(event, newValue) => {
              setFormValues((prevValues) => ({
                ...prevValues,
                visibility: newValue || "",
              }));
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Visibility"
                variant="outlined"
                margin="normal"
              />
            )}
          />
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </form>
      </Box>
      <VideoUpdateModal
        open={isModalOpen}
        handleClose={handleModalClose}
        id={id}
      />
    </>
  );
};

export default EditVideo;
