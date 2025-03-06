import { BarLoader } from "react-spinners";
import Doc from "./Doc";
import DocInfo from "../../../common/popups/DocInfo";

const Documents = ({ documents, sortedDocuments, loading, isOpen, setIsOpen, currentDoc, setCurrentDoc }) => {
  return (
    <div className="myDocuments">
      <h1 className="title">Мои документы</h1>
      {loading ? (
        <BarLoader width={"100%"} color="#fff" />
      ) : (
        <ul className="documentList animate__animated animate__fadeInRight">
          {sortedDocuments.length == 0 ? (
            <p className="animate__animated animate__fadeIn" style={{ textAlign: "center", fontWeight: "bold", fontSize: "16px" }}>Ничего не найдено!</p>
          ) : (
            sortedDocuments.map((doc, key) => (
              <li key={key}>
                <Doc
                  document={doc}
                  setIsOpen={setIsOpen}
                  setCurrentDoc={setCurrentDoc}
                />
              </li>
            ))
          )}
        </ul>
      )}
      <DocInfo
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setCurrentDoc={setCurrentDoc}
        document={currentDoc}
      />
    </div>
  );
};

export default Documents;
