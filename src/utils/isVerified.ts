import { useProfileQuery } from "@/redux/slices/admin/userApi";

const useVerification = () => {
  const { data: profileData, isLoading, isError, error } = useProfileQuery({});
  const isVerified = !!profileData?.data?.isVerified;

  return { isVerified, isLoading, isError, error };
};

export default useVerification;
