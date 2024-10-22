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

import { useGetTikTokClaimRequestQuery } from "@/redux/slices/claims/claimsApi";

const TikTokClaimRequestTable = ({ searchQuery, statusFilter }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { data: queryData } = useGetTikTokClaimRequestQuery({});
  //@ts-ignore
  const rows = queryData?.data?.data;

  const safeString = (value?: string): string =>
    value ? value.toLowerCase() : "";

  const filteredRows = rows?.filter((row: any) => {
    const songTitle = safeString(row.songTitle);
    const pgcLink = safeString(row.pgcLink);
    const ugcLink = safeString(row.ugclink);
    const search = searchQuery.toLowerCase();

    const matchesSearch =
      songTitle.includes(search) ||
      pgcLink.includes(search) ||
      ugcLink.includes(search);

    const matchesStatus =
      statusFilter === "" || row.approvedStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });
  return (
    <>
      <Paper sx={{ mt: 3 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Song Title</TableCell>
                <TableCell>UGC link</TableCell>
                <TableCell>PGC Link</TableCell>
                <TableCell>Time For PGC</TableCell>
                <TableCell>Time For UGC</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{row._id?.slice(5, 9)}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.songTitle}</TableCell>
                    <TableCell>{row.ugclink}</TableCell>
                    <TableCell>{row.pgcLink}</TableCell>
                    <TableCell>{row.timeForPgc}</TableCell>
                    <TableCell>{row.timeForUgc}</TableCell>
                    <TableCell>{row.approvedStatus}</TableCell>
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

export default TikTokClaimRequestTable;
