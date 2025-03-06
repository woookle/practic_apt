import { useSelector } from "react-redux";
import Documents from "./Documents";
import { useState } from "react";

const DocumentsContainer = () => {
  const sortedDocuments = useSelector((state) => state.document.sortedDocuments);
  const loading = useSelector((state) => state.document.loading);

  const [isOpen, setIsOpen] = useState(false);
  const [currentDoc, setCurrentDoc] = useState([]);

  return (
    <Documents
      sortedDocuments={sortedDocuments}
      loading={loading}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      currentDoc={currentDoc}
      setCurrentDoc={setCurrentDoc}
    />
  );
};

export default DocumentsContainer;
