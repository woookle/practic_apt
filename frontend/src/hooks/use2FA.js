import { useDispatch, useSelector } from "react-redux";
import { off2FA, on2FA } from "../api/api";
import { useState } from "react";

const use2FA = () => {
  const is2faUpdating = useSelector((state) => state.auth.is2faUpdating);
  const is2Fa = useSelector((state) => state.auth.user.is2FAEnabled);
  const dispatch = useDispatch();
  const [is2FAPopup, setIs2FAPopup] = useState(false);
  const [faContent, setFaContent] = useState({});

  const enable2FA = async () => {
    try {
      const response = await dispatch(on2FA()).unwrap();
      setIs2FAPopup(true);
      setFaContent({ qr_code: response.qr_code, code: response.code });
    } catch (error) {
      return false
    }
  }
  const disable2FA = () => {
    dispatch(off2FA());
  }

  return { is2FAPopup, setIs2FAPopup, enable2FA, disable2FA, is2faUpdating, faContent, is2Fa }
}

export default use2FA;