import { useState } from "react";
import { changeAccountName, changeAvatarProfile, logoutFromAcc } from "../../api/api";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const totalDocuments = user.documents ? user.documents.length : 0;
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [name, setName] = useState(user.username);
  const [isChanging, setIsChanging] = useState(false);

  const changeAvatar = (new_avatar) => {
    const formData = new FormData();
    formData.append("avatar", new_avatar.target.files[0]);

    dispatch(changeAvatarProfile(formData));
  };
  const changeUsername = () => {
    if(name === user.username) {
      toast.error('Имя совпадает с предыдущим!')
    } else {
      try {
        dispatch(changeAccountName({ name }));
        setIsChanging(false)        
      } catch (error) {
        return false
      }
    }
  };
  const logout = () => {
    dispatch(logoutFromAcc());
  }

  return (
    <Profile
      user={user}
      changeAvatar={changeAvatar}
      changeUsername={changeUsername}
      isChanging={isChanging}
      setIsChanging={setIsChanging}
      name={name}
      setName={setName}
      totalDocuments={totalDocuments}
      logout={logout}
      isOpenConfirm={isOpenConfirm}
      setIsOpenConfirm={setIsOpenConfirm}
    />
  );
};

export default ProfileContainer;
