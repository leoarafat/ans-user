// import { useEffect, useState } from "react";
// import {
//   TextField,
//   Grid,
//   Container,
//   Typography,
//   IconButton,
//   Avatar,
//   Box,
//   CircularProgress,
//   Tabs,
//   Tab,
// } from "@mui/material";
// import { Edit, Upload } from "lucide-react";
// import toast from "react-hot-toast";
// import { useMyProfileQuery } from "@/redux/slices/admin/settingApi";
// import { imageURL } from "@/redux/api/baseApi";
// import { useEditProfilePictureMutation } from "@/redux/slices/admin/userApi";
// import PersonIcon from "@mui/icons-material/Person";

// import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
// const Profile = () => {
//   const [openEdit, setOpenEdit] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [tabIndex, setTabIndex] = useState(0);

//   const {
//     data: profileData,
//     isLoading: profileLoading,
//     refetch,
//   } = useMyProfileQuery({});
//   const initialFormValues = profileData?.data;

//   const [editProfilePicture, { isLoading, isSuccess, error }] =
//     useEditProfilePictureMutation();

//   useEffect(() => {
//     if (error) {
//       if ("data" in error) {
//         const errorData = error as any;
//         alert(errorData.data.message);
//       } else {
//         console.error("Login error:", error);
//       }
//     }
//   }, [error, isSuccess]);
//   useEffect(() => {
//     localStorage.removeItem("releaseFormData");
//     localStorage.removeItem("tracksInformation");
//   }, []);
//   if (profileLoading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   const src = profileData?.data?.image?.startsWith("https")
//     ? profileData?.data?.image
//     : `${imageURL}/${profileData?.data?.image}`;

//   const handleImageChange = async (e: any) => {
//     const file = e.target.files[0];
//     const url = URL.createObjectURL(file);
//     setImagePreview(url as any);

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await editProfilePicture(formData);

//       if (res?.data?.success === true) {
//         refetch();
//         toast.success("Profile Image Updated Successfully");
//       }
//     } catch (error: any) {
//       toast.error(error.message);
//     }
//   };

//   const handleTabChange = (event: any, newValue: any) => {
//     setTabIndex(newValue);
//   };

//   return (
//     <Container maxWidth="md">
//       <Box
//         sx={{
//           textAlign: "center",
//           padding: 4,
//           borderRadius: 2,
//           boxShadow: 3,
//           marginTop: 4,
//         }}
//       >
//         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//           <IconButton onClick={() => setOpenEdit(!openEdit)}>
//             <Edit size={20} />
//           </IconButton>
//         </Box>
//         <Box
//           sx={{
//             position: "relative",
//             width: 112,
//             height: 112,
//             margin: "0 auto",
//           }}
//         >
//           {openEdit ? (
//             <div>
//               <input
//                 onChange={handleImageChange}
//                 type="file"
//                 className="hidden"
//                 id="imageUpload"
//                 style={{ display: "none" }}
//               />
//               <label
//                 htmlFor="imageUpload"
//                 style={{
//                   position: "relative",
//                   display: "block",
//                   width: "100%",
//                   height: "100%",
//                 }}
//               >
//                 <Avatar
//                   className="cursor-pointer"
//                   src={imagePreview ? imagePreview : src}
//                   sx={{ width: 112, height: 112 }}
//                 />
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     transform: "translate(-50%, -50%)",
//                     backgroundColor: "rgba(0, 0, 0, 0.5)",
//                     borderRadius: "50%",
//                     padding: 1,
//                     cursor: "pointer",
//                   }}
//                 >
//                   <Upload color="#fff" />
//                 </Box>
//               </label>
//             </div>
//           ) : (
//             <Avatar src={src} sx={{ width: 112, height: 112 }} />
//           )}
//         </Box>

