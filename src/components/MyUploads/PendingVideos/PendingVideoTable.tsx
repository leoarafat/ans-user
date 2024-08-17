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
  TablePagination,
} from "@mui/material";
import { useGetPendingVideoQuery } from "@/redux/slices/myUploads/myUploadsApi";
import { imageURL } from "@/redux/api/baseApi";
import Loader from "@/utils/Loader";
import { Loader as LoaderIcon } from "lucide-react";

const PendingVideosTable = ({ searchQuery, statusFilter }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data: videosData, isLoading } = useGetPendingVideoQuery({});

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //@ts-ignore
  const rows = videosData?.data?.data;

  const filteredRows = rows?.filter(
    (row: any) =>
      (row.videoId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (status === "" || row.approvedStatus === status)
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <Paper sx={{ mt: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thumbnail</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Label</TableCell>
                <TableCell>Store Release Date</TableCell>
                <TableCell>UPC</TableCell>
                <TableCell>ISRC</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        className="w-[70px] h-[40px] rounded-md "
                        src={`${imageURL}/${row?.image}`}
                        alt=""
                      />
                    </TableCell>
                    <TableCell>{row.videoId}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.label?.labelName}</TableCell>
                    <TableCell>{row.storeReleaseDate}</TableCell>
                    <TableCell>{row.upc ? row.upc : "-"}</TableCell>
                    <TableCell>{row.isrc ? row.isrc : "-"}</TableCell>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        {row.isApproved}
                        {row.isApproved === "pending" && <LoaderIcon />}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default PendingVideosTable;
