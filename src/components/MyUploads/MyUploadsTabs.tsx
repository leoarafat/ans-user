import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function MyUploadsColorTabs({ value, handleChange }: any) {
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Successful Release" />
        <Tab value="two" label="Pending Release" />
        <Tab value="three" label="Drafts" />
        {/* <Tab value="three" label="Release Correction" /> */}
        <Tab value="four" label="Release Videos" />
        <Tab value="five" label="Pending Videos" />
      </Tabs>
    </Box>
  );
}
