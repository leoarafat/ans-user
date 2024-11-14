// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Grid,
//   TextField,
//   Box,
//   IconButton,
//   Tooltip,
//   Card,
//   CardContent,
//   Button,
// } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// import Autocomplete from "@mui/material/Autocomplete";
// import { genres } from "@/MockData/MockData";
// import {
//   useGetArtistsQuery,
//   useGetApprovedLabelsQuery,
// } from "@/redux/slices/ArtistAndLabel/artistLabelApi";
// import { years } from "@/utils/languages";

// import { useCustomStyles } from "./Styles";
// import AddLabelModal from "@/components/ArtisLabelManagement/Label/AddLabelModa";
// import AddArtistModal from "@/components/ArtisLabelManagement/Artist/AddArtistModal";
// import { AddCircleOutline } from "@mui/icons-material";
// import { inputStyles } from "./SingleUtils";

// const formats: string[] = ["Single", "Album", "EP"];

// interface ReleaseFormData {
//   releaseTitle: string;
//   version: string;
//   primaryArtists: string[];
//   featuringArtists: string[];
//   variousArtists: boolean;
//   genre: string;
//   subgenre: string;
//   label: string;
//   format: string;
//   releaseDate: string;
//   pLine: string;
//   cLine: string;
//   productionYear: string;
//   upc: string;
//   catalogNumber: string;
// }

// interface Props {
//   data: ReleaseFormData;
//   onChange: (key: string, value: any) => void;
// }

// const ReleaseInformation: React.FC<Props> = ({ data, onChange }) => {
//   const [formData, setFormData] = useState<ReleaseFormData>(() => {
//     const storedData = localStorage.getItem("releaseFormData");
//     if (storedData) {
//       return JSON.parse(storedData);
//     } else {
//       return {
//         releaseTitle: data.releaseTitle || "",
//         version: data.version || "",
//         primaryArtists: data.primaryArtists || [""],
//         featuringArtists: data.featuringArtists || [""],
//         variousArtists: data.variousArtists || false,
//         genre: data.genre || "",
//         subgenre: data.subgenre || "",
//         label: data.label || "",
//         format: data.format || "Single",
//         releaseDate: data.releaseDate || "",
//         pLine: data.pLine || "",
//         cLine: data.cLine || "",
//         productionYear: data.productionYear || "",
//         upc: data.upc || "",
//         catalogNumber: data.catalogNumber || "",
//       };
//     }
//   });
//   const { data: labelData } = useGetApprovedLabelsQuery({});
//   const { data: artistData } = useGetArtistsQuery({});

//   const [open, setOpen] = useState(false);
//   const [openArtist, setOpenArtist] = useState(false);
//   const artistOptions =
//     //@ts-ignore
//     artistData?.data?.data?.map((artist: any) => ({
//       label: artist.primaryArtistName,
//       value: artist._id,
//     })) || [];

//   const labelOptions =
//     //@ts-ignore
//     labelData?.data?.data?.map((label: any) => ({
//       label: label.labelName,
//       value: label._id,
//     })) || [];

//   useEffect(() => {
//     localStorage.setItem("releaseFormData", JSON.stringify(formData));
//     onChange("releaseInformation", formData);
//   }, [formData]);

//   const showModal = () => {
//     setOpen(true);
//   };
//   const showArtistModal = () => {
//     setOpenArtist(true);
//   };
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleGenreChange = (
//     event: React.ChangeEvent<object>,
//     value: string | null
//   ) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       genre: value || "",
//       subgenre: "",
//     }));
//   };

//   const handleSubgenreChange = (
//     event: React.ChangeEvent<object>,
//     value: string | null
//   ) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       subgenre: value || "",
//     }));
//   };

//   const getSubgenres = () => {
//     const genreObj = genres.find((genre) => genre.name === formData.genre);
//     return genreObj ? genreObj.subgenres : [];
//   };

//   const addPrimaryArtist = () =>
//     setFormData((prevData) => ({
//       ...prevData,
//       primaryArtists: [...prevData.primaryArtists, ""],
//     }));

//   const removePrimaryArtist = (index: number) => {
//     const newPrimaryArtists = [...formData.primaryArtists];
//     newPrimaryArtists.splice(index, 1);
//     setFormData((prevData) => ({
//       ...prevData,
//       primaryArtists: newPrimaryArtists,
//     }));
//   };
//   const addFeaturingArtist = () =>
//     setFormData((prevData) => ({
//       ...prevData,
//       featuringArtists: [...prevData.featuringArtists, ""],
//     }));
//   const removeFeaturingArtist = (index: number) => {
//     const newFeaturingArtists = [...formData.featuringArtists];
//     newFeaturingArtists.splice(index, 1);
//     setFormData((prevData) => ({
//       ...prevData,
//       featuringArtists: newFeaturingArtists,
//     }));
//   };
//   const handleFeaturingArtistChange = (index: number, value: any) => {
//     const newFeaturingArtists = [...formData.featuringArtists];
//     newFeaturingArtists[index] = value ? value.value : "";
//     setFormData((prevData) => ({
//       ...prevData,
//       featuringArtists: newFeaturingArtists,
//     }));
//   };
//   const handlePrimaryArtistChange = (index: number, value: any) => {
//     const newPrimaryArtists = [...formData.primaryArtists];
//     newPrimaryArtists[index] = value ? value.value : "";
//     setFormData((prevData) => ({
//       ...prevData,
//       primaryArtists: newPrimaryArtists,
//     }));
//   };

//   const handleLabelChange = (
//     newValue: { label: string; value: string } | null
//   ) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       label: newValue ? newValue.value : "",
//     }));
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 1 }}>
//       <Box>
//         <Card
//           sx={{
//             p: 3,
//             mb: 3,
//             boxShadow: 3,
//             background:
//               "radial-gradient(at 64% 69%, hsla(199, 91%, 54%, 1) 0, hsla(199, 91%, 54%, 0) 50%)",
//             backdropFilter: "blur(8px)",
//             borderRadius: "16px",
//           }}
//         >
//           <CardContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <Tooltip
//                   title="Please enter a title for this release:
// eg.: Appetite for Destruction, Thriller, etc..."
//                 >
//                   <span className="text-red-600 font-bold pr-2 cursor-pointer">
//                     ?
//                   </span>
//                 </Tooltip>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Release Title"
//                   variant="filled"
//                   sx={inputStyles}
//                   placeholder=" Please enter a title for this release: eg.: Appetite for Destruction, Thriller, etc..."
//                   name="releaseTitle"
//                   value={formData.releaseTitle}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Tooltip
//                   title="Please use version field to enter further information for the release.
// eg.: Limited Edition, 25th Anniversary Edition, Karaoke Version, etc..."
//                 >
//                   <span className="text-red-600 font-bold pr-2 cursor-pointer">
//                     ?
//                   </span>
//                 </Tooltip>
//                 <TextField
//                   fullWidth
//                   label="Version/Subtitle"
//                   variant="filled"
//                   sx={inputStyles}
//                   placeholder="Use this field to add further details to your release title"
//                   name="version"
//                   value={formData.version}
//                   onChange={handleChange}
//                 />
//               </Grid>

