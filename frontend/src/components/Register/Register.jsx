import emblema from "../../assets/img/emblema.svg";
import VerifyEmailPopup from "../common/popups/VerifyEmailPopup";
import { BarLoader } from "react-spinners";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

const Register = ({ userData, handleInput, loading, verifyEmail, Reg, VerifyCode, loadingVerifyEmail, showPass, setShowPass, setVerifyEmail }) => {
  return (
    <>
      <form className="registerForm">
        <img src={emblema} alt="logo" className="logo animate__animated animate__fadeInUp" />
        <div className="formBlock animate__animated animate__fadeIn">
          <p className="title">Регистрация</p>
          <div className="inputBlocks">
            <input
              type="email"
              disabled={loading}
              value={userData.email}
              onChange={(e) => handleInput("email", e.target.value)}
              placeholder="Логин"
            />
            <input
              type="text"
              disabled={loading}
              value={userData.username}
              onChange={(e) => handleInput("username", e.target.value)}
              placeholder="Имя"
            />
            <div className="passwordInput">
              <input
                type={showPass ? "text" : "password"}
                disabled={loading}
                value={userData.password}
                onChange={(e) => handleInput("password", e.target.value)}
                placeholder="Пароль"
              />
              <FontAwesomeIcon icon={showPass ? faLockOpen : faLock} onClick={() => {setShowPass(!showPass)}} className="showPassIcon" />
            </div>
            <input
              type="password"
              disabled={loading}
              value={userData.verifyPassword}
              onChange={(e) => handleInput("verifyPassword", e.target.value)}
              placeholder="Подтвердите пароль"
            />
          </div>
          <button type="button" disabled={loading} onClick={() => {Reg(userData)}}>
            {loading ? <BarLoader color="#fff" width={"100%"} /> : "Зарегистрироваться"}
          </button>
          <p className="haveAccount">
            Уже есть аккаунт? <Link to={'/login'}>Войти</Link>
          </p>
        </div>
      </form>
      <VerifyEmailPopup VerifyCode={VerifyCode} loadingVerifyEmail={loadingVerifyEmail} userData={userData} verifyEmail={verifyEmail} handleInput={handleInput} setVerifyEmail={setVerifyEmail} />
    </>
  );
};

export default Register;