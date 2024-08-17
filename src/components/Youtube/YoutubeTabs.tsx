import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export default function YoutubeColorTabs({ value, handleChange }: any) {
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Claim Release" />
        <Tab value="two" label="Artist Channel Request" />
        <Tab value="three" label="WhiteList Request" />
      </Tabs>
    </Box>
  );
}
