import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, verifyLogin } from "../api/api";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const dispatch = useDispatch();

  const Log = async (userData) => {
    try {
      setLoading(true);
      const response = await dispatch(login(userData));
      if (response.payload.is2FA) {
        setVerifyOtp(true);
      }
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verify2FA = async (userData) => {
    try {
      setVerifyOtpLoading(true);
      const response = await dispatch(verifyLogin(userData));
    } catch (error) {
      return false;
    } finally {
      setVerifyOtpLoading(false);
    }
  };

  return { loading, verifyOtp, Log, verify2FA, verifyOtpLoading, setVerifyOtp };
};

export default useLogin;
