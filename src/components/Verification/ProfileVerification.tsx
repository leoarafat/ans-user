/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, useCallback } from "react";
import { Grid, TextField } from "@material-ui/core";
import { MdClose } from "react-icons/md";
import { BsCloudUpload } from "react-icons/bs";
import { useProfileQuery } from "@/redux/slices/admin/userApi";
import { imageURL } from "@/redux/api/baseApi";

const ProfileVerification = ({ data, onChange }: any) => {
  const [selectedProfileImage, setSelectedProfileImage] = useState(null);
  const [nidFront, setNidFront] = useState(null);
  const [nidBack, setNidBack] = useState(null);

  const { data: profileData } = useProfileQuery({});
  const [initialSetupDone, setInitialSetupDone] = useState(false);

  useEffect(() => {
    if (profileData?.data && !initialSetupDone) {
      const initialProfileData = {
        name: profileData.data.name || "",
        phoneNumber: profileData.data.phoneNumber || "",
        nidNumber: profileData.data.nidNumber || "",
        email: profileData.data.email || "",
        profileImage: profileData.data.image || null,
        nidFront: profileData.data.nidFront || null,
        nidBack: profileData.data.nidBack || null,
      };

      onChange("profile", initialProfileData);
      setSelectedProfileImage(profileData.data.image || null);
      setNidFront(profileData.data.nidFront || null);
      setNidBack(profileData.data.nidBack || null);
      setInitialSetupDone(true);
    }
  }, [profileData, initialSetupDone, onChange]);

  const handleChange = useCallback(
    (e: any) => {
      const { name, value } = e.target;
      onChange("profile", { ...data.profile, [name]: value });
    },
    [onChange, data.profile]
  );

  const handleProfileImageUpload = (event: any) => {
    const file = event.target.files[0];
    setSelectedProfileImage(file);
    onChange("profile", { ...data.profile, profileImage: file });
  };

  const handleNidFront = (event: any) => {
    const file = event.target.files[0];
    setNidFront(file);
    onChange("profile", { ...data.profile, nidFront: file });
  };

  const handleNidBack = (event: any) => {
    const file = event.target.files[0];
    setNidBack(file);
    onChange("profile", { ...data.profile, nidBack: file });
  };

  const handleProfileRemoveImage = () => {
    setSelectedProfileImage(null);
    onChange("profile", { ...data.profile, profileImage: null });
  };

  const handleFrontRemoveImage = () => {
    setNidFront(null);
    onChange("profile", { ...data.profile, nidFront: null });
  };

  const handleBackRemoveImage = () => {
    setNidBack(null);
    onChange("profile", { ...data.profile, nidBack: null });
  };

  return (
    <form>
      <Grid container spacing={3} alignItems="center">
        <div className="flex justify-between items-center w-full">
          {/* Profile Picture */}
          <div className="image_upload flex items-center justify-center flex-col p-3">
            <h4 className="mb-2 text-sm">Upload Profile Picture</h4>
            {selectedProfileImage || profileData?.data?.image ? (
              <div className="relative w-3/4">
                {typeof selectedProfileImage === "object" ? (
                  <img
                    //@ts-ignore
                    src={
                      selectedProfileImage
                        ? URL.createObjectURL(selectedProfileImage)
                        : null
                    }
                    alt="PROFILE IMAGE"
                    className="w-[300px] h-[200px]"
                  />
                ) : (
                  <img
                    src={`${imageURL}/${profileData?.data?.image}`}
                    alt="PROFILE IMAGE"
                    className="w-[300px] h-[200px]"
                  />
                )}
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={handleProfileRemoveImage}
                >
                  <MdClose />
                </button>
              </div>
            ) : (
              <label
                htmlFor="profile-image-upload"
                className="upload w-[230px] hover:bg-green-100 transition flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer"
              >
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  name="image"
                  style={{ display: "none" }}
                  onChange={handleProfileImageUpload}
                  required
                />
                <BsCloudUpload />
              </label>
            )}
          </div>

          {/* NID Front Image Uploader */}
          <div className="image_upload flex items-center justify-center flex-col p-3">
            <h4 className="mb-2 text-sm">Upload NID Front</h4>
            {nidFront || profileData?.data?.nidFront ? (
              <div className="relative w-3/4">
                {typeof nidFront === "object" ? (
                  <img
                    //@ts-ignore
                    src={nidFront ? URL.createObjectURL(nidFront) : null}
                    alt="NID Front"
                    className="w-[300px] h-[200px]"
                  />
                ) : (
                  <img
                    src={`${imageURL}/${profileData?.data?.nidFront}`}
                    alt="NID Front"
                    className="w-[300px] h-[200px]"
                  />
                )}
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={handleFrontRemoveImage}
                >
                  <MdClose />
                </button>
              </div>
            ) : (
              <label
                htmlFor="nid-front-upload"
                className="upload w-[230px] hover:bg-green-100 transition flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer"
              >
                <input
                  id="nid-front-upload"
                  type="file"
                  accept="image/*"
                  name="nidFront"
                  style={{ display: "none" }}
                  onChange={handleNidFront}
                  required
                />
                <BsCloudUpload />
              </label>
            )}
          </div>

          {/* NID Back Image Uploader */}
          <div className="image_upload flex items-center justify-center flex-col p-3">
            <h4 className="mb-2 text-sm">Upload NID Back</h4>
            {nidBack || profileData?.data?.nidBack ? (
              <div className="relative w-3/4">
                {typeof nidBack === "object" ? (
                  <img
                    //@ts-ignore
                    src={nidBack ? URL.createObjectURL(nidBack) : null}
                    alt="NID Back"
                    className="w-[300px] h-[200px]"
                  />
                ) : (
                  <img
                    src={`${imageURL}/${profileData?.data?.nidBack}`}
                    alt="NID Back"
                    className="w-[300px] h-[200px]"
                  />
                )}
                <button
                  type="button"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={handleBackRemoveImage}
                >
                  <MdClose />
                </button>
              </div>
            ) : (
              <label
                htmlFor="nid-back-upload"
                className="upload w-[230px] hover:bg-green-100 transition flex justify-center shadow-md rounded-md p-12 text-5xl cursor-pointer"
              >
                <input
                  id="nid-back-upload"
                  type="file"
                  accept="image/*"
                  name="nidBack"
                  style={{ display: "none" }}
                  onChange={handleNidBack}
                  required
                />
                <BsCloudUpload />
              </label>
            )}
          </div>
        </div>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={data.profile.name || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="phoneNumber"
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={data.profile.phoneNumber || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="nidNumber"
            label="Nid Number"
            variant="outlined"
            fullWidth
            value={data.profile.nidNumber || ""}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            disabled
            value={data.profile.email || ""}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileVerification;
