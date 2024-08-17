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
  TablePagination,
  Typography,
} from "@mui/material";
import { useGetPendingSingleSongQuery } from "@/redux/slices/myUploads/myUploadsApi";
import { imageURL } from "@/redux/api/baseApi";
import Loader from "@/utils/Loader";
import { Loader as LoaderIcon } from "lucide-react";

const PendingSongsTable = ({ searchQuery, statusFilter }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data: songsData, isLoading } = useGetPendingSingleSongQuery({});

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //@ts-ignore
  const rows = songsData?.data?.data;
  console.log(rows);
  const filteredRows = rows?.filter(
    (row: any) =>
      (row.releaseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.releaseTitle.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (status === "" || row.isApproved === status)
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
                <TableCell>Cover</TableCell>
                <TableCell>ReleaseID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Release Title</TableCell>
                <TableCell>Label</TableCell>
                <TableCell>Release Date</TableCell>
                <TableCell>UPC</TableCell>
                <TableCell>ISRC</TableCell>
                <TableCell>Catalog Number</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row: any, index: any) => (
                  <React.Fragment key={index}>
                    {row.songType === "album" ? (
                      <>
                        {/* {console.log(row)} */}
                        <TableRow>
                          <TableCell>
                            <img
                              className="w-[70px] h-[40px] rounded-md "
                              src={`${imageURL}/${row?.image}`}
                              alt=""
                            />
                          </TableCell>
                          <TableCell>{row.releaseId}</TableCell>
                          <TableCell>{row?.songType?.toUpperCase()}</TableCell>
                          <TableCell>{row.releaseTitle}</TableCell>
                          <TableCell>{row.audio[0]?.label}</TableCell>
                          <TableCell>{row.physicalReleaseDate}</TableCell>
                          <TableCell>{row.upc ? row.upc : "-"}</TableCell>
                          <TableCell>
                            {row?.audio ? row?.audio[0]?.isrc : "-"}
                          </TableCell>
                          <TableCell>
                            {row.catalogNumber ? row.catalogNumber : "-"}
                          </TableCell>
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
                      </>
                    ) : (
                      <TableRow>
                        <TableCell>
                          <img
                            className="w-[70px] h-[40px] rounded-md "
                            src={`${imageURL}/${row?.image}`}
                            alt=""
                          />
                        </TableCell>
                        <TableCell>{row.releaseId}</TableCell>
                        <TableCell>{row.songType?.toUpperCase()}</TableCell>
                        <TableCell>{row.releaseTitle}</TableCell>
                        <TableCell>{row.label?.labelName}</TableCell>
                        <TableCell>{row.releaseDate}</TableCell>
                        <TableCell>{row.upc ? row.upc : "-"}</TableCell>
                        <TableCell>{row.isrc ? row.isrc : "-"}</TableCell>
                        <TableCell>
                          {row.catalogNumber ? row.catalogNumber : "-"}
                        </TableCell>
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
                    )}
                  </React.Fragment>
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

export default PendingSongsTable;
