import emblema from "../../assets/img/emblema.svg";
import { Link } from "react-router-dom";
import { BarLoader } from "react-spinners";
import FAPopup from "../common/popups/FAPopup";

const Login = ({
  userData,
  handleInput,
  loading,
  verifyOtp,
  Log,
  verify2FA,
  verifyOtpLoading,
  setVerifyOtp
}) => {
  return (
    <>
      <form className="registerForm">
        <img
          src={emblema}
          alt="logo"
          className="logo animate__animated animate__fadeInUp"
        />
        <div className="formBlock animate__animated animate__fadeIn">
          <p className="title">Вход</p>
          <div className="inputBlocks">
            <input
              type="email"
              disabled={loading}
              value={userData.email}
              onChange={(e) => handleInput("email", e.target.value)}
              placeholder="Логин"
            />
            <input
              type="password"
              disabled={loading}
              value={userData.password}
              onChange={(e) => handleInput("password", e.target.value)}
              placeholder="Пароль"
            />
          </div>
          <button
            type="button"
            disabled={loading}
            onClick={() => {
              Log(userData);
            }}
          > 
            {loading ? <BarLoader color="#fff" width={"100%"} /> : "Войти"}
          </button>
          <p className="haveAccount">
            Нет аккаунта? <Link to={"/register"}>Зарегистрироваться</Link>
          </p>
        </div>
      </form>
      <FAPopup
        userData={userData}
        handleInput={handleInput}
        verifyOtp={verifyOtp}
        verify2FA={verify2FA}
        verifyOtpLoading={verifyOtpLoading}
        setVerifyOtp={setVerifyOtp}
      />
    </>
  );
};

export default Login;
