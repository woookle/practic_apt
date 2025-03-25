import { useState } from "react";
import { changeAccountName, changeAvatarProfile, logoutFromAcc } from "../../api/api";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import use2FA from "../../hooks/use2FA";

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const totalDocuments = user.documents ? user.documents.length : 0;
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [name, setName] = useState(user.username);
  const [isChanging, setIsChanging] = useState(false);
  const { is2FAPopup, setIs2FAPopup, enable2FA, disable2FA, is2faUpdating, faContent, is2Fa } = use2FA()

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
      is2FAPopup={is2FAPopup}
      setIs2FAPopup={setIs2FAPopup}
      enable2FA={enable2FA}
      disable2FA={disable2FA}
      is2faUpdating={is2faUpdating}
      faContent={faContent}
      is2Fa={is2Fa}
    />
  );
};

export default ProfileContainer;
