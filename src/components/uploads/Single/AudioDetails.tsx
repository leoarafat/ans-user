// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import React, { useState } from "react";
// import {
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   IconButton,
//   Typography,
//   Button,
//   Box,
// } from "@mui/material";
// import { MdClose } from "react-icons/md";
// import { BsCloudUpload } from "react-icons/bs";
// import AudiotrackIcon from "@mui/icons-material/Audiotrack";

// const AudioDetails = ({ data, onChange }: any) => {
//   const [coverImage, setCoverImage] = useState<File | null>(null);
//   const [audioFile, setAudioFile] = useState<File | null>(null);

//   const handleCoverImageUpload = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files ? event.target.files[0] : null;
//     if (file) {
//       setCoverImage(file);
//       onChange("audio", { ...data?.audio, coverImage: file });
//     }
//   };

//   const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files ? event.target.files[0] : null;
//     if (file) {
//       setAudioFile(file);
//       onChange("audio", { ...data?.audio, audioFile: file });
//     }
//   };

//   const handleCoverImageRemoveImage = () => {
//     setCoverImage(null);
//     onChange("audio", { ...data?.audio, coverImage: null });
//   };

//   const handleAudioRemove = () => {
//     setAudioFile(null);
//     onChange("audio", { ...data?.audio, audioFile: null });
//   };

//   return (
//     <Box component="form">
//       <Grid container spacing={3} alignItems="center">
//         <Grid item xs={9} md={6} spacing={3}>
//           <Card>
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

//         <Grid item xs={9} md={6}>
//           <Card>
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
//                       type="audio/mpeg"
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
} from "@mui/material";
import { MdClose } from "react-icons/md";
import { BsCloudUpload } from "react-icons/bs";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { deleteFile, getFile, saveFile } from "@/utils/indexedDB";

const AudioDetails = ({ data, onChange }: any) => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);

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
  }, [onChange, data?.audio]);

  const handleCoverImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
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
      setAudioFile(file);
      onChange("audio", { ...data?.audio, audioFile: file });
      await saveFile(AUDIO_FILE_KEY, file);
    }
  };

  const handleCoverImageRemoveImage = async () => {
    setCoverImage(null);
    onChange("audio", { ...data?.audio, coverImage: null });
    await deleteFile(COVER_IMAGE_KEY);
  };

  const handleAudioRemove = async () => {
    setAudioFile(null);
    onChange("audio", { ...data?.audio, audioFile: null });
    await deleteFile(AUDIO_FILE_KEY);
  };

  return (
    <Box component="form">
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upload Cover Image
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Size: 1440x1440 or 3000x3000 pixels
              </Typography>
              {coverImage ? (
                <Box position="relative">
                  <CardMedia
                    component="img"
                    height="200"
                    image={URL.createObjectURL(coverImage)}
                    alt="Cover"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  <IconButton
                    onClick={handleCoverImageRemoveImage}
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
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
                    accept="image/*"
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
                    style={{ cursor: "pointer" }}
                  >
                    <BsCloudUpload style={{ fontSize: 60 }} />
                  </Box>
                </label>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upload Audio
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                You can upload the following formats: WAV (PCM only), FLAC
              </Typography>
              {audioFile ? (
                <Box position="relative">
                  <audio controls style={{ width: "100%" }}>
                    <source
                      src={URL.createObjectURL(audioFile)}
                      type={audioFile.type}
                    />
                    Your browser does not support the audio tag.
                  </audio>
                  <IconButton
                    onClick={handleAudioRemove}
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
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
                    accept="audio/*"
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
                    style={{ cursor: "pointer" }}
                  >
                    <AudiotrackIcon style={{ fontSize: 60 }} />
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
