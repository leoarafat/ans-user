// // /* eslint-disable @typescript-eslint/ban-ts-comment */
// // import { useState } from "react";
// // import {
// //   Button,
// //   Typography,
// //   Stepper,
// //   Step,
// //   StepLabel,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogTitle,
// // } from "@material-ui/core";
// // import { Link, useNavigate } from "react-router-dom";
// // import AudioDetails from "../uploads/Single/AudioDetails";
// // import ReleaseInformation from "../uploads/Single/ReleaseInformation";
// // import TracksInformation from "../uploads/Single/TracksInformation";
// // import SingleReviewPage from "../uploads/Single/SingleReviewPage";

// // import toast from "react-hot-toast";
// // import {
// //   Box,
// //   Checkbox,
// //   Container,
// //   FormControlLabel,
// //   LinearProgress,
// // } from "@mui/material";
// // import axios from "axios";
// // import { imageURL } from "@/redux/api/baseApi";
// // import ReleasePlatform from "../uploads/Single/ReleasePlatform";
// // import { deleteFile } from "@/utils/indexedDB";

// // interface ReleaseInformation {
// //   cLine: string;
// //   version: string;
// //   catalogNumber: string;
// //   featuringArtists: string[];
// //   format: string;
// //   genre: string;
// //   label: string;
// //   pLine: string;
// //   primaryArtists: string[];
// //   productionYear: string;
// //   releaseDate: string;
// //   releaseTitle: string;
// //   subgenre: string;
// //   upc: string;
// //   variousArtists: string;
// // }

// // interface TrackDetails {
// //   arranger: string;
// //   askToGenerateISRC: string;
// //   crbtTitle: string;
// //   crbtTime: string;
// //   author: string;
// //   composer: string;
// //   contentType: string;
// //   instrumental: string;
// //   isrc: string;
// //   lyrics: string;
// //   lyricsLanguage: string;
// //   mood: string;
// //   parentalAdvisory: string;
// //   previewStart: string;
// //   price: string;
// //   primaryTrackType: string;
// //   producer: string;
// //   publisher: string;
// //   remixer: string;
// //   secondaryTrackType: string;
// //   title: string;
// //   trackTitleLanguage: string;
// // }

// // interface AudioDetails {
// //   audioFile: File;
// //   coverImage: File;
// // }

// // interface FormData {
// //   audio: AudioDetails;
// //   releaseInformation: ReleaseInformation;
// //   trackDetails: TrackDetails;
// //   // countries: string[];
// //   previewPage: Record<string, unknown>;
// //   platform: string;
// // }

// // const steps = [
// //   { title: "Release Information", component: ReleaseInformation },
// //   { title: "Audio & Cover", component: AudioDetails },
// //   { title: "Tracks Details", component: TracksInformation },
// //   { title: "Select Platform", component: ReleasePlatform },
// //   { title: "Review Details", component: SingleReviewPage },
// // ];

// // const UploaderStepperForm = () => {
// //   const [activeStep, setActiveStep] = useState(0);
// //   const COVER_IMAGE_KEY = "coverImage";
// //   const AUDIO_FILE_KEY = "audioFile";
// //   const [formData, setFormData] = useState<FormData>({
// //     audio: { audioFile: new File([], ""), coverImage: new File([], "") },
// //     releaseInformation: {
// //       cLine: "",
// //       version: "",
// //       catalogNumber: "",
// //       featuringArtists: [],
// //       format: "",
// //       genre: "",
// //       label: "",
// //       pLine: "",
// //       primaryArtists: [],
// //       productionYear: "",
// //       releaseDate: "",
// //       releaseTitle: "",
// //       subgenre: "",
// //       upc: "",
// //       variousArtists: "",
// //     },
// //     trackDetails: {
// //       arranger: "",
// //       askToGenerateISRC: "",
// //       author: "",
// //       composer: "",
// //       contentType: "",
// //       instrumental: "",
// //       isrc: "",
// //       lyrics: "",
// //       lyricsLanguage: "",
// //       mood: "",
// //       parentalAdvisory: "",
// //       previewStart: "00:15",
// //       price: "",
// //       primaryTrackType: "",
// //       producer: "",
// //       publisher: "",
// //       remixer: "",
// //       secondaryTrackType: "",
// //       title: "",
// //       crbtTitle: "",
// //       crbtTime: "",
// //       trackTitleLanguage: "",
// //     },
// //     // countries: [],
// //     platform: "",
// //     previewPage: {},
// //   });

// //   const [uploadProgress, setUploadProgress] = useState(0);
// //   const [isLoading, setIsLoading] = useState(false);

// //   const [openModal, setOpenModal] = useState(false);

// //   const [conditionsAccepted, setConditionsAccepted] = useState({
// //     condition1: false,
// //     condition2: false,
// //     condition3: false,
// //   });
// //   const navigate = useNavigate();

// //   const handleNext = () => {
// //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
// //   };

// //   const handleBack = () => {
// //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
// //   };

// //   const handleDataChange = (step: any, data: any) => {
// //     const updatedFormData = { ...formData, [step]: data };
// //     setFormData(updatedFormData);
// //   };

// //   const handleOpenModal = () => {
// //     setOpenModal(true);
// //   };

// //   const handleCloseModal = () => {
// //     setOpenModal(false);
// //   };
// //   const handleAcceptCondition = (condition: string) => (event: any) => {
// //     setConditionsAccepted({
// //       ...conditionsAccepted,
// //       [condition]: event.target.checked,
// //     });
// //   };
// //   //!
// //   const handleSubmit = async () => {
// //     setOpenModal(false);
// //     setIsLoading(true);
// //     try {
// //       const formDataToSend = new FormData();

// //       formDataToSend.append("cLine", formData.releaseInformation.cLine);
// //       formDataToSend.append("subtitle", formData.releaseInformation.version);
// //       formDataToSend.append(
// //         "catalogNumber",
// //         formData.releaseInformation.catalogNumber
// //       );
// //       formDataToSend.append(
// //         "featuringArtists",
// //         formData.releaseInformation.featuringArtists.join(",")
// //       );
// //       formDataToSend.append("format", formData.releaseInformation.format);
// //       formDataToSend.append("genre", formData.releaseInformation.genre);
// //       formDataToSend.append("label", formData.releaseInformation.label);
// //       formDataToSend.append("pLine", formData.releaseInformation.pLine);
// //       formDataToSend.append(
// //         "primaryArtist",
// //         formData.releaseInformation.primaryArtists.join(",")
// //       );
// //       formDataToSend.append(
// //         "productionYear",
// //         formData.releaseInformation.productionYear
// //       );
// //       formDataToSend.append(
// //         "releaseDate",
// //         formData.releaseInformation.releaseDate
// //       );
// //       formDataToSend.append(
// //         "releaseTitle",
// //         formData.releaseInformation.releaseTitle
// //       );
// //       formDataToSend.append("subGenre", formData.releaseInformation.subgenre);
// //       formDataToSend.append("upc", formData.releaseInformation.upc);
// //       formDataToSend.append(
// //         "variousArtists",
// //         formData.releaseInformation.variousArtists
// //       );

