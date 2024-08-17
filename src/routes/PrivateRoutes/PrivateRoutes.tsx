import { useEffect } from "react";
import Loader from "@/utils/Loader";
import { useNavigate } from "react-router-dom";
import useLoggedin from "@/utils/isLoggedin";

const PrivateRoutes = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, isError } = useLoggedin();
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/verify");
    }
    if (!token) {
      navigate("/auth/login");
    }
  }, [isLoading, isLoggedIn, navigate, token]);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    localStorage.removeItem("accessToken");
    window.location.reload();
  }

  return isLoggedIn ? children : null;
};

export default PrivateRoutes;
