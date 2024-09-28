/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  Box,
  TextField,
  Button,
  Typography,
  Autocomplete,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "@/utils/Loader";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { genres } from "@/MockData/MockData";
import { FormValues } from "./FormValues";
import {
  useEditSingleMusicMutation,
  useGetMusicDetailsQuery,
} from "@/redux/slices/myUploads/myUploadsApi";
import {
  useGetApprovedLabelsQuery,
  useGetArtistsQuery,
} from "@/redux/slices/ArtistAndLabel/artistLabelApi";

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
  audio: {
    width: "100%",
  },
});

const EditAudio = () => {
  const classes = useStyles();
  const [formValues, setFormValues] = useState<FormValues>({
    primaryTrackType: "",
    isRelease: "",
    instrumental: "",
    secondaryTrackType: "",
    parentalAdvisory: "",
    releaseTitle: "",
    previewStart: "",
    title: "",
    subtitle: "",
    pLine: "",
    cLine: "",
    remixer: "",
    author: "",
    composer: "",
    arranger: "",
    producer: "",
    genre: "",
    subGenre: "",
    upc: "",
    productionYear: "",
    publisher: "",
    isrc: "",
    catalogNumber: "",
    trackTitleLanguage: "",
    lyricsLanguage: "",
    releaseDate: "",
    lyrics: "",
    format: "",
    contentType: "",
    askToGenerateISRC: "",
    price: "",
    primaryArtist: [],
    featuringArtists: "",
    label: "",
  });
  const { data: labelData } = useGetApprovedLabelsQuery({});
  const { data: artistData } = useGetArtistsQuery({});
  const { id } = useParams();
  const { data: songs, isLoading } = useGetMusicDetailsQuery(id);
  const [editSong] = useEditSingleMusicMutation();
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
  useEffect(() => {
    if (songsData?.data) {
      const {
        primaryTrackType,
        isRelease,
        instrumental,
        secondaryTrackType,
        parentalAdvisory,
        releaseTitle,
        previewStart,
        title,
        subtitle,
        pLine,
        cLine,
        remixer,
        author,
        composer,
        arranger,
        producer,
        genre,
        subGenre,
        upc,
        productionYear,
        publisher,
        isrc,
        catalogNumber,
        trackTitleLanguage,
        lyricsLanguage,
        releaseDate,
        lyrics,
        format,
        contentType,
        askToGenerateISRC,
        price,
        primaryArtist,
        featuringArtists,
        label,
      } = songsData.data;

      //@ts-ignore
      setFormValues({
        //@ts-ignore

        ...songsData.data,
        primaryArtist: primaryArtist || [],
      });
    }
  }, [songsData]);

  const handleSave = async () => {
    const confirmResult = await Swal.fire({
      icon: "question",
      title: "Are you sure?",
      text: "Do you want to edit this song?",
      showCancelButton: true,
      confirmButtonText: "Yes, edit it!",
      cancelButtonText: "No, cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    if (confirmResult.isConfirmed) {
      try {
        const res = await editSong({ id, data: formValues });
        if (res?.data?.success === true) {
          toast.success("Song edit successfully");
          window.history.back();
          //@ts-ignore
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Song Edit successfully.",
            confirmButtonText: "OK",
            timer: 3000,
            timerProgressBar: true,
            onClose: () => {
              window.history.back();
            },
          });
        }
      } catch (error) {
        toast.error("Failed to update song");
        console.error(error);

        // Show error SweetAlert
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to update song.",
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
        text: "Song Edit cancelled.",
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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box className={classes.form}>
        <Typography variant="h4" gutterBottom>
          Edit Track
        </Typography>

        <form noValidate autoComplete="off">
          <TextField
            fullWidth
            margin="normal"
            label="Release Title"
            name="releaseTitle"
            value={formValues.releaseTitle}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Subtitle"
            name="subtitle"
            value={formValues.subtitle}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="P Line"
            name="pLine"
            value={formValues.pLine}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="C Line"
            name="cLine"
            value={formValues.cLine}
            onChange={handleInputChange}
            variant="outlined"
          />
          <TextField
            fullWidth
            margin="normal"
            label="Track Type"
            name="primaryTrackType"
            value={formValues.primaryTrackType}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Remixer"
            name="remixer"
            value={formValues.remixer}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Author"
            name="author"
            value={formValues.author}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Composer"
            name="composer"
            value={formValues.composer}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Arranger"
            name="arranger"
            value={formValues.arranger}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Producer"
            name="producer"
            value={formValues.producer}
            onChange={handleInputChange}
            variant="outlined"
          />

          <div className="mb-2">
            <Autocomplete
              options={genres?.map((genre: any) => genre.name) || []}
              value={formValues.genre}
              onChange={handleGenreChange}
              renderInput={(params) => (
                <TextField
                  required
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
                required
                {...params}
                label="SubGenre"
                variant="outlined"
                name="subGenre"
              />
            )}
            freeSolo
          />
          <TextField
            fullWidth
            margin="normal"
            label="Production Year"
            name="productionYear"
            value={formValues.productionYear}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Publisher"
            name="publisher"
            value={formValues.publisher}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Catalog Number"
            name="catalogNumber"
            value={formValues.catalogNumber}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Track Title Language"
            name="trackTitleLanguage"
            value={formValues.trackTitleLanguage}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Lyrics Language"
            name="lyricsLanguage"
            value={formValues.lyricsLanguage}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Release Date"
            name="releaseDate"
            value={formValues.releaseDate}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Lyrics"
            name="lyrics"
            value={formValues.lyrics}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={4}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Format"
            name="format"
            value={formValues.format}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Content Type"
            name="contentType"
            value={formValues.contentType}
            onChange={handleInputChange}
            variant="outlined"
          />

          <TextField
            fullWidth
            margin="normal"
            label="Ask to Generate ISRC"
            name="askToGenerateISRC"
            value={formValues.askToGenerateISRC}
            onChange={handleInputChange}
            variant="outlined"
          />

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
            label="ISRC"
            name="isrc"
            value={formValues.isrc}
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

          <FormControl fullWidth margin="normal">
            <InputLabel id="featuringArtists-label">
              Featuring Artists
            </InputLabel>
            <Select
              labelId="featuringArtists-label"
              id="featuringArtists"
              name="featuringArtists"
              value={formValues.featuringArtists}
              label="Featuring Artists"
              onChange={handleInputChange}
            >
              <MenuItem value="">Select Featuring Artists</MenuItem>
              {/* Add options for featuring artists */}
            </Select>
          </FormControl>

          <Autocomplete
            options={labelOptions}
            getOptionLabel={(option) => option.label}
            value={
              labelOptions.find(
                (option: any) => option.value === formValues.label._id
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
    </>
  );
};

export default EditAudio;