//               {formData?.primaryArtists?.map((artist, index) => (
//                 <Grid
//                   item
//                   xs={12}
//                   md={6}
//                   key={index}
//                   container
//                   alignItems="center"
//                   spacing={1}
//                 >
//                   <Grid item xs={12}>
//                     <Tooltip title="Select As Your Wish">
//                       <span className="text-red-600 font-bold  cursor-pointer">
//                         ?
//                       </span>
//                     </Tooltip>

//                     <Autocomplete
//                       options={artistOptions}
//                       getOptionLabel={(option) => option.label}
//                       value={
//                         artistOptions.find(
//                           (option: any) => option.value === artist
//                         ) || null
//                       }
//                       onChange={(event, newValue) =>
//                         handlePrimaryArtistChange(index, newValue)
//                       }
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           required
//                           label="Primary Artist"
//                           variant="filled"
//                           sx={{
//                             backgroundColor: "rgba(255, 255, 255, 0.85)",
//                             borderRadius: "8px",
//                             boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                             "& .MuiFilledInput-root": {
//                               backgroundColor: "rgba(255, 255, 255, 0.85)",
//                               "&:hover": {
//                                 backgroundColor: "rgba(255, 255, 255, 0.9)",
//                               },
//                               "&.Mui-focused": {
//                                 backgroundColor: "rgba(255, 255, 255, 1)",
//                               },
//                             },
//                             "& .MuiFormLabel-root": {
//                               color: "#333",
//                             },
//                             "& .MuiInputBase-input": {
//                               color: "#333",
//                             },
//                           }}
//                         />
//                       )}
//                       isOptionEqualToValue={(option, value) =>
//                         option.value === value
//                       }
//                       freeSolo
//                     />
//                   </Grid>
//                   <Grid item className="flex justify-between">
//                     <IconButton
//                       onClick={() => removePrimaryArtist(index)}
//                       disabled={formData?.primaryArtists?.length === 1}
//                     >
//                       <RemoveCircleOutlineIcon />
//                     </IconButton>
//                     {index === formData?.primaryArtists?.length - 1 && (
//                       <IconButton onClick={addPrimaryArtist}>
//                         <AddCircleOutlineIcon />
//                       </IconButton>
//                     )}
//                     <Button
//                       sx={{
//                         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                         "& .MuiFilledInput-root": {
//                           backgroundColor: "rgba(255, 255, 255, 0.85)",
//                           "&:hover": {
//                             backgroundColor: "rgba(255, 255, 255, 0.9)",
//                           },
//                           "&.Mui-focused": {
//                             backgroundColor: "rgba(255, 255, 255, 1)",
//                           },
//                         },
//                         "& .MuiFormLabel-root": {
//                           color: "#333",
//                         },
//                         "& .MuiInputBase-input": {
//                           color: "#333",
//                         },
//                       }}
//                       onClick={showArtistModal}
//                     >
//                       Create Artist
//                     </Button>
//                   </Grid>
//                 </Grid>
//               ))}
//               {formData?.featuringArtists?.map((artist, index) => (
//                 <Grid
//                   item
//                   xs={12}
//                   md={6}
//                   key={index}
//                   container
//                   alignItems="center"
//                   spacing={1}
//                 >
//                   <Grid item xs={12}>
//                     <Tooltip title="Select As Your Wish">
//                       <span className="text-red-600 font-bold cursor-pointer">
//                         ?
//                       </span>
//                     </Tooltip>
//                     <Autocomplete
//                       options={artistOptions}
//                       getOptionLabel={(option) => option.label}
//                       value={
//                         artistOptions.find(
//                           (option: any) => option.value === artist
//                         ) || null
//                       }
//                       onChange={(event, newValue) =>
//                         handleFeaturingArtistChange(index, newValue)
//                       }
//                       renderInput={(params) => (
//                         <TextField
//                           {...params}
//                           label="Featuring"
//                           variant="filled"
//                           sx={{
//                             backgroundColor: "rgba(255, 255, 255, 0.85)",
//                             borderRadius: "8px",
//                             boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                             "& .MuiFilledInput-root": {
//                               backgroundColor: "rgba(255, 255, 255, 0.85)",
//                               "&:hover": {
//                                 backgroundColor: "rgba(255, 255, 255, 0.9)",
//                               },
//                               "&.Mui-focused": {
//                                 backgroundColor: "rgba(255, 255, 255, 1)",
//                               },
//                             },
//                             "& .MuiFormLabel-root": {
//                               color: "#333",
//                             },
//                             "& .MuiInputBase-input": {
//                               color: "#333",
//                             },
//                           }}
//                         />
//                       )}
//                       isOptionEqualToValue={(option, value) =>
//                         option.value === value
//                       }
//                       freeSolo
//                     />
//                   </Grid>
//                   <Grid item className="flex justify-between">
//                     <IconButton
//                       onClick={() => removeFeaturingArtist(index)}
//                       disabled={formData.featuringArtists.length === 1}
//                     >
//                       <RemoveCircleOutlineIcon />
//                     </IconButton>
//                     {index === formData.featuringArtists.length - 1 && (
//                       <IconButton onClick={addFeaturingArtist}>
//                         <AddCircleOutlineIcon />
//                       </IconButton>
//                     )}
//                   </Grid>
//                 </Grid>
//               ))}