// //       // Append trackDetails fields
// //       formDataToSend.append("arranger", formData.trackDetails.arranger);
// //       formDataToSend.append(
// //         "askToGenerateISRC",
// //         formData.trackDetails.askToGenerateISRC
// //       );
// //       formDataToSend.append("author", formData.trackDetails.author);
// //       formDataToSend.append("composer", formData.trackDetails.composer);
// //       formDataToSend.append("contentType", formData.trackDetails.contentType);
// //       formDataToSend.append("instrumental", formData.trackDetails.instrumental);
// //       formDataToSend.append("isrc", formData.trackDetails.isrc);
// //       formDataToSend.append("lyrics", formData.trackDetails.lyrics);
// //       formDataToSend.append("crbtTitle", formData.trackDetails.crbtTitle);
// //       formDataToSend.append("crbtTime", formData.trackDetails.crbtTime);
// //       formDataToSend.append(
// //         "lyricsLanguage",
// //         formData.trackDetails.lyricsLanguage
// //       );
// //       formDataToSend.append("mood", formData.trackDetails.mood);
// //       formDataToSend.append(
// //         "parentalAdvisory",
// //         formData.trackDetails.parentalAdvisory
// //       );
// //       formDataToSend.append("previewStart", formData.trackDetails.previewStart);
// //       formDataToSend.append("price", formData.trackDetails.price);
// //       formDataToSend.append(
// //         "primaryTrackType",
// //         formData.trackDetails.primaryTrackType
// //       );
// //       formDataToSend.append("producer", formData.trackDetails.producer);
// //       formDataToSend.append("publisher", formData.trackDetails.publisher);
// //       formDataToSend.append("remixer", formData.trackDetails.remixer);
// //       formDataToSend.append(
// //         "secondaryTrackType",
// //         formData.trackDetails.secondaryTrackType
// //       );
// //       formDataToSend.append("title", formData.trackDetails.title);
// //       formDataToSend.append(
// //         "trackTitleLanguage",
// //         formData.trackDetails.trackTitleLanguage
// //       );

// //       formDataToSend.append("audio", formData.audio.audioFile);
// //       formDataToSend.append("image", formData.audio.coverImage);
// //       formDataToSend.append("platform", formData.platform);

// //       // formDataToSend.append("countries", formData.countries.join(","));

// //       await axios
// //         .post(`${imageURL}/single-music/upload`, formDataToSend, {
// //           onUploadProgress: (progressEvent) => {
// //             const progress = Math.round(
// //               //@ts-ignore
// //               (progressEvent.loaded * 100) / progressEvent.total
// //             );
// //             setUploadProgress(progress);
// //           },
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
// //           },
// //         })
// //         .then(({ data }) => {
// //           if (data?.success === true) {
// //             localStorage.removeItem("releaseFormData");
// //             localStorage.removeItem("tracksInformation");
// //             localStorage.removeItem("platform");
// //             setIsLoading(false);
// //             toast.success("Song Upload Successful");
// //             navigate("/my-uploads/pending-track");
// //             deleteFile(COVER_IMAGE_KEY);
// //             deleteFile(AUDIO_FILE_KEY);
// //           }
// //         })
// //         .catch((err) => {
// //           toast.error(err?.response?.data?.message);
// //           setIsLoading(false);
// //         });
// //     } catch (error: any) {
// //       console.error("Error in handleSubmit:", error?.message);
// //       setIsLoading(false);
// //       toast.error(error?.message);
// //     }
// //   };
// //   //!

// //   const StepComponent = steps[activeStep].component;

