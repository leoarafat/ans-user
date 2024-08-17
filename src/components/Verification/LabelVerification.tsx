// /* eslint-disable @typescript-eslint/ban-ts-comment */
// import { imageURL } from "@/redux/api/baseApi";
// import { useProfileQuery } from "@/redux/slices/admin/userApi";
// import { Grid, TextField } from "@material-ui/core";
// import { useCallback, useEffect, useState } from "react";
// import { BsCloudUpload } from "react-icons/bs";
// import { MdClose } from "react-icons/md";

// const LabelVerification = ({ data, onChange }: any) => {
//   const [dashboardImage, setDashboardImage] = useState(null);
//   const [copyRightImage, setCoyRightImage] = useState(null);

//   const { data: profileData } = useProfileQuery({});
//   const [initialSetupDone, setInitialSetupDone] = useState(false);

//   useEffect(() => {
//     if (profileData?.data && !initialSetupDone) {
//       const initialProfileData = {
//         videosCount: profileData.data.videosCount || "",
//         subscribeCount: profileData.data.subscribeCount || "",
//         channelName: profileData.data.channelName || "",
//         channelUrl: profileData.data.channelUrl || "",
//         copyRightImage: profileData.data.copyrightNoticeImage || null,
//         dashboardImage: profileData.data.dashboardScreenShot || null,
//       };

//       onChange("label", initialProfileData);
//       setDashboardImage(profileData.data.dashboardScreenShot || null);
//       setCoyRightImage(profileData.data.copyrightNoticeImage || null);

//       setInitialSetupDone(true);
//     }
//   }, [profileData, initialSetupDone, onChange]);

//   const handleChange = useCallback(
//     (e: any) => {
//       const { name, value } = e.target;
//       onChange("label", { ...data.label, [name]: value });
//     },
//     [onChange, data.label]
//   );
//   const handleDashboardImageImageUpload = (event: any) => {
//     const file = event.target.files[0];

//     setDashboardImage(file as any);
//     onChange("label", { ...data?.label, dashboardImage: file });
//   };

//   const handleCopyRightImage = (event: any) => {
//     const file = event.target.files[0];
//     setCoyRightImage(file as any);
//     onChange("label", { ...data?.label, copyRightImage: file });
//   };

//   const handleDashboardRemoveImage = () => {
//     setDashboardImage(null);
//     onChange("label", { ...data?.label, dashboardImage: null });
//   };

//   const handleCopyRightRemoveImage = () => {
//     setCoyRightImage(null);
//     onChange("label", { ...data?.label, copyRightImage: null });
//   };

//   return (
//     <form>
//       <Grid container spacing={3}>
//         <div className="flex justify-around items-center w-full">
//           {/* Dashboard Image Uploader */}
//           <div className="image_upload flex items-center justify-center flex-col p-3">
//             <h4 className="mb-2 text-sm">Upload Youtube Dashboard Image</h4>
//             {dashboardImage || profileData?.data?.dashboardScreenShot ? (
//               <div className="relative w-3/4">
//                 {typeof dashboardImage === "object" ? (
//                   <img
//                     //@ts-ignore
//                     src={
//                       dashboardImage
//                         ? URL.createObjectURL(dashboardImage)
//                         : null
//                     }
//                     alt="Dashboard Picture"
//                     className="w-[350px] h-[200px]"
//                   />
//                 ) : (
//                   <img
//                     src={`${imageURL}${profileData?.data?.dashboardScreenShot}`}
//                     alt="Dashboard Picture"
//                     className="w-[350px] h-[200px]"
//                   />
//                 )}
//                 <button
//                   type="button"
//                   className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                   onClick={handleDashboardRemoveImage}
//                 >
//                   <MdClose />
//                 </button>
//               </div>
//             ) : (
//               <label
//                 htmlFor="dashboard_upload"
//                 className="upload w-[350px] hover:bg-green-100 transition flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer"
//               >
//                 <input
//                   id="dashboard_upload"
//                   type="file"
//                   accept="image/*"
//                   name="dashboardImage"
//                   style={{ display: "none" }}
//                   onChange={handleDashboardImageImageUpload}
//                 />
//                 <BsCloudUpload />
//               </label>
//             )}
//           </div>

