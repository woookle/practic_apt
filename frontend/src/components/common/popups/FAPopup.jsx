import { BarLoader } from "react-spinners";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const FAPopup = ({ userData, handleInput, verifyOtp, verify2FA, verifyOtpLoading, setVerifyOtp }) => {
  if (verifyOtp) {
    return (
      <div className="FAPopup">
        <div className="animate__animated animate__fadeIn">
          <div className="closeButton" onClick={() => {setVerifyOtp(false)}}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
          <p className="title">
            На аккаунте включена
            <br />
            двухэтапная аутентификация
          </p>
          <p className="subtitle">Пожалуйста введите код из приложения</p>
          <input
            type="text"
            disabled={verifyOtpLoading}
            value={userData.otp}
            onChange={(e) => handleInput("otp", e.target.value)}
            placeholder="Введите код"
          />
          <button
            type="button"
            disabled={verifyOtpLoading}
            onClick={() => {
              verify2FA(userData);
            }}
          >
            {verifyOtpLoading ? (
              <BarLoader color="#fff" width="70px" height="4px" />
            ) : (
              "Подтвердить"
            )}
          </button>
        </div>
      </div>
    );
  }
};

export default FAPopup;