// //   return (
// //     <Container
// //       maxWidth="lg"
// //       sx={{
// //         position: "relative",
// //         backgroundImage: `url(https://res.cloudinary.com/arafatleo/image/upload/v1724142235/signup_aiqgj5.jpg)`,
// //         backgroundSize: "cover",
// //         backgroundPosition: "center",
// //         padding: "20px",
// //         minHeight: "100vh",
// //         overflow: "hidden",
// //       }}
// //     >
// //       <Box
// //         textAlign="center"
// //         mb={4}
// //         sx={{
// //           position: "absolute",
// //           top: 0,
// //           left: 0,
// //           right: 0,
// //           bottom: 0,
// //           backgroundColor: "rgba(0, 0, 0, 0.5)",
// //           zIndex: -1,
// //         }}
// //       >
// //         <Typography variant="h4" gutterBottom>
// //           Distribute Your Music with ANS Music
// //         </Typography>
// //         <Typography variant="body1" color="textSecondary">
// //           Follow the steps below to complete your upload.
// //         </Typography>
// //       </Box>
// //       <Stepper activeStep={activeStep} alternativeLabel>
// //         {steps.map((step) => (
// //           <Step key={step.title}>
// //             <StepLabel>{step.title}</StepLabel>
// //           </Step>
// //         ))}
// //       </Stepper>
// //       <Box mt={4}>
// //         <StepComponent
// //           //@ts-ignore
// //           data={formData}
// //           onChange={handleDataChange}
// //         />
// //       </Box>
// //       <Box
// //         display="flex"
// //         justifyContent="space-between"
// //         alignItems="center"
// //         mt={4}
// //       >
// //         <Button
// //           variant="contained"
// //           color="secondary"
// //           onClick={handleBack}
// //           disabled={activeStep === 0}
// //           style={{ flexGrow: 1, marginRight: 10 }}
// //         >
// //           Back
// //         </Button>
// //         {activeStep < steps.length - 1 ? (
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             onClick={handleNext}
// //             style={{ flexGrow: 1, marginLeft: 10 }}
// //           >
// //             Next
// //           </Button>
// //         ) : (
// //           <>
// //             <LinearProgress
// //               className="py-2 my-2"
// //               variant="determinate"
// //               value={uploadProgress}
// //               style={{ width: "100%", marginTop: 10 }}
// //             />
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               onClick={handleOpenModal}
// //               disabled={isLoading}
// //               style={{ flexGrow: 1, marginLeft: 10 }}
// //             >
// //               Upload
// //             </Button>
// //           </>
// //         )}
// //       </Box>
// //       <Dialog
// //         open={openModal}
// //         onClose={handleCloseModal}
// //         maxWidth="sm"
// //         fullWidth
// //       >
// //         <DialogTitle>
// //           <Typography variant="h6">Terms & Conditions</Typography>
// //           <Typography variant="subtitle1">
// //             Please confirm that you have understood and that you agree to the
// //             following Terms & Conditions, and delivery guidelines.
// //           </Typography>
// //         </DialogTitle>
// //         <DialogContent>
// //           <FormControlLabel
// //             control={
// //               <Checkbox
// //                 checked={conditionsAccepted.condition1}
// //                 onChange={handleAcceptCondition("condition1")}
// //                 color="primary"
// //               />
// //             }
// //             label={
// //               <Typography variant="body1">
// //                 I understand and agree to the ISRC Terms & Conditions.
// //                 <Typography variant="body2">
// //                   If you asked ANS Music to generate your ISRC codes, you hereby
// //                   agree to{" "}
// //                   <Link
// //                     className="text-blue-600 underline"
// //                     to="https://ansmusiclimited.com/"
// //                     target="_blank"
// //                   >
// //                     ANS Music's conditions for generating ISRCs.
// //                   </Link>
// //                 </Typography>
// //               </Typography>
// //             }
// //           />
// //           <FormControlLabel
// //             control={
// //               <Checkbox
// //                 checked={conditionsAccepted.condition2}
// //                 onChange={handleAcceptCondition("condition2")}
// //                 color="primary"
// //               />
// //             }
// //             label={
// //               <Typography variant="body1">
// //                 I understand and agree to the Youtube Content Guidelines.
// //                 <Typography variant="body2">
// //                   Some content cannot be safely distributed and monetized on the
// //                   platform. Please be sure you have read and follow the{" "}
// //                   <Link
// //                     className="text-blue-600 underline"
// //                     to="https://ansmusiclimited.com/"
// //                     target="_blank"
// //                   >
// //                     Youtube Content Guidelines.
// //                   </Link>
// //                 </Typography>
// //               </Typography>
// //             }
// //           />
// //           <FormControlLabel
// //             control={
// //               <Checkbox
// //                 checked={conditionsAccepted.condition3}
// //                 onChange={handleAcceptCondition("condition3")}
// //                 color="primary"
// //               />
// //             }
// //             label={
// //               <Typography variant="body1">
// //                 I understand and agree to the ANS Music Content Delivery
// //                 Guidelines for Audio Stores.
// //                 <Typography variant="body2">
// //                   Some content is not eligible to be distributed on Apple Music,
// //                   Spotify, and Youtube Audio Fingerprint. Please be sure you
// //                   have read and understand the{" "}
// //                   <Link
// //                     className="text-blue-600 underline"
// //                     to="https://ansmusiclimited.com/"
// //                     target="_blank"
// //                   >
// //                     ANS Music Content Delivery Guidelines for Audio Stores.
// //                   </Link>
// //                 </Typography>
// //               </Typography>
// //             }
// //           />
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleCloseModal} color="primary" variant="outlined">
// //             Cancel
// //           </Button>
// //           <Button
// //             onClick={handleSubmit}
// //             color="primary"
// //             variant="contained"
// //             disabled={
// //               !conditionsAccepted.condition1 ||
// //               !conditionsAccepted.condition2 ||
// //               !conditionsAccepted.condition3 ||
// //               isLoading
// //             }
// //           >
// //             {isLoading ? "Uploading..." : "Agree and Submit"}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Container>
// //   );
// // };

// // export default UploaderStepperForm;
// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import React, { useState } from "react";
// import {
//   Button,
//   Typography,
//   Stepper,
//   Step,
//   StepLabel,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Box,
//   Checkbox,
//   Container,
//   FormControlLabel,
//   LinearProgress,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { Link, useNavigate } from "react-router-dom";
// import AudioDetails from "../uploads/Single/AudioDetails";
// import ReleaseInformation from "../uploads/Single/ReleaseInformation";
// import TracksInformation from "../uploads/Single/TracksInformation";
// import SingleReviewPage from "../uploads/Single/SingleReviewPage";

// import toast from "react-hot-toast";
// import axios from "axios";
// import { imageURL } from "@/redux/api/baseApi";
// import ReleasePlatform from "../uploads/Single/ReleasePlatform";
// import { deleteFile } from "@/utils/indexedDB";

// // Importing icons for stepper
// import MusicNoteIcon from "@mui/icons-material/MusicNote";
// import AudiotrackIcon from "@mui/icons-material/Audiotrack";
// import DetailsIcon from "@mui/icons-material/Details";
// import StorefrontIcon from "@mui/icons-material/Storefront";
// import ReviewIcon from "@mui/icons-material/RateReview";
// import { FormData as TypeData } from "./FormUtils";

// const CustomStepIconRoot = styled("div")(({ theme, ownerState }: any) => ({
//   backgroundColor: ownerState.active ? "#1976d2" : "#ccc",
//   zIndex: 1,
//   color: "#fff",
//   width: 50,
//   height: 50,
//   display: "flex",
//   borderRadius: "50%",
//   justifyContent: "center",
//   alignItems: "center",
// }));

// const CustomStepIcon = (props: any) => {
//   const { active, completed, className, icon } = props;

//   const icons = {
//     1: <DetailsIcon />,
//     2: <AudiotrackIcon />,
//     3: <MusicNoteIcon />,
//     4: <StorefrontIcon />,
//     5: <ReviewIcon />,
//   };

//   return (
//     <CustomStepIconRoot
//       //@ts-ignore
//       ownerState={{ active }}
//       className={className}
//     >
//       {
//         //@ts-ignore
//         icons[String(icon)]
//       }
//     </CustomStepIconRoot>
//   );
// };

// const steps = [
//   { title: "Release Information", component: ReleaseInformation },
//   { title: "Audio & Cover", component: AudioDetails },
//   { title: "Tracks Details", component: TracksInformation },
//   { title: "Select Platform", component: ReleasePlatform },
//   { title: "Review Details", component: SingleReviewPage },
// ];

