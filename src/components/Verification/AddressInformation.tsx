import { useProfileQuery } from "@/redux/slices/admin/userApi";
import {
  Box,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";

const AddressInformation = ({ data, onChange }: any) => {
  const { data: profileData } = useProfileQuery({});
  const [initialSetupDone, setInitialSetupDone] = useState(false);

  useEffect(() => {
    if (profileData?.data && !initialSetupDone) {
      const initialProfileData = {
        state: profileData.data.state || "",
        city: profileData.data.city || "",
        postCode: profileData.data.postCode || "",
        address: profileData.data.address || "",
        country: profileData.data.country || "",
      };

      onChange("address", initialProfileData);
      setInitialSetupDone(true);
    }
  }, [profileData, initialSetupDone, onChange]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
      const { name, value } = e.target;
      onChange("address", { ...data.address, [name]: value });
    },
    [onChange, data.address]
  );

  const countries = ["Bangladesh", "India", "United States", "United Kingdom"];

  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: "auto",
        marginTop: 4,
        borderRadius: "16px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            marginBottom: 3,
            fontWeight: 600,
            color: "#333",
            textAlign: "center",
          }}
        >
          Address Information
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel>Country</InputLabel>
              <Select
                value={data?.address.country || ""}
                onChange={handleChange}
                name="country"
                label="Country"
              >
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select your country</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              {/* <InputLabel>State</InputLabel> */}
              <TextField
                name="state"
                value={data?.address.state || ""}
                onChange={handleChange}
                label="State"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <FormHelperText>Enter your state</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              {/* <InputLabel>City</InputLabel> */}
              <TextField
                name="city"
                value={data?.address.city || ""}
                onChange={handleChange}
                label="City"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <FormHelperText>Enter your city</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              {/* <InputLabel>Post Code</InputLabel> */}
              <TextField
                name="postCode"
                value={data?.address.postCode || ""}
                onChange={handleChange}
                label="Post Code"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <FormHelperText>Enter your postal code</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              {/* <InputLabel>Address</InputLabel> */}
              <TextField
                name="address"
                value={data?.address.address || ""}
                onChange={handleChange}
                label="Address"
                variant="outlined"
                multiline
                rows={4}
                InputLabelProps={{ shrink: true }}
              />
              <FormHelperText>Enter your full address</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AddressInformation;
