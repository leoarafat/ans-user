/* eslint-disable @typescript-eslint/ban-ts-comment */
import { imageURL } from "@/redux/api/baseApi";
import { useProfileQuery } from "@/redux/slices/admin/userApi";
import { Grid, TextField } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const LabelVerification = ({ data, onChange }: any) => {
  const [dashboardImage, setDashboardImage] = useState(null);
  const [copyRightImage, setCoyRightImage] = useState(null);

  const { data: profileData } = useProfileQuery({});
  const [initialSetupDone, setInitialSetupDone] = useState(false);

  useEffect(() => {
    if (profileData?.data && !initialSetupDone) {
      const initialProfileData = {
        videosCount: profileData.data.videosCount || "",
        subscribeCount: profileData.data.subscribeCount || "",
        channelName: profileData.data.channelName || "",
        channelUrl: profileData.data.channelUrl || "",
        copyRightImage: profileData.data.copyrightNoticeImage || null,
        dashboardImage: profileData.data.dashboardScreenShot || null,
      };

      onChange("label", initialProfileData);
      setDashboardImage(profileData.data.dashboardScreenShot || null);
      setCoyRightImage(profileData.data.copyrightNoticeImage || null);

      setInitialSetupDone(true);
    }
  }, [profileData, initialSetupDone, onChange]);

  const handleChange = useCallback(
    (e: any) => {
      const { name, value } = e.target;
      onChange("label", { ...data.label, [name]: value });
    },
    [onChange, data.label]
  );
  const handleDashboardImageImageUpload = (event: any) => {
    const file = event.target.files[0];

    setDashboardImage(file as any);
    onChange("label", { ...data?.label, dashboardImage: file });
  };

  const handleCopyRightImage = (event: any) => {
    const file = event.target.files[0];
    setCoyRightImage(file as any);
    onChange("label", { ...data?.label, copyRightImage: file });
  };

  const handleDashboardRemoveImage = () => {
    setDashboardImage(null);
    onChange("label", { ...data?.label, dashboardImage: null });
  };

  const handleCopyRightRemoveImage = () => {
    setCoyRightImage(null);
    onChange("label", { ...data?.label, copyRightImage: null });
  };

  return (
    <form>
      <Grid container spacing={3}>
        <div className="flex justify-around items-center w-full">
          {/* Dashboard Image Uploader */}
          <div className="image_upload flex items-center justify-center flex-col p-3">
            <h4 className="mb-2 text-sm">Upload Youtube Dashboard Image</h4>
            {dashboardImage || profileData?.data?.dashboardScreenShot ? (
              <div className="relative w-3/4">
                {typeof dashboardImage === "object" ? (
                  <img
                    //@ts-ignore
                    src={
                      dashboardImage
                        ? URL.createObjectURL(dashboardImage)
                        : null
                    }
                    alt="Dashboard Picture"
                    className="w-[350px] h-[200px]"
                  />
                ) : (
                  <img
                    src={`${imageURL}${profileData?.data?.dashboardScreenShot}`}
                    alt="Dashboard Picture"
                    className="w-[350px] h-[200px]"
                  />
                )}
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={handleDashboardRemoveImage}
                >
                  <MdClose />
                </button>
              </div>
            ) : (
              <label
                htmlFor="dashboard_upload"
                className="upload w-[350px] hover:bg-green-100 transition flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer"
              >
                <input
                  id="dashboard_upload"
                  type="file"
                  accept="image/*"
                  name="dashboardImage"
                  style={{ display: "none" }}
                  onChange={handleDashboardImageImageUpload}
                />
                <BsCloudUpload />
              </label>
            )}
          </div>

          {/* Copyright Image Uploader */}
          <div className="image_upload flex items-center justify-center flex-col p-3">
            <h4 className="mb-2 text-sm">Upload Youtube Copyright Image</h4>
            {copyRightImage || profileData?.data?.copyrightNoticeImage ? (
              <div className="relative w-3/4">
                {typeof copyRightImage === "object" ? (
                  <img
                    //@ts-ignore
                    src={
                      copyRightImage
                        ? URL.createObjectURL(copyRightImage)
                        : null
                    }
                    alt="Copyright Image"
                    className="w-[350px] h-[200px]"
                  />
                ) : (
                  <img
                    src={`${imageURL}${profileData?.data?.copyrightNoticeImage}`}
                    alt="Copyright Image"
                    className="w-[350px] h-[200px]"
                  />
                )}
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={handleCopyRightRemoveImage}
                >
                  <MdClose />
                </button>
              </div>
            ) : (
              <label
                htmlFor="copyright"
                className="upload w-[350px] hover:bg-green-100 transition flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer"
              >
                <input
                  id="copyright"
                  type="file"
                  accept="image/*"
                  name="copyRightImage"
                  style={{ display: "none" }}
                  onChange={handleCopyRightImage}
                  required
                />
                <BsCloudUpload />
              </label>
            )}
          </div>
        </div>
        <Grid item xs={6}>
          <TextField
            name="channelName"
            label="Channel Name"
            variant="outlined"
            fullWidth
            value={data?.label?.channelName || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="channelUrl"
            label="Chanel URL"
            variant="outlined"
            fullWidth
            value={data?.label.channelUrl || ""}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={6}>
          <TextField
            name="subscribeCount"
            label="Subscribe Count"
            variant="outlined"
            type="number"
            fullWidth
            value={data?.label?.subscribeCount || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="videosCount"
            label="Videos Count"
            variant="outlined"
            type="number"
            fullWidth
            value={data?.label?.videosCount || ""}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default LabelVerification;
