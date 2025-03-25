import { useState } from "react";
import { register } from "../api/api";
import { useDispatch } from "react-redux";
import { verifyRegister } from "../api/api";

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [loadingVerifyEmail, setLoadingVerifyEmail] = useState(false);
  const dispatch = useDispatch();

  const Reg = async (userData) => {
    try {
      setLoading(true);
      const response = await register(userData);
      if (response) {
        setVerifyEmail(true);
      }
    } catch (error) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  const VerifyCode = async (userData) => {
    try {
      setLoadingVerifyEmail(true);
      await dispatch(verifyRegister(userData));
    } catch (error) {
      return false;
    } finally {
      setLoadingVerifyEmail(false);
      setVerifyEmail(false);
    }
  };

  return { loading, verifyEmail, Reg, VerifyCode, loadingVerifyEmail, setVerifyEmail };
};

export default useRegister;
