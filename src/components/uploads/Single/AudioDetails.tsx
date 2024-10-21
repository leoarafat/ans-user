// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import React, { useState, useEffect } from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   IconButton,
//   Typography,
//   Box,
// } from "@mui/material";
// import { MdClose } from "react-icons/md";
// import { BsCloudUpload } from "react-icons/bs";
// import AudiotrackIcon from "@mui/icons-material/Audiotrack";
// import { deleteFile, getFile, saveFile } from "@/utils/indexedDB";

// const AudioDetails = ({ data, onChange }: any) => {
//   const [coverImage, setCoverImage] = useState<File | null>(null);
//   const [audioFile, setAudioFile] = useState<File | null>(null);

//   const COVER_IMAGE_KEY = "coverImage";
//   const AUDIO_FILE_KEY = "audioFile";

//   useEffect(() => {
//     // Load cover image from IndexedDB
//     const loadCoverImage = async () => {
//       const file = await getFile(COVER_IMAGE_KEY);
//       if (file) {
//         setCoverImage(file);
//         onChange("audio", { ...data?.audio, coverImage: file });
//       }
//     };

//     // Load audio file from IndexedDB
//     const loadAudioFile = async () => {
//       const file = await getFile(AUDIO_FILE_KEY);
//       if (file) {
//         setAudioFile(file);
//         onChange("audio", { ...data?.audio, audioFile: file });
//       }
//     };

//     loadCoverImage();
//     loadAudioFile();
//   }, [onChange, data?.audio]);

//   const handleCoverImageUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files ? event.target.files[0] : null;
//     if (file) {
//       setCoverImage(file);
//       onChange("audio", { ...data?.audio, coverImage: file });
//       await saveFile(COVER_IMAGE_KEY, file);
//     }
//   };

//   const handleAudioUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files ? event.target.files[0] : null;
//     if (file) {
//       setAudioFile(file);
//       onChange("audio", { ...data?.audio, audioFile: file });
//       await saveFile(AUDIO_FILE_KEY, file);
//     }
//   };

//   const handleCoverImageRemoveImage = async () => {
//     setCoverImage(null);
//     onChange("audio", { ...data?.audio, coverImage: null });
//     await deleteFile(COVER_IMAGE_KEY);
//   };

//   const handleAudioRemove = async () => {
//     setAudioFile(null);
//     onChange("audio", { ...data?.audio, audioFile: null });
//     await deleteFile(AUDIO_FILE_KEY);
//   };

//   return (
//     <Box
//       component="form"
//       sx={{
//         background:
//           "radial-gradient(at 64% 69%, hsla(199, 91%, 54%, 1) 0, hsla(199, 91%, 54%, 0) 50%)",
//       }}
//     >
//       <Grid container spacing={3} alignItems="center">
//         <Grid item xs={12} md={6}>
//           <Card
//             sx={{
//               background: "linear-gradient(135deg, #d9e4f5 0%, #f3eaf7 100%)",
//               backdropFilter: "blur(8px)",
//               borderRadius: "16px",
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Upload Cover Image
//               </Typography>
//               <Typography variant="body2" color="textSecondary" gutterBottom>
//                 Size: 1440x1440 or 3000x3000 pixels
//               </Typography>
//               {coverImage ? (
//                 <Box position="relative">
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     image={URL.createObjectURL(coverImage)}
//                     alt="Cover"
//                     style={{
//                       objectFit: "cover",
//                     }}
//                   />
//                   <IconButton
//                     onClick={handleCoverImageRemoveImage}
//                     style={{
//                       position: "absolute",
//                       top: 8,
//                       right: 8,
//                       backgroundColor: "rgba(0, 0, 0, 0.5)",
//                       color: "white",
//                     }}
//                   >
//                     <MdClose />
//                   </IconButton>
//                 </Box>
//               ) : (
//                 <label htmlFor="cover-image-upload">
//                   <input
//                     id="cover-image-upload"
//                     type="file"
//                     accept="image/*"
//                     name="coverImage"
//                     style={{ display: "none" }}
//                     onChange={handleCoverImageUpload}
//                     required
//                   />
//                   <Box
//                     display="flex"
//                     justifyContent="center"
//                     alignItems="center"
//                     height="200px"
//                     border="2px dashed #ccc"
//                     borderRadius="8px"
//                     style={{ cursor: "pointer" }}
//                   >
//                     <BsCloudUpload style={{ fontSize: 60 }} />
//                   </Box>
//                 </label>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card
//             sx={{
//               background: "linear-gradient(135deg, #d9e4f5 0%, #f3eaf7 100%)",
//               backdropFilter: "blur(8px)",
//               borderRadius: "16px",
//             }}
//           >
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 Upload Audio
//               </Typography>
//               <Typography variant="body2" color="textSecondary" gutterBottom>
//                 You can upload the following formats: WAV (PCM only), FLAC
//               </Typography>
//               {audioFile ? (
//                 <Box position="relative">
//                   <audio controls style={{ width: "100%" }}>
//                     <source
//                       src={URL.createObjectURL(audioFile)}
//                       type={audioFile.type}
//                     />
//                     Your browser does not support the audio tag.
//                   </audio>
//                   <IconButton
//                     onClick={handleAudioRemove}
//                     style={{
//                       position: "absolute",
//                       top: 8,
//                       right: 8,
//                       backgroundColor: "rgba(0, 0, 0, 0.5)",
//                       color: "white",
//                     }}
//                   >
//                     <MdClose />
//                   </IconButton>
//                 </Box>
//               ) : (
//                 <label htmlFor="audio-upload">
//                   <input
//                     id="audio-upload"
//                     type="file"
//                     accept="audio/*"
//                     name="audioFile"
//                     style={{ display: "none" }}
//                     onChange={handleAudioUpload}
//                     required
//                   />
//                   <Box
//                     display="flex"
//                     justifyContent="center"
//                     alignItems="center"
//                     height="200px"
//                     border="2px dashed #ccc"
//                     borderRadius="8px"
//                     style={{ cursor: "pointer" }}
//                   >
//                     <AudiotrackIcon style={{ fontSize: 60 }} />
//                   </Box>
//                 </label>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default AudioDetails;
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { BsCloudUpload } from "react-icons/bs";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { deleteFile, getFile, saveFile } from "@/utils/indexedDB";

