import { BarLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const VerifyEmailPopup = ({ userData, verifyEmail, loadingVerifyEmail, handleInput, VerifyCode, setVerifyEmail }) => {
  if (verifyEmail) {
    return (
      <div className="verifyEmailPopup">
        <div className="animate__animated animate__fadeIn">
          <div
            className="closeButton"
            onClick={() => {
              setVerifyEmail(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
          <p className="title">Подтвердите почту</p>
          <p className="code">Код был отправлен на вашу почту</p>
          <p className="subtitle">Код был отправлен на вашу почту</p>
          <input
            type="text"
            value={userData.code}
            onChange={(e) => handleInput("code", e.target.value)}
            placeholder="Введите код"
            disabled={loadingVerifyEmail}
          />
          <button
            onClick={() => {
              VerifyCode(userData);
            }}
          >
            {loadingVerifyEmail ? <BarLoader color="#fff" /> : "Подтвердить"}
          </button>
        </div>
      </div>
    );
  }
};

export default VerifyEmailPopup;
