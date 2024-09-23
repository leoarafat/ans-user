/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useDeleteAdminMutation } from "@/redux/slices/admin/adminManageApi";

import toast from "react-hot-toast";
import { formatDate } from "@/utils/formatedDate";
import AddSubUserModal from "./AddSubUserModal";
import { useMySubUserQuery } from "@/redux/slices/admin/userApi";
import { ChevronRight } from "lucide-react";
import PermissionModal from "./AccessPermissionModal";

const SubUserPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const { data: subUserData } = useMySubUserQuery({});
  //   const [deleteAdmin, { isLoading: deleteLoading }] = useDeleteAdminMutation();

  const [permissionModalOpen, setPermissionModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

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

  //   const handleDelete = async (id: string) => {
  //     try {
  //       const res = await deleteAdmin(id);
  //       if (res?.data?.success === true) {
  //         toast.success("Admin Deleted Successfully");
  //       } else {
  //         //@ts-ignore
  //         toast.error(res?.error?.data?.message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  const handlePermission = (id: string, name: string) => {
    setSelectedUserId(id);
    setSelectedUserName(name);
    setPermissionModalOpen(true);
  };

  const handlePermissionSubmit = (selectedPermissions: string[]) => {
    console.log(
      "Selected Permissions for User:",
      selectedUserId,
      selectedPermissions
    );
    // Handle submission logic here (API calls, state updates, etc.)
    toast.success("Permissions updated successfully!");
  };

  const filteredLabelData = subUserData?.data?.filter((row: { name: string }) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center">
        <Typography variant="h4" component="h1" gutterBottom>
          Sub User Management
        </Typography>
        <span className="text-orange-700">
          The permission feature is currently unavailable. We are actively
          working to resolve this feature.
        </span>
      </div>
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
          Add Sub User
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>
                <TableSortLabel>name</TableSortLabel>
              </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Create At</TableCell>
              {/* <TableCell>Delete</TableCell> */}
              <TableCell>Permission</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLabelData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{row._id?.slice(0, 6)}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phoneNumber}</TableCell>
                  <TableCell>{formatDate(row.createdAt)}</TableCell>
                  {/* <TableCell>
                    <IconButton
                      onClick={() => handleDelete(row?._id)}
                      aria-label="delete"
                    >
                      {deleteLoading ? "Deleting" : <DeleteIcon />}
                    </IconButton>
                  </TableCell> */}
                  <TableCell>
                    <IconButton
                      onClick={() => handlePermission(row?._id, row?.name)}
                      aria-label="permission"
                    >
                      <ChevronRight />
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
        count={filteredLabelData?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
      <AddSubUserModal open={open} setOpen={setOpen} />
      {/* Include PermissionModal and pass necessary props */}
      <PermissionModal
        open={permissionModalOpen}
        setOpen={setPermissionModalOpen}
        userId={selectedUserId}
        name={selectedUserName}
        onSubmit={handlePermissionSubmit}
      />
    </div>
  );
};

export default SubUserPage;
