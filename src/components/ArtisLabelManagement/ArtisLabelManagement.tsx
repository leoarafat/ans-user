import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ColorTabs from "@/utils/Tabs";
import LabelManage from "./Label/LabelPage";
import ArtistManage from "./Artist/ArtistPage";

const ArtistLabelManagement = () => {
  const [activeTab, setActiveTab] = useState("one");

  const handleTabChange = (event: any, newValue: any) => {
    setActiveTab(newValue);
  };
  useEffect(() => {
    localStorage.removeItem("releaseFormData");
    localStorage.removeItem("tracksInformation");
  }, []);
  return (
    <div>
      <ColorTabs value={activeTab} handleChange={handleTabChange} />
      <Box p={3}>
        {activeTab === "one" && <LabelManage />}
        {activeTab === "two" && <ArtistManage />}
      </Box>
    </div>
  );
};

export default ArtistLabelManagement;
