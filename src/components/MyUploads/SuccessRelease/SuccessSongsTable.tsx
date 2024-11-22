/* eslint-disable @typescript-eslint/ban-ts-comment */
// /* eslint-disable @typescript-eslint/ban-ts-comment */
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
import {
  useGetCountrySongQuery,
  useGetStoredSongQuery,
  useGetSuccessSingleSongQuery,
} from "@/redux/slices/myUploads/myUploadsApi";

import StoreModal from "../Modal/StoreModal";
import CountryModal from "../Modal/CountryModal";

import PublicIcon from "@mui/icons-material/Public";
import StoreIcon from "@mui/icons-material/Store"; //
import Loader from "@/utils/Loader";
import { countCountryOccurrences } from "@/utils/countCountryOccurrences";
import { EyeIcon, SquareChevronRight } from "lucide-react";
import MusicDetailsModal from "./SingleMusicDetailsModa";
import AlbumDetailsModal from "../SuccessAlbum/AlbumDetailsModal";
import { Link } from "react-router-dom";

const StoreDataCell = ({ songId }: { songId: string }) => {
  const { data: storeData, isLoading, isError } = useGetStoredSongQuery(songId);

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Empty</span>;

  return <span>{storeData?.data ? storeData.data?.length : "Empty"}</span>;
};
const CountryDataCell = ({ songId }: { songId: string }) => {
  const {
    data: countryData,
    isLoading,
    isError,
  } = useGetCountrySongQuery(songId);

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error fetching store data.</span>;

  return <span>{countryData?.data ? countryData.data?.length : "Empty"}</span>;
};
const SuccessSongsTable = ({ searchQuery }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [open, setOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [albumOpenModal, setAlbumOpenModal] = useState(false);
  const [songData, setSongData] = useState();
  const [albumData, setAlbumData] = useState();

  const handleCloseModal = () => setOpenModal(false);
  const handleCloseAlbumModal = () => setAlbumOpenModal(false);

  const handleViewDetails = (data: any) => {
    setSongData(data);
    setOpenModal(true);
  };
  const handleAlbumViewDetails = (data: any) => {
    setAlbumData(data);
    setAlbumOpenModal(true);
  };

  const handleStoreModal = async (payload: any) => {
    setOpen(true);
    setSelectedAlbum(payload);
  };
  const handleCountryModal = async (payload: any) => {
    setCountryOpen(true);
    setSelectedCountry(payload);
  };
  const { data: songsData, isLoading } = useGetSuccessSingleSongQuery({});

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  //@ts-ignore
  const rows = songsData?.data?.data;

  const processedSongs = rows?.map(
    (song: { songType: string; countries: string[] }) => ({
      ...song,
      countryCounts:
        song?.songType === "single" && song?.countries?.[0]
          ? countCountryOccurrences(song.countries[0])
          : null,
    })
  );
  const filteredRows = processedSongs?.filter(
    (row: any) =>
      (row.releaseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.releaseTitle.toLowerCase().includes(searchQuery.toLowerCase())) &&
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
                <TableCell>Cover</TableCell>
                <TableCell>ReleaseID</TableCell>

                <TableCell>Release Title</TableCell>
                <TableCell>Label</TableCell>
                <TableCell>Release Date</TableCell>
                <TableCell>UPC</TableCell>
                <TableCell>ISRC</TableCell>
                <TableCell>Territories</TableCell>
                <TableCell>Store</TableCell>
                <TableCell>Details</TableCell>
                <TableCell>Promo</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index: any) => (
                  <React.Fragment key={index}>
                    {row.songType === "album" ? (
                      <>
                        <TableRow
                          sx={{
                            transition: "background-color 0.3s ease",
                            "&:hover": {
                              backgroundColor: "#ECDFCC",
                              cursor: "pointer",
                            },
                          }}
                        >
                          <TableCell>
                            <img
                              className="w-[70px] h-[40px] rounded-md "
                              src={`${row?.image}`}
                              alt=""
                            />
                          </TableCell>
                          <TableCell>{row.releaseId}</TableCell>

                          <TableCell>{row.releaseTitle}</TableCell>
                          <TableCell>{row.audio[0]?.label}</TableCell>
                          <TableCell>{row.physicalReleaseDate}</TableCell>
                          <TableCell>{row.upc ? row.upc : "-"}</TableCell>
                          <TableCell>
                            {row?.audio ? row?.audio[0]?.isrc : "-"}
                          </TableCell>
                          <TableCell
                            className="cursor-pointer"
                            onClick={() => handleCountryModal(row._id)}
                          >
                            <PublicIcon style={{ marginRight: 8 }} />

                            <CountryDataCell songId={row._id} />
                          </TableCell>
                          <TableCell
                            className="cursor-pointer"
                            onClick={() => handleStoreModal(row)}
                          >
                            <StoreIcon style={{ marginRight: 8 }} />
                            <StoreDataCell songId={row._id} />
                          </TableCell>
                          <TableCell>
                            <EyeIcon
                              className="cursor-pointer"
                              onClick={() => handleAlbumViewDetails(row)}
                            />
                          </TableCell>
                        </TableRow>
                      </>
                    ) : (
                      <TableRow
                        sx={{
                          transition: "background-color 0.3s ease",
                          "&:hover": {
                            backgroundColor: "#ECDFCC",
                            cursor: "pointer",
                          },
                        }}
                      >
                        <TableCell>
                          <img
                            className="w-[70px] h-[40px] rounded-md "
                            src={`${row?.image}`}
                            alt=""
                          />
                        </TableCell>
                        <TableCell>{row.releaseId}</TableCell>

                        <TableCell>{row.releaseTitle}</TableCell>
                        <TableCell>{row.label?.labelName}</TableCell>
                        <TableCell>{row.releaseDate}</TableCell>
                        <TableCell>{row.upc ? row.upc : "-"}</TableCell>
                        <TableCell>{row.isrc ? row.isrc : "-"}</TableCell>
                        <TableCell
                          className="cursor-pointer"
                          onClick={() => handleCountryModal(row._id)}
                        >
                          <PublicIcon style={{ marginRight: 8 }} />

                          <CountryDataCell songId={row._id} />
                        </TableCell>

                        <TableCell
                          className="cursor-pointer"
                          onClick={() => handleStoreModal(row)}
                        >
                          <StoreIcon style={{ marginRight: 8 }} />
                          <StoreDataCell songId={row._id} />
                        </TableCell>
                        <TableCell>
                          <EyeIcon
                            className="cursor-pointer"
                            onClick={() => handleViewDetails(row)}
                          />
                        </TableCell>
                        <TableCell>
                          <Link
                            to={`/promo-card/${row?._id}?banner=${row?.image}&title=${row?.title}`}
                          >
                            {" "}
                            <SquareChevronRight />
                          </Link>
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
      <StoreModal open={open} setOpen={setOpen} selectedAlbum={selectedAlbum} />
      <CountryModal
        open={countryOpen}
        setOpen={setCountryOpen}
        selectedCountry={selectedCountry}
      />
      <MusicDetailsModal
        open={openModal}
        handleClose={handleCloseModal}
        data={songData}
      />
      <AlbumDetailsModal
        open={albumOpenModal}
        onClose={handleCloseAlbumModal}
        audioDetails={albumData}
      />
    </>
  );
};

export default SuccessSongsTable;