//           {/* Copyright Image Uploader */}
//           <div className="image_upload flex items-center justify-center flex-col p-3">
//             <h4 className="mb-2 text-sm">Upload Youtube Copyright Image</h4>
//             {copyRightImage || profileData?.data?.copyrightNoticeImage ? (
//               <div className="relative w-3/4">
//                 {typeof copyRightImage === "object" ? (
//                   <img
//                     //@ts-ignore
//                     src={
//                       copyRightImage
//                         ? URL.createObjectURL(copyRightImage)
//                         : null
//                     }
//                     alt="Copyright Image"
//                     className="w-[350px] h-[200px]"
//                   />
//                 ) : (
//                   <img
//                     src={`${imageURL}${profileData?.data?.copyrightNoticeImage}`}
//                     alt="Copyright Image"
//                     className="w-[350px] h-[200px]"
//                   />
//                 )}
//                 <button
//                   type="button"
//                   className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                   onClick={handleCopyRightRemoveImage}
//                 >
//                   <MdClose />
//                 </button>
//               </div>
//             ) : (
//               <label
//                 htmlFor="copyright"
//                 className="upload w-[350px] hover:bg-green-100 transition flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer"
//               >
//                 <input
//                   id="copyright"
//                   type="file"
//                   accept="image/*"
//                   name="copyRightImage"
//                   style={{ display: "none" }}
//                   onChange={handleCopyRightImage}
//                   required
//                 />
//                 <BsCloudUpload />
//               </label>
//             )}
//           </div>
//         </div>
//         <Grid item xs={6}>
//           <TextField
//             name="channelName"
//             label="Channel Name"
//             variant="outlined"
//             fullWidth
//             value={data?.label?.channelName || ""}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             name="channelUrl"
//             label="Chanel URL"
//             variant="outlined"
//             fullWidth
//             value={data?.label.channelUrl || ""}
//             onChange={handleChange}
//           />
//         </Grid>

//         <Grid item xs={6}>
//           <TextField
//             name="subscribeCount"
//             label="Subscribe Count"
//             variant="outlined"
//             type="number"
//             fullWidth
//             value={data?.label?.subscribeCount || ""}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             name="videosCount"
//             label="Videos Count"
//             variant="outlined"
//             type="number"
//             fullWidth
//             value={data?.label?.videosCount || ""}
//             onChange={handleChange}
//           />
//         </Grid>
//       </Grid>
//     </form>
//   );
// };

