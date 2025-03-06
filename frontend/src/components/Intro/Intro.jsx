import emblema from "../../assets/img/emblema.svg";
import { Link } from "react-router-dom"

const Intro = () => {
  return (
    <div className="container">
      <div className="intro">
        <img src={emblema} alt="logo" className="animate__animated animate__fadeInUp" />
        <div className="content">
          <p className="title animate__animated animate__fadeInUp">practic APT</p>
          <p className="welcome animate__animated animate__fadeInLeft">Добро пожаловать!</p>
          <p className="subtitle animate__animated animate__fadeInRight">practic APT - это сайт для<br />преподавателей предназначенный на<br />быстрое составление документов для<br />практики групп</p>
        </div>
        <Link to={"/register"} className="animate__animated animate__fadeInUp"><button>НАЧАТЬ</button></Link>
      </div>
    </div>
  )
}

export default Intro;