//         <Typography
//           variant="h4"
//           sx={{
//             marginTop: 2,
//             color: "#3f51b5",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           {initialFormValues?.name}
//         </Typography>
//         <Typography
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             marginTop: 1,
//           }}
//         >
//           <PersonIcon sx={{ marginRight: 1, color: "#3f51b5" }} />
//           UserId: {initialFormValues?.clientId}
//         </Typography>
//         <Typography
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             marginTop: 1,
//           }}
//         >
//           <MonetizationOnIcon sx={{ marginRight: 1, color: "#3f51b5" }} />
//           Revenue Share Rate:{" "}
//           <span style={{ color: "#4caf50", marginLeft: 4 }}>
//             {initialFormValues?.revenueRate}%
//           </span>
//         </Typography>
//       </Box>

//       <Box sx={{ width: "100%" }}>
//         <Tabs
//           value={tabIndex}
//           onChange={handleTabChange}
//           textColor="secondary"
//           indicatorColor="secondary"
//           aria-label="secondary tabs example"
//         >
//           <Tab label="Profile Info" />
//           <Tab label="Other Details" />
//         </Tabs>
//       </Box>

//       {tabIndex === 0 && (
//         <Box sx={{ marginTop: 4 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Name"
//                 defaultValue={initialFormValues?.name}
//                 fullWidth
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Email"
//                 defaultValue={initialFormValues?.email}
//                 fullWidth
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Phone Number"
//                 defaultValue={initialFormValues?.phoneNumber}
//                 fullWidth
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Address"
//                 defaultValue={initialFormValues?.address}
//                 fullWidth
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="City"
//                 defaultValue={initialFormValues?.city}
//                 fullWidth
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Country"
//                 defaultValue={initialFormValues?.country}
//                 fullWidth
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Postal Code"
//                 defaultValue={initialFormValues?.postCode}
//                 fullWidth
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//           </Grid>
//         </Box>
//       )}

//       {tabIndex === 1 && (
//         <Box sx={{ marginTop: 4 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Channel Name"
//                 defaultValue={initialFormValues?.channelName}
//                 fullWidth
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Channel URL"
//                 defaultValue={initialFormValues?.channelUrl}
//                 fullWidth
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Subscribers"
//                 defaultValue={initialFormValues?.subscribeCount}
//                 fullWidth
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Videos Count"
//                 defaultValue={initialFormValues?.videosCount}
//                 fullWidth
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Balance"
//                 defaultValue={initialFormValues?.balance}
//                 fullWidth
//                 InputProps={{ readOnly: true }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="h6">Other Documents</Typography>
//               <Box sx={{ display: "flex", flexWrap: "wrap" }}>
//                 <Box sx={{ margin: 1 }}>
//                   <Avatar
//                     src={`${imageURL}/${initialFormValues?.signature}`}
//                     alt="Signature"
//                     sx={{ width: 100, height: 100 }}
//                   />
//                   <Typography variant="caption">Signature</Typography>
//                 </Box>
//                 <Box sx={{ margin: 1 }}>
//                   <Avatar
//                     src={`${imageURL}/${initialFormValues?.nidFront}`}
//                     alt="NID Front"
//                     sx={{ width: 100, height: 100 }}
//                   />
//                   <Typography variant="caption">NID Front</Typography>
//                 </Box>
//                 <Box sx={{ margin: 1 }}>
//                   <Avatar
//                     src={`${imageURL}/${initialFormValues?.nidBack}`}
//                     alt="NID Back"
//                     sx={{ width: 100, height: 100 }}
//                   />
//                   <Typography variant="caption">NID Back</Typography>
//                 </Box>
//                 <Box sx={{ margin: 1 }}>
//                   <Avatar
//                     src={`${imageURL}/${initialFormValues?.copyrightNoticeImage}`}
//                     alt="Copyright Notice"
//                     sx={{ width: 100, height: 100 }}
//                   />
//                   <Typography variant="caption">Copyright Notice</Typography>
//                 </Box>
//                 <Box sx={{ margin: 1 }}>
//                   <Avatar
//                     src={`${imageURL}/${initialFormValues?.dashboardScreenShot}`}
//                     alt="Dashboard Screenshot"
//                     sx={{ width: 100, height: 100 }}
//                   />
//                   <Typography variant="caption">
//                     Dashboard Screenshot
//                   </Typography>
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default Profile;
