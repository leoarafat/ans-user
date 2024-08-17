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

import { useGetArtistChannelRequestQuery } from "@/redux/slices/claims/claimsApi";

const ArtistChannelRequestTable = ({ searchQuery, statusFilter }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data: artistChannelData } = useGetArtistChannelRequestQuery({});

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = artistChannelData?.data?.data || [];

  // Filter rows based on searchQuery and statusFilter
  const filteredRows = rows.filter(
    (row: any) =>
      (row.channel_link.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.upc_2.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.approvedStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.topic_link.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter === "" || row.approvedStatus === statusFilter)
  );

  return (
    <>
      <Paper sx={{ mt: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Channel Link</TableCell>
                <TableCell>Topic Link</TableCell>
                <TableCell>UPC1</TableCell>
                <TableCell>UPC2</TableCell>
                <TableCell>UPC3</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{row._id?.slice(5, 9)}</TableCell>
                    <TableCell>{row.channel_link?.slice(0, 20)}</TableCell>
                    <TableCell>{row.topic_link?.slice(0, 20)}</TableCell>
                    <TableCell>{row.upc_1}</TableCell>
                    <TableCell>{row.upc_2}</TableCell>
                    <TableCell>{row.upc_3}</TableCell>
                    <TableCell>{row.approvedStatus}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default ArtistChannelRequestTable;
