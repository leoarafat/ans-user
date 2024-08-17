import React, { createContext, useState } from "react";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    profileImage: null,
    nidFront: null,
    nidBack: null,
    name: "",
    phoneNumber: "",
    email: "",
  });

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export { ProfileContext, ProfileProvider };
