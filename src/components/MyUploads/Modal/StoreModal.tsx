import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { useGetStoredSongQuery } from "@/redux/slices/myUploads/myUploadsApi";
import Loader from "@/utils/Loader";
import { imageURL } from "@/redux/api/baseApi";

interface StoreModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedAlbum: any;
}

const StoreModal: React.FC<StoreModalProps> = ({
  open,
  setOpen,
  selectedAlbum,
}) => {
  const { data: storeData, isLoading } = useGetStoredSongQuery(
    selectedAlbum?._id
  );
  const handleCancel = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
  };
  if (isLoading) {
    return <Loader />;
  }
  const staticStores = storeData?.data;

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Store Details</DialogTitle>
      <DialogContent>
        <Paper sx={{ padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6">Store Details</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Store Name</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Link</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {staticStores?.map((store: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{store?.storeId?.title}</TableCell>
                    <TableCell>
                      <img
                        src={`${store?.storeId?.image}`}
                        alt={store?.storeId?.title}
                        style={{ width: 60, height: 60, borderRadius: "50%" }}
                      />
                    </TableCell>
                    <TableCell
                      style={{ whiteSpace: "nowrap", cursor: "pointer" }}
                    >
                      {" "}
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: "bold",

                          color:
                            store?.storeStatus === "Delivered"
                              ? "green"
                              : store?.storeStatus === "Pending"
                              ? "blue"
                              : "red",
                        }}
                      >
                        {store?.storeStatus}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <a
                        href={store?.storeId?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {store?.storeId?.link}
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StoreModal;
