import LogoutConfirm from "../common/popups/LogoutConfirm";

const Profile = ({ user, changeAvatar, changeUsername, isChanging, setIsChanging, name, setName, totalDocuments, logout, isOpenConfirm, setIsOpenConfirm }) => {
  return (
    <div className="profilePage">
      <div className="container">
        <div className="profile animate__animated animate__fadeIn">
          <div className="avatar">
            <div className="avatarImage" style={{ width: "120px", height: "120px", background: `url(${import.meta.env.VITE_API}${user.avatar})`, backgroundPosition: "center", backgroundSize: "cover"}}></div>
            <input
              type="file"
              id="avatar"
              onChange={changeAvatar}
              style={{ display: "none" }}
            />
            <label htmlFor="avatar" className="changeAvatarBtn">поменять</label>
          </div>
          <div className="usernameBlock">
            <p className="username">{user.username}</p>
            <input
              type="text"
              style={{ display: isChanging ? "block" : "none" }}
              className="newNameInput"
              placeholder="Введите новое имя"
              value={name}
              onChange={(txt) => setName(txt.target.value)}
            />
            <button
              type="button"
              className="saveNewUsername"
              style={{ display: isChanging ? "block" : "none" }}
              onClick={changeUsername}
            >
              Сохранить
            </button>
            <button
              type="button"
              className="changeUsernameBtn"
              onClick={() => setIsChanging(!isChanging)}
            >
              {isChanging ? "Отмена" : "Изменить"}
            </button>
          </div>
          <p className="totalDoc">
            Всего документов: {totalDocuments}
          </p>
          <button type="button" className="logoutBtn" onClick={() => setIsOpenConfirm(true)}>Выйти</button>
        </div>
      </div>
      <LogoutConfirm isOpenConfirm={isOpenConfirm} setIsOpenConfirm={setIsOpenConfirm} logout={logout} />
    </div>
  );
};

export default Profile;
