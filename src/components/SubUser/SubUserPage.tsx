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
  CircularProgress, // Import CircularProgress
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import toast from "react-hot-toast";
import { formatDate } from "@/utils/formatedDate";
import AddSubUserModal from "./AddSubUserModal";
import {
  useGivePermissionMutation,
  useMySubUserQuery,
} from "@/redux/slices/admin/userApi";
import { ChevronRight } from "lucide-react";
import PermissionModal from "./AccessPermissionModal";
import Loader from "@/utils/Loader";

const SubUserPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const { data: subUserData, isLoading } = useMySubUserQuery({});
  const [givePermission, { isLoading: permissionLoading }] =
    useGivePermissionMutation();

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

  const handlePermission = (id: string, name: string) => {
    setSelectedUserId(id);
    setSelectedUserName(name);
    setPermissionModalOpen(true);
  };

  const handlePermissionSubmit = async (selectedPermissions: string[]) => {
    try {
      const res = await givePermission({
        selectedUserId,
        selectedPermissions,
      }).unwrap();

      if (res?.success === true) {
        toast.success("Permissions updated successfully!");
        setPermissionModalOpen(false);
      }
    } catch (error: any) {
      toast.error(error?.message);
      setPermissionModalOpen(false);
    }
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

      {/* Show loader when data is being fetched */}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>
                    <TableSortLabel>Name</TableSortLabel>
                  </TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Create At</TableCell>
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
        </>
      )}

      <AddSubUserModal open={open} setOpen={setOpen} />
      <PermissionModal
        open={permissionModalOpen}
        setOpen={setPermissionModalOpen}
        userId={selectedUserId}
        name={selectedUserName}
        onSubmit={handlePermissionSubmit}
        permissionLoading={permissionLoading}
      />
    </div>
  );
};

export default SubUserPage;
