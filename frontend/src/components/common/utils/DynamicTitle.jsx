import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const DynamicTitle = () => {
  const location = useLocation();
  const baseURL = "Practic APT | ";

  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.title = baseURL + "Добро пожаловать!";
        break;
      case "/register":
        document.title = baseURL + "Регистрация";
        break;
      case "/login":
        document.title = baseURL + "Вход";
        break;
      case "/main":
        document.title = baseURL + "Главная страница";
        break;
      case "/profile":
        document.title = baseURL + "Мой профиль";
        break;
      case "/create":
        document.title = baseURL + "Создание документа";
        break;
      case "/admin":
        document.title = baseURL + "Админ панель";
        break;
      default:
        document.title = baseURL + "404";
    }
  }, [location]);

  return null;
};

export default DynamicTitle;
