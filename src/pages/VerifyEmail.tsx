import AuthWrapper from "@/components/share/AuthWrapper";
import Title from "@/components/share/Title";
import { useVerifyEmailMutation } from "@/redux/slices/admin/settingApi";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [otp, setOtp] = useState<number | null>();
  const navigate = useNavigate();
  const [verifyEmail, { error, isSuccess, data }] = useVerifyEmailMutation();

  // console.log(otp);
  useEffect(() => {
    if (isSuccess) {
      if (data) {
        alert("Verify successful");
        navigate(`/auth/set-new-password/${data?.data}`);
      }
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;

        alert(errorData.data.message);
      } else {
        console.error("Login error:", error);
      }
    }
  }, [data, error, isSuccess, navigate]);

  const onChange = (text: any) => {
    setOtp(text);
  };
  const sharedProps = {
    onChange,
  };
  const handleVerify = async () => {
    try {
      const email = localStorage.getItem("email");
      await verifyEmail({ email, code: otp });
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  return (
    <AuthWrapper>
      <div className="text-center mb-12">
        <Title>Check your email</Title>
        <p>
          We sent a reset link to {"fahim"} enter 5 digit code that mentioned in
          the email
        </p>
      </div>

      <Input.OTP
        size="large"
        className="otp-input"
        style={{ width: "100%", height: "50px" }}
        length={4}
        formatter={(str) => str.toUpperCase()}
        {...sharedProps}
      />
      <Button
        className="bg-secondary h-12 text-white text-lg w-full mt-14"
        onClick={handleVerify}
      >
        Verify Code
      </Button>

      <p className="text-center mt-10">
        You have not received the email?
        <Button className="pl-0" type="link">
          Resend
        </Button>
      </p>
    </AuthWrapper>
  );
};

export default VerifyEmail;
