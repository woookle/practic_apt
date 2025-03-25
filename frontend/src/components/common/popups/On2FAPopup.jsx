import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const On2FAPopup = ({ is2FAPopup, setIs2FAPopup, faContent }) => {
  if (is2FAPopup) {
    return (
      <div className="on2faPopup">
        <div className="on2faContainer">
          <div
            className="closeButton"
            onClick={() => {
              setIs2FAPopup(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
          <h1>Вы включили двухэтапную авторизацию!</h1>
          <div className="qrCodeBlock">
            <p className="qrCodeText">
              Для того чтобы видеть код отсканируйте qr-код,<br />который представлен
              ниже в Google Authenticator.
            </p>
            <img src={faContent.qr_code} alt="" className="qrCode" />
          </div>
          <div className="codeBlock">
            <p className="codeText">Или же впишите код самостоятельно.</p>
            <p className="code">{faContent.code}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default On2FAPopup;
