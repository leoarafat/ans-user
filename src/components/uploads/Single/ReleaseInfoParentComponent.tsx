import { useCallback, useState } from "react";
import ReleaseInformation from "./ReleaseInformation";
import TracksInformation from "./TracksInformation";

const ParentComponent = () => {
  const [releaseData, setReleaseData] = useState({});
  const [tracksData, setTracksData] = useState({});

  const handleReleaseInfoChange = useCallback((key: string, value: any) => {
    setReleaseData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }, []);
  const handleTrackChange = useCallback((key: string, value: any) => {
    setTracksData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }, []);

  return (
    <>
      {" "}
      <ReleaseInformation
        data={releaseData}
        onChange={handleReleaseInfoChange}
      />
      <TracksInformation data={tracksData} onChange={handleTrackChange} />
    </>
  );
};

export default ParentComponent;
