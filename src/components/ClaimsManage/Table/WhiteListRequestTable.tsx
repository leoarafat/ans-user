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

import { useGetWhitelistRequestQuery } from "@/redux/slices/claims/claimsApi";

const WhiteListTable = ({ searchQuery, statusFilter }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { data: queryData } = useGetWhitelistRequestQuery({});
  //@ts-ignore
  const rows = queryData?.data?.data;

  const filteredRows = rows?.filter(
    (row: { url: string; approvedStatus: string; createdAt: string }) =>
      (row.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.approvedStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.createdAt.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter ? row.approvedStatus === statusFilter : true)
  );

  return (
    <>
      <Paper sx={{ mt: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>White List URL</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{row._id?.slice(5, 9)}</TableCell>
                    <TableCell>{row.url?.slice(0, 20)}</TableCell>
                    <TableCell>{row.approvedStatus}</TableCell>
                    <TableCell>{row.createdAt}</TableCell>
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

export default WhiteListTable;
