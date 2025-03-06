import { useState } from "react";
import useRegister from "../../hooks/useRegister";
import Register from "./Register";

const RegisterContainer = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    verifyPassword: "",
    code: "",
  });
  const { loading, verifyEmail, Reg, VerifyCode, loadingVerifyEmail } =
    useRegister();
  const [showPass, setShowPass] = useState(false);

  const handleInput = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  return (
    <Register
      userData={userData}
      handleInput={handleInput}
      loading={loading}
      verifyEmail={verifyEmail}
      Reg={Reg}
      VerifyCode={VerifyCode}
      loadingVerifyEmail={loadingVerifyEmail}
      showPass={showPass}
      setShowPass={setShowPass}
    />
  );
};

export default RegisterContainer;
