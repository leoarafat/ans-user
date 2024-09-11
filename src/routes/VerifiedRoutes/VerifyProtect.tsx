import { useEffect } from "react";
import Loader from "@/utils/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import useVerification from "@/utils/isVerified";
import { storeUserInfo } from "@/redux/services/auth.service";

const IsVerifiedRoutes = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { isVerified, isLoading, isError } = useVerification();
  const token = localStorage.getItem("accessToken");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      storeUserInfo({ accessToken: token });
    }
  }, [location]);
  useEffect(() => {
    if (!isLoading && !isVerified) {
      navigate("/verify");
    }
    if (!token) {
      navigate("/auth/login");
    }
  }, [isLoading, isVerified, navigate, token]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading user data</div>;
  }

  return isVerified ? children : null;
};

export default IsVerifiedRoutes;
