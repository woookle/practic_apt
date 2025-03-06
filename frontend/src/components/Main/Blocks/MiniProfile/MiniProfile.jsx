import { MoonLoader } from "react-spinners";

const MiniProfile = ({ username, avatar, totalDocuments, loading }) => {
  return (
    <div className="miniProfile animate__animated animate__fadeInLeft">
      <div className="nameAvatar">
        <div
          style={{
            width: "70px",
            height: "70px",
            background: `url(${avatar})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: "50%",
          }}
        ></div>
        <p>{username}</p>
      </div>
      <p className="totalDocuments">
        Всего документов:{" "}
        {loading ? <MoonLoader size={20} color="#fff" /> : totalDocuments}
      </p>
    </div>
  );
};

export default MiniProfile;
