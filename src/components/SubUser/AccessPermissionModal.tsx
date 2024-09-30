// import React, { useState } from "react";
// import {
//   Modal,
//   Box,
//   Typography,
//   Checkbox,
//   Button,
//   FormGroup,
//   FormControlLabel,
//   Grid,
//   Divider,
// } from "@mui/material";
// import { useSingleSubUserQuery } from "@/redux/slices/admin/settingApi";

// interface PermissionModalProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   userId: string | null;
//   name: string | null;
//   onSubmit: (selectedPermissions: string[]) => void;
//   permissionLoading: any;
// }

// const style = {
//   position: "absolute" as const,
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "600px",
//   maxHeight: "80vh",
//   bgcolor: "background.paper",
//   borderRadius: "10px",
//   boxShadow: 24,
//   p: 4,
//   outline: "none",
//   overflowY: "auto",
// };

// const buttonStyle = {
//   width: "100%",
//   padding: "10px",
//   marginTop: "16px",
//   borderRadius: "20px",
// };

// const permissionsList = [
//   { category: "News", permissions: ["News"] },
//   {
//     category: "New Release",
//     permissions: ["Video Release", "One release", "Multiple releases"],
//   },
//   {
//     category: "Catalog Music",
//     permissions: [
//       "All Releases Songs",
//       "Success Release Songs",
//       "Pending Songs",
//       "Correction Requested Songs",
//     ],
//   },
//   {
//     category: "Catalog Video",
//     permissions: [
//       "All Releases",
//       "Success Release",
//       "Pending",
//       "Correction Requested",
//     ],
//   },
//   {
//     category: "Analytics",
//     permissions: ["Financial", "Store & Country"],
//   },
//   {
//     category: "Promotion",
//     permissions: ["All Products (for all artists, labels, channels)"],
//   },
//   {
//     category: "Financial",
//     permissions: ["Financial reports", "Payment & Operation"],
//   },
//   {
//     category: "Legal",
//     permissions: ["Legal"],
//   },
//   {
//     category: "Payout Account",
//     permissions: ["Payout Account"],
//   },
//   {
//     category: "Change Password",
//     permissions: ["Change Password"],
//   },
//   {
//     category: "Help",
//     permissions: ["Help"],
//   },
// ];

// const PermissionModal: React.FC<PermissionModalProps> = ({
//   open,
//   setOpen,
//   userId,
//   name,
//   onSubmit,
//   permissionLoading,
// }) => {
//   const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
//   const { data: userData } = useSingleSubUserQuery(userId);
//   const myProfile = userData?.data;
//   console.log(myProfile);
//   const handleCheckboxChange = (permission: string) => {
//     setSelectedPermissions((prev) =>
//       prev.includes(permission)
//         ? prev.filter((p) => p !== permission)
//         : [...prev, permission]
//     );
//   };

//   const handleSubmit = () => {
//     onSubmit(selectedPermissions);
//   };

//   return (
//     <Modal open={open} onClose={() => setOpen(false)}>
//       <Box sx={style}>
//         <Typography
//           variant="h5"
//           component="h2"
//           gutterBottom
//           align="center"
//           fontWeight="bold"
//         >
//           Assign Permissions
//         </Typography>
//         <Typography
//           variant="subtitle1"
//           gutterBottom
//           align="center"
//           color="textSecondary"
//         >
//           Select permissions for <strong>User {name}</strong>
//         </Typography>
//         <Divider sx={{ marginY: 2 }} />
//         <Grid container spacing={2}>
//           {permissionsList.map((group) => (
//             <Grid item xs={12} sm={6} key={group.category}>
//               <Typography variant="h6" gutterBottom>
//                 {group.category}
//               </Typography>
//               <FormGroup>
//                 {group.permissions.map((permission) => (
//                   <FormControlLabel
//                     key={permission}
//                     control={
//                       <Checkbox
//                         checked={selectedPermissions.includes(permission)}
//                         onChange={() => handleCheckboxChange(permission)}
//                       />
//                     }
//                     label={permission}
//                   />
//                 ))}
//               </FormGroup>
//             </Grid>
//           ))}
//         </Grid>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={buttonStyle}
//           onClick={handleSubmit}
//         >
//           {permissionLoading ? "Please wait..." : "Save Permissions"}
//         </Button>
//       </Box>
//     </Modal>
//   );
// };

// export default PermissionModal;
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Checkbox,
  Button,
  FormGroup,
  FormControlLabel,
  Grid,
  Divider,
} from "@mui/material";
import { useSingleSubUserQuery } from "@/redux/slices/admin/settingApi";
import { permissionsList } from "./permission";

interface PermissionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  userId: string | null;
  name: string | null;
  onSubmit: (selectedPermissions: string[]) => void;
  permissionLoading: any;
}

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  maxHeight: "80vh",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  outline: "none",
  overflowY: "auto",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "16px",
  borderRadius: "20px",
};
//!
// const permissionsList = [
//   // { category: "News", permissions: ["News"] },
//   {
//     category: "New Release",
//     permissions: ["Video Release", "One release", "Multiple releases"],
//   },
//   {
//     category: "Catalog Music",
//     permissions: [
//       "All Releases Songs",
//       "Success Release Songs",
//       "Pending Songs",
//       "Correction Requested Songs",
//     ],
//   },
//   {
//     category: "Catalog Video",
//     permissions: [
//       "All Releases",
//       "Success Release",
//       "Pending",
//       "Correction Requested",
//     ],
//   },
//   {
//     category: "Analytics",
//     permissions: ["Financial", "Store & Country"],
//   },
//   {
//     category: "Promotion",
//     permissions: ["All Products (for all artists, labels, channels)"],
//   },
//   {
//     category: "Financial",
//     permissions: ["Financial reports", "Payment & Operation"],
//   },
//   {
//     category: "Legal",
//     permissions: ["Legal"],
//   },
//   {
//     category: "Payout Account",
//     permissions: ["Payout Account"],
//   },
//   {
//     category: "Change Password",
//     permissions: ["Change Password"],
//   },
//   {
//     category: "Help",
//     permissions: ["Help"],
//   },
// ];
//!

const PermissionModal: React.FC<PermissionModalProps> = ({
  open,
  setOpen,
  userId,
  name,
  onSubmit,
  permissionLoading,
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const { data: userData } = useSingleSubUserQuery(userId);
  const myProfile = userData?.data;

  useEffect(() => {
    if (myProfile?.permission) {
      setSelectedPermissions(myProfile.permission);
    }
  }, [myProfile]);

  const handleCheckboxChange = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedPermissions);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          align="center"
          fontWeight="bold"
        >
          Assign Permissions
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          align="center"
          color="textSecondary"
        >
          Select permissions for <strong>User {name}</strong>
        </Typography>
        <Divider sx={{ marginY: 2 }} />
        <Grid container spacing={2}>
          {permissionsList?.map((group) => (
            <Grid item xs={12} sm={6} key={group.category}>
              <Typography variant="h6" gutterBottom>
                {group.category}
              </Typography>
              <FormGroup>
                {group.permissions.map((permission) => (
                  <FormControlLabel
                    key={permission}
                    control={
                      <Checkbox
                        checked={selectedPermissions.includes(permission)}
                        onChange={() => handleCheckboxChange(permission)}
                      />
                    }
                    label={permission}
                  />
                ))}
              </FormGroup>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="primary"
          sx={buttonStyle}
          onClick={handleSubmit}
        >
          {permissionLoading ? "Please wait..." : "Save Permissions"}
        </Button>
      </Box>
    </Modal>
  );
};

export default PermissionModal;
