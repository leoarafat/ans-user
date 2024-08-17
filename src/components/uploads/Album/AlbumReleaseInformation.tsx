/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";
import { Container, Grid, TextField, Box, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Autocomplete from "@mui/material/Autocomplete";
import {
  useGetArtistsQuery,
  useGetApprovedLabelsQuery,
} from "@/redux/slices/ArtistAndLabel/artistLabelApi";

const years = Array.from(
  new Array(50),
  (val, index) => new Date().getFullYear() - index
).map(String);

const AlbumReleaseInformation = ({ data, onChange }: any) => {
  const [formData, setFormData] = useState<any>(() => {
    const storedData = localStorage.getItem("releaseInformationData");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return {
        releaseTitle: data.releaseTitle || "",
        version: data.version || "",
        primaryArtists: data.primaryArtists || [""],
        label: data.label || "",
        physicalReleaseDate: data.physicalReleaseDate || "",
        storeReleaseDate: data.storeReleaseDate || "",
        pLine: data.pLine || "",
        cLine: data.cLine || "",
        productionYear: data.productionYear || "",
        catalogNumber: data.catalogNumber || "",
      };
    }
  });

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
    localStorage.setItem("releaseInformationData", JSON.stringify(formData));
    onChange("releaseInformation", formData);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addPrimaryArtist = () =>
    setFormData((prevData) => ({
      ...prevData,
      primaryArtists: [...prevData.primaryArtists, ""],
    }));

  const removePrimaryArtist = (index: number) => {
    const newPrimaryArtists = [...formData.primaryArtists];
    newPrimaryArtists.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      primaryArtists: newPrimaryArtists,
    }));
  };

  const handlePrimaryArtistChange = (
    index: number,
    newValue: { label: string; value: string } | null
  ) => {
    const newPrimaryArtists = [...formData.primaryArtists];
    newPrimaryArtists[index] = newValue ? newValue.value : "";
    setFormData((prevData) => ({
      ...prevData,
      primaryArtists: newPrimaryArtists,
    }));
  };

  const handleLabelChange = (
    newValue: { label: string; value: string } | null
  ) => {
    setFormData((prevData: any) => ({
      ...prevData,
      label: newValue ? newValue.value : "",
    }));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Release Title"
              variant="outlined"
              name="releaseTitle"
              value={formData.releaseTitle}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Version/Subtitle"
              variant="outlined"
              placeholder="Use this field to add further details to your release title"
              name="version"
              value={formData.version}
              onChange={handleChange}
            />
          </Grid>
          {formData.primaryArtists.map((artist, index) => (
            <Grid
              item
              xs={12}
              md={6}
              key={index}
              container
              alignItems="center"
              spacing={1}
            >
              <Grid item xs={12}>
                <Autocomplete
                  options={artistOptions}
                  getOptionLabel={(option) => option.label}
                  value={
                    artistOptions.find((opt) => opt.value === artist) || null
                  }
                  onChange={(event, newValue) =>
                    handlePrimaryArtistChange(index, newValue)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Primary Artist"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
              <Grid item className="flex justify-between">
                <IconButton
                  onClick={() => removePrimaryArtist(index)}
                  disabled={formData.primaryArtists.length === 1}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>
                {index === formData.primaryArtists.length - 1 && (
                  <IconButton onClick={addPrimaryArtist}>
                    <AddCircleOutlineIcon />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          ))}

          <Grid item xs={12} md={6}>
            <Autocomplete
              options={labelOptions}
              getOptionLabel={(option) => option.label}
              value={
                labelOptions.find((opt) => opt.value === formData.label) || null
              }
              onChange={(event, newValue) => handleLabelChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Label"
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Physical/Original Release Date"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              name="physicalReleaseDate"
              value={formData.physicalReleaseDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Store Release Date"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              name="storeReleaseDate"
              value={formData.storeReleaseDate}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="pLine"
              value={formData.pLine}
              onChange={handleChange}
              fullWidth
              label="Ⓟ Line"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="cLine"
              value={formData.cLine}
              onChange={handleChange}
              fullWidth
              label="© Line"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={years}
              value={formData.productionYear}
              onChange={(event, newValue) =>
                setFormData((prevData) => ({
                  ...prevData,
                  productionYear: newValue || "",
                }))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Production Year"
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="catalogNumber"
              value={formData.catalogNumber}
              onChange={handleChange}
              fullWidth
              label="Catalogue Number"
              variant="outlined"
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AlbumReleaseInformation;
