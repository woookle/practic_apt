import Header from "./Header";
import { useSelector } from "react-redux";
import emblema from "../../assets/img/emblema.svg";

const HeaderContainer = () => {
  const user = useSelector((state) => state.auth.user);
  const avatar = import.meta.env.VITE_API + user.avatar;
  const role = user.role;

  return <Header emblema={emblema} avatar={avatar} role={role} />;
};

export default HeaderContainer;
