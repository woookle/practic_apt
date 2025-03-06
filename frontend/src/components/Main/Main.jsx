import DocumentsContainer from "./Blocks/Documents/DocumentsContainer";
import FilterContainer from "./Blocks/Filter/FilterContainer";
import MiniProfileContainer from "./Blocks/MiniProfile/MiniProfileContainer";

const Main = () => {
  return (
    <div className="main">
      <div className="container animate__animated animate__fadeIn">
        <div className="leftBlock">
          <MiniProfileContainer />
          <FilterContainer />
        </div>
        <DocumentsContainer />
      </div>
    </div>
  );
};

export default Main;