// const UploaderStepperForm = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const COVER_IMAGE_KEY = "coverImage";
//   const AUDIO_FILE_KEY = "audioFile";
//   const [formData, setFormData] = useState<TypeData>({
//     audio: { audioFile: new File([], ""), coverImage: new File([], "") },
//     releaseInformation: {
//       cLine: "",
//       version: "",
//       catalogNumber: "",
//       featuringArtists: [],
//       format: "",
//       genre: "",
//       label: "",
//       pLine: "",
//       primaryArtists: [],
//       productionYear: "",
//       releaseDate: "",
//       releaseTitle: "",
//       subgenre: "",
//       upc: "",
//       variousArtists: "",
//     },
//     trackDetails: {
//       arranger: "",
//       askToGenerateISRC: "",
//       author: "",
//       composer: "",
//       contentType: "",
//       instrumental: "",
//       isrc: "",
//       lyrics: "",
//       lyricsLanguage: "",
//       mood: "",
//       parentalAdvisory: "",
//       previewStart: "00:15",
//       price: "",
//       primaryTrackType: "",
//       producer: "",
//       publisher: "",
//       remixer: "",
//       secondaryTrackType: "",
//       title: "",
//       crbtTitle: "",
//       crbtTime: "00:15",
//       trackTitleLanguage: "",
//     },

//     platform: "",
//     previewPage: {},
//   });

//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   const [openModal, setOpenModal] = useState(false);

//   const [conditionsAccepted, setConditionsAccepted] = useState({
//     condition1: false,
//     condition2: false,
//     condition3: false,
//   });
//   const navigate = useNavigate();

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleDataChange = (step: any, data: any) => {
//     const updatedFormData = { ...formData, [step]: data };
//     setFormData(updatedFormData);
//   };

//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };
//   const handleAcceptCondition = (condition: string) => (event: any) => {
//     setConditionsAccepted({
//       ...conditionsAccepted,
//       [condition]: event.target.checked,
//     });
//   };
//   //!
//   const handleSubmit = async () => {
//     setOpenModal(false);
//     setIsLoading(true);
//     try {
//       const formDataToSend = new FormData();

//       formDataToSend.append("cLine", formData.releaseInformation.cLine);
//       formDataToSend.append("subtitle", formData.releaseInformation.version);
//       formDataToSend.append(
//         "catalogNumber",
//         formData.releaseInformation.catalogNumber
//       );
//       formDataToSend.append(
//         "featuringArtists",
//         formData.releaseInformation.featuringArtists.join(",")
//       );
//       formDataToSend.append("format", formData.releaseInformation.format);
//       formDataToSend.append("genre", formData.releaseInformation.genre);
//       formDataToSend.append("label", formData.releaseInformation.label);
//       formDataToSend.append("pLine", formData.releaseInformation.pLine);
//       formDataToSend.append(
//         "primaryArtist",
//         formData.releaseInformation.primaryArtists.join(",")
//       );
//       formDataToSend.append(
//         "productionYear",
//         formData.releaseInformation.productionYear
//       );
//       formDataToSend.append(
//         "releaseDate",
//         formData.releaseInformation.releaseDate
//       );
//       formDataToSend.append(
//         "releaseTitle",
//         formData.releaseInformation.releaseTitle
//       );
//       formDataToSend.append("subGenre", formData.releaseInformation.subgenre);
//       formDataToSend.append("upc", formData.releaseInformation.upc);
//       formDataToSend.append(
//         "variousArtists",
//         formData.releaseInformation.variousArtists
//       );

//       // Append trackDetails fields
//       formDataToSend.append("arranger", formData.trackDetails.arranger);
//       formDataToSend.append(
//         "askToGenerateISRC",
//         formData.trackDetails.askToGenerateISRC
//       );
//       formDataToSend.append("author", formData.trackDetails.author);
//       formDataToSend.append("composer", formData.trackDetails.composer);
//       formDataToSend.append("contentType", formData.trackDetails.contentType);
//       formDataToSend.append("instrumental", formData.trackDetails.instrumental);
//       formDataToSend.append("isrc", formData.trackDetails.isrc);
//       formDataToSend.append("lyrics", formData.trackDetails.lyrics);
//       formDataToSend.append("crbtTitle", formData.trackDetails.crbtTitle);
//       formDataToSend.append("crbtTime", formData.trackDetails.crbtTime);
//       formDataToSend.append(
//         "lyricsLanguage",
//         formData.trackDetails.lyricsLanguage
//       );
//       formDataToSend.append("mood", formData.trackDetails.mood);
//       formDataToSend.append(
//         "parentalAdvisory",
//         formData.trackDetails.parentalAdvisory
//       );
//       formDataToSend.append("previewStart", formData.trackDetails.previewStart);
//       formDataToSend.append("price", formData.trackDetails.price);
//       formDataToSend.append(
//         "primaryTrackType",
//         formData.trackDetails.primaryTrackType
//       );
//       formDataToSend.append("producer", formData.trackDetails.producer);
//       formDataToSend.append("publisher", formData.trackDetails.publisher);
//       formDataToSend.append("remixer", formData.trackDetails.remixer);
//       formDataToSend.append(
//         "secondaryTrackType",
//         formData.trackDetails.secondaryTrackType
//       );
//       formDataToSend.append("title", formData.trackDetails.title);
//       formDataToSend.append(
//         "trackTitleLanguage",
//         formData.trackDetails.trackTitleLanguage
//       );

//       formDataToSend.append("audio", formData.audio.audioFile);
//       formDataToSend.append("image", formData.audio.coverImage);
//       formDataToSend.append("platform", formData.platform);

//       await axios
//         .post(`${imageURL}/single-music/upload`, formDataToSend, {
//           onUploadProgress: (progressEvent) => {
//             const progress = Math.round(
//               //@ts-ignore
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setUploadProgress(progress);
//           },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         })
//         .then(({ data }) => {
//           if (data?.success === true) {
//             localStorage.removeItem("releaseFormData");
//             localStorage.removeItem("tracksInformation");
//             localStorage.removeItem("platform");
//             setIsLoading(false);
//             toast.success("Song Upload Successful");
//             navigate("/my-uploads/pending-track");
//             deleteFile(COVER_IMAGE_KEY);
//             deleteFile(AUDIO_FILE_KEY);
//           }
//         })
//         .catch((err) => {
//           toast.error(err?.response?.data?.message);
//           setIsLoading(false);
//         });
//     } catch (error: any) {
//       console.error("Error in handleSubmit:", error?.message);
//       setIsLoading(false);
//       toast.error(error?.message);
//     }
//     //!
//   };

//   const StepComponent = steps[activeStep].component;

//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         position: "relative",
//         background:
//           "linear-gradient(135deg, rgba(137, 247, 254, 0.8) 0%, rgba(102, 166, 255, 0.8) 50%), " +
//           "linear-gradient(225deg, rgba(245, 147, 251, 0.5) 50%, rgba(245, 87, 108, 0.5) 100%)",
//         backgroundBlendMode: "overlay",
//         padding: "40px",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         borderRadius: "16px",
//         boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       {/* Removed the overlay Box with background image */}

//       {/* Enhanced Stepper with Icons */}
//       <Stepper
//         activeStep={activeStep}
//         alternativeLabel
//         connector={
//           <Box
//             sx={{
//               flex: 1,
//               height: 2,
//               bgcolor: "divider",
//             }}
//           />
//         }
//         sx={{
//           mb: 5,
//         }}
//       >
//         {steps.map((step, index) => (
//           <Step key={step.title}>
//             <StepLabel StepIconComponent={CustomStepIcon}>
//               {step.title}
//             </StepLabel>
//           </Step>
//         ))}
//       </Stepper>

//       {/* Step Content */}
//       <Box sx={{ flexGrow: 1 }}>
//         <StepComponent
//           //@ts-ignore
//           data={formData}
//           onChange={handleDataChange}
//         />
//       </Box>

//       {/* Navigation Buttons */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mt={4}
//       >
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleBack}
//           disabled={activeStep === 0}
//           sx={{
//             flexGrow: 1,
//             mr: 2,
//             padding: "12px 24px",
//             borderRadius: "8px",
//           }}
//         >
//           Back
//         </Button>
//         {activeStep < steps.length - 1 ? (
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleNext}
//             sx={{
//               flexGrow: 1,
//               ml: 2,
//               padding: "12px 24px",
//               borderRadius: "8px",
//             }}
//           >
//             Next
//           </Button>
//         ) : (
//           <>
//             <LinearProgress
//               variant="determinate"
//               value={uploadProgress}
//               sx={{
//                 width: "100%",
//                 height: "8px",
//                 borderRadius: "4px",
//                 mb: 2,
//               }}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleOpenModal}
//               disabled={isLoading}
//               sx={{
//                 flexGrow: 1,
//                 ml: 2,
//                 padding: "12px 24px",
//                 borderRadius: "8px",
//               }}
//             >
//               {isLoading ? "Uploading..." : "Upload"}
//             </Button>
//           </>
//         )}
//       </Box>

