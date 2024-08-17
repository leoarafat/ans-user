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
} from "@mui/material";

import { imageURL } from "@/redux/api/baseApi";
import Loader from "@/utils/Loader";
import { EditIcon, Loader as LoaderIcon } from "lucide-react";
import { useGetDraftsQuery } from "@/redux/slices/uploadVideoAudio/uploadVideoAudioApi";
import { Link } from "react-router-dom";

const DraftsSongsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { data: songsData, isLoading } = useGetDraftsQuery({});

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //@ts-ignore
  const rows = songsData?.data?.data?.data;

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
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((row: any, index: any) => (
                  <React.Fragment key={index}>
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
                        <Link to={`/single?id=${row?._id}`}>
                          <EditIcon />
                        </Link>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default DraftsSongsTable;
