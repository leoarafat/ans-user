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
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import AddArtistModal from "./AddArtistModal";
import {
  useDeleteArtistMutation,
  useGetArtistsQuery,
  useEditArtistsMutation,
} from "@/redux/slices/ArtistAndLabel/artistLabelApi";
import Loader from "@/utils/Loader";
import toast from "react-hot-toast";

const ArtistManage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [editMode, setEditMode] = useState<any>({});
  const [editRowData, setEditRowData] = useState<any>({});
  const { data: artistsData, isLoading } = useGetArtistsQuery({});
  const [deleteArtist] = useDeleteArtistMutation();
  const [updateArtist] = useEditArtistsMutation();

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
        toast.success("Artist Updated");
        setEditMode({ ...editMode, [id]: false });
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  const handleInputChange = (e: any, field: string) => {
    setEditRowData({ ...editRowData, [field]: e.target.value });
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteArtist(id);

      if (res?.data?.success === true) {
        toast.success("Artist Deleted");
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
    row.primaryArtistName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Artist Manage
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            //@ts-ignore
            startAdornment: <SearchIcon position="start" />,
          }}
        />
        <Button
          onClick={showModal}
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Add Artist
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>
                <TableSortLabel>Name</TableSortLabel>
              </TableCell>
              <TableCell>Instagram ID</TableCell>
              <TableCell>Spotify ID</TableCell>
              <TableCell>Apple ID</TableCell>
              <TableCell>Facebook URL</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredArtistData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{row?.primaryArtistId}</TableCell>
                  <TableCell>
                    {editMode[row._id] ? (
                      <TextField
                        value={editRowData.primaryArtistName}
                        onChange={(e) =>
                          handleInputChange(e, "primaryArtistName")
                        }
                      />
                    ) : (
                      row?.primaryArtistName
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[row._id] ? (
                      <TextField
                        value={editRowData.primaryArtistInstagramId}
                        onChange={(e) =>
                          handleInputChange(e, "primaryArtistInstagramId")
                        }
                      />
                    ) : (
                      row?.primaryArtistInstagramId?.slice(0, 15)
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[row._id] ? (
                      <TextField
                        value={editRowData.primaryArtistSpotifyId}
                        onChange={(e) =>
                          handleInputChange(e, "primaryArtistSpotifyId")
                        }
                      />
                    ) : (
                      row?.primaryArtistSpotifyId?.slice(0, 15)
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[row._id] ? (
                      <TextField
                        value={editRowData.primaryArtistAppleId}
                        onChange={(e) =>
                          handleInputChange(e, "primaryArtistAppleId")
                        }
                      />
                    ) : (
                      row?.primaryArtistAppleId?.slice(0, 15)
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[row._id] ? (
                      <TextField
                        value={editRowData.primaryArtistFacebookId}
                        onChange={(e) =>
                          handleInputChange(e, "primaryArtistFacebookId")
                        }
                      />
                    ) : (
                      row?.primaryArtistFacebookId?.slice(0, 15)
                    )}
                  </TableCell>
                  <TableCell>
                    {editMode[row._id] ? (
                      <IconButton
                        aria-label="save"
                        onClick={() => handleSaveClick(row._id)}
                      >
                        <SaveIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditClick(row._id, row)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => handleDelete(row?._id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredArtistData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <AddArtistModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default ArtistManage;
