// import { useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   IconButton,
//   TablePagination,
//   TableSortLabel,
//   Link,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";
// import DeleteIcon from "@mui/icons-material/Delete";

// import Loader from "@/utils/Loader";
// import toast from "react-hot-toast";
// import AddLabelModal from "./AddLabelModa";

// const mockLabels = [
//   {
//     labelId: "1",
//     labelName: "Label One",
//     youtubeChannel: "Channel A",
//     youtubeUrl: "http://youtube.com/a",
//     websiteUrl: "http://example.com/a",
//     twitterUrl: "http://twitter.com/a",
//     approvedStatus: "Approved",
//   },
//   {
//     labelId: "2",
//     labelName: "Label Two",
//     youtubeChannel: "Channel B",
//     youtubeUrl: "http://youtube.com/b",
//     websiteUrl: "http://example.com/b",
//     twitterUrl: "http://twitter.com/b",
//     approvedStatus: "Pending",
//   },
//   {
//     labelId: "3",
//     labelName: "Label Three",
//     youtubeChannel: "Channel C",
//     youtubeUrl: "http://youtube.com/c",
//     websiteUrl: "http://example.com/c",
//     twitterUrl: "http://twitter.com/c",
//     approvedStatus: "Approved",
//   },
//   // Add more mock data as needed
// ];

// const LabelManage = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [open, setOpen] = useState(false);
//   const [page, setPage] = useState(0);

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const handlePageChange = (
//     event: React.MouseEvent<HTMLButtonElement> | null,
//     newPage: number
//   ) => {
//     setPage(newPage);
//   };

//   const handleRowsPerPageChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const showModal = () => {
//     setOpen(true);
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       // Simulate deletion with mock data
//       toast.success("Label Deleted");
//     } catch (error: any) {
//       toast.error(error?.message);
//     }
//   };

//   const filteredLabelData = mockLabels.filter((row) =>
//     row.labelName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         height: "100vh",
//         padding: "24px",
//         backgroundColor: "#f4f4f4",
//       }}
//     >
//       <Typography
//         variant="h3"
//         component="h1"
//         sx={{
//           fontWeight: "bold",
//           color: "#333",
//           marginBottom: "20px",
//           textAlign: "center",
//         }}
//       >
//         Label Management
//       </Typography>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "20px",
//           padding: "16px",
//           backgroundColor: "#fff",
//           borderRadius: "8px",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         <TextField
//           label="Search Labels"
//           variant="outlined"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           InputProps={{
//             startAdornment: <SearchIcon sx={{ color: "#888" }} />,
//             sx: {
//               "& .MuiInputBase-input": {
//                 padding: "10px",
//               },
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: "8px",
//                 borderColor: "#ddd",
//                 "&:hover fieldset": {
//                   borderColor: "#007BFF",
//                 },
//                 "&.Mui-focused fieldset": {
//                   borderColor: "#007BFF",
//                 },
//               },
//             },
//           }}
//           sx={{ flexGrow: 1, marginRight: "16px" }}
//         />
//         <Button
//           onClick={showModal}
//           variant="contained"
//           color="primary"
//           startIcon={<AddIcon />}
//           sx={{
//             backgroundColor: "#007BFF",
//             "&:hover": {
//               backgroundColor: "#0056b3",
//             },
//           }}
//         >
//           New Label
//         </Button>
//       </Box>
//       <TableContainer
//         component={Paper}
//         sx={{
//           flex: 1,
//           borderRadius: "8px",
//           boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//           marginTop: "16px",
//         }}
//       >
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>ID</TableCell>
//               <TableCell>
//                 <TableSortLabel>Label Name</TableSortLabel>
//               </TableCell>
//               <TableCell>Youtube Channel</TableCell>
//               <TableCell>Youtube URL</TableCell>
//               <TableCell>Website URL</TableCell>
//               <TableCell>Twitter URL</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredLabelData
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => (
//                 <TableRow key={row.labelId}>
//                   <TableCell>{row.labelId}</TableCell>
//                   <TableCell>{row.labelName}</TableCell>
//                   <TableCell>{row.youtubeChannel}</TableCell>
//                   <TableCell>
//                     <Link
//                       href={row.youtubeUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       sx={{ color: "#007BFF", textDecoration: "none" }}
//                     >
//                       {row.youtubeUrl}
//                     </Link>
//                   </TableCell>
//                   <TableCell>
//                     <Link
//                       href={row.websiteUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       sx={{ color: "#007BFF", textDecoration: "none" }}
//                     >
//                       {row.websiteUrl}
//                     </Link>
//                   </TableCell>
//                   <TableCell>
//                     <Link
//                       href={row.twitterUrl}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       sx={{ color: "#007BFF", textDecoration: "none" }}
//                     >
//                       {row.twitterUrl}
//                     </Link>
//                   </TableCell>
//                   <TableCell>{row.approvedStatus}</TableCell>
//                   <TableCell>
//                     <IconButton
//                       color="error"
//                       onClick={() => handleDelete(row.labelId)}
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "flex-end",
//           marginTop: "16px",
//         }}
//       >
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={filteredLabelData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//           sx={{ borderRadius: "8px" }}
//         />
//       </Box>
//       <AddLabelModal open={open} setOpen={setOpen} />
//     </Box>
//   );
// };

// export default LabelManage;
import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
  TablePagination,
  TableSortLabel,
  Link,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "@/utils/Loader";
import toast from "react-hot-toast";

import {
  useDeleteLabelMutation,
  useGetLabelsQuery,
} from "@/redux/slices/ArtistAndLabel/artistLabelApi";
import AddLabelModal from "./AddLabelModa";

const LabelManage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const { data: labelsData, isLoading } = useGetLabelsQuery({});
  const [deleteLabel] = useDeleteLabelMutation();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteLabel(id);
      if (res?.data?.success === true) {
        toast.success("Label Deleted");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  // Filter labels based on search query
  const filteredLabelData =
    labelsData?.data?.data?.filter((row: any) =>
      row.labelName.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "24px",
        backgroundColor: "#f4f4f4",
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: "bold",
          color: "#333",
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        Label Management
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          padding: "16px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TextField
          label="Search Labels"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: "#888" }} />,
            sx: {
              "& .MuiInputBase-input": {
                padding: "10px",
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                borderColor: "#ddd",
                "&:hover fieldset": {
                  borderColor: "#007BFF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#007BFF",
                },
              },
            },
          }}
          sx={{ flexGrow: 1, marginRight: "16px" }}
        />
        <Button
          onClick={showModal}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: "#007BFF",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          New Label
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          flex: 1,
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginTop: "16px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>
                <TableSortLabel>Label Name</TableSortLabel>
              </TableCell>
              <TableCell>Youtube Channel</TableCell>
              <TableCell>Youtube URL</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLabelData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <TableRow key={row.labelId}>
                  <TableCell>{row.labelId}</TableCell>
                  <TableCell>{row.labelName}</TableCell>
                  <TableCell>{row.youtubeChannel}</TableCell>
                  <TableCell>
                    <Link
                      href={row.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ color: "#007BFF", textDecoration: "none" }}
                    >
                      {row.youtubeUrl}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(row.labelId)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "16px",
        }}
      >
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredLabelData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          sx={{ borderRadius: "8px" }}
        />
      </Box>
      <AddLabelModal open={open} setOpen={setOpen} />
    </Box>
  );
};

export default LabelManage;
