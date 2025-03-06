import { useDispatch } from "react-redux";
import Main from "./Main";
import { useEffect } from "react";
import { getMyDocuments } from "../../api/api";

const MainContainer = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getMyDocuments())
  }, [])

  return (
    <Main />
  )
}

export default MainContainer;