//               <Grid item xs={12} md={6}>
//                 <Tooltip title="Select As Your Wish">
//                   <span className="text-red-600 font-bold pr-2 cursor-pointer">
//                     ?
//                   </span>
//                 </Tooltip>
//                 <Autocomplete
//                   options={genres?.map((genre: any) => genre.name) || []}
//                   value={formData.genre}
//                   onChange={handleGenreChange}
//                   renderInput={(params) => (
//                     <TextField
//                       required
//                       {...params}
//                       label="Genre"
//                       variant="filled"
//                       sx={{
//                         backgroundColor: "rgba(255, 255, 255, 0.85)",
//                         borderRadius: "8px",
//                         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                         "& .MuiFilledInput-root": {
//                           backgroundColor: "rgba(255, 255, 255, 0.85)",
//                           "&:hover": {
//                             backgroundColor: "rgba(255, 255, 255, 0.9)",
//                           },
//                           "&.Mui-focused": {
//                             backgroundColor: "rgba(255, 255, 255, 1)",
//                           },
//                         },
//                         "& .MuiFormLabel-root": {
//                           color: "#333",
//                         },
//                         "& .MuiInputBase-input": {
//                           color: "#333",
//                         },
//                       }}
//                       name="genre"
//                     />
//                   )}
//                   freeSolo
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Tooltip title="Select As Your Wish">
//                   <span className="text-red-600 font-bold pr-2 cursor-pointer">
//                     ?
//                   </span>
//                 </Tooltip>
//                 <Autocomplete
//                   options={getSubgenres()}
//                   value={formData.subgenre}
//                   onChange={handleSubgenreChange}
//                   renderInput={(params) => (
//                     <TextField
//                       {...params}
//                       label="Subgenre"
//                       variant="filled"
//                       sx={{
//                         backgroundColor: "rgba(255, 255, 255, 0.85)",
//                         borderRadius: "8px",
//                         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                         "& .MuiFilledInput-root": {
//                           backgroundColor: "rgba(255, 255, 255, 0.85)",
//                           "&:hover": {
//                             backgroundColor: "rgba(255, 255, 255, 0.9)",
//                           },
//                           "&.Mui-focused": {
//                             backgroundColor: "rgba(255, 255, 255, 1)",
//                           },
//                         },
//                         "& .MuiFormLabel-root": {
//                           color: "#333",
//                         },
//                         "& .MuiInputBase-input": {
//                           color: "#333",
//                         },
//                       }}
//                       name="subgenre"
//                     />
//                   )}
//                   freeSolo
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Tooltip title="Select As Your Wish">
//                   <span className="text-red-600 font-bold pr-2 cursor-pointer">
//                     ?
//                   </span>
//                 </Tooltip>

