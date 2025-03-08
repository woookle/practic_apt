import { Link } from "react-router-dom";

const Header = ({ emblema, avatar, role }) => {
  return (
    <header>
      <div className="container">
        <Link to={'/main'}><img src={emblema} alt="emblema" className="emblemaHeader" /></Link>
        <ul className="navLinks">
          <li><Link to={'/main'}>Главная</Link></li>
          <li><Link to={'/create'}>Создать документ</Link></li>
          { role === 'admin' && <li><Link to={'/admin'}>Админ</Link></li> }
        </ul>
        <Link to={'/profile'} className="headerAvatar"><div style={{ width: "50px", height: "50px", background: `url(${avatar}`, backgroundPosition: "center", backgroundSize: "cover", borderRadius: "50%" }}></div></Link>
      </div>
    </header>
  )
}

export default Header;