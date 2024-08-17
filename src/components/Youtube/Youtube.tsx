import { useState } from "react";
import { Box } from "@mui/material";
import YoutubeColorTabs from "./YoutubeTabs";
import ClaimRelease from "./ClaimRelease/ClaimRelease";
import ArtistChannelRequest from "./ArtistChannelRequest/ArtistChannelRequest";
import WhiteListRequest from "./WhiteListRequest/WhiteListRequest";

const YoutubeManage = () => {
  const [activeTab, setActiveTab] = useState("one");

  const handleTabChange = (event: any, newValue: any) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <YoutubeColorTabs value={activeTab} handleChange={handleTabChange} />
      <Box p={3}>
        {activeTab === "one" && <ClaimRelease />}
        {activeTab === "two" && <ArtistChannelRequest />}
        {activeTab === "three" && <WhiteListRequest />}
      </Box>
    </div>
  );
};

export default YoutubeManage;
