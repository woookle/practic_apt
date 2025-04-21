import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ emblema, avatar, role }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="container">
        <Link to={"/main"}>
          <img src={emblema} alt="emblema" className="emblemaHeader" />
        </Link>

        <div
          className={`burger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`navLinks ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to={"/main"} onClick={() => setIsMenuOpen(false)}>
              Главная
            </Link>
          </li>
          <li>
            <Link to={"/create"} onClick={() => setIsMenuOpen(false)}>
              Создать документ
            </Link>
          </li>
          {role === "admin" && (
            <li>
              <Link to={"/admin"} onClick={() => setIsMenuOpen(false)}>
                Админ
              </Link>
            </li>
          )}
          <li className="mobileAvatar">
            <Link to={"/profile"} onClick={() => setIsMenuOpen(false)}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  background: `url(${avatar})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  borderRadius: "50%",
                }}
              ></div>
            </Link>
          </li>
        </ul>

        <Link to={"/profile"} className="headerAvatar">
          <div
            style={{
              width: "50px",
              height: "50px",
              background: `url(${avatar})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              borderRadius: "50%",
            }}
          ></div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