//       {/* Terms & Conditions Modal */}
//       <Dialog
//         open={openModal}
//         onClose={handleCloseModal}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>
//           <Typography variant="h6">Terms & Conditions</Typography>
//           <Typography variant="subtitle1">
//             Please confirm that you have understood and that you agree to the
//             following Terms & Conditions, and delivery guidelines.
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={conditionsAccepted.condition1}
//                 onChange={handleAcceptCondition("condition1")}
//                 color="primary"
//               />
//             }
//             label={
//               <Typography variant="body1">
//                 I understand and agree to the ISRC Terms & Conditions.
//                 <Typography variant="body2">
//                   If you asked ANS Music to generate your ISRC codes, you hereby
//                   agree to{" "}
//                   <Link
//                     className="text-blue-600 underline"
//                     to="https://ansmusiclimited.com/"
//                     target="_blank"
//                   >
//                     ANS Music's conditions for generating ISRCs.
//                   </Link>
//                 </Typography>
//               </Typography>
//             }
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={conditionsAccepted.condition2}
//                 onChange={handleAcceptCondition("condition2")}
//                 color="primary"
//               />
//             }
//             label={
//               <Typography variant="body1">
//                 I understand and agree to the Youtube Content Guidelines.
//                 <Typography variant="body2">
//                   Some content cannot be safely distributed and monetized on the
//                   platform. Please be sure you have read and follow the{" "}
//                   <Link
//                     className="text-blue-600 underline"
//                     to="https://ansmusiclimited.com/"
//                     target="_blank"
//                   >
//                     Youtube Content Guidelines.
//                   </Link>
//                 </Typography>
//               </Typography>
//             }
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={conditionsAccepted.condition3}
//                 onChange={handleAcceptCondition("condition3")}
//                 color="primary"
//               />
//             }
//             label={
//               <Typography variant="body1">
//                 I understand and agree to the ANS Music Content Delivery
//                 Guidelines for Audio Stores.
//                 <Typography variant="body2">
//                   Some content is not eligible to be distributed on Apple Music,
//                   Spotify, and Youtube Audio Fingerprint. Please be sure you
//                   have read and understand the{" "}
//                   <Link
//                     className="text-blue-600 underline"
//                     to="https://ansmusiclimited.com/"
//                     target="_blank"
//                   >
//                     ANS Music Content Delivery Guidelines for Audio Stores.
//                   </Link>
//                 </Typography>
//               </Typography>
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleCloseModal}
//             color="primary"
//             variant="outlined"
//             sx={{ mr: 2 }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             color="primary"
//             variant="contained"
//             disabled={
//               !conditionsAccepted.condition1 ||
//               !conditionsAccepted.condition2 ||
//               !conditionsAccepted.condition3 ||
//               isLoading
//             }
//           >
//             {isLoading ? "Uploading..." : "Agree and Submit"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default UploaderStepperForm;
// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import { useState } from "react";
// import {
//   Button,
//   Typography,
//   Stepper,
//   Step,
//   StepLabel,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from "@material-ui/core";
// import { Link, useNavigate } from "react-router-dom";
// import AudioDetails from "../uploads/Single/AudioDetails";
// import ReleaseInformation from "../uploads/Single/ReleaseInformation";
// import TracksInformation from "../uploads/Single/TracksInformation";
// import SingleReviewPage from "../uploads/Single/SingleReviewPage";

// import toast from "react-hot-toast";
// import {
//   Box,
//   Checkbox,
//   Container,
//   FormControlLabel,
//   LinearProgress,
// } from "@mui/material";
// import axios from "axios";
// import { imageURL } from "@/redux/api/baseApi";
// import ReleasePlatform from "../uploads/Single/ReleasePlatform";
// import { deleteFile } from "@/utils/indexedDB";