// export default LabelVerification;
import { imageURL } from "@/redux/api/baseApi";
import { useProfileQuery } from "@/redux/slices/admin/userApi";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  TextField,
  Typography,
} from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const LabelVerification = ({ data, onChange }: any) => {
  const [dashboardImage, setDashboardImage] = useState<File | null>(null);
  const [copyRightImage, setCopyRightImage] = useState<File | null>(null);

  const { data: profileData } = useProfileQuery({});
  const [initialSetupDone, setInitialSetupDone] = useState(false);

  useEffect(() => {
    if (profileData?.data && !initialSetupDone) {
      const initialProfileData = {
        videosCount: profileData.data.videosCount || "",
        subscribeCount: profileData.data.subscribeCount || "",
        channelName: profileData.data.channelName || "",
        channelUrl: profileData.data.channelUrl || "",
        copyRightImage: profileData.data.copyrightNoticeImage || null,
        dashboardImage: profileData.data.dashboardScreenShot || null,
      };

      onChange("label", initialProfileData);
      setDashboardImage(profileData.data.dashboardScreenShot || null);
      setCopyRightImage(profileData.data.copyrightNoticeImage || null);

      setInitialSetupDone(true);
    }
  }, [profileData, initialSetupDone, onChange]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      onChange("label", { ...data.label, [name]: value });
    },
    [onChange, data.label]
  );

  const handleImageUpload =
    (setter: React.Dispatch<React.SetStateAction<File | null>>, name: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      setter(file);
      onChange("label", { ...data.label, [name]: file });
    };

  const handleRemoveImage =
    (setter: React.Dispatch<React.SetStateAction<File | null>>, name: string) =>
    () => {
      setter(null);
      onChange("label", { ...data.label, [name]: null });
    };

  return (
    <form>
      <Grid container spacing={3}>
        {/* Dashboard Image Uploader */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              border: "1px dashed #ccc",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Upload Youtube Dashboard Image
            </Typography>
            {dashboardImage || profileData?.data?.dashboardScreenShot ? (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "350px",
                  height: "200px",
                  mb: 2,
                }}
              >
                {typeof dashboardImage === "object" ? (
                  <img
                    src={
                      dashboardImage
                        ? URL.createObjectURL(dashboardImage)
                        : `${imageURL}${profileData?.data?.dashboardScreenShot}`
                    }
                    alt="Dashboard"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <img
                    src={`${imageURL}${profileData?.data?.dashboardScreenShot}`}
                    alt="Copyright Image"
                    // className="w-[350px] h-[200px]"
                  />
                )}
                <IconButton
                  onClick={handleRemoveImage(
                    setDashboardImage,
                    "dashboardImage"
                  )}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                  }}
                >
                  <MdClose color="red" />
                </IconButton>
              </Box>
            ) : (
              <label
                htmlFor="dashboard_upload"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "2px dashed #007bff",
                }}
              >
                <Input
                  id="dashboard_upload"
                  type="file"
                  accept="image/*"
                  name="dashboardImage"
                  style={{ display: "none" }}
                  onChange={handleImageUpload(
                    setDashboardImage,
                    "dashboardImage"
                  )}
                />
                <BsCloudUpload size={48} color="#007bff" />
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  Click or Drag to upload
                </Typography>
              </label>
            )}
          </Box>
        </Grid>

        {/* Copyright Image Uploader */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
              border: "1px dashed #ccc",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Upload Youtube Copyright Image
            </Typography>
            {copyRightImage || profileData?.data?.copyrightNoticeImage ? (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "350px",
                  height: "200px",
                  mb: 2,
                }}
              >
                {/* <img
                  src={
                    copyRightImage
                      ? URL.createObjectURL(copyRightImage)
                      : `${imageURL}${profileData?.data?.copyrightNoticeImage}`
                  }
                  alt="Copyright"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                /> */}
                {typeof copyRightImage === "object" ? (
                  <img
                    src={
                      copyRightImage
                        ? URL.createObjectURL(copyRightImage)
                        : `${imageURL}${profileData?.data?.copyrightNoticeImage}`
                    }
                    alt="Dashboard"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <img
                    src={`${imageURL}${profileData?.data?.copyrightNoticeImage}`}
                    alt="Copyright Image"
                    // className="w-[350px] h-[200px]"
                  />
                )}
                <IconButton
                  onClick={handleRemoveImage(
                    setCopyRightImage,
                    "copyRightImage"
                  )}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                  }}
                >
                  <MdClose color="red" />
                </IconButton>
              </Box>
            ) : (
              <label
                htmlFor="copyright_upload"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "2px dashed #007bff",
                }}
              >
                <Input
                  id="copyright_upload"
                  type="file"
                  accept="image/*"
                  name="copyRightImage"
                  style={{ display: "none" }}
                  onChange={handleImageUpload(
                    setCopyRightImage,
                    "copyRightImage"
                  )}
                />
                <BsCloudUpload size={48} color="#007bff" />
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ mt: 2 }}
                >
                  Click or Drag to upload
                </Typography>
              </label>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            name="channelName"
            label="Channel Name"
            variant="outlined"
            fullWidth
            value={data?.label?.channelName || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            name="channelUrl"
            label="Channel URL"
            variant="outlined"
            fullWidth
            value={data?.label?.channelUrl || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            name="subscribeCount"
            label="Subscribe Count"
            variant="outlined"
            type="number"
            fullWidth
            value={data?.label?.subscribeCount || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            name="videosCount"
            label="Videos Count"
            variant="outlined"
            type="number"
            fullWidth
            value={data?.label?.videosCount || ""}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default LabelVerification;
