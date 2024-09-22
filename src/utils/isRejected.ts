import { useProfileQuery } from "@/redux/slices/admin/userApi";
import { useEffect } from "react";

const useRejected = () => {
  const { data: profileData, isLoading, isError, error } = useProfileQuery({});
  const isRejected = profileData?.data?.isApproved === "rejected";

  useEffect(() => {
    if (isRejected) {
      localStorage.setItem("isRejected", "true");
    } else if (!isLoading && !isError) {
      localStorage.removeItem("isRejected");
    }
  }, [isRejected, isLoading, isError]);

  const persistedIsRejected = localStorage.getItem("isRejected") === "true";

  return {
    isRejected: persistedIsRejected || isRejected,
    isLoading,
    isError,
    error,
  };
};

export default useRejected;