// interface ReleaseInformation {
//   cLine: string;
//   version: string;
//   catalogNumber: string;
//   featuringArtists: string[];
//   format: string;
//   genre: string;
//   label: string;
//   pLine: string;
//   primaryArtists: string[];
//   productionYear: string;
//   releaseDate: string;
//   releaseTitle: string;
//   subgenre: string;
//   upc: string;
//   variousArtists: string;
// }

// interface TrackDetails {
//   arranger: string;
//   askToGenerateISRC: string;
//   crbtTitle: string;
//   crbtTime: string;
//   author: string;
//   composer: string;
//   contentType: string;
//   instrumental: string;
//   isrc: string;
//   lyrics: string;
//   lyricsLanguage: string;
//   mood: string;
//   parentalAdvisory: string;
//   previewStart: string;
//   price: string;
//   primaryTrackType: string;
//   producer: string;
//   publisher: string;
//   remixer: string;
//   secondaryTrackType: string;
//   title: string;
//   trackTitleLanguage: string;
// }

// interface AudioDetails {
//   audioFile: File;
//   coverImage: File;
// }

// interface FormData {
//   audio: AudioDetails;
//   releaseInformation: ReleaseInformation;
//   trackDetails: TrackDetails;
//   // countries: string[];
//   previewPage: Record<string, unknown>;
//   platform: string;
// }

// const steps = [
//   { title: "Release Information", component: ReleaseInformation },
//   { title: "Audio & Cover", component: AudioDetails },
//   { title: "Tracks Details", component: TracksInformation },
//   { title: "Select Platform", component: ReleasePlatform },
//   { title: "Review Details", component: SingleReviewPage },
// ];

// const UploaderStepperForm = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const COVER_IMAGE_KEY = "coverImage";
//   const AUDIO_FILE_KEY = "audioFile";
//   const [formData, setFormData] = useState<FormData>({
//     audio: { audioFile: new File([], ""), coverImage: new File([], "") },
//     releaseInformation: {
//       cLine: "",
//       version: "",
//       catalogNumber: "",
//       featuringArtists: [],
//       format: "",
//       genre: "",
//       label: "",
//       pLine: "",
//       primaryArtists: [],
//       productionYear: "",
//       releaseDate: "",
//       releaseTitle: "",
//       subgenre: "",
//       upc: "",
//       variousArtists: "",
//     },
//     trackDetails: {
//       arranger: "",
//       askToGenerateISRC: "",
//       author: "",
//       composer: "",
//       contentType: "",
//       instrumental: "",
//       isrc: "",
//       lyrics: "",
//       lyricsLanguage: "",
//       mood: "",
//       parentalAdvisory: "",
//       previewStart: "00:15",
//       price: "",
//       primaryTrackType: "",
//       producer: "",
//       publisher: "",
//       remixer: "",
//       secondaryTrackType: "",
//       title: "",
//       crbtTitle: "",
//       crbtTime: "",
//       trackTitleLanguage: "",
//     },
//     // countries: [],
//     platform: "",
//     previewPage: {},
//   });

//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isLoading, setIsLoading] = useState(false);

//   const [openModal, setOpenModal] = useState(false);

