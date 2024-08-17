import AuthWrapper from "@/components/share/AuthWrapper";
import Title from "@/components/share/Title";
import { baseUrl } from "@/redux/api/baseApi";
import { Button, Form } from "antd";
import Input from "antd/es/input/Input";
import { useNavigate, useParams } from "react-router-dom";

const SetNewPassword = () => {
  const { id } = useParams();
  console.log(id);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      const res = await baseUrl.post("/auth/reset-password", values, {
        headers: { "Content-Type": "application/json", Authorization: id },
      });

      if (res?.data?.success === true) {
        alert("Password reset successful");
        navigate("/auth/login");
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <AuthWrapper>
      <div className="text-center mb-12">
        <Title>Set a new password</Title>
        <p>
          Create a new password. Ensure it differs from previous ones for
          security
        </p>
      </div>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="New password" name="newPassword">
          <Input.Password
            placeholder="Write new password"
            style={{ height: "50px" }}
          />
        </Form.Item>
        <Form.Item label="Confirm Password" name="confirmPassword">
          <Input.Password
            placeholder="Write confirm password"
            style={{ height: "50px" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            className="bg-secondary h-12 text-white text-lg w-full mt-6"
            htmlType="submit"
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </AuthWrapper>
  );
};

export default SetNewPassword;
