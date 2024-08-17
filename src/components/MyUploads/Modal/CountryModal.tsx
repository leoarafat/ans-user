import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { useGetCountrySongQuery } from "@/redux/slices/myUploads/myUploadsApi";
import Loader from "@/utils/Loader";

interface CountryModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCountry: any;
}

const CountryModal: React.FC<CountryModalProps> = ({
  open,
  setOpen,
  selectedCountry,
}) => {
  const [countries, setCountries] = useState([]);
  const { data: countryData, isLoading } =
    useGetCountrySongQuery(selectedCountry);
  console.log(countryData);
  // State to hold the flag data from restcountries API
  const [flagData, setFlagData] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
        // Extract country names and flag URLs
        const flags = data.map(
          (country: { name: { common: any }; flags: { svg: any } }) => ({
            countryName: country.name.common,
            flag: country.flags?.svg,
          })
        );
        setFlagData(flags);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCancel = () => {
    setOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">Country Details</DialogTitle>
      <DialogContent>
        <Paper sx={{ padding: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "400px",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Typography variant="h6">Country Details</Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Country Name</TableCell>
                  <TableCell>Flag</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {countryData?.data?.map((country: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{country?.countryName}</TableCell>
                    <TableCell>
                      {/* Find and display flag URL */}
                      {flagData?.map((flag: any) => {
                        if (flag.countryName === country?.countryName) {
                          return (
                            <img
                              key={flag.countryName}
                              src={flag.flag}
                              alt={country?.countryName}
                              style={{ width: 60, height: 40 }}
                            />
                          );
                        }
                        return null;
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CountryModal;
