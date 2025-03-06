const LogoutConfirm = ({ isOpenConfirm, setIsOpenConfirm, logout }) => {
  if(isOpenConfirm) {
    return (
      <div className="logoutConfirmContainer animate__animated animate__fadeIn">
        <div className="logoutConfirm animate__animated animate__fadeInUp">
        <h1>Вы уверены, что хотите выйти? 🤔</h1>
        <div className="logoutBtns">
          <button type="button" onClick={logout}>Да</button>
          <button type="button" onClick={() => setIsOpenConfirm(false)}>Нет</button>
        </div>
        </div>
      </div>
    )
  }
}

export default LogoutConfirm;