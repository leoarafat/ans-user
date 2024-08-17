// // src/hooks/useVerification.ts

// import { useProfileQuery } from "@/redux/slices/admin/userApi";

// const useLoggedin = () => {
//   const { data: profileData, isLoading, isError } = useProfileQuery({});
//   const isLoggedIn = profileData?.data;

//   return { isLoggedIn, isLoading, isError };
// };

// export default useLoggedin;
// src/hooks/useVerification.ts

import { useProfileQuery } from "@/redux/slices/admin/userApi";

const useLoggedin = () => {
  const { data: profileData, isLoading, isError } = useProfileQuery({});
  const isLoggedIn = !!profileData?.data; // Ensure this correctly interprets your profile data

  return { isLoggedIn, isLoading, isError };
};

export default useLoggedin;
