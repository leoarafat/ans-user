import { useProfileQuery } from "@/redux/slices/admin/userApi";

const useLoggedin = () => {
  const { data: profileData, isLoading, isError } = useProfileQuery({});
  const isLoggedIn = !!profileData?.data;

  return { isLoggedIn, isLoading, isError };
};

export default useLoggedin;
