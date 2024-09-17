/* eslint-disable @typescript-eslint/ban-ts-comment */

import { useState, useEffect, useCallback } from "react";
import { Grid, TextField } from "@material-ui/core";
import { MdClose } from "react-icons/md";
import { BsCloudUpload } from "react-icons/bs";
import { useProfileQuery } from "@/redux/slices/admin/userApi";
import { imageURL } from "@/redux/api/baseApi";

const ProfileVerification = ({ data, onChange }: any) => {
  const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(
    null
  );
  const [nidFront, setNidFront] = useState<File | null>(null);
  const [nidBack, setNidBack] = useState<File | null>(null);

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
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      onChange("profile", { ...data.profile, [name]: value });
    },
    [onChange, data.profile]
  );

  const handleProfileImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    setSelectedProfileImage(file || null);
    onChange("profile", { ...data.profile, profileImage: file });
  };

  const handleNidFront = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setNidFront(file || null);
    onChange("profile", { ...data.profile, nidFront: file });
  };

  const handleNidBack = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setNidBack(file || null);
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="flex justify-around flex-wrap gap-4">
            {/* Profile Picture */}
            <div className="flex flex-col items-center p-4 border-dotted border-4 border-gray-400 rounded-lg shadow-md transition-transform hover:scale-105 w-72">
              <h4 className="mb-2 text-lg font-semibold text-gray-700">
                Upload Profile Picture
              </h4>
              {selectedProfileImage || profileData?.data?.image ? (
                <div className="relative w-full h-48">
                  {typeof selectedProfileImage === "object" ? (
                    <img
                      //@ts-ignore
                      src={
                        selectedProfileImage
                          ? URL.createObjectURL(selectedProfileImage)
                          : null
                      }
                      alt="PROFILE IMAGE"
                      className="w-full h-full object-cover rounded-lg border-2 border-gray-300"
                    />
                  ) : (
                    <img
                      src={`${profileData?.data?.image}`}
                      alt="PROFILE IMAGE"
                      className="w-full h-full object-cover rounded-lg border-2 border-gray-300"
                    />
                  )}
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 shadow-md hover:bg-red-700 transition-colors"
                    onClick={handleProfileRemoveImage}
                  >
                    <MdClose />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="profile-image-upload"
                  className="flex flex-col items-center justify-center w-full h-full bg-gray-100 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
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
                  <BsCloudUpload className="text-6xl text-gray-500 mb-2" />
                  <p className="text-gray-600">Click to upload</p>
                </label>
              )}
            </div>

            {/* NID Front Image Uploader */}
            <div className="flex flex-col items-center p-4 border-dotted border-4 border-gray-400 rounded-lg shadow-md transition-transform hover:scale-105 w-72">
              <h4 className="mb-2 text-lg font-semibold text-gray-700">
                Upload ID Front
              </h4>
              {nidFront || profileData?.data?.nidFront ? (
                <div className="relative w-full h-48">
                  {typeof nidFront === "object" ? (
                    <img
                      //@ts-ignore
                      src={nidFront ? URL.createObjectURL(nidFront) : null}
                      alt="NID Front"
                      className="w-full h-full object-cover rounded-lg border-2 border-gray-300"
                    />
                  ) : (
                    <img
                      src={`${profileData?.data?.nidFront}`}
                      alt="NID Front"
                      className="w-full h-full object-cover rounded-lg border-2 border-gray-300"
                    />
                  )}
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 shadow-md hover:bg-red-700 transition-colors"
                    onClick={handleFrontRemoveImage}
                  >
                    <MdClose />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="nid-front-upload"
                  className="flex flex-col items-center justify-center w-full h-full bg-gray-100 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
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
                  <BsCloudUpload className="text-6xl text-gray-500 mb-2" />
                  <p className="text-gray-600">Click to upload</p>
                </label>
              )}
            </div>

            {/* NID Back Image Uploader */}
            <div className="flex flex-col items-center p-4 border-dotted border-4 border-gray-400 rounded-lg shadow-md transition-transform hover:scale-105 w-72">
              <h4 className="mb-2 text-lg font-semibold text-gray-700">
                Upload ID Back
              </h4>
              {nidBack || profileData?.data?.nidBack ? (
                <div className="relative w-full h-48">
                  {typeof nidBack === "object" ? (
                    <img
                      //@ts-ignore
                      src={nidBack ? URL.createObjectURL(nidBack) : null}
                      alt="NID Back"
                      className="w-full h-full object-cover rounded-lg border-2 border-gray-300"
                    />
                  ) : (
                    <img
                      src={`${profileData?.data?.nidBack}`}
                      alt="NID Back"
                      className="w-full h-full object-cover rounded-lg border-2 border-gray-300"
                    />
                  )}
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 shadow-md hover:bg-red-700 transition-colors"
                    onClick={handleBackRemoveImage}
                  >
                    <MdClose />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="nid-back-upload"
                  className="flex flex-col items-center justify-center w-full h-full bg-gray-100 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
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
                  <BsCloudUpload className="text-6xl text-gray-500 mb-2" />
                  <p className="text-gray-600">Click to upload</p>
                </label>
              )}
            </div>
          </div>
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
            label="National Identification Number"
            variant="outlined"
            fullWidth
            required
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
            value={data.profile.email || ""}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileVerification;
