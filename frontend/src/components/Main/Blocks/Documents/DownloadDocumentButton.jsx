import React, { useState } from "react";
import { downloadDocumentById } from "../../../../api/api";

const DownloadDocumentButton = ({ title, group, documentId }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setLoading(true);
      const response = await downloadDocumentById(documentId);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const fileName = `${title}_${group}.docx`;
      link.setAttribute("download", fileName);

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button disabled={loading} onClick={handleDownload} className="downloadBtn">
      Скачать
    </button>
  );
};

export default DownloadDocumentButton;