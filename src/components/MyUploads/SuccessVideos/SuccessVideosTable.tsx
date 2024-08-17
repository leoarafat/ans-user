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
import {
  useGetCountrySongQuery,
  useGetStoredSongQuery,
  useGetSuccessVideoQuery,
} from "@/redux/slices/myUploads/myUploadsApi";
import { imageURL } from "@/redux/api/baseApi";
import StoreModal from "../Modal/StoreModal";
import CountryModal from "../Modal/CountryModal";

import PublicIcon from "@mui/icons-material/Public";
import StoreIcon from "@mui/icons-material/Store"; //
import Loader from "@/utils/Loader";
import { EyeIcon } from "lucide-react";
import VideoDetailsModal from "./VideoDetailsModal";

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

const SuccessVideosTable = ({ searchQuery }: any) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [open, setOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [songData, setSongData] = useState();
  const handleStoreModal = async (payload: any) => {
    setOpen(true);
    setSelectedAlbum(payload);
  };
  const handleCountryModal = async (payload: any) => {
    setCountryOpen(true);
    setSelectedCountry(payload);
  };
  const handleCloseModal = () => setOpenModal(false);
  const handleViewDetails = (data: any) => {
    setSongData(data);
    setOpenModal(true);
  };
  const { data: videosData, isLoading } = useGetSuccessVideoQuery({});

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
                <TableCell>Territories</TableCell>
                <TableCell>Store</TableCell>
                <TableCell>Action</TableCell>
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
                    <TableCell
                      className="cursor-pointer"
                      onClick={() => handleCountryModal(row?._id)}
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
      <StoreModal open={open} setOpen={setOpen} selectedAlbum={selectedAlbum} />
      <CountryModal
        open={countryOpen}
        setOpen={setCountryOpen}
        selectedCountry={selectedCountry}
      />
      <VideoDetailsModal
        open={openModal}
        handleClose={handleCloseModal}
        data={songData}
      />
    </>
  );
};

export default SuccessVideosTable;
