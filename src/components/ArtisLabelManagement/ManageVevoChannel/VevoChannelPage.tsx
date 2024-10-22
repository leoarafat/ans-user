/* eslint-disable @typescript-eslint/ban-ts-comment */

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  TextField,
  Button,
  TableSortLabel,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import {
  useDeleteChannelMutation,
  useEditChannelMutation,
  useGetChannelsQuery,
} from "@/redux/slices/ArtistAndLabel/artistLabelApi";
import Loader from "@/utils/Loader";
import toast from "react-hot-toast";
import { Pagination } from "@mui/material";
import AddVevoChannelModal from "./ManageVevoChannelModal";

const VevoChannelManage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [editMode, setEditMode] = useState<any>({});
  const [editRowData, setEditRowData] = useState<any>({});
  const { data: artistsData, isLoading } = useGetChannelsQuery({});
  const [deleteArtist] = useDeleteChannelMutation();
  const [updateArtist] = useEditChannelMutation();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleEditClick = (id: string, rowData: any) => {
    setEditMode({ ...editMode, [id]: true });
    setEditRowData(rowData);
  };

  const handleSaveClick = async (id: string) => {
    try {
      const res = await updateArtist({ id, ...editRowData });

      if (res?.data?.success === true) {
        toast.success("Channel Updated");
        setEditMode({ ...editMode, [id]: false });
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEditRowData({ ...editRowData, [field]: e.target.value });
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteArtist(id);

      if (res?.data?.success === true) {
        toast.success("Channel Deleted");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };
  //@ts-ignore
  const artistData = artistsData?.data?.data;

  if (isLoading) {
    return <Loader />;
  }

  const filteredArtistData = artistData?.filter((row: any) =>
    row.channelName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
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
        VEVO Channel Management
      </Typography>
      {/* <Grid container spacing={2} style={{ marginBottom: "20px" }}> */}
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
          New Channel
        </Button>
      </Box>
      {/* </Grid> */}
      <TableContainer component={Paper} style={{ borderRadius: "8px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel>Channel Name</TableSortLabel>
              </TableCell>
              <TableCell>Instagram ID</TableCell>
              <TableCell>Spotify ID</TableCell>
              <TableCell>Apple ID</TableCell>
              <TableCell>Facebook URL</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredArtistData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>
                    {editMode[row._id] ? (
                      <TextField
                        value={editRowData.channelName}
                        onChange={(e: any) =>
                          handleInputChange(e, "channelName")
                        }
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      row?.channelName
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[row._id] ? (
                      <TextField
                        value={editRowData.channelInstagramId}
                        onChange={(e: any) =>
                          handleInputChange(e, "channelInstagramId")
                        }
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      row?.channelInstagramId?.slice(0, 15)
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[row._id] ? (
                      <TextField
                        value={editRowData.channelSpotifyId}
                        onChange={(e: any) =>
                          handleInputChange(e, "channelSpotifyId")
                        }
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      row?.channelSpotifyId?.slice(0, 15)
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[row._id] ? (
                      <TextField
                        value={editRowData.channelAppleId}
                        onChange={(e: any) =>
                          handleInputChange(e, "channelAppleId")
                        }
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      row?.channelAppleId?.slice(0, 15)
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[row._id] ? (
                      <TextField
                        value={editRowData.channelFacebookId}
                        onChange={(e: any) =>
                          handleInputChange(e, "channelFacebookId")
                        }
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      row?.channelFacebookId?.slice(0, 15)
                    )}
                  </TableCell>
                  <TableCell>{row?.isApproved}</TableCell>
                  <TableCell>
                    {editMode[row._id] ? (
                      <IconButton
                        aria-label="save"
                        onClick={() => handleSaveClick(row._id)}
                        color="primary"
                      >
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditClick(row._id, row)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => handleDelete(row?._id)}
                      aria-label="delete"
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredArtistData?.length / rowsPerPage)}
        page={page + 1}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      />
      <AddVevoChannelModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default VevoChannelManage;
