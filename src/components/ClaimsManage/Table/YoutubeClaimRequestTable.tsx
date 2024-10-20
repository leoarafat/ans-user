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
  IconButton,
  TablePagination,
  Tooltip,
} from "@mui/material";
import { Trash2 } from "lucide-react";
import { useGetYoutubeClaimRequestQuery } from "@/redux/slices/claims/claimsApi";
import { Link } from "react-router-dom";

const YoutubeClaimRequestTable = ({ searchQuery, statusFilter }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { data: queryData } = useGetYoutubeClaimRequestQuery({});
  //@ts-ignore
  const rows = queryData?.data?.data;

  const filteredRows = rows
    ?.filter((row: any) =>
      row.songTitle.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((row: any) =>
      statusFilter ? row.approvedStatus === statusFilter : true
    );

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

                <TableCell>YouTube Video URL</TableCell>
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

                    <TableCell>
                      <Tooltip title={row.url}>
                        {/* Use Link for click and anchor behavior */}
                        <Link
                          href={row.url}
                          target="_blank" // Opens the link in a new tab
                          rel="noopener noreferrer" // Security best practice
                          underline="none"
                          sx={{ cursor: "pointer" }}
                        >
                          {row.url?.slice(0, 30)}...
                        </Link>
                      </Tooltip>
                    </TableCell>
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

export default YoutubeClaimRequestTable;
