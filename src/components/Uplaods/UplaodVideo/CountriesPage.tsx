import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import Loader from "@/utils/Loader";

interface Country {
  cca3: string;
  region: string;
  name: {
    common: string;
  };
  flags: string[];
}

const VideoCountry = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3/all");
      const data = await response.json();
      const countriesData: Country[] = data;
      setCountries(countriesData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching countries: ", error);
      setLoading(false);
    }
  };

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountries((prevSelected) => {
      if (prevSelected.includes(countryCode)) {
        return prevSelected.filter((code) => code !== countryCode);
      } else {
        return [...prevSelected, countryCode];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedCountries.length === countries.length) {
      // If all countries are selected, deselect all
      setSelectedCountries([]);
    } else {
      // Select all countries
      const allCountryCodes = countries.map((country) => country.cca3);
      setSelectedCountries(allCountryCodes);
    }
  };

  const renderCountries = () => (
    <Grid container spacing={3}>
      {countries.map((country) => (
        <Grid item xs={12} sm={4} key={country.cca3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedCountries.includes(country.cca3)}
                onChange={() => handleCountrySelect(country.cca3)}
              />
            }
            label={
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={country.flags[1]}
                  alt={country.name.common}
                  style={{ width: "20px", marginRight: "10px" }}
                />
                {country.name.common}
              </div>
            }
          />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container maxWidth="lg">
      <Box>
        <Card>
          <CardContent>
            {loading ? (
              <Loader />
            ) : (
              <>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={handleSelectAll}
                          checked={
                            selectedCountries.length === countries.length
                          }
                        />
                      }
                      label="Select All Countries"
                    />
                  </FormGroup>
                </FormControl>
                {renderCountries()}
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default VideoCountry;