//                 <Autocomplete
//                   options={labelOptions}
//                   getOptionLabel={(option) => option.label}
//                   value={
//                     labelOptions.find(
//                       (opt: any) => opt.value === formData.label
//                     ) || null
//                   }
//                   onChange={(event, newValue) => handleLabelChange(newValue)}
//                   renderInput={(params) => (
//                     <TextField
//                       required
//                       {...params}
//                       label="Label"
//                       variant="filled"
//                       sx={{
//                         backgroundColor: "rgba(255, 255, 255, 0.85)",
//                         borderRadius: "8px",
//                         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                         "& .MuiFilledInput-root": {
//                           backgroundColor: "rgba(255, 255, 255, 0.85)",
//                           "&:hover": {
//                             backgroundColor: "rgba(255, 255, 255, 0.9)",
//                           },
//                           "&.Mui-focused": {
//                             backgroundColor: "rgba(255, 255, 255, 1)",
//                           },
//                         },
//                         "& .MuiFormLabel-root": {
//                           color: "#333",
//                         },
//                         "& .MuiInputBase-input": {
//                           color: "#333",
//                         },
//                       }}
//                       //@ts-ignore
//                       required
//                       fullWidth
//                     />
//                   )}
//                 />
//                 <div className="py-1" onClick={showModal}>
//                   <IconButton>
//                     <AddCircleOutline />
//                   </IconButton>
//                   <Button>Create Label</Button>
//                 </div>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Tooltip title="Single: 1-2 Tracks, EP: 3-6 Tracks, Album: Ab 7 Tracks">
//                   <span className="text-red-600 font-bold pr-2 cursor-pointer">
//                     ?
//                   </span>
//                 </Tooltip>

//                 <Autocomplete
//                   options={formats}
//                   value={formData.format}
//                   onChange={(event, newValue) =>
//                     setFormData((prevData) => ({
//                       ...prevData,
//                       format: newValue || "",
//                     }))
//                   }
//                   renderInput={(params) => (
//                     <TextField
//                       required
//                       {...params}
//                       label="Format"
//                       variant="filled"
//                       sx={{
//                         backgroundColor: "rgba(255, 255, 255, 0.85)",
//                         borderRadius: "8px",
//                         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                         "& .MuiFilledInput-root": {
//                           backgroundColor: "rgba(255, 255, 255, 0.85)",
//                           "&:hover": {
//                             backgroundColor: "rgba(255, 255, 255, 0.9)",
//                           },
//                           "&.Mui-focused": {
//                             backgroundColor: "rgba(255, 255, 255, 1)",
//                           },
//                         },
//                         "& .MuiFormLabel-root": {
//                           color: "#333",
//                         },
//                         "& .MuiInputBase-input": {
//                           color: "#333",
//                         },
//                       }}
//                     />
//                   )}
//                   freeSolo
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Tooltip title="Indicate the original release date. If may be the release date of the physical version for instance. If there is none, use the same day as your digital release date.">
//                   <span className="text-red-600 font-bold pr-2 cursor-pointer">
//                     ?
//                   </span>
//                 </Tooltip>
//                 <TextField
//                   required
//                   fullWidth
//                   type="date"
//                   label="Release Date"
//                   variant="filled"
//                   sx={inputStyles}
//                   name="releaseDate"
//                   value={formData.releaseDate}
//                   onChange={handleChange}
//                   InputLabelProps={{ shrink: true }}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Tooltip title="The producer of the release (℗) is the rightowner that financed the recording of the track.">
//                   <span className="text-red-600 font-bold pr-2 cursor-pointer">
//                     ?
//                   </span>
//                 </Tooltip>
//                 <TextField
//                   required
//                   fullWidth
//                   label="P Line"
//                   variant="filled"
//                   sx={inputStyles}
//                   name="pLine"
//                   value={formData.pLine}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Tooltip title="The cover producer (©) is the rightowner that financed the production of the artwork/packaging.">
//                   <span className="text-red-600 font-bold pr-2 cursor-pointer">
//                     ?
//                   </span>
//                 </Tooltip>
//                 <TextField
//                   required
//                   fullWidth
//                   label="C Line"
//                   variant="filled"
//                   sx={inputStyles}
//                   name="cLine"
//                   value={formData.cLine}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Tooltip title="The year in which the release has been produced and recorded. If more than one, please indicate the final year of production.">
//                   <span className="text-red-600 font-bold pr-2 cursor-pointer">
//                     ?
//                   </span>
//                 </Tooltip>
//                 <Autocomplete
//                   options={years}
//                   value={formData.productionYear}
//                   onChange={(event, newValue) =>
//                     setFormData((prevData) => ({
//                       ...prevData,
//                       productionYear: newValue || "",
//                     }))
//                   }
//                   renderInput={(params) => (
//                     <TextField
//                       required
//                       {...params}
//                       label="Production Year"
//                       variant="filled"
//                       sx={{
//                         backgroundColor: "rgba(255, 255, 255, 0.85)",
//                         borderRadius: "8px",
//                         boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                         "& .MuiFilledInput-root": {
//                           backgroundColor: "rgba(255, 255, 255, 0.85)",
//                           "&:hover": {
//                             backgroundColor: "rgba(255, 255, 255, 0.9)",
//                           },
//                           "&.Mui-focused": {
//                             backgroundColor: "rgba(255, 255, 255, 1)",
//                           },
//                         },
//                         "& .MuiFormLabel-root": {
//                           color: "#333",
//                         },
//                         "& .MuiInputBase-input": {
//                           color: "#333",
//                         },
//                       }}
//                     />
//                   )}
//                   freeSolo
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Tooltip title="Select As Your Wish">
//                   <span className="text-red-600 font-bold pr-2 cursor-pointer">
//                     ?
//                   </span>
//                 </Tooltip>
//                 <TextField
//                   fullWidth
//                   label="UPC"
//                   variant="filled"
//                   sx={inputStyles}
//                   name="upc"
//                   value={formData.upc}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Tooltip title="Select As Your Wish">
//                   <span className="text-red-600 font-bold pr-2 cursor-pointer">
//                     ?
//                   </span>
//                 </Tooltip>
//                 <TextField
//                   fullWidth
//                   label="Catalog Number"
//                   variant="filled"
//                   sx={inputStyles}
//                   name="catalogNumber"
//                   value={formData.catalogNumber}
//                   onChange={handleChange}
//                 />
//               </Grid>
//             </Grid>
//           </CardContent>
//         </Card>
//       </Box>
//       <AddLabelModal open={open} setOpen={setOpen} />
//       <AddArtistModal open={openArtist} setOpen={setOpenArtist} />
//     </Container>
//   );
// };