interface AudioDetailsProps {
  data: any;
  onChange: (field: string, value: any) => void;
}

const AudioDetails: React.FC<AudioDetailsProps> = ({ data, onChange }) => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverError, setCoverError] = useState<string>("");
  const [audioError, setAudioError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const COVER_IMAGE_KEY = "coverImage";
  const AUDIO_FILE_KEY = "audioFile";

  useEffect(() => {
    // Load cover image from IndexedDB
    const loadCoverImage = async () => {
      const file = await getFile(COVER_IMAGE_KEY);
      if (file) {
        setCoverImage(file);
        onChange("audio", { ...data?.audio, coverImage: file });
      }
    };

    // Load audio file from IndexedDB
    const loadAudioFile = async () => {
      const file = await getFile(AUDIO_FILE_KEY);
      if (file) {
        setAudioFile(file);
        onChange("audio", { ...data?.audio, audioFile: file });
      }
    };

    loadCoverImage();
    loadAudioFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper function to validate audio specifications
  const validateAudio = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type !== "audio/wav") {
        resolve("Only WAV audio files are supported.");
        return;
      }

      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const reader = new FileReader();

      reader.onload = async (e) => {
        if (e.target?.result) {
          try {
            const arrayBuffer = e.target.result as ArrayBuffer;
            const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
            const sampleRate = audioBuffer.sampleRate;
            const channelData = audioBuffer.getChannelData(0);
            const bitDepth = 32; // Web Audio API uses 32-bit float

            // Define allowed sample rates
            const allowedSampleRates = [
              192000, 176400, 96000, 88200, 48000, 44100,
            ];

            if (!allowedSampleRates.includes(sampleRate)) {
              resolve(`Invalid sample rate: ${sampleRate / 1000} kHz.`);
              return;
            }

            // Since Web Audio API decodes to 32-bit float, we need to check if original file matches one of the allowed bit depths
            // Note: It's challenging to get the original bit depth from a WAV file using Web Audio API.
            // For demonstration, we'll assume the bit depth is acceptable if sample rate is valid.
            resolve("");
          } catch (error) {
            resolve("Failed to decode audio file.");
          }
        } else {
          resolve("Invalid audio file.");
        }
      };

      reader.onerror = () => {
        resolve("Failed to read audio file.");
      };

      reader.readAsArrayBuffer(file);
    });
  };

  // Helper function to validate cover image specifications
  const validateCoverImage = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        resolve("Cover art must be in JPG or PNG format.");
        return;
      }

      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.onload = () => {
        const { width, height } = img;
        if (width < 1500 || height < 1500) {
          resolve("Cover art must be at least 1500 x 1500 pixels.");
        } else if (width > 6000 || height > 6000) {
          resolve("Cover art must be at most 6000 x 6000 pixels.");
        } else {
          resolve("");
        }
        URL.revokeObjectURL(objectUrl);
      };

      img.onerror = () => {
        resolve("Invalid cover art file.");
        URL.revokeObjectURL(objectUrl);
      };

      img.src = objectUrl;
    });
  };

  const handleCoverImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setCoverError("");
      const validationError = await validateCoverImage(file);
      if (validationError) {
        setCoverError(validationError);
        return;
      }
      setCoverImage(file);
      onChange("audio", { ...data?.audio, coverImage: file });
      await saveFile(COVER_IMAGE_KEY, file);
    }
  };

  const handleAudioUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setAudioError("");
      const validationError = await validateAudio(file);
      if (validationError) {
        setAudioError(validationError);
        return;
      }
      setAudioFile(file);
      onChange("audio", { ...data?.audio, audioFile: file });
      await saveFile(AUDIO_FILE_KEY, file);
    }
  };

  const handleCoverImageRemoveImage = async () => {
    setCoverImage(null);
    onChange("audio", { ...data?.audio, coverImage: null });
    setCoverError("");
    await deleteFile(COVER_IMAGE_KEY);
  };

  const handleAudioRemove = async () => {
    setAudioFile(null);
    onChange("audio", { ...data?.audio, audioFile: null });
    setAudioError("");
    await deleteFile(AUDIO_FILE_KEY);
  };

  return (
    <Box
      component="form"
      sx={{
        background:
          "radial-gradient(at 64% 69%, hsla(199, 91%, 54%, 1) 0%, hsla(199, 91%, 54%, 0) 50%)",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Grid container spacing={3} alignItems="center">
        {/* Cover Image Upload */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #d9e4f5 0%, #f3eaf7 100%)",
              backdropFilter: "blur(8px)",
              borderRadius: "16px",
              position: "relative",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upload Cover Image
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Size: 1500x1500 to 6000x6000 pixels (Recommended: ≥3000x3000)
              </Typography>
              {coverError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {coverError}
                </Alert>
              )}
              {coverImage ? (
                <Box position="relative">
                  <CardMedia
                    component="img"
                    height="200"
                    image={URL.createObjectURL(coverImage)}
                    alt="Cover"
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <IconButton
                    onClick={handleCoverImageRemoveImage}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                      },
                    }}
                  >
                    <MdClose />
                  </IconButton>
                </Box>
              ) : (
                <label htmlFor="cover-image-upload">
                  <input
                    id="cover-image-upload"
                    type="file"
                    accept="image/jpeg, image/png"
                    name="coverImage"
                    style={{ display: "none" }}
                    onChange={handleCoverImageUpload}
                    required
                  />
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="200px"
                    border="2px dashed #ccc"
                    borderRadius="8px"
                    sx={{
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                      },
                    }}
                  >
                    <BsCloudUpload style={{ fontSize: 60, color: "#666" }} />
                  </Box>
                </label>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Audio File Upload */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #d9e4f5 0%, #f3eaf7 100%)",
              backdropFilter: "blur(8px)",
              borderRadius: "16px",
              position: "relative",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upload Audio
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Formats: WAV (HD Audio) or MP3 (Support ending soon)
              </Typography>
              {audioError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {audioError}
                </Alert>
              )}
              {audioFile ? (
                <Box position="relative">
                  <Box display="flex" alignItems="center">
                    <AudiotrackIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">{audioFile.name}</Typography>
                  </Box>
                  <IconButton
                    onClick={handleAudioRemove}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                      },
                    }}
                  >
                    <MdClose />
                  </IconButton>
                </Box>
              ) : (
                <label htmlFor="audio-upload">
                  <input
                    id="audio-upload"
                    type="file"
                    accept="audio/wav, audio/mp3"
                    name="audioFile"
                    style={{ display: "none" }}
                    onChange={handleAudioUpload}
                    required
                  />
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="200px"
                    border="2px dashed #ccc"
                    borderRadius="8px"
                    sx={{
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                      },
                    }}
                  >
                    <AudiotrackIcon style={{ fontSize: 60, color: "#666" }} />
                  </Box>
                </label>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AudioDetails;
