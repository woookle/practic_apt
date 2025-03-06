import { Routes, Route, Navigate } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import { useSelector } from "react-redux";
import Preloader from "./components/Preloader/Preloader";
import { ToastContainer } from "react-toastify";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HeaderContainer from "./components/Header/HeaderContainer";
import FooterContainer from "./components/Footer/FooterContainer";
import ProfilePage from "./pages/ProfilePage";
import DynamicTitle from "./components/common/utils/DynamicTitle";

function App() {
  const isAuth = useSelector((state) => state.auth.user);
  const isLoading = useSelector((state) => state.auth.loading);

  if(isLoading) {
    return (
      <Preloader />
    )
  }

  return (
    <>
    { isAuth && <HeaderContainer /> }
    <Routes>
      <Route path="/" element={isAuth ? <Navigate to={"/main"} /> : <IntroPage />} />
      <Route path="/register" element={isAuth ? <Navigate to={"/main"} /> : <RegisterPage />} />
      <Route path="/login" element={isAuth ? <Navigate to={"/main"} /> : <LoginPage />} />

      {/* Protected routes */}
      <Route path="/main" element={!isAuth ? <Navigate to={"/"} /> : <MainPage />} />
      <Route path="/profile" element={!isAuth ? <Navigate to={"/"} /> : <ProfilePage />} />
    </Routes>
    { isAuth && <FooterContainer /> }
    <DynamicTitle />
    <ToastContainer closeOnClick={true} autoClose={3000} theme="dark" closeButton={false} newestOnTop={false} stacked />
    </>
  )
}

export default App
