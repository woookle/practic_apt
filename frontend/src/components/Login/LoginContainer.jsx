import { useState } from "react";
import Login from "./Login";
import useLogin from "../../hooks/useLogin";

const LoginContainer = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    otp: "",
  });
  const { loading, verifyOtp, setVerifyOtp, Log, verify2FA, verifyOtpLoading } = useLogin();

  const handleInput = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  return (
    <Login
      userData={userData}
      handleInput={handleInput}
      loading={loading}
      verifyOtp={verifyOtp}
      Log={Log}
      verify2FA={verify2FA}
      verifyOtpLoading={verifyOtpLoading}
      setVerifyOtp={setVerifyOtp}
    />
  );
};

export default LoginContainer;
