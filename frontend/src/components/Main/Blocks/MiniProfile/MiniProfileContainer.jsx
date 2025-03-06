import { useSelector } from "react-redux";
import MiniProfile from "./MiniProfile";

const MiniProfileContainer = () => {
  const user = useSelector((state) => state.auth.user);
  const documents = useSelector((state) => state.document.documents);
  const loading = useSelector((state) => state.document.loading)
  
  const username = user.username;
  const avatar = import.meta.env.VITE_API + user.avatar;
  const totalDocuments = documents.length;

  return (
    <MiniProfile
      username={username}
      avatar={avatar}
      totalDocuments={totalDocuments}
      loading={loading}
    />
  );
};

export default MiniProfileContainer;