//   const [conditionsAccepted, setConditionsAccepted] = useState({
//     condition1: false,
//     condition2: false,
//     condition3: false,
//   });
//   const navigate = useNavigate();

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleDataChange = (step: any, data: any) => {
//     const updatedFormData = { ...formData, [step]: data };
//     setFormData(updatedFormData);
//   };

//   const handleOpenModal = () => {
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//   };
//   const handleAcceptCondition = (condition: string) => (event: any) => {
//     setConditionsAccepted({
//       ...conditionsAccepted,
//       [condition]: event.target.checked,
//     });
//   };
//   //!
//   const handleSubmit = async () => {
//     setOpenModal(false);
//     setIsLoading(true);
//     try {
//       const formDataToSend = new FormData();

//       formDataToSend.append("cLine", formData.releaseInformation.cLine);
//       formDataToSend.append("subtitle", formData.releaseInformation.version);
//       formDataToSend.append(
//         "catalogNumber",
//         formData.releaseInformation.catalogNumber
//       );
//       formDataToSend.append(
//         "featuringArtists",
//         formData.releaseInformation.featuringArtists.join(",")
//       );
//       formDataToSend.append("format", formData.releaseInformation.format);
//       formDataToSend.append("genre", formData.releaseInformation.genre);
//       formDataToSend.append("label", formData.releaseInformation.label);
//       formDataToSend.append("pLine", formData.releaseInformation.pLine);
//       formDataToSend.append(
//         "primaryArtist",
//         formData.releaseInformation.primaryArtists.join(",")
//       );
//       formDataToSend.append(
//         "productionYear",
//         formData.releaseInformation.productionYear
//       );
//       formDataToSend.append(
//         "releaseDate",
//         formData.releaseInformation.releaseDate
//       );
//       formDataToSend.append(
//         "releaseTitle",
//         formData.releaseInformation.releaseTitle
//       );
//       formDataToSend.append("subGenre", formData.releaseInformation.subgenre);
//       formDataToSend.append("upc", formData.releaseInformation.upc);
//       formDataToSend.append(
//         "variousArtists",
//         formData.releaseInformation.variousArtists
//       );

//       // Append trackDetails fields
//       formDataToSend.append("arranger", formData.trackDetails.arranger);
//       formDataToSend.append(
//         "askToGenerateISRC",
//         formData.trackDetails.askToGenerateISRC
//       );
//       formDataToSend.append("author", formData.trackDetails.author);
//       formDataToSend.append("composer", formData.trackDetails.composer);
//       formDataToSend.append("contentType", formData.trackDetails.contentType);
//       formDataToSend.append("instrumental", formData.trackDetails.instrumental);
//       formDataToSend.append("isrc", formData.trackDetails.isrc);
//       formDataToSend.append("lyrics", formData.trackDetails.lyrics);
//       formDataToSend.append("crbtTitle", formData.trackDetails.crbtTitle);
//       formDataToSend.append("crbtTime", formData.trackDetails.crbtTime);
//       formDataToSend.append(
//         "lyricsLanguage",
//         formData.trackDetails.lyricsLanguage
//       );
//       formDataToSend.append("mood", formData.trackDetails.mood);
//       formDataToSend.append(
//         "parentalAdvisory",
//         formData.trackDetails.parentalAdvisory
//       );
//       formDataToSend.append("previewStart", formData.trackDetails.previewStart);
//       formDataToSend.append("price", formData.trackDetails.price);
//       formDataToSend.append(
//         "primaryTrackType",
//         formData.trackDetails.primaryTrackType
//       );
//       formDataToSend.append("producer", formData.trackDetails.producer);
//       formDataToSend.append("publisher", formData.trackDetails.publisher);
//       formDataToSend.append("remixer", formData.trackDetails.remixer);
//       formDataToSend.append(
//         "secondaryTrackType",
//         formData.trackDetails.secondaryTrackType
//       );
//       formDataToSend.append("title", formData.trackDetails.title);
//       formDataToSend.append(
//         "trackTitleLanguage",
//         formData.trackDetails.trackTitleLanguage
//       );

//       formDataToSend.append("audio", formData.audio.audioFile);
//       formDataToSend.append("image", formData.audio.coverImage);
//       formDataToSend.append("platform", formData.platform);

//       // formDataToSend.append("countries", formData.countries.join(","));

//       await axios
//         .post(`${imageURL}/single-music/upload`, formDataToSend, {
//           onUploadProgress: (progressEvent) => {
//             const progress = Math.round(
//               //@ts-ignore
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setUploadProgress(progress);
//           },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         })
//         .then(({ data }) => {
//           if (data?.success === true) {
//             localStorage.removeItem("releaseFormData");
//             localStorage.removeItem("tracksInformation");
//             localStorage.removeItem("platform");
//             setIsLoading(false);
//             toast.success("Song Upload Successful");
//             navigate("/my-uploads/pending-track");
//             deleteFile(COVER_IMAGE_KEY);
//             deleteFile(AUDIO_FILE_KEY);
//           }
//         })
//         .catch((err) => {
//           toast.error(err?.response?.data?.message);
//           setIsLoading(false);
//         });
//     } catch (error: any) {
//       console.error("Error in handleSubmit:", error?.message);
//       setIsLoading(false);
//       toast.error(error?.message);
//     }
//   };
//   //!

//   const StepComponent = steps[activeStep].component;

//   return (
//     <Container
//       maxWidth="lg"
//       sx={{
//         position: "relative",
//         backgroundImage: `url(https://res.cloudinary.com/arafatleo/image/upload/v1724142235/signup_aiqgj5.jpg)`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         padding: "20px",
//         minHeight: "100vh",
//         overflow: "hidden",
//       }}
//     >
//       <Box
//         textAlign="center"
//         mb={4}
//         sx={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//           zIndex: -1,
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Distribute Your Music with ANS Music
//         </Typography>
//         <Typography variant="body1" color="textSecondary">
//           Follow the steps below to complete your upload.
//         </Typography>
//       </Box>
//       <Stepper activeStep={activeStep} alternativeLabel>
//         {steps.map((step) => (
//           <Step key={step.title}>
//             <StepLabel>{step.title}</StepLabel>
//           </Step>
//         ))}
//       </Stepper>
//       <Box mt={4}>
//         <StepComponent
//           //@ts-ignore
//           data={formData}
//           onChange={handleDataChange}
//         />
//       </Box>
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mt={4}
//       >
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleBack}
//           disabled={activeStep === 0}
//           style={{ flexGrow: 1, marginRight: 10 }}
//         >
//           Back
//         </Button>
//         {activeStep < steps.length - 1 ? (
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleNext}
//             style={{ flexGrow: 1, marginLeft: 10 }}
//           >
//             Next
//           </Button>
//         ) : (
//           <>
//             <LinearProgress
//               className="py-2 my-2"
//               variant="determinate"
//               value={uploadProgress}
//               style={{ width: "100%", marginTop: 10 }}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleOpenModal}
//               disabled={isLoading}
//               style={{ flexGrow: 1, marginLeft: 10 }}
//             >
//               Upload
//             </Button>
//           </>
//         )}
//       </Box>
//       <Dialog
//         open={openModal}
//         onClose={handleCloseModal}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogTitle>
//           <Typography variant="h6">Terms & Conditions</Typography>
//           <Typography variant="subtitle1">
//             Please confirm that you have understood and that you agree to the
//             following Terms & Conditions, and delivery guidelines.
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={conditionsAccepted.condition1}
//                 onChange={handleAcceptCondition("condition1")}
//                 color="primary"
//               />
//             }
//             label={
//               <Typography variant="body1">
//                 I understand and agree to the ISRC Terms & Conditions.
//                 <Typography variant="body2">
//                   If you asked ANS Music to generate your ISRC codes, you hereby
//                   agree to{" "}
//                   <Link
//                     className="text-blue-600 underline"
//                     to="https://ansmusiclimited.com/"
//                     target="_blank"
//                   >
//                     ANS Music's conditions for generating ISRCs.
//                   </Link>
//                 </Typography>
//               </Typography>
//             }
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={conditionsAccepted.condition2}
//                 onChange={handleAcceptCondition("condition2")}
//                 color="primary"
//               />
//             }
//             label={
//               <Typography variant="body1">
//                 I understand and agree to the Youtube Content Guidelines.
//                 <Typography variant="body2">
//                   Some content cannot be safely distributed and monetized on the
//                   platform. Please be sure you have read and follow the{" "}
//                   <Link
//                     className="text-blue-600 underline"
//                     to="https://ansmusiclimited.com/"
//                     target="_blank"
//                   >
//                     Youtube Content Guidelines.
//                   </Link>
//                 </Typography>
//               </Typography>
//             }
//           />
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={conditionsAccepted.condition3}
//                 onChange={handleAcceptCondition("condition3")}
//                 color="primary"
//               />
//             }
//             label={
//               <Typography variant="body1">
//                 I understand and agree to the ANS Music Content Delivery
//                 Guidelines for Audio Stores.
//                 <Typography variant="body2">
//                   Some content is not eligible to be distributed on Apple Music,
//                   Spotify, and Youtube Audio Fingerprint. Please be sure you
//                   have read and understand the{" "}
//                   <Link
//                     className="text-blue-600 underline"
//                     to="https://ansmusiclimited.com/"
//                     target="_blank"
//                   >
//                     ANS Music Content Delivery Guidelines for Audio Stores.
//                   </Link>
//                 </Typography>
//               </Typography>
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseModal} color="primary" variant="outlined">
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             color="primary"
//             variant="contained"
//             disabled={
//               !conditionsAccepted.condition1 ||
//               !conditionsAccepted.condition2 ||
//               !conditionsAccepted.condition3 ||
//               isLoading
//             }
//           >
//             {isLoading ? "Uploading..." : "Agree and Submit"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// };

