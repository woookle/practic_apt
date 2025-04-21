import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormatDate from "../../../utils/FormatDate";
import DownloadDocumentButton from "../../Main/Blocks/Documents/DownloadDocumentButton";
import DeleteDocumentButton from "../../Main/Blocks/Documents/DeleteDocumentButton";

const DocInfo = ({ isOpen, document, setIsOpen, setCurrentDoc }) => {
  if (isOpen) {
    return (
      <div className="docMore">
        <div className="docMoreBlock animate__animated animate__fadeInUp">
          <FontAwesomeIcon icon={faXmark} className="closeButton" onClick={() => {setCurrentDoc([]); setIsOpen(false)}} />
          <p className="name"><b>Название:</b> {document.title}</p>
          <p className="dateTime"><b>Создан:</b> {FormatDate(document.createdAt)}</p>
          <p className="gr"><b>Группа:</b> {document.group}</p>
          <p className="gr"><b>Курс:</b> {document.data.course}</p>
          <ul className="studentsList">
            <b>Список студентов:</b>
            {document.data.students.map((stud, key) => (
              <li key={key}>
                ФИО: {stud.name} | Группа: {stud.group}
              </li>
            ))}
          </ul>
          <div className="buttons">
            <DownloadDocumentButton title={document.title} group={document.group} documentId={document._id} />
            <button type="button" className="closeBtn" onClick={() => {setCurrentDoc([]); setIsOpen(false)}}>Закрыть</button>
          </div>
          <DeleteDocumentButton documentId={document._id} setIsOpen={setIsOpen} />
        </div>
      </div>
    );
  }
};

export default DocInfo;