// export default ReleaseInformation;
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
import {
  Container,
  Grid,
  TextField,
  Box,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Button,
  InputAdornment,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Autocomplete from "@mui/material/Autocomplete";
import { genres } from "@/MockData/MockData";
import {
  useGetArtistsQuery,
  useGetApprovedLabelsQuery,
} from "@/redux/slices/ArtistAndLabel/artistLabelApi";
import { years } from "@/utils/languages";

import AddLabelModal from "@/components/ArtisLabelManagement/Label/AddLabelModa";
import AddArtistModal from "@/components/ArtisLabelManagement/Artist/AddArtistModal";
import { AddCircleOutline } from "@mui/icons-material";
import { inputStyles } from "./SingleUtils";
import axios from "axios";
import AppleIcon from "@mui/icons-material/Apple";
const formats: string[] = ["Single", "Album", "EP"];

interface ReleaseFormData {
  releaseTitle: string;
  version: string;
  primaryArtists: string[];
  featuringArtists: string[];
  variousArtists: boolean;
  genre: string;
  subgenre: string;
  label: string;
  format: string;
  releaseDate: string;
  pLine: string;
  cLine: string;
  productionYear: string;
  upc: string;
  catalogNumber: string;
}

interface Props {
  data: ReleaseFormData;
  onChange: (key: string, value: any) => void;
}

const ReleaseInformation: React.FC<Props> = ({ data, onChange }) => {
  const [artistIds, setArtistIds] = useState<{
    spotify: string;
    apple: string;
    name: string;
  } | null>(null);

  const [pLineOptions, setPLineOptions] = useState<string[]>([]);
  const [cLineOptions, setCLineOptions] = useState<string[]>([]);
  const [formData, setFormData] = useState<ReleaseFormData>(() => {
    const storedData = localStorage.getItem("releaseFormData");
    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return {
        releaseTitle: data.releaseTitle || "",
        version: data.version || "",
        primaryArtists: data.primaryArtists || [""],
        featuringArtists: data.featuringArtists || [""],
        variousArtists: data.variousArtists || false,
        genre: data.genre || "",
        subgenre: data.subgenre || "",
        label: data.label || "",
        format: data.format || "Single",
        releaseDate: data.releaseDate || "",
        pLine: data.pLine || "",
        cLine: data.cLine || "",
        productionYear: data.productionYear || "",
        upc: data.upc || "",
        catalogNumber: data.catalogNumber || "",
      };
    }
  });
  const fetchSuggestions = useMemo(
    () =>
      debounce(async (input: string, field: "pLine" | "cLine") => {
        if (!input) {
          field === "pLine" ? setPLineOptions([]) : setCLineOptions([]);
          return;
        }

        try {
          // Example using Datamuse API
          const response = await axios.get("https://api.datamuse.com/sug", {
            params: { s: input },
          });

          const suggestions = response.data.map((item: any) => item.word);

          if (field === "pLine") {
            setPLineOptions(suggestions);
          } else {
            setCLineOptions(suggestions);
          }
        } catch (error) {
          console.error(`Error fetching ${field} suggestions:`, error);
          if (field === "pLine") {
            setPLineOptions([]);
          } else {
            setCLineOptions([]);
          }
        }
      }, 100), // 300ms debounce
    []
  );
  const { data: labelData } = useGetApprovedLabelsQuery({});
  const { data: artistData } = useGetArtistsQuery({});

  const [open, setOpen] = useState(false);
  const [openArtist, setOpenArtist] = useState(false);
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
    localStorage.setItem("releaseFormData", JSON.stringify(formData));
    onChange("releaseInformation", formData);
  }, [formData]);

  const showModal = () => {
    setOpen(true);
  };
  const showArtistModal = () => {
    setOpenArtist(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePLineInputChange = (event: any, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      pLine: value,
    }));
    fetchSuggestions(value, "pLine");
  };

  // Handlers for cLine input changes
  const handleCLineInputChange = (event: any, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      cLine: value,
    }));
    fetchSuggestions(value, "cLine");
  };
  useEffect(() => {
    return () => {
      fetchSuggestions.cancel();
    };
  }, [fetchSuggestions]);
  const handleGenreChange = (
    event: React.ChangeEvent<object>,
    value: string | null
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      genre: value || "",
      subgenre: "",
    }));
  };

  const handleSubgenreChange = (
    event: React.ChangeEvent<object>,
    value: string | null
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      subgenre: value || "",
    }));
  };

  const getSubgenres = () => {
    const genreObj = genres.find((genre) => genre.name === formData.genre);
    return genreObj ? genreObj.subgenres : [];
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
  const addFeaturingArtist = () =>
    setFormData((prevData) => ({
      ...prevData,
      featuringArtists: [...prevData.featuringArtists, ""],
    }));
  const removeFeaturingArtist = (index: number) => {
    const newFeaturingArtists = [...formData.featuringArtists];
    newFeaturingArtists.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      featuringArtists: newFeaturingArtists,
    }));
  };
  const handleFeaturingArtistChange = (index: number, value: any) => {
    const newFeaturingArtists = [...formData.featuringArtists];
    newFeaturingArtists[index] = value ? value.value : "";
    setFormData((prevData) => ({
      ...prevData,
      featuringArtists: newFeaturingArtists,
    }));
  };
  const handlePrimaryArtistChange = (index: number, value: any) => {
    const newPrimaryArtists = [...formData.primaryArtists];
    newPrimaryArtists[index] = value ? value.value : "";
    setFormData((prevData) => ({
      ...prevData,
      primaryArtists: newPrimaryArtists,
    }));
    if (value) {
      //@ts-ignore
      const selectedArtist = artistData?.data?.data?.find(
        (artist: any) => artist._id === value.value
      );
      if (selectedArtist) {
        setArtistIds({
          spotify: selectedArtist?.primaryArtistSpotifyId,
          apple: selectedArtist?.primaryArtistAppleId,
          name: selectedArtist?.primaryArtistName,
        });
      }
    } else {
      setArtistIds(null);
    }
  };

  const handleLabelChange = (
    newValue: { label: string; value: string } | null
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      label: newValue ? newValue.value : "",
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 1 }}>
      <Box>
        <Card
          sx={{
            p: 3,
            mb: 3,
            boxShadow: 3,
            background:
              "radial-gradient(at 64% 69%, hsla(199, 91%, 54%, 1) 0, hsla(199, 91%, 54%, 0) 50%)",
            backdropFilter: "blur(8px)",
            borderRadius: "16px",
          }}
        >
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Tooltip
                  title="Please enter a title for this release:
eg.: Appetite for Destruction, Thriller, etc..."
                >
                  <span className="text-red-600 font-bold pr-2 cursor-pointer">
                    ?
                  </span>
                </Tooltip>
                <TextField
                  required
                  fullWidth
                  label="Release Title"
                  variant="filled"
                  sx={inputStyles}
                  placeholder=" Please enter a title for this release: eg.: Appetite for Destruction, Thriller, etc..."
                  name="releaseTitle"
                  value={formData.releaseTitle}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Tooltip
                  title="Please use version field to enter further information for the release.
eg.: Limited Edition, 25th Anniversary Edition, Karaoke Version, etc..."
                >
                  <span className="text-red-600 font-bold pr-2 cursor-pointer">
                    ?
                  </span>
                </Tooltip>
                <TextField
                  fullWidth
                  label="Version/Subtitle"
                  variant="filled"
                  sx={inputStyles}
                  placeholder="Use this field to add further details to your release title"
                  name="version"
                  value={formData.version}
                  onChange={handleChange}
                />
              </Grid>

              {formData?.primaryArtists?.map((artist, index) => (
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
                    <Tooltip title="Select As Your Wish">
                      <span className="text-red-600 font-bold  cursor-pointer">
                        ?
                      </span>
                    </Tooltip>

                    <Autocomplete
                      options={artistOptions}
                      getOptionLabel={(option) => option.label}
                      value={
                        artistOptions.find(
                          (option: any) => option.value === artist
                        ) || null
                      }
                      onChange={(event, newValue) =>
                        handlePrimaryArtistChange(index, newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Primary Artist"
                          variant="filled"
                          sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.85)",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            "& .MuiFilledInput-root": {
                              backgroundColor: "rgba(255, 255, 255, 0.85)",
                              "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                              },
                              "&.Mui-focused": {
                                backgroundColor: "rgba(255, 255, 255, 1)",
                              },
                            },
                            "& .MuiFormLabel-root": {
                              color: "#333",
                            },
                            "& .MuiInputBase-input": {
                              color: "#333",
                            },
                          }}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {params.InputProps.endAdornment}
                                {artistIds && (
                                  <div className="flex justify-center items-center mb-3">
                                    <Tooltip title={artistIds?.spotify}>
                                      <span className="badge bg-green-500 text-white mr-2 cursor-pointer">
                                        <a
                                          href={`https://open.spotify.com/artist/${artistIds?.spotify}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {" "}
                                          <img
                                            className="w-[25px]"
                                            src="https://res.cloudinary.com/arafatleo/image/upload/v1724052702/png-transparent-spotify-logo-spotify-computer-icons-podcast-music-apps-miscellaneous-angle-logo-thumbnail_awrfdl.png"
                                            alt=""
                                          />{" "}
                                        </a>
                                      </span>
                                    </Tooltip>
                                    <Tooltip title={artistIds?.apple}>
                                      <span className="badge  text-white cursor-pointer">
                                        <a
                                          href={`https://music.apple.com/us/artist/${artistIds.name}/${artistIds?.apple}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <img
                                            className="w-[25px]"
                                            src="https://res.cloudinary.com/arafatleo/image/upload/v1724052864/154870_drnt3x.png"
                                            alt=""
                                          />
                                        </a>
                                      </span>
                                    </Tooltip>
                                  </div>
                                )}
                              </>
                            ),
                          }}
                        />
                      )}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value
                      }
                      freeSolo
                    />
                  </Grid>

                  <Grid item className="flex justify-between">
                    <IconButton
                      onClick={() => removePrimaryArtist(index)}
                      disabled={formData?.primaryArtists?.length === 1}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    {index === formData?.primaryArtists?.length - 1 && (
                      <IconButton onClick={addPrimaryArtist}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    )}
                    <Button
                      sx={{
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        "& .MuiFilledInput-root": {
                          backgroundColor: "rgba(255, 255, 255, 0.85)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                          },
                        },
                        "& .MuiFormLabel-root": {
                          color: "#333",
                        },
                        "& .MuiInputBase-input": {
                          color: "#333",
                        },
                      }}
                      onClick={showArtistModal}
                    >
                      Create Artist
                    </Button>
                  </Grid>
                </Grid>
              ))}
              {formData?.featuringArtists?.map((artist, index) => (
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
                    <Tooltip title="Select As Your Wish">
                      <span className="text-red-600 font-bold cursor-pointer">
                        ?
                      </span>
                    </Tooltip>
                    <Autocomplete
                      options={artistOptions}
                      getOptionLabel={(option) => option.label}
                      value={
                        artistOptions.find(
                          (option: any) => option.value === artist
                        ) || null
                      }
                      onChange={(event, newValue) =>
                        handleFeaturingArtistChange(index, newValue)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Featuring"
                          variant="filled"
                          sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.85)",
                            borderRadius: "8px",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            "& .MuiFilledInput-root": {
                              backgroundColor: "rgba(255, 255, 255, 0.85)",
                              "&:hover": {
                                backgroundColor: "rgba(255, 255, 255, 0.9)",
                              },
                              "&.Mui-focused": {
                                backgroundColor: "rgba(255, 255, 255, 1)",
                              },
                            },
                            "& .MuiFormLabel-root": {
                              color: "#333",
                            },
                            "& .MuiInputBase-input": {
                              color: "#333",
                            },
                          }}
                        />
                      )}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value
                      }
                      freeSolo
                    />
                  </Grid>
                  <Grid item className="flex justify-between">
                    <IconButton
                      onClick={() => removeFeaturingArtist(index)}
                      disabled={formData.featuringArtists.length === 1}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    {index === formData.featuringArtists.length - 1 && (
                      <IconButton onClick={addFeaturingArtist}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12} md={6}>
                <Tooltip title="Select As Your Wish">
                  <span className="text-red-600 font-bold pr-2 cursor-pointer">
                    ?
                  </span>
                </Tooltip>
                <Autocomplete
                  options={genres?.map((genre: any) => genre.name) || []}
                  value={formData.genre}
                  onChange={handleGenreChange}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label="Genre"
                      variant="filled"
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        "& .MuiFilledInput-root": {
                          backgroundColor: "rgba(255, 255, 255, 0.85)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                          },
                        },
                        "& .MuiFormLabel-root": {
                          color: "#333",
                        },
                        "& .MuiInputBase-input": {
                          color: "#333",
                        },
                      }}
                      name="genre"
                    />
                  )}
                  freeSolo
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Tooltip title="Select As Your Wish">
                  <span className="text-red-600 font-bold pr-2 cursor-pointer">
                    ?
                  </span>
                </Tooltip>
                <Autocomplete
                  options={getSubgenres()}
                  value={formData.subgenre}
                  onChange={handleSubgenreChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Subgenre"
                      variant="filled"
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        "& .MuiFilledInput-root": {
                          backgroundColor: "rgba(255, 255, 255, 0.85)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                          },
                        },
                        "& .MuiFormLabel-root": {
                          color: "#333",
                        },
                        "& .MuiInputBase-input": {
                          color: "#333",
                        },
                      }}
                      name="subgenre"
                    />
                  )}
                  freeSolo
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Tooltip title="Select As Your Wish">
                  <span className="text-red-600 font-bold pr-2 cursor-pointer">
                    ?
                  </span>
                </Tooltip>

                <Autocomplete
                  options={labelOptions}
                  getOptionLabel={(option) => option.label}
                  value={
                    labelOptions.find(
                      (opt: any) => opt.value === formData.label
                    ) || null
                  }
                  onChange={(event, newValue) => handleLabelChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label="Label"
                      variant="filled"
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        "& .MuiFilledInput-root": {
                          backgroundColor: "rgba(255, 255, 255, 0.85)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                          },
                        },
                        "& .MuiFormLabel-root": {
                          color: "#333",
                        },
                        "& .MuiInputBase-input": {
                          color: "#333",
                        },
                      }}
                      //@ts-ignore
                      required
                      fullWidth
                    />
                  )}
                />
                <div className="py-1" onClick={showModal}>
                  <IconButton>
                    <AddCircleOutline />
                  </IconButton>
                  <Button>Create Label</Button>
                </div>
              </Grid>

              <Grid item xs={12} md={6}>
                <Tooltip title="Single: 1-2 Tracks, EP: 3-6 Tracks, Album: Ab 7 Tracks">
                  <span className="text-red-600 font-bold pr-2 cursor-pointer">
                    ?
                  </span>
                </Tooltip>

                <Autocomplete
                  options={formats}
                  value={formData.format}
                  onChange={(event, newValue) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      format: newValue || "",
                    }))
                  }
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label="Format"
                      variant="filled"
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        "& .MuiFilledInput-root": {
                          backgroundColor: "rgba(255, 255, 255, 0.85)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                          },
                        },
                        "& .MuiFormLabel-root": {
                          color: "#333",
                        },
                        "& .MuiInputBase-input": {
                          color: "#333",
                        },
                      }}
                    />
                  )}
                  freeSolo
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Tooltip title="Indicate the original release date. If may be the release date of the physical version for instance. If there is none, use the same day as your digital release date.">
                  <span className="text-red-600 font-bold pr-2 cursor-pointer">
                    ?
                  </span>
                </Tooltip>
                <TextField
                  required
                  fullWidth
                  type="date"
                  label="Release Date"
                  variant="filled"
                  sx={inputStyles}
                  name="releaseDate"
                  value={formData.releaseDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                <Tooltip title="The producer of the release (℗) is the rightowner that financed the recording of the track.">
                  <span className="text-red-600 font-bold pr-2 cursor-pointer">
                    ?
                  </span>
                </Tooltip>
                <TextField
                  required
                  fullWidth
                  label="P Line"
                  variant="filled"
                  sx={inputStyles}
                  name="pLine"
                  value={formData.pLine}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Tooltip title="The cover producer (©) is the rightowner that financed the production of the artwork/packaging.">
                  <span className="text-red-600 font-bold pr-2 cursor-pointer">
                    ?
                  </span>
                </Tooltip>
                <TextField
                  required
                  fullWidth
                  label="C Line"
                  variant="filled"
                  sx={inputStyles}
                  name="cLine"
                  value={formData.cLine}
                  onChange={handleChange}
                />
              </Grid> */}
              {/* P Line with Autocomplete */}
              <Grid item xs={12} md={6}>
                <Tooltip title="The producer of the release (℗) is the rightowner that financed the recording of the track.">
                  <span className="text-red-600 font-bold pr-2 cursor-pointer">
                    ?
                  </span>
                </Tooltip>
                <Autocomplete
                  freeSolo
                  options={pLineOptions}
                  inputValue={formData.pLine}
                  onInputChange={handlePLineInputChange}
                  onChange={(event, newValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      pLine: newValue || "",
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="P Line"
                      variant="filled"
                      sx={inputStyles}
                      name="pLine"
                    />
                  )}
                />
              </Grid>

              {/* C Line with Autocomplete */}
              <Grid item xs={12} md={6}>
                <Tooltip title="The cover producer (©) is the rightowner that financed the production of the artwork/packaging.">
                  <span className="text-red-600 font-bold pr-2 cursor-pointer">
                    ?
                  </span>
                </Tooltip>
                <Autocomplete
                  freeSolo
                  options={cLineOptions}
                  inputValue={formData.cLine}
                  onInputChange={handleCLineInputChange}
                  onChange={(event, newValue) => {
                    setFormData((prevData) => ({
                      ...prevData,
                      cLine: newValue || "",
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="C Line"
                      variant="filled"
                      sx={inputStyles}
                      name="cLine"
                    />
                  )}
                />
              </Grid>

              {/* ... [Remaining form fields] */}
              <Grid item xs={12} md={6}>
                <Tooltip title="The year in which the release has been produced and recorded. If more than one, please indicate the final year of production.">
                  <span className="text-red-600 font-bold pr-2 cursor-pointer">
                    ?
                  </span>
                </Tooltip>
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
                      required
                      {...params}
                      label="Production Year"
                      variant="filled"
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        "& .MuiFilledInput-root": {
                          backgroundColor: "rgba(255, 255, 255, 0.85)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                          },
                          "&.Mui-focused": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                          },
                        },
                        "& .MuiFormLabel-root": {
                          color: "#333",
                        },
                        "& .MuiInputBase-input": {
                          color: "#333",
                        },
                      }}
                    />
                  )}
                  freeSolo
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Tooltip title="Select As Your Wish">
                  <span className="text-red-600 font-bold pr-2 cursor-pointer">
                    ?
                  </span>
                </Tooltip>
                <TextField
                  fullWidth
                  label="UPC"
                  variant="filled"
                  sx={inputStyles}
                  name="upc"
                  value={formData.upc}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Tooltip title="Select As Your Wish">
                  <span className="text-red-600 font-bold pr-2 cursor-pointer">
                    ?
                  </span>
                </Tooltip>
                <TextField
                  fullWidth
                  label="Catalog Number"
                  variant="filled"
                  sx={inputStyles}
                  name="catalogNumber"
                  value={formData.catalogNumber}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <AddLabelModal open={open} setOpen={setOpen} />
      <AddArtistModal open={openArtist} setOpen={setOpenArtist} />
    </Container>
  );
};

export default ReleaseInformation;