// export default UploaderStepperForm;
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
import {
  Button,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";

import { deleteFile } from "@/utils/indexedDB";
import toast from "react-hot-toast";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import DetailsIcon from "@mui/icons-material/Details";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ReviewIcon from "@mui/icons-material/RateReview";
import { FormData as TypeData } from "./FormType";
import {
  clearLocalStorage,
  prepareFormData,
  steps,
  uploadFormData,
} from "./SingleUploaderUtils";
import { validateFormData } from "./validateFormData";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

import "./Form.css";

const CustomStepIconRoot = styled("div")(({ theme, ownerState }: any) => ({
  backgroundColor: ownerState.active ? "#1976d2" : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
}));

const CustomStepIcon = (props: any) => {
  const { active, completed, className, icon } = props;

  const icons = {
    1: <DetailsIcon />,
    2: <AudiotrackIcon />,
    3: <MusicNoteIcon />,
    4: <StorefrontIcon />,
    5: <ReviewIcon />,
  };

  return (
    <CustomStepIconRoot
      //@ts-ignore
      ownerState={{ active }}
      className={className}
    >
      {
        //@ts-ignore
        icons[String(icon)]
      }
    </CustomStepIconRoot>
  );
};

const UploaderStepperForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const COVER_IMAGE_KEY = "coverImage";
  const AUDIO_FILE_KEY = "audioFile";
  const [formData, setFormData] = useState<TypeData>({
    audio: { audioFile: new File([], ""), coverImage: new File([], "") },
    releaseInformation: {
      cLine: "",
      version: "",
      catalogNumber: "",
      featuringArtists: [],
      format: "",
      genre: "",
      label: "",
      pLine: "",
      primaryArtists: [],
      productionYear: "",
      releaseDate: "",
      releaseTitle: "",
      subgenre: "",
      upc: "",
      variousArtists: "",
    },
    trackDetails: {
      arranger: "",
      askToGenerateISRC: "",
      author: "",
      composer: "",
      contentType: "",
      instrumental: "",
      isrc: "",
      lyrics: "",
      lyricsLanguage: "",
      mood: "",
      parentalAdvisory: "",
      previewStart: "00:15",
      price: "",
      primaryTrackType: "",
      producer: "",
      publisher: "",
      remixer: "",
      secondaryTrackType: "",
      title: "",
      crbtTitle: "",
      crbtTime: "00:15",
      trackTitleLanguage: "",
    },

    platform: "",
    previewPage: {},
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    setUploadProgress(0);
    const missingFields = validateFormData(formData);
    //!
    if (missingFields.length > 0) {
      setIsLoading(false);

      const missingFieldsList = missingFields
        .map((field) => {
          const fieldName = field.split(".").pop();

          return `
          <li class="missing-field-item">
            <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
              <path d="M4.257 5.099a.5.5 0 0 1 .574-.224l.085.038 3.5 1.75a.5.5 0 0 1 .258.58l-.036.093-1.25 3.5a.5.5 0 0 1-.768.183L4.1 7.737l-1.25 3.5a.5.5 0 0 1-.768.183L1.1 9.737l-3-4a.5.5 0 0 1 .574-.824l3 4a.5.5 0 0 1 .258.58l-.036.093-1.25 3.5a.5.5 0 0 1-.768.183L.1 7.737 0 8a.5.5 0 0 1 .5-.5h0z"/>
            </svg>
            ${fieldName}
          </li>
        `;
        })
        .join("");

      await MySwal.fire({
        title: "🚧 Missing Required Fields",
        html: `
          <div class="swal-custom-content">
            <p>Please fill in the following required fields:</p>
            <ul class="missing-fields-list">
              ${missingFieldsList}
            </ul>
          </div>
        `,
        icon: "warning",
        confirmButtonText: "Got it!",
        customClass: {
          popup: "swal2-custom-popup",
          title: "swal2-custom-title",
          htmlContainer: "swal2-custom-html",
          confirmButton: "swal2-custom-confirm",
        },
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      return;
    }
    //!
    try {
      const formDataToSend = prepareFormData(formData);

      const data = await uploadFormData(formDataToSend, setUploadProgress);

      if (data?.success) {
        clearLocalStorage();
        toast.success("Song Upload Successful");
        navigate("/my-uploads/pending-track");
        deleteFile(COVER_IMAGE_KEY);
        deleteFile(AUDIO_FILE_KEY);
      } else {
        throw new Error(data?.message || "Upload failed");
      }
    } catch (error: any) {
      console.error("Error in handleSubmit:", error.message);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const StepComponent = steps[activeStep].component;

  return (
    <Container
      maxWidth="lg"
      sx={{
        position: "relative",
        background:
          "linear-gradient(135deg, rgba(137, 247, 254, 0.8) 0%, rgba(102, 166, 255, 0.8) 50%), " +
          "linear-gradient(225deg, rgba(245, 147, 251, 0.5) 50%, rgba(245, 87, 108, 0.5) 100%)",
        backgroundBlendMode: "overlay",
        padding: "40px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: "16px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={
          <Box
            sx={{
              flex: 1,
              height: 2,
              bgcolor: "divider",
            }}
          />
        }
        sx={{
          mb: 5,
        }}
      >
        {steps.map((step, index) => (
          <Step key={step.title}>
            <StepLabel StepIconComponent={CustomStepIcon}>
              {step.title}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Step Content */}
      <Box sx={{ flexGrow: 1 }}>
        <StepComponent
          //@ts-ignore
          data={formData}
          onChange={handleDataChange}
        />
      </Box>

      {/* Navigation Buttons */}
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
          sx={{
            flexGrow: 1,
            mr: 2,
            padding: "12px 24px",
            borderRadius: "8px",
          }}
        >
          Back
        </Button>
        {activeStep < steps.length - 1 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            sx={{
              flexGrow: 1,
              ml: 2,
              padding: "12px 24px",
              borderRadius: "8px",
            }}
          >
            Next
          </Button>
        ) : (
          <>
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{
                width: "100%",
                height: "8px",
                borderRadius: "4px",
                mb: 2,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenModal}
              disabled={isLoading}
              sx={{
                flexGrow: 1,
                ml: 2,
                padding: "12px 24px",
                borderRadius: "8px",
              }}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
          </>
        )}
      </Box>

      {/* Terms & Conditions Modal */}
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
          <Button
            onClick={handleCloseModal}
            color="primary"
            variant="outlined"
            sx={{ mr: 2 }}
          >
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

export default UploaderStepperForm